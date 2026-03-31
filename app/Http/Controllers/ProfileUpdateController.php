<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\CustomResetPassword;

class ProfileUpdateController extends Controller
{
    public function sendOtp(Request $request)
    {
        $user = Auth::user();

        // Validasi input
        $request->validate([
            'email' => 'nullable|email',
            'current_password' => 'nullable|string',
            'new_password' => 'nullable|string|min:8',
        ]);

        // Jika ubah password, pastikan current password benar
        if ($request->new_password && !Hash::check($request->current_password, $user->password)) {
            return response()->json(['success' => false, 'message' => 'Password saat ini salah.']);
        }

        // Buat OTP baru
        $otp = random_int(100000, 999999);
        session(['update_otp_' . $user->email => $otp]);

        // Kirim OTP ke email user
        Mail::to($user->email)->send(new CustomResetPassword(null, $user, $otp));

        return response()->json(['success' => true]);
    }

    public function verifyOtp(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'otp' => 'required|string|size:6',
        ]);

        $storedOtp = session('update_otp_' . $user->email);

        if (!$storedOtp || $storedOtp !== $request->otp) {
            return response()->json(['success' => false]);
        }

        // Hapus OTP agar tidak bisa dipakai ulang
        session()->forget('update_otp_' . $user->email);

        // Lakukan update
        if ($request->email) {
            $user->email = $request->email;
        }

        if ($request->new_password) {
            $user->password = Hash::make($request->new_password);
        }

        $user->save();

        return response()->json(['success' => true]);
    }
}
