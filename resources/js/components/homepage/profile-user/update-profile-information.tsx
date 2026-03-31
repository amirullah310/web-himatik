import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';

export default function UpdateProfileInformation({ user, status }) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        _method: 'patch',
        name: user.name,
        email: user.email,
        bio: user.bio || '',
        picture: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.update'));
    };

    const handleFileChange = (e) => {
        setData('picture', e.target.files[0]);
    };

    return (
        <section className="rounded-xl border border-gray-300 bg-white p-6 transition-colors duration-300 hover:border-purple-400 sm:p-8">
            <header className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-black md:text-4xl">Informasi Profil</h2>
                <p className="mt-2 text-gray-600">Perbarui nama, bio, dan foto profil akun Anda.</p>
            </header>

            <form onSubmit={submit} className="space-y-6">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <img
                        src={user.picture ? `/storage/${user.picture}` : '/assets/default_picture.webp'}
                        alt="Profile Picture"
                        className="h-32 w-32 rounded-full border-4 border-purple-400 object-cover"
                    />
                    <Input
                        id="picture"
                        type="file"
                        className="w-full border-gray-300 bg-transparent text-black"
                        onChange={handleFileChange}
                    />
                    <InputError message={errors.picture} className="mt-2" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <Label htmlFor="name" className="text-black">
                            Nama
                        </Label>
                        <Input
                            id="name"
                            className="mt-2 block w-full rounded-md border border-gray-300 bg-transparent px-5 py-3 text-black transition focus:border-purple-400 focus:ring-purple-400"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div>
                        <Label htmlFor="email" className="text-black">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            className="mt-2 block w-full rounded-md border border-gray-300 bg-gray-100 px-5 py-3 text-gray-600"
                            value={data.email}
                            disabled
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                </div>

                <div>
                    <Label htmlFor="bio" className="text-black">
                        Bio
                    </Label>
                    <Textarea
                        id="bio"
                        className="mt-2 block w-full rounded-md border border-gray-300 bg-transparent px-5 py-3 text-black transition focus:border-purple-400 focus:ring-purple-400"
                        value={data.bio}
                        onChange={(e) => setData('bio', e.target.value)}
                        rows="4"
                    />
                    <InputError message={errors.bio} className="mt-2" />
                </div>

                <div className="flex items-center justify-center gap-4 md:justify-end">
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600">Tersimpan.</p>
                    </Transition>
                    <Button
                        type="submit"
                        disabled={processing}
                        className="rounded-md bg-purple-400 px-8 py-3 font-semibold text-black transition-colors hover:bg-purple-500 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                        Simpan Perubahan
                    </Button>
                </div>
            </form>
        </section>
    );
}
