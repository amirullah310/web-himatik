<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;
use App\Models\Comment;

class BlogArticle extends Model
{
    use HasFactory;

    protected $table = 'blog_articles';

    protected $fillable = [
        'title',
        'picture',
        'slug',
        'summary',
        'content',
        'author_id',
        'status',
        'view_count',
    ];

    /**
     * Relasi ke penulis.
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * Kategori artikel.
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(
            BlogCategory::class,
            'blog_article_categories',
            'article_id',
            'category_id'
        );
    }

    /**
     * User yang menyukai artikel.
     */
    public function likedBy(): BelongsToMany
    {
        return $this->belongsToMany(
            User::class,
            'article_likes',
            'article_id',
            'user_id'
        )->withTimestamps();
    }

    /**
     * User yang menyimpan artikel.
     */
    public function savedBy(): BelongsToMany
    {
        return $this->belongsToMany(
            User::class,
            'article_saves',
            'article_id',
            'user_id'
        )->withTimestamps();
    }

    /**
     * Auto slug dari title.
     */
    public function setTitleAttribute($value)
    {
        $this->attributes['title'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    /**
     * Komentar utama (tanpa parent).
     */
    public function comments()
    {
        return $this->hasMany(Comment::class, 'article_id')
            ->whereNull('parent_id')
            ->latest();
    }
}
