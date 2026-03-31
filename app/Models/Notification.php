<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $table = 'notifications';

    protected $fillable = [
        'user_id',
        'type',
        'comment_id',
        'from_user_id',
        'is_read',
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];

    /**
     * Notification received by this user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * User who triggered the notification (like / reply)
     */
    public function fromUser()
    {
        return $this->belongsTo(User::class, 'from_user_id');
    }

    /**
     * Comment associated with the notification
     */
    public function comment()
    {
        return $this->belongsTo(Comment::class);
    }

    /**
     * Helper: mark notification as read
     */
    public function markAsRead()
    {
        $this->update(['is_read' => true]);
    }

    /**
     * Helper: check if notification is read
     */
    public function isRead()
    {
        return $this->is_read === true;
    }

    /**
     * Helper: readable message (opsional)
     */
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
