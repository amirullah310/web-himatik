<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Mail;
use App\Mail\CustomResetPassword;
use App\Models\User;

class PasswordResetLinkController extends Controller
{
    /**
     * Show the password reset form.
     */
    public function create(Request $request)
    {
        return inertia('auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle sending reset link or OTP.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return back()->withErrors(['email' => 'Email tidak ditemukan dalam sistem kami.']);
        }

        // ✅ Generate token seperti biasa
        $token = Password::createToken($user);

        // ✅ Generate OTP 6 digit tanpa menyimpannya di DB
        $otp = random_int(100000, 999999);

        // ✅ Simpan OTP di session sementara (kadaluarsa otomatis setelah login atau timeout session)
        session(['reset_otp_' . $user->email => $otp]);

        // ✅ Kirim email pakai Mailable kustom
        Mail::to($user->email)->send(new CustomResetPassword($token, $user, $otp));

        return back()->with('status', '📩 Kode OTP telah dikirim ke email Anda.');
    }
}
