<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Role;
use App\Mail\CustomVerifyEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'email',
        'username',
        'password',
        'picture',
        'bio',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Bersihkan format nama sebelum disimpan
     */
    public function setNameAttribute($value)
    {
        // Hilangkan spasi berlebih dan ubah ke lowercase
        $cleanName = strtolower(trim(preg_replace('/\s+/', ' ', $value)));
        $this->attributes['name'] = $cleanName;
    }

    /**
     * Kirim notifikasi verifikasi email menggunakan OTP
     */
    public function sendEmailVerificationNotification()
    {
        // Buat kode OTP 6 digit
        $otp = rand(100000, 999999);

        // Simpan OTP ke cache (kadaluarsa dalam 10 menit)
        Cache::put('email_otp_' . $this->id, $otp, now()->addMinutes(10));

        // Kirim email OTP ke user
        Mail::to($this->email)->send(new CustomVerifyEmail($this, $otp));
    }

    /**
     * Relasi ke tabel roles
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }
public function likes()
{
    return $this->belongsToMany(
        \App\Models\BlogArticle::class,
        'article_likes',
        'user_id',    // foreign key di pivot
        'article_id'  // related key di pivot
    )->withTimestamps();
}

public function savedArticles()
{
    return $this->belongsToMany(
        \App\Models\BlogArticle::class,
        'article_saves',
        'user_id',    // foreign key di pivot
        'article_id'  // related key di pivot
    )->withTimestamps();
}




}
