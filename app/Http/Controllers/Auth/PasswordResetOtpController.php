<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\CustomResetPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Carbon\Carbon;

class PasswordResetOtpController extends Controller
{
    // 1️⃣ Form permintaan reset
    public function requestForm()
    {
        return inertia('Auth/ForgotPasswordOtp');
    }

    // 2️⃣ Kirim OTP ke email
    public function sendOtp(Request $request)
    {
        $request->validate(['email' => 'required|email|exists:users,email']);
        $user = User::where('email', $request->email)->first();

        $otp = rand(100000, 999999);
        Cache::put('reset_otp_' . $user->id, $otp, Carbon::now()->addMinutes(10));

        Mail::to($user->email)->send(new CustomResetPassword($user, $otp));

        return back()->with('status', 'Kode OTP telah dikirim ke email Anda.');
    }

    // 3️⃣ Form verifikasi OTP + password baru
    public function verifyForm()
    {
        return inertia('Auth/ResetPasswordOtp');
    }

    // 4️⃣ Proses verifikasi OTP dan ubah password
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|digits:6',
            'password' => 'required|min:8|confirmed',
        ]);

        $user = User::where('email', $request->email)->first();
        $cachedOtp = Cache::get('reset_otp_' . $user->id);

        if (!$cachedOtp || $cachedOtp != $request->otp) {
            return back()->withErrors(['otp' => 'Kode OTP salah atau sudah kedaluwarsa.']);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        Cache::forget('reset_otp_' . $user->id);

        return redirect()->route('login')->with('status', 'Password berhasil diubah!');
    }
}
