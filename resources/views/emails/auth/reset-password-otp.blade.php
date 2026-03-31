<x-mail::message>
    {{-- Header --}}
    <x-slot:header>
        <div style="text-align: center;">
            <a href="{{ url('/') }}" style="text-decoration: none; color: inherit;">
                <span style="font-size: 26px; font-weight: bold; color: #A855F7; display: block; margin-top: 5px; letter-spacing: 1px;">
                    {{ $app_name }}
                </span>
            </a>
        </div>
    </x-slot:header>

# 🔐 Reset Password Akun Anda

Halo, **{{ is_object($user) ? $user->name : $user }}** 👋

Kami menerima permintaan untuk mereset password akun Anda.  
Berikut **kode OTP** untuk melanjutkan proses reset password:

<div style="text-align: center; font-size: 32px; font-weight: bold; margin: 16px 0; letter-spacing: 6px;">
    {{ $otp }}
</div>

🕒 **Catatan:**  
Kode OTP ini akan **kedaluwarsa setelah beberapa menit** atau saat Anda menutup sesi browser.

Jika Anda **tidak meminta reset password**, abaikan email ini dengan aman — tidak ada tindakan lebih lanjut yang diperlukan.

Terima kasih telah menjadi bagian dari komunitas kami 💜

Salam hangat,  
**Tim {{ $app_name }}**

    {{-- Footer --}}
    <x-slot:footer>
        <x-mail::footer>
            <div style="text-align: center; color: #9CA3AF;">
                © {{ date('Y') }} {{ $app_name }}. Semua hak dilindungi.
            </div>
        </x-mail::footer>
    </x-slot:footer>
</x-mail::message>
