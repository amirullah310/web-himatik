@component('mail::message')
# Halo {{ $user->name ?? 'Pengguna' }},

Terima kasih telah mendaftar di **{{ $app_name }}**!

Berikut adalah **kode verifikasi email** Anda:

@component('mail::panel')
## {{ $otp }}
@endcomponent

Kode ini berlaku selama **5 menit**.  
Masukkan kode tersebut di halaman verifikasi untuk mengaktifkan akun Anda.

Jika Anda tidak meminta kode ini, abaikan saja email ini.

Terima kasih,  
**Tim {{ $app_name }}**
@endcomponent
