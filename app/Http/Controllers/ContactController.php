<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        // VALIDASI: tambahkan phone agar sesuai dengan form
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'phone'   => 'required|string|max:50',
            'email'   => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        try {
            $recipientEmail = env('MAIL_TO_ADDRESS');

            if (!$recipientEmail) {
                Log::error('MAIL_TO_ADDRESS belum diatur di .env');
                throw new \Exception('Email penerima tidak ditemukan.');
            }

            // Kirim email
            Mail::to($recipientEmail)->send(new ContactFormMail($validated));

            return back()->with('success', 'Pesan Anda telah berhasil terkirim!');

        } catch (\Exception $e) {
            Log::error('Gagal mengirim email kontak: ' . $e->getMessage());
            return back()->with('error', 'Gagal mengirim pesan. Silakan coba lagi nanti.');
        }
    }
}
