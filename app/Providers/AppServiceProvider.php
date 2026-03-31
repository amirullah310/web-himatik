<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;
use App\Mail\CustomResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use App\Mail\CustomVerifyEmail;
use Inertia\Inertia;
use App\Services\BlogArticleService;

use App\Models\CustomNotification; // MODEL BARU
use Illuminate\Support\Facades\Auth;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Kustomisasi email verifikasi
        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            return new CustomVerifyEmail($notifiable);
        });

        // Kustomisasi email reset password
        ResetPassword::toMailUsing(function ($notifiable, $token) {
            return new CustomResetPassword($token, $notifiable);
        });


        // 🔹 Share berita terbaru ke semua halaman Inertia
        Inertia::share('latestArticles', function () {
            return app(BlogArticleService::class)->getLatestRecommendedArticles(5);
        });


        // 🔔 Share NOTIFIKASI CUSTOM ke semua halaman Inertia
        Inertia::share('notifications', function () {

            if (!Auth::check()) {
                return [];
            }

            return CustomNotification::with('fromUser')
                ->where('user_id', Auth::id())
                ->orderBy('created_at', 'desc')
                ->limit(10)
                ->get()
                ->map(function ($notif) {
                    return [
                        'id'       => $notif->id,
                        'type'     => $notif->type,
                        'message'  => $notif->message,    // pakai accessor di model
                        'is_read'  => $notif->is_read,
                        'from'     => $notif->fromUser ? $notif->fromUser->name : null,
                        'created'  => $notif->created_at->diffForHumans(),
                    ];
                });
        });
    }
}
