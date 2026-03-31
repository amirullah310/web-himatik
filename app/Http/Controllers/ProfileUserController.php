<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Models\User;
use App\Models\Member;
use Carbon\Carbon;

class ProfileUserController extends Controller
{
    /**
     * Menampilkan halaman profil user.
     */
    public function index()
    {
        $user = auth()->user();

        // Ambil data member (untuk ucapan ulang tahun)
        $member = Member::where('email', $user->email)->first();
        $isBirthday = false;
        $memberName = $user->name;

        if ($member && $member->birth_date_at) {
            $memberBirthDate = Carbon::parse($member->birth_date_at);
            if ($memberBirthDate->format('m-d') === Carbon::now()->format('m-d')) {
                $isBirthday = true;
            }
            $memberName = $member->name;
        }

        // Ambil artikel yang disukai & disimpan
        $likedArticles = $user->likes() // ✅ ganti dari likedArticles() ke likes()
            ->with(['categories:id,name', 'author:id,name,picture'])
            ->get();

        $savedArticles = $user->savedArticles()
            ->with(['categories:id,name', 'author:id,name,picture'])
            ->get();

        return Inertia::render('homepage/profile-user/index', [
            'user' => $user->only('id', 'name', 'email', 'picture', 'bio', 'created_at', 'updated_at'),
            'isBirthday' => $isBirthday,
            'memberName' => $memberName,
            'likedArticles' => $likedArticles,
            'savedArticles' => $savedArticles,
        ]);
    }

    /**
     * Memperbarui informasi profil user.
     */
    public function update(Request $request)
    {
        $user = auth()->user();

        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'picture' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:2048'],
        ]);

        // Upload gambar jika ada
        if ($request->hasFile('picture')) {
            if ($user->picture) {
                Storage::disk('public')->delete($user->picture);
            }
            $user->picture = $request->file('picture')->store('profile-pictures', 'public');
        }

        $user->update([
            'name' => $validatedData['name'],
            'bio' => $validatedData['bio'] ?? null,
        ]);

        return Redirect::back()->with('success', 'Profil berhasil diperbarui.');
    }

    /**
     * Menghapus akun user.
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
