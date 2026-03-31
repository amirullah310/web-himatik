<x-mail::message>
<x-slot:header>
    <div style="text-align: center;">
        <a href="{{ url('/') }}" style="text-decoration: none; color: inherit;">
            <span style="font-size: 26px; font-weight: bold; color: #A855F7;">
                HIMATIK
            </span>
        </a>
    </div>
</x-slot:header>

# 🔐 Reset Password Akun Anda

Halo, **{{ $user->name }}** 👋

Kami menerima permintaan untuk mereset password akun Anda.  
Berikut **kode OTP** untuk melanjutkan proses reset password:

<div style="text-align: center; font-size: 32px; font-weight: bold; margin: 16px 0; letter-spacing: 6px;">
    {{ $otp }}
</div>

Kode ini berlaku selama **10 menit**.  
Silakan masukkan kode tersebut di halaman reset password.

Jika Anda tidak merasa meminta reset password, abaikan email ini.

Salam hangat,  
**Tim {{ $app_name }} 💜**

<x-slot:footer>
    <x-mail::footer>
        <div style="text-align: center; color: #9CA3AF;">
            © {{ date('Y') }} {{ $app_name }}. Semua hak dilindungi.
        </div>
    </x-mail::footer>
</x-slot:footer>
</x-mail::message>
