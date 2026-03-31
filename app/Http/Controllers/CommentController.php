<?php

namespace App\Http\Controllers;

use App\Models\BlogArticle;
use App\Models\Comment;
use App\Models\CommentLike;
use App\Models\CustomNotification; // MODEL BARU — penting!
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Simpan komentar baru
     */
    public function store(Request $request, BlogArticle $article)
    {
        $request->validate([
            'comment' => 'required|string|max:2000',
            'parent_id' => 'nullable|exists:comments,id'
        ]);

        // Simpan komentar baru
        $newComment = $article->comments()->create([
            'comment'   => $request->comment,
            'user_id'   => Auth::id(),
            'parent_id' => $request->parent_id,
        ]);

        /**
         * === NOTIFIKASI REPLY ===
         */
        if ($newComment->parent_id) {
            $parent = Comment::find($newComment->parent_id);

            if ($parent && $parent->user_id !== Auth::id()) {
                CustomNotification::create([
                    'user_id'      => $parent->user_id,
                    'from_user_id' => Auth::id(),
                    'type'         => 'comment_replied',
                    'comment_id'   => $parent->id,
                ]);
            }
        }

        return back()->with('success', 'Komentar berhasil ditambahkan.');
    }

    /**
     * Like / Unlike komentar
     */
    public function toggleLike(Comment $comment)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->back()->with('error', 'Silakan login terlebih dahulu.');
        }

        // cek apakah user sudah like
        $existing = CommentLike::where('comment_id', $comment->id)
            ->where('user_id', $user->id)
            ->first();

        if ($existing) {
            // UNLIKE
            $existing->delete();
        } else {
            // LIKE
            CommentLike::create([
                'comment_id' => $comment->id,
                'user_id'    => $user->id
            ]);

            /**
             * === NOTIFIKASI LIKE ===
             * Pastikan:
             * - Tidak kirim notif ke diri sendiri
             * - Tidak spam notif (cek sudah ada)
             */
            if ($comment->user_id !== $user->id) {

                $already = CustomNotification::where([
                    ['user_id', $comment->user_id],
                    ['from_user_id', $user->id],
                    ['comment_id', $comment->id],
                    ['type', 'comment_liked'],
                ])->exists();

                if (!$already) {
                    CustomNotification::create([
                        'user_id'      => $comment->user_id,
                        'from_user_id' => $user->id,
                        'type'         => 'comment_liked',
                        'comment_id'   => $comment->id,
                    ]);
                }
            }
        }

        return back();
    }

    /**
     * Hapus komentar
     */
    public function destroy(Comment $comment)
    {
        $user = Auth::user();

        if ($user->id !== $comment->user_id && !$user->is_admin) {
            abort(403);
        }

        $comment->delete();

        return back()->with('success', 'Komentar dihapus.');
    }

    /**
     * Admin menyembunyikan komentar
     */
    public function hide(Comment $comment)
    {
        if (!Auth::user()?->is_admin) {
            abort(403);
        }

        $comment->update(['is_hidden' => true]);

        return back()->with('success', 'Komentar disembunyikan.');
    }

    /**
     * Admin menampilkan komentar
     */
    public function unhide(Comment $comment)
    {
        if (!Auth::user()?->is_admin) {
            abort(403);
        }

        $comment->update(['is_hidden' => false]);

        return back()->with('success', 'Komentar ditampilkan.');
    }
}
