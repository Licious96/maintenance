<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ForgotPassword extends Mailable
{
    use Queueable, SerializesModels;

    public $mail;

    public function __construct($mail)
    {
        $this->mail = $mail;
    }

    public function build()
    {
        return $this->view('test');
    }
}
