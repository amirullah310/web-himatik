<?php

namespace App\Http\Controllers;

use App\Models\BlogArticle;
use Illuminate\Http\Request;

class ArticleInteractionController extends Controller
{
    public function like($id)
    {
        $article = BlogArticle::findOrFail($id);
        auth()->user()->likes()->syncWithoutDetaching([$article->id]);
        return back();
    }

    public function unlike($id)
    {
        $article = BlogArticle::findOrFail($id);
        auth()->user()->likes()->detach($article->id);
        return back();
    }

    public function save($id)
    {
        $article = BlogArticle::findOrFail($id);
        auth()->user()->savedArticles()->syncWithoutDetaching([$article->id]);
        return back();
    }

    public function unsave($id)
    {
        $article = BlogArticle::findOrFail($id);
        auth()->user()->savedArticles()->detach($article->id);
        return back();
    }
}
