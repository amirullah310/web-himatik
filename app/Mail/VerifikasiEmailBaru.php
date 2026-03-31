<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerifikasiEmailBaru extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $verificationCode;

    public function __construct($user, $verificationCode)
    {
        $this->user = $user;
        $this->verificationCode = $verificationCode;
    }

    public function build()
    {
        return $this->markdown('emails.ganti-email')
                    ->subject('Verifikasi Email Baru')
                    ->with([
                        'user' => $this->user,
                        'verificationCode' => $this->verificationCode,
                    ]);
    }
}
