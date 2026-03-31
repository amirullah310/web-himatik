<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Controllers
|--------------------------------------------------------------------------
*/

use App\Http\Controllers\{
    AboutPageController,
    AlbumController,
    ArticleAiController,
    ArticleController,
    BidangPageController,
    BlogPageController,
    CategoryArticleController,
    ContactController,
    DashboardController,
    DivisionController,
    DivisionPlansController,
    HomePageController,
    MediaController,
    MemberController,
    PeriodsController,
    ProfileController,
    PublicGalleryController,
    RoleController,
    PermissionController,
    RolePermissionController,
    StructureController,
    StructureMemberController,
    StrukturalPageController,
    UserController,
    VissionController,
    MissionController,
    ProfileUserController,
    CommentController,
    ArticleInteractionController
};

use App\Http\Controllers\Auth\{
    AuthenticatedSessionController,
    EmailVerificationOtpController,
    PasswordResetOtpController,
    VerifyOtpController,
    NewPasswordController
};

use App\Http\Controllers\ProfileUpdateController;
use App\Http\Controllers\ProfileUpdateOtpController;

/*
|--------------------------------------------------------------------------
| Halaman Publik
|--------------------------------------------------------------------------
*/

Route::middleware(['email.public.verified'])->group(function () {

    Route::get('/', [HomePageController::class, 'index'])->name('home');
    Route::get('/about', [AboutPageController::class, 'index'])->name('about');

    /* Bidang */

    Route::get('/departemen', [BidangPageController::class, 'index'])->name('bidang.index');
    Route::get('/departemen/{division}', [BidangPageController::class, 'show'])->name('bidang.show');

    /* Struktural */

    Route::get('/struktural', [StrukturalPageController::class, 'index'])->name('struktural.index');

    /* Berita */

    Route::get('/berita', [BlogPageController::class, 'index'])->name('blog.index');
    Route::get('/berita/{slug}', [BlogPageController::class, 'show'])->name('blog.show');

    Route::get('/berita/{slug}/download/{format}', [BlogPageController::class, 'download'])
        ->name('blog.download');

    /* Komentar */

    Route::post('/articles/{article}/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::post('/comments/{comment}/like', [CommentController::class, 'toggleLike'])->name('comments.like');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
    Route::post('/comments/{comment}/hide', [CommentController::class, 'hide'])->name('comments.hide');
    Route::post('/comments/{comment}/unhide', [CommentController::class, 'unhide'])->name('comments.unhide');

    /* Galeri */

    // Route::get('/dokumentasi', [PublicGalleryController::class, 'index'])->name('public.dokumentasi');

    // Route::get('/dokumentasi/albums/{album}', [PublicGalleryController::class, 'show'])
    //     ->name('public.dokumentasi.album.show');

    // Route::post('/download-media', [AlbumController::class, 'downloadMedia'])
    //     ->name('download.media');

    /* Kontak */

    Route::get('/kontak', fn () => Inertia::render('homepage/contact/index'))->name('contact');
    Route::post('/kontak', [ContactController::class, 'send'])->name('contact.send');
});

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

/*
|--------------------------------------------------------------------------
| Halaman Admin
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

    /* Dashboard */

    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard')
        ->middleware('permission:dashboard');

    /* Profile */

    Route::get('/profile', [ProfileUserController::class, 'index'])->name('profile.edit');
    Route::patch('/profile', [ProfileUserController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileUserController::class, 'destroy'])->name('profile.destroy');

    Route::post('/send-verification-code', [UserController::class, 'sendVerificationCode']);

    /* Roles & Permissions */

    Route::resource('roles', RoleController::class)->middleware('permission:roles');

    Route::post('roles/{role}/permissions', [RolePermissionController::class, 'updatePermissions'])
        ->name('roles.permissions.update')
        ->middleware('permission:roles');

    Route::post('/roles/{role}/invite-user', [RoleController::class, 'inviteUser'])
        ->name('roles.inviteUser')
        ->middleware('permission:roles');

    Route::post('/roles/{role}/remove-user', [RoleController::class, 'removeUser'])
        ->name('roles.removeUser')
        ->middleware('permission:roles');

    Route::resource('permissions', PermissionController::class)
        ->middleware('permission:permissions');

    /* Periods */

    Route::resource('periods', PeriodsController::class)
        ->middleware('permission:periods');

    Route::middleware('permission:periods')->group(function () {

        Route::post('/periods/{period}/vissions', [VissionController::class, 'store'])->name('vissions.store');
        Route::put('/vissions/{vission}', [VissionController::class, 'update'])->name('vissions.update');
        Route::delete('/vissions/{vission}', [VissionController::class, 'destroy'])->name('vissions.destroy');

        Route::post('/periods/{period}/missions', [MissionController::class, 'store'])->name('missions.store');
        Route::put('/missions/{mission}', [MissionController::class, 'update'])->name('missions.update');
        Route::delete('/missions/{mission}', [MissionController::class, 'destroy'])->name('missions.destroy');

    });

    /* Members */

    Route::post('/members/import', [MemberController::class, 'import'])->name('members.import');
    Route::get('/members/download-template/{type?}', [MemberController::class, 'downloadTemplate'])->name('members.download-template');
    Route::get('/members/export/{type}', [MemberController::class, 'export'])->name('members.export');

    Route::resource('members', MemberController::class)->middleware('permission:members');

    /* Divisions */

    Route::resource('divisions', DivisionController::class)->middleware('permission:divisions');
    Route::resource('division-plans', DivisionPlansController::class)->middleware('permission:division-plans');

    /* Gallery */

    // Route::resource('gallery-album', AlbumController::class)->middleware('permission:gallery-album');
    // Route::resource('gallery-media', MediaController::class)->middleware('permission:gallery-media');

    // Route::post('gallery-media/{id}/move', [MediaController::class, 'move'])
    //     ->name('gallery-media.move')
    //     ->middleware('permission:gallery-media');

    /* Articles */

    Route::resource('category-articles', CategoryArticleController::class)->middleware('permission:category-articles');
    Route::resource('articles', ArticleController::class)->middleware('permission:articles');

    Route::post('/articles/upload-image', [ArticleController::class, 'uploadImage'])
        ->name('articles.uploadImage')
        ->middleware('permission:articles');

    Route::post('/ai/generate-article', [ArticleAiController::class, 'generate'])
        ->name('ai.generate');

    /* Structures */

    Route::get('/structures/next-level', [StructureController::class, 'getNextLevel'])->middleware('permission:structures');
    Route::resource('structures', StructureController::class)->middleware('permission:structures');

    Route::post('/structures/reorder', [StructureController::class, 'reorder'])
        ->name('structures.reorder')
        ->middleware('permission:structures');

    /* Structure Members */

    Route::get('/structure-members', [StructureMemberController::class, 'index'])->name('structure-members.index');
    Route::post('/structure-members', [StructureMemberController::class, 'store'])->name('structure-members.store');
    Route::post('structure-members/{id}', [StructureMemberController::class, 'update']);
    Route::get('/structure-members/{id}', [StructureMemberController::class, 'show']);
    Route::delete('/structure-members/{id}', [StructureMemberController::class, 'destroy'])
        ->name('structure-members.destroy');
});

/*
|--------------------------------------------------------------------------
| Email Verification (OTP)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {

    Route::get('/email/verify', [EmailVerificationOtpController::class, 'show'])
        ->name('verification.notice');

    Route::post('/email/send-otp', [EmailVerificationOtpController::class, 'sendOtp'])
        ->name('verification.send');

    Route::post('/email/verify-otp', [EmailVerificationOtpController::class, 'verifyOtp'])
        ->name('verification.verify');
});

/*
|--------------------------------------------------------------------------
| Reset Password OTP
|--------------------------------------------------------------------------
*/

Route::controller(PasswordResetOtpController::class)->group(function () {

    Route::get('/forgot-password', 'requestForm')->name('password.request');
    Route::post('/forgot-password', 'sendOtp')->name('password.email');

    Route::get('/reset-password', 'verifyForm')->name('password.reset.form');
    Route::post('/reset-password', 'verifyOtp')->name('password.reset.otp');
});

Route::post('/forgot-password/verify-otp', [VerifyOtpController::class, 'verify'])
    ->name('password.verifyOtp');

Route::get('/reset-password/form', [VerifyOtpController::class, 'showResetForm'])
    ->name('password.resetForm');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
    ->name('password.store');

/*
|--------------------------------------------------------------------------
| Profile Update OTP
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {

    Route::post('/profile/send-otp', [ProfileUpdateController::class, 'sendOtp']);
    Route::post('/profile/verify-otp', [ProfileUpdateController::class, 'verifyOtp']);

    Route::post('/profile/send-update-otp', [ProfileUpdateOtpController::class, 'sendUpdateOtp']);
    Route::post('/profile/verify-update-otp', [ProfileUpdateOtpController::class, 'verifyUpdateOtp']);
});

/*
|--------------------------------------------------------------------------
| Article Interaction
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {

    Route::post('/article/{id}/like', [ArticleInteractionController::class, 'like'])->name('article.like');
    Route::post('/article/{id}/unlike', [ArticleInteractionController::class, 'unlike'])->name('article.unlike');

    Route::post('/article/{id}/save', [ArticleInteractionController::class, 'save'])->name('article.save');
    Route::post('/article/{id}/unsave', [ArticleInteractionController::class, 'unsave'])->name('article.unsave');
});

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/

require __DIR__.'/auth.php';

/*
|--------------------------------------------------------------------------
| Fallback
|--------------------------------------------------------------------------
*/

Route::fallback(fn () => Inertia::render('not-found'));