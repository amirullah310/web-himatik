@component('mail::message')
# 🔐 Verifikasi Perubahan Akun Anda

Halo, **{{ $user->name }}** 👋  

Berikut kode OTP Anda untuk melakukan perubahan pada akun (email atau password):

<div style="text-align:center; font-size:28px; font-weight:bold; margin:20px 0;">
    {{ $otp }}
</div>

Kode ini akan kedaluwarsa setelah beberapa menit dan hanya dapat digunakan sekali.  
Jika Anda tidak merasa melakukan perubahan ini, abaikan email ini.

Terima kasih,  
**Tim HIMATIK**
@endcomponent
