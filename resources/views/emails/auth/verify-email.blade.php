<x-mail::message>
    {{-- Header dengan logo dan nama aplikasi --}}
    <x-slot:header>
        <div style="text-align: center;">
            <a href="{{ url('/') }}" style="text-decoration: none; color: inherit;">
                <span style="font-size: 26px; font-weight: bold; color: #A855F7; display: block; margin-top: 5px; letter-spacing: 1px;">
                    HIMATIK PNL
                </span>
            </a>
        </div>
    </x-slot:header>

# Selamat Datang di Himatik PNL 🎉

Halo, **{{ $user->name }}**! 👋

Terima kasih telah mendaftar di **Himatik PNL**.  
Kami sangat senang Anda bergabung dengan komunitas kami yang penuh semangat di bidang teknologi dan informatika! 💻✨

{{-- Jika pakai OTP --}}
@if (isset($otp))
Untuk menyelesaikan pendaftaran Anda, silakan gunakan **kode verifikasi** berikut:

<div style="text-align:center; margin:20px 0;">
    <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #A855F7;">
        {{ $otp }}
    </span>
</div>

Kode ini berlaku selama **5 menit**.  
Masukkan kode tersebut pada halaman verifikasi email untuk mengaktifkan akun Anda.
@else
{{-- Jika masih pakai link (opsional fallback) --}}
Untuk menyelesaikan pendaftaran Anda dan mulai menikmati seluruh fitur eksklusif, silakan klik tombol di bawah ini untuk **memverifikasi alamat email Anda**:

<x-mail::button :url="$url" color="purple">
Verifikasi Email Saya
</x-mail::button>
@endif

Jika Anda merasa tidak melakukan pendaftaran ini, atau menerima email ini secara tidak sengaja, Anda tidak perlu melakukan tindakan apa pun.  
Cukup abaikan email ini dengan aman.

Salam hangat,  
**Tim Himatik PNL** 💜

{{-- Footer --}}
<x-slot:footer>
    <x-mail::footer>
        <div style="text-align: center; color: #9CA3AF;">
            © {{ date('Y') }} {{ config('app.name') }}. Semua hak dilindungi.
        </div>
    </x-mail::footer>
</x-slot:footer>
</x-mail::message>
