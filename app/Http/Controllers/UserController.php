<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifikasiEmailBaru;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    // Contoh method index
    public function index()
    {
        try {
            $message = $this->userService->sayHello("Rizki Latiful");
            return $message;
        } catch (\Exception $e) {
            return response()->json(['message' => 'Terjadi kesalahan'], 500);
        }
    }

    // 1️⃣ Kirim kode verifikasi email & simpan password sementara
    public function sendVerificationCode(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'email' => 'nullable|email|unique:users,email',
            'currentPassword' => 'nullable|string',
            'newPassword' => 'nullable|string|min:6',
        ]);

        // update password sementara
        if ($request->newPassword) {
            if (!Hash::check($request->currentPassword, $user->password)) {
                return response()->json(['message' => 'Password saat ini salah'], 422);
            }
            $user->new_password = bcrypt($request->newPassword);
        }

        // kirim kode verifikasi untuk email baru
        if ($request->email) {
            $code = rand(100000, 999999);
            $user->verification_code = $code;
            $user->new_email = $request->email;
            $user->save();

            Mail::to($request->email)->send(new VerifikasiEmailBaru($user, $code));
        }

        return response()->json(['message' => 'Kode verifikasi dikirim ke email.']);
    }

    // 2️⃣ Verifikasi kode & update email/password
    public function verifyEmailPassword(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'code' => 'required',
            'email' => 'nullable|email',
            'newPassword' => 'nullable|string|min:6',
        ]);

        if ($request->code != $user->verification_code) {
            return response()->json(['message' => 'Kode salah'], 422);
        }

        if ($request->email) {
            $user->email = $user->new_email;
        }

        if ($request->newPassword) {
            $user->password = $user->new_password;
        }

        // reset sementara
        $user->verification_code = null;
        $user->new_password = null;
        $user->new_email = null;

        $user->save();

        return response()->json(['message' => 'Email dan/atau password berhasil diperbarui!']);
    }
}
