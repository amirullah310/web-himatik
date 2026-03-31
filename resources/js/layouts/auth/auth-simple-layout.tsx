import AppLogoIcon from '@/components/app-logo-icon'
import { Link } from '@inertiajs/react'
import { type PropsWithChildren } from 'react'
import { motion } from 'framer-motion' // 🪄 Tambahkan ini
import bgHero from '@/assets/images/gedung4.png'

interface AuthLayoutProps {
  name?: string
  title?: string
  description?: string
}

export default function AuthSimpleLayout({
  children,
  title,
  description,
}: PropsWithChildren<AuthLayoutProps>) {
  return (
    <div
      className="min-h-screen flex flex-col md:flex-row bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgHero})`,
      }}
    >
      {/* Overlay ungu di sisi kiri agar teks lebih kontras */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-purple-500/60 to-transparent z-0"></div>

{/* === KIRI: BRANDING HIMATIK === */}
<motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
  className="hidden md:flex flex-col justify-center items-start text-white w-full md:w-1/2 pl-14 pr-6 md:pl-32 md:pr-12 lg:pl-44 lg:pr-20 relative z-10"
>
  <div className="max-w-lg space-y-8">
    {/* Logo dan Nama HIMATIK */}
    <div className="flex flex-col items-start space-y-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm shadow-lg">
        <AppLogoIcon className="size-12 fill-current text-white" />
      </div>
      <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-md">
        HIMATIK
      </h1>
      <p className="text-purple-100 text-lg font-medium uppercase tracking-widest leading-snug">
        Himpunan Mahasiswa Teknologi Informasi dan Komputer
      </p>
    </div>

    {/* Deskripsi singkat */}
    <p className="text-lg text-purple-100 leading-relaxed max-w-md">
      Selamat datang di portal <span className="font-semibold">HIMATIK</span>.
      Tempat berkolaborasi, berinovasi, dan berkembang bersama dalam dunia teknologi informasi dan komputer.
    </p>

    {/* Tombol navigasi */}
    <div className="pt-4">
      <Link
        href={route('home')}
        className="inline-block bg-white text-purple-800 font-semibold px-7 py-3 rounded-full shadow-md hover:bg-purple-100 hover:translate-x-1 transition-transform duration-200"
      >
        ← Kembali ke Beranda
      </Link>
    </div>
  </div>
</motion.div>


      {/* === KANAN: LOGIN CARD === */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        className="flex justify-center items-center w-full md:w-1/2 p-8 md:p-12 relative z-10"
      >
        <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-sm p-8">
          <div className="flex flex-col items-center mb-6">
            <Link href={route('home')} className="flex flex-col items-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100">
                <AppLogoIcon className="size-8 fill-current text-purple-600" />
              </div>
            </Link>

            <div className="text-center">
              <h1 className="text-xl font-semibold text-gray-900">
                {title || 'Masuk ke HIMATIK'}
              </h1>
              <p className="text-gray-500 text-sm">
                {description ||
                  'Silakan masuk untuk melanjutkan ke dashboard anggota.'}
              </p>
            </div>
          </div>

          {/* === CHILDREN (form login) === */}
          <div>{children}</div>
        </div>
      </motion.div>
    </div>
  )
}
