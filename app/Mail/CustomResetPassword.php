<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CustomResetPassword extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $token;
    public $user;
    public $otp; // ✅ Tambahkan OTP

    /**
     * Create a new message instance.
     */
    public function __construct($token, $user, $otp = null)
    {
        $this->token = $token;
        $this->user = $user;
        $this->otp = $otp;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            to: is_object($this->user) ? $this->user->email : $this->user,
            subject: 'Reset Password HIMATIK',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        // Jika OTP tersedia → kirim email versi OTP
        if ($this->otp) {
            return new Content(
                markdown: 'emails.auth.reset-password-otp',
                with: [
                    'user' => $this->user,
                    'otp' => $this->otp,
                    'app_name' => 'HIMATIK',
                ],
            );
        }

        // Default → kirim email versi token link
        return new Content(
            markdown: 'emails.auth.reset-password',
            with: [
                'token' => $this->token,
                'user' => $this->user,
                'app_name' => 'HIMATIK',
            ],
        );
    }

    /**
     * Get attachments for the message.
     */
    public function attachments(): array
    {
        return [];
    }
}
