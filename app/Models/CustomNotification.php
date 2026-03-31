<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomNotification extends Model
{
    use HasFactory;

    protected $table = 'custom_notifications';

    protected $fillable = [
        'user_id',
        'from_user_id',
        'type',
        'comment_id',
        'is_read',
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];

    // Pemilik notifikasi
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // User yang melakukan like / reply
    public function fromUser()
    {
        return $this->belongsTo(User::class, 'from_user_id');
    }

    // Komentar yang terkait
    public function comment()
    {
        return $this->belongsTo(Comment::class);
    }

    // Tandai sebagai dibaca
    public function markAsRead()
    {
        $this->update(['is_read' => true]);
    }

    // Helper untuk status baca
    public function isRead()
    {
        return $this->is_read === true;
    }

    // Pesan otomatis
    public function getMessageAttribute()
    {
        if ($this->type === 'comment_liked') {
            return "{$this->fromUser->name} menyukai komentar kamu.";
        }

        if ($this->type === 'comment_replied') {
            return "{$this->fromUser->name} membalas komentar kamu.";
        }

        return "Notifikasi baru.";
    }
}
