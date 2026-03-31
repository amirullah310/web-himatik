<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CustomProfileOtp extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $otp;

    public function __construct($user, $otp)
    {
        $this->user = $user;
        $this->otp = $otp;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            to: $this->user->email,
            subject: 'Kode OTP Verifikasi Perubahan Akun - HIMATIK',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.auth.update-profile-otp',
            with: [
                'user' => $this->user,
                'otp' => $this->otp,
            ]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
