import { Head, useForm } from '@inertiajs/react';
import { EyeIcon, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { EyeSlashIcon } from '@heroicons/react/24/outline';

import Swal from 'sweetalert2';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } =
        useForm<Required<RegisterForm>>({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Password Validation
    const validatePassword = (password: string) => {
        const hasMinLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[^A-Za-z0-9]/.test(password);

        return {
            valid: hasMinLength && hasUpper && hasLower && hasNumber && hasSymbol,
            hasMinLength,
            hasUpper,
            hasLower,
            hasNumber,
            hasSymbol,
        };
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const check = validatePassword(data.password);
        if (!check.valid) {
            Swal.fire({
                icon: 'error',
                title: 'Password kurang aman!',
                html: `
                    <div style="text-align: left; font-size: 14px; line-height: 1.5;">
                        <b>Password harus memenuhi semua aturan berikut:</b><br>
                        ${check.hasMinLength ? '✅' : '❌'} Minimal 8 karakter <br>
                        ${check.hasUpper ? '✅' : '❌'} Huruf besar (A-Z) <br>
                        ${check.hasLower ? '✅' : '❌'} Huruf kecil (a-z) <br>
                        ${check.hasNumber ? '✅' : '❌'} Angka (0-9) <br>
                        ${check.hasSymbol ? '✅' : '❌'} Simbol (!@#$%^&*)
                    </div>
                `,
                confirmButtonText: 'Oke, aku perbaiki',
                confirmButtonColor: '#A78BFA',
            });
            return;
        }

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const check = validatePassword(data.password);

    return (
        <AuthLayout
            title="Sign up to HIMATIK"
            description="Welcome to HIMATIK, let's join with us."
        >
            <Head title="Register Page" />

            {/* FORM WRAPPER — lebih compact */}
            <form className="flex flex-col gap-4" onSubmit={submit}>
                <div className="grid gap-4">

                    {/* Name */}
                    <div className="grid gap-1.5">
                        <Label htmlFor="name" className="text-black">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Enter your Name"
                        />
                        <InputError message={errors.name} className="mt-1" />
                    </div>

                    {/* Email */}
                    <div className="grid gap-1.5">
                        <Label htmlFor="email" className="text-black">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="Enter your Email"
                        />
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    {/* Password */}
                    <div className="grid gap-1.5">
                        <Label htmlFor="password" className="text-black">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••••••"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                                onClick={() => setShowPassword((v) => !v)}
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>

                        {/* Password Indicators */}
                        <div className="text-[11px] text-gray-600 space-y-0.5 mt-1">
                            <p className={check.hasMinLength ? 'text-green-600' : 'text-red-600'}>
                                • Minimal 8 karakter
                            </p>
                            <p className={check.hasUpper ? 'text-green-600' : 'text-red-600'}>
                                • Huruf besar (A-Z)
                            </p>
                            <p className={check.hasLower ? 'text-green-600' : 'text-red-600'}>
                                • Huruf kecil (a-z)
                            </p>
                            <p className={check.hasNumber ? 'text-green-600' : 'text-red-600'}>
                                • Angka (0-9)
                            </p>
                            <p className={check.hasSymbol ? 'text-green-600' : 'text-red-600'}>
                                • Simbol (!@#$%^&*)
                            </p>
                        </div>

                        <InputError message={errors.password} className="mt-1" />
                    </div>

                    {/* Confirm Password */}
                    <div className="grid gap-1.5">
                        <Label htmlFor="password_confirmation" className="text-black">
                            Confirm Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password_confirmation"
                                type={showConfirm ? 'text' : 'password'}
                                required
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                disabled={processing}
                                placeholder="••••••••••••"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                                onClick={() => setShowConfirm((v) => !v)}
                            >
                                {showConfirm ? (
                                    <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        <InputError message={errors.password_confirmation} className="mt-1" />
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="mt-3 w-full bg-[#A78BFA] text-black hover:bg-[#8B5CF6]"
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Sign up
                    </Button>
                </div>

                {/* Login Link */}
                <div className="mt-2 text-center text-sm">
                    <span className="text-black">Already have an account? </span>
                    <TextLink
                        href={route('login')}
                        className="font-bold text-[#A78BFA]"
                    >
                        Sign in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
