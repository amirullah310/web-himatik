import { Head, Link } from '@inertiajs/react';
import bgHero from '@/assets/images/gedung4.png';

export default function NotFoundPage() {
    return (
        <>
            <Head title="Halaman Tidak Ditemukan" />
            <div
                className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-950 px-4 py-12 text-white sm:px-6 lg:px-8"
                style={{
                    backgroundImage: `url(${bgHero})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Overlay Layer: Dark Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/90 via-zinc-950/80 to-zinc-950/95 backdrop-blur-[2px]"></div>

                {/* Content */}
                <div className="relative z-10 mx-auto max-w-xl text-center">
                    <h1
                        className="mb-4 text-8xl font-extrabold tracking-tight md:text-9xl lg:text-[10rem]"
                        style={{
                            background: 'linear-gradient(90deg, #c084fc 0%, #a855f7 35%, #f5d0fe 60%, #a855f7 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow:
                                '0 0 15px rgba(168,85,247,0.4), 0 0 30px rgba(192,132,252,0.3)',
                            filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.4))',
                        }}
                    >
                        404
                    </h1>

                    <div className="relative z-10 inline-block rounded-md bg-zinc-800/80 px-3 py-1.5 text-sm font-medium tracking-wider text-white uppercase backdrop-blur-sm md:text-base shadow-lg shadow-purple-900/30">
                        Halaman Tidak Ditemukan
                    </div>

                    <p className="my-8 text-lg text-white/80 md:text-xl">
                        Maaf, halaman yang Anda cari tidak ada. Mungkin URL telah salah diketik atau halaman telah dipindahkan.
                    </p>

                    <Link
                        href="/"
                        className="inline-flex items-center rounded-lg border border-purple-500 bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-purple-600 hover:to-purple-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:outline-none"
                    >
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </>
    );
}
