<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\CustomResetPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;
use App\Models\User;

class ForgotPasswordController extends Controller
{
    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return back()->withErrors(['email' => 'Email tidak ditemukan.']);
        }

        // 🔢 Generate OTP
        $otp = rand(100000, 999999);

        // ⏳ Simpan OTP di cache 10 menit
        Cache::put('reset_otp_' . $user->email, $otp, now()->addMinutes(10));

        // 📧 Kirim email OTP
        Mail::to($user->email)->send(new CustomResetPassword($user, null, $otp));

        return back()->with('status', 'Kami telah mengirimkan kode OTP ke email Anda.');
    }
}
