// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        otp: '',
    });

    const [message, setMessage] = useState<string | null>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setMessage(null);

        post(route('verification.verify-otp'), {
            onSuccess: () => setMessage('✅ Verifikasi berhasil! Anda akan segera dialihkan.'),
            onError: () => setMessage('❌ Kode OTP salah atau sudah kedaluwarsa.'),
        });
    };

    const resendOtp = () => {
        post(route('verification.send'), {
            onSuccess: () => setMessage('📩 Kode OTP baru telah dikirim ke email Anda.'),
        });
    };

    return (
        <AuthLayout
            title="Verifikasi Email"
            description="Masukkan kode OTP yang telah kami kirim ke email Anda untuk memverifikasi akun."
        >
            <Head title="Verifikasi Email" />

            {message && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {message}
                </div>
            )}

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    Kode OTP baru telah dikirim ke email Anda.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center">
                {/* Input OTP */}
                <div className="flex justify-center gap-2">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <input
                            key={i}
                            type="text"
                            maxLength={1}
                            className="w-10 h-10 text-center border rounded-lg text-lg font-semibold focus:ring-2 focus:ring-purple-500"
                            value={data.otp[i] || ''}
                            onChange={(e) => {
                                const newOtp =
                                    data.otp.substring(0, i) + e.target.value.replace(/\D/, '') + data.otp.substring(i + 1);
                                setData('otp', newOtp);
                            }}
                        />
                    ))}
                </div>
                {errors.otp && <div className="text-red-500 text-sm mt-2">{errors.otp}</div>}

                {/* Tombol kirim OTP */}
                <Button
                    disabled={processing || data.otp.length < 6}
                    className="w-full bg-[#A78BFA] text-black hover:bg-[#8B5CF6] font-semibold"
                >
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                    Verifikasi OTP
                </Button>

                {/* Kirim ulang OTP */}
                <button
                    type="button"
                    onClick={resendOtp}
                    className="mt-2 block w-full text-sm text-purple-600 hover:underline"
                >
                    Kirim ulang kode OTP
                </button>

                {/* Logout */}
                <TextLink
                    href={route('logout')}
                    method="post"
                    className="mx-auto block text-sm font-medium text-black hover:underline mt-4"
                >
                    Log out
                </TextLink>
            </form>
        </AuthLayout>
    );
}
