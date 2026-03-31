<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;
use Illuminate\Auth\Events\Verified;
use App\Mail\CustomVerifyEmail;

class EmailVerificationOtpController extends Controller
{
    // Tampilkan halaman input OTP
    public function show(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->route('dashboard');
        }

        return inertia('Auth/VerifyEmailOtp', [
            'status' => session('status'),
        ]);
    }

    // Kirim kode OTP ke email user
    public function sendOtp(Request $request)
    {
        $user = $request->user();
        $otp = rand(100000, 999999);

        // Simpan OTP sementara 5 menit
        Cache::put('email_otp_'.$user->id, $otp, now()->addMinutes(5));

        // Kirim OTP via email
        Mail::to($user->email)->queue(new CustomVerifyEmail($user, $otp));

        return back()->with('status', 'otp-sent');
    }

    // Verifikasi OTP yang dimasukkan user
    public function verifyOtp(Request $request)
    {
        $request->validate(['otp' => 'required|digits:6']);
        $user = $request->user();
        $cachedOtp = Cache::get('email_otp_'.$user->id);

        if ($cachedOtp && $cachedOtp == $request->otp) {
            $user->markEmailAsVerified();
            Cache::forget('email_otp_'.$user->id);
            event(new Verified($user));
            return redirect()->route('dashboard')->with('status', 'verified');
        }

        return back()->withErrors(['otp' => 'Kode OTP salah atau sudah kedaluwarsa.']);
    }
}
