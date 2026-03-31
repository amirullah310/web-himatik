<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class NewPasswordController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed', 'min:8'],
        ]);

        // Cari user berdasarkan email
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => 'Email tidak ditemukan dalam sistem kami.',
            ]);
        }

        // Update password user
        $user->update([
            'password' => Hash::make($request->password),
        ]);

        // Hapus session OTP (biar gak bisa dipakai ulang)
        session()->forget('reset_otp_' . $request->email);

        // Redirect ke halaman login
        return redirect()->route('login')->with('status', '✅ Password Anda berhasil direset. Silakan login kembali.');
    }
}
