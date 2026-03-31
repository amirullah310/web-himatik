<?php

namespace App\Http\Controllers;

use App\Mail\CustomProfileOtp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class ProfileUpdateOtpController extends Controller
{
    /**
     * Kirim OTP untuk update email / password
     */
    public function sendUpdateOtp(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'email' => 'nullable|email',
            'current_password' => 'nullable|string',
            'new_password' => 'nullable|string|min:8',
        ]);

        // Validasi password lama jika ingin ubah password
        if ($request->new_password && !Hash::check($request->current_password, $user->password)) {
            return response()->json(['success' => false, 'message' => 'Password saat ini salah.']);
        }

        // Buat OTP acak
        $otp = (string) random_int(100000, 999999);

        // Simpan ke session dengan waktu kedaluwarsa (5 menit)
        session([
            'update_otp_' . $user->id => [
                'code' => $otp,
                'expires_at' => now()->addMinutes(5),
                'email' => $request->email,
                'new_password' => $request->new_password,
            ]
        ]);

        // Kirim email OTP
        Mail::to($user->email)->send(new CustomProfileOtp($user, $otp));

        return response()->json([
            'success' => true,
            'message' => 'Kode OTP telah dikirim ke email Anda. Berlaku selama 5 menit.',
        ]);
    }

    /**
     * Verifikasi OTP dan update email/password
     */
    public function verifyUpdateOtp(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'otp' => 'required|string|size:6',
        ]);

        $otpData = session('update_otp_' . $user->id);

        // Validasi OTP
        if (!$otpData) {
            return response()->json(['success' => false, 'message' => 'OTP tidak ditemukan atau sudah kedaluwarsa.']);
        }

        if (now()->greaterThan($otpData['expires_at'])) {
            session()->forget('update_otp_' . $user->id);
            return response()->json(['success' => false, 'message' => 'Kode OTP sudah kedaluwarsa.']);
        }

        if ($otpData['code'] !== $request->otp) {
            return response()->json(['success' => false, 'message' => 'Kode OTP salah.']);
        }

        // Update data
        if (!empty($otpData['email'])) {
            $user->email = $otpData['email'];
        }

        if (!empty($otpData['new_password'])) {
            $user->password = Hash::make($otpData['new_password']);
        }

        $user->save();

        // Hapus OTP setelah digunakan
        session()->forget('update_otp_' . $user->id);

        return response()->json(['success' => true, 'message' => 'Email/Password berhasil diperbarui.']);
    }
}
