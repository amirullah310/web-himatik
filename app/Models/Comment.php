<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\BlogArticle;
use App\Models\User;
use App\Models\CommentLike;

class Comment extends Model
{
    protected $fillable = [
        'article_id',
        'user_id',
        'comment',
        'parent_id',
        'is_hidden'
    ];

    /**
     * Relasi ke artikel.
     */
    public function article()
    {
        return $this->belongsTo(BlogArticle::class, 'article_id');
    }

    /**
     * Relasi ke user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Semua balasan.
     */
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id')->latest();
    }

    /**
     * User yang menyukai komentar ini.
     */
    public function likes()
    {
        return $this->hasMany(CommentLike::class);
    }
}
