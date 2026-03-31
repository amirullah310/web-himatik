<?php

namespace App\Http\Controllers;

use App\Services\BlogArticleService;
use App\Services\BlogCategoryService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\IOFactory;
use Illuminate\Support\Str;
use App\Models\BlogArticle;

class BlogPageController extends Controller
{
    protected $articleService;
    protected $categoryService;

    public function __construct(BlogArticleService $articleService, BlogCategoryService $categoryService)
    {
        $this->articleService = $articleService;
        $this->categoryService = $categoryService;
    }

    // =========================
    //  INDEX ARTIKEL
    // =========================
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 6);
        $search = $request->input('search');
        $categoryId = $request->input('category_id');
        $user = auth()->user();

        $articles = $this->articleService->getPublishedArticlesForHomepage($perPage, $search, $categoryId);
        $articles->getCollection()->load(['categories', 'likedBy', 'savedBy', 'author']);

        $articles->setCollection(
            $articles->getCollection()->map(function ($article) use ($user) {
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'slug' => $article->slug,
                    'picture' => $article->picture,
                    'summary' => $article->summary,
                    'created_at' => $article->created_at,
                    'view_count' => $article->view_count ?? 0,
                    'categories' => $article->categories->map(fn($cat) => [
                        'id' => $cat->id,
                        'name' => $cat->name,
                    ]),
                    'author' => [
                        'id' => $article->author->id ?? null,
                        'name' => $article->author->name ?? 'Anonim',
                        'picture' => $article->author->picture ?? null,
                    ],
                    'liked' => $user ? $article->likedBy->contains($user->id) : false,
                    'saved' => $user ? $article->savedBy->contains($user->id) : false,
                    'like_count' => $article->likedBy->count(),
                    'saved_count' => $article->savedBy->count(),
                    'status' => $article->status,
                ];
            })
        );

        $categories = $this->categoryService->getAllCategories();

        return Inertia::render('homepage/blog/index', [
            'articles' => $articles,
            'categories' => $categories->map(fn($cat) => [
                'id' => $cat->id,
                'name' => $cat->name,
            ]),
            'search' => $search,
            'per_page' => (int) $perPage,
            'selected_category_id' => $categoryId ? (int) $categoryId : null,
        ]);
    }

public function show($slug)
{
    $user = auth()->user();
    $article = $this->articleService->viewArticleBySlug($slug);

    if (!$article || ($article->status ?? '') !== 'published') {
        abort(404, 'Artikel tidak ditemukan atau belum dipublikasikan.');
    }

    // ====================================================
    // LOAD KOMENTAR: hanya parent + load anak-anak (replies)
    // ====================================================
    $article->load([
        'categories',
        'likedBy',
        'savedBy',
        'author',

        // Load komentar induk saja
        'comments' => function ($query) {
            $query->whereNull('parent_id')
                ->with([
                    'user',
                    'likes',

                    // Load replies secara lengkap
                    'replies' => function ($reply) {
                        $reply->with(['user', 'likes'])
                              ->orderBy('created_at', 'asc');
                    }
                ])
                ->orderBy('created_at', 'asc');
        }
    ]);

    // ====================================================
    // FORMAT KOMENTAR supaya rapi di frontend
    // ====================================================
    $formattedComments = $article->comments->map(function ($c) {
        return [
            'id'         => $c->id,
            'comment'    => $c->comment,
            'user_id'    => $c->user_id,
            'is_hidden'  => $c->is_hidden,
            'created_at' => $c->created_at,

            'user' => $c->user ? [
                'id'      => $c->user->id,
                'name'    => $c->user->name,
                'picture' => $c->user->picture,
            ] : null,

            'likes' => $c->likes->pluck('user_id'),

            // Replies
            'replies' => $c->replies->map(function ($r) {
                return [
                    'id'         => $r->id,
                    'comment'    => $r->comment,
                    'user_id'    => $r->user_id,
                    'created_at' => $r->created_at,

                    'user' => $r->user ? [
                        'id'      => $r->user->id,
                        'name'    => $r->user->name,
                        'picture' => $r->user->picture,
                    ] : null,

                    'likes' => $r->likes->pluck('user_id'),
                ];
            }),
        ];
    });

    // ====================================================
    // FORMAT ARTIKEL UNTUK FRONTEND
    // ====================================================
    $articleData = [
        'id'          => $article->id,
        'title'       => $article->title,
        'slug'        => $article->slug,
        'picture'     => $article->picture,
        'summary'     => $article->summary,
        'content'     => $article->content,
        'created_at'  => $article->created_at,
        'view_count'  => $article->view_count ?? 0,

        'categories' => $article->categories->map(fn($cat) => [
            'id'   => $cat->id,
            'name' => $cat->name,
        ]),

        'author' => [
            'id'      => $article->author->id ?? null,
            'name'    => $article->author->name ?? 'Anonim',
            'picture' => $article->author->picture ?? null,
        ],

        'liked'       => $user ? $article->likedBy->contains($user->id) : false,
        'saved'       => $user ? $article->savedBy->contains($user->id) : false,
        'like_count'  => $article->likedBy->count(),
        'saved_count' => $article->savedBy->count(),
        'status'      => $article->status,

        // KOMENTAR FINAL
        'comments' => $formattedComments,
    ];

    // ====================================================
    // ARTICLE SAMPINGAN
    // ====================================================
    $popularArticles = $this->articleService->getPopularArticles(4);
    $relatedArticles = $this->articleService->getRelatedArticlesByCategory(
        $article->categories->pluck('id')->toArray(),
        4,
        $article->id
    );

    return Inertia::render('homepage/blog/show', [
        'article'         => $articleData,
        'popularArticles' => $popularArticles,
        'relatedArticles' => $relatedArticles,
    ]);
}



    // =========================
    //  DOWNLOAD ARTIKEL
    // =========================
    public function download($slug, $format)
    {
        $article = $this->articleService->viewArticleBySlug($slug);

        if (!$article || ($article->status ?? '') !== 'published') {
            abort(404, 'Artikel tidak ditemukan atau belum dipublikasikan.');
        }

        $title = $article->title ?? 'Artikel';
        $content = strip_tags($article->content ?? $article->summary ?? 'Tidak ada konten');

        switch ($format) {
            case 'pdf':
                $pdf = Pdf::loadView('exports.article', ['article' => $article]);
                return $pdf->download(Str::slug($article->title) . '.pdf');

            case 'word':
                $phpWord = new PhpWord();
                $section = $phpWord->addSection();
                $section->addTitle($title, 1);
                $section->addTextBreak(1);
                $section->addText($content, ['name' => 'Arial', 'size' => 12]);

                $tempFile = tempnam(sys_get_temp_dir(), 'word');
                $writer = IOFactory::createWriter($phpWord, 'Word2007');
                $writer->save($tempFile);

                return response()->download(
                    $tempFile,
                    Str::slug($article->title) . '.docx',
                    ['Content-Type' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
                )->deleteFileAfterSend(true);

            default:
                abort(400, 'Format tidak dikenal.');
        }
    }
}
