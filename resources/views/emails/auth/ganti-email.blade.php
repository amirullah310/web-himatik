<x-mail::message>
# Verifikasi Email Baru

Halo, **{{ $user->name }}** 👋

Anda mencoba mengubah email akun Anda menjadi **{{ $user->new_email }}**.  
Masukkan kode berikut di aplikasi untuk memverifikasi email baru Anda:

<x-mail::panel>
**Kode Verifikasi:** {{ $verificationCode }}
</x-mail::panel>

Jika Anda tidak melakukan perubahan ini, abaikan email ini.

Terima kasih,  
**Tim HIMATIK PNL**
</x-mail::message>
