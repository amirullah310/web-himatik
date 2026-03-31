// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState, FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        otp: '',
    });

    const [message, setMessage] = useState<string | null>(status || null);

    const submitEmail: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'), {
            onSuccess: () => {
                setStep('otp');
                setMessage('OTP telah dikirim ke email Anda. Silakan periksa inbox atau spam.');
            },
        });
    };

    const submitOtp: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.verifyOtp'), {
            onSuccess: () => {
                setMessage('OTP benar. Mengarahkan ke halaman reset password...');
                // redirect otomatis ke halaman reset password
                window.location.href = route('password.resetForm', { email: data.email });
            },
        });
    };

    return (
        <AuthLayout
            title={step === 'email' ? 'Forgot password' : 'Verify OTP'}
            description={
                step === 'email'
                    ? 'Enter your email to receive a password reset code'
                    : 'Enter the OTP sent to your email to continue'
            }
        >
            <Head title="Forgot password" />

            {message && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {message}
                </div>
            )}

            {step === 'email' ? (
                <form className="flex flex-col gap-6" onSubmit={submitEmail}>
                    {/* Email input */}
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-black">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Enter your Email"
                        />
                        <InputError message={errors.email} />
                    </div>

                    {/* Submit button */}
                    <Button
                        className="w-full font-bold bg-[#A78BFA] text-black hover:bg-[#8B5CF6]"
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Kirim OTP ke Email
                    </Button>

                    {/* Back to login */}
                    <div className="mt-4 text-center text-sm">
                        <span className="text-black">Or, return to </span>
                        <TextLink
                            href={route('login')}
                            className="font-bold text-[#A78BFA]"
                        >
                            log in
                        </TextLink>
                    </div>
                </form>
            ) : (
                <form className="flex flex-col gap-6" onSubmit={submitOtp}>
                    {/* OTP input */}
                    <div className="grid gap-2">
                        <Label htmlFor="otp" className="text-black">
                            Kode OTP
                        </Label>
                        <Input
                            id="otp"
                            type="text"
                            name="otp"
                            maxLength={6}
                            value={data.otp}
                            onChange={(e) => setData('otp', e.target.value)}
                            placeholder="Masukkan kode OTP"
                        />
                        <InputError message={errors.otp} />
                    </div>

                    {/* Submit OTP */}
                    <Button
                        className="w-full font-bold bg-[#A78BFA] text-black hover:bg-[#8B5CF6]"
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Verifikasi OTP
                    </Button>

                    {/* Back to email */}
                    <div className="mt-4 text-center text-sm">
                        <button
                            type="button"
                            className="text-[#A78BFA] underline"
                            onClick={() => setStep('email')}
                        >
                            Kirim ulang ke email lain
                        </button>
                    </div>
                </form>
            )}
        </AuthLayout>
    );
}
