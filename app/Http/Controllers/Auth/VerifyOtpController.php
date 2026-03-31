<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;

class VerifyOtpController extends Controller
{
public function verify(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'otp' => 'required|string|size:6',
    ]);
$validOtp = session('reset_otp_' . $request->email);

if ($validOtp && $validOtp == $request->otp) {
    session()->forget('reset_otp_' . $request->email);
    return redirect()->route('password.resetForm', ['email' => $request->email]);
}


    return back()->withErrors([
        'otp' => 'Kode OTP salah atau sudah kedaluwarsa.',
    ]);
}


    public function showResetForm(Request $request)
    {
        return Inertia::render('auth/reset-password', [
            'email' => $request->email,
        ]);
    }
}
