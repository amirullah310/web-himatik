<?php

namespace App\Repositories;

use App\Models\BlogArticle;
use Illuminate\Support\Facades\DB;

class BlogArticleRepository
{
    protected $model;

    public function __construct(BlogArticle $model)
    {
        $this->model = $model;
    }

    public function getAllPaginated($perPage = 10, $search = null, $categoryId = null)
    {
        $query = $this->model->with(['author.role', 'categories']);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('summary', 'like', "%{$search}%");
            });
        }

        if ($categoryId) {
            $query->whereHas('categories', function ($q) use ($categoryId) {
                $q->where('blog_categories.id', $categoryId);
            });
        }

        return $query->latest()->paginate($perPage);
    }

    /**
     * Ambil artikel yang berstatus published dengan relasi lengkap.
     */
    public function getPublishedArticlesPaginated($perPage = 10, $search = null, $categoryId = null)
    {
        $query = $this->model
            ->with(['author.role', 'categories', 'likedBy', 'savedBy'])
            ->where('status', 'published');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('summary', 'like', "%{$search}%");
            });
        }

        if ($categoryId) {
            $query->whereHas('categories', function ($q) use ($categoryId) {
                $q->where('blog_categories.id', $categoryId);
            });
        }

        return $query->latest()->paginate($perPage);
    }

    public function getLatestPublishedArticles($limit = 5, $excludeArticleId = null)
    {
        $query = $this->model
            ->with(['author.role', 'categories'])
            ->where('status', 'published')
            ->latest();

        if ($excludeArticleId) {
            $query->where('id', '!=', $excludeArticleId);
        }

        return $query->limit($limit)->get();
    }

    /**
     * Ambil artikel berdasarkan slug dengan relasi lengkap.
     */
    public function findBySlug($slug)
    {
        return $this->model
            ->with(['author.role', 'categories', 'likedBy', 'savedBy'])
            ->where('slug', $slug)
            ->first();
    }

    public function findById($id)
    {
        return $this->model
            ->with(['author.role', 'categories', 'likedBy', 'savedBy'])
            ->findOrFail($id);
    }

    public function create(array $data, array $categoryIds = [])
    {
        return DB::transaction(function () use ($data, $categoryIds) {
            $article = $this->model->create($data);

            if (!empty($categoryIds)) {
                $article->categories()->attach($categoryIds);
            }

            return $article;
        });
    }

    public function update($id, array $data, array $categoryIds = [])
    {
        return DB::transaction(function () use ($id, $data, $categoryIds) {
            $article = $this->model->findOrFail($id);
            $article->update($data);

            if (!empty($categoryIds)) {
                $article->categories()->sync($categoryIds);
            } else {
                $article->categories()->detach();
            }

            return $article;
        });
    }

    public function delete($id)
    {
        return DB::transaction(function () use ($id) {
            $article = $this->model->findOrFail($id);
            $article->delete();
            return true;
        });
    }

    public function countPublished()
    {
        return $this->model->where('status', 'published')->count();
    }

    public function countAll()
    {
        return $this->model->count();
    }

    public function countDraft()
    {
        return $this->model->where('status', 'draft')->count();
    }

    public function incrementViews($id)
    {
        return $this->model->where('id', $id)->increment('view_count');
    }

    public function getPopularArticles($limit = 5)
    {
        return $this->model
            ->with(['author.role', 'categories'])
            ->where('status', 'published')
            ->orderByDesc('view_count')
            ->limit($limit)
            ->get();
    }

    public function getRelatedArticlesByCategory($categoryIds, $limit = 4, $excludeArticleId = null)
    {
        $query = $this->model
            ->with(['author.role', 'categories'])
            ->where('status', 'published')
            ->whereHas('categories', function ($q) use ($categoryIds) {
                $q->whereIn('blog_categories.id', $categoryIds);
            })
            ->latest();

        if ($excludeArticleId) {
            $query->where('id', '!=', $excludeArticleId);
        }

        return $query->limit($limit)->get();
    }
}
