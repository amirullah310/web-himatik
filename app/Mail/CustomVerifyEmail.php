<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CustomVerifyEmail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $user; // Data user
    public $otpCode; // Kode OTP 6 digit

    /**
     * Create a new message instance.
     */
    public function __construct($user, $otpCode)
    {
        $this->user = $user;
        $this->otpCode = $otpCode;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Kode Verifikasi Email Anda', // Subjek email
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.auth.verify-otp', // Blade template email OTP
            with: [
                'otp' => $this->otpCode,
                'user' => $this->user,
                'app_name' => config('app.name', 'HIMATIK'),
            ],
        );
    }
}
