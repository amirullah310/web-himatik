// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm<Required<{ password: string }>>({
    password: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('password.confirm'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <AuthLayout
      title="Confirm your password"
      description="This is a secure area of the application. Please confirm your password before continuing."
    >
      <Head title="Confirm password" />

      <form onSubmit={submit} className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-black">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={data.password}
            className="bg-white text-black placeholder:text-gray-500"
            autoFocus
            onChange={(e) => setData('password', e.target.value)}
          />

          <InputError message={errors.password} />
        </div>

        <Button
          className="w-full bg-[#A78BFA] text-black font-bold hover:bg-[#8B5CF6]"
          disabled={processing}
        >
          {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
          Confirm password
        </Button>
      </form>
    </AuthLayout>
  );
}
