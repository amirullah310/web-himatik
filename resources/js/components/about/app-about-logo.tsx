import logoImage from '@/assets/images/logoo.png'; // ganti dengan logo HIMATIK
import { BadgeCheck } from 'lucide-react';

export default function AboutLogo() {
  return (
    <section className="relative bg-white px-6 py-20 text-black md:px-12 lg:py-28">
      <div className="mx-auto grid max-w-[1200px] items-center gap-16 lg:grid-cols-[1fr_1.6fr]">
        {/* Logo Section */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 shadow-2xl transition-transform duration-500 hover:scale-105 hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
            <img
              src={logoImage}
              alt="Logo HIMATIK"
              className="w-full max-w-[280px] md:max-w-[360px] object-contain drop-shadow-[0_0_25px_rgba(0,0,0,0.12)]"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#FECA00]/20 via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>
        </div>

        {/* Content Section */}
        <div className="text-left">
          <h2 className="mb-10 flex items-center gap-3 text-3xl font-extrabold tracking-tight text-black md:text-4xl lg:text-5xl">
            <BadgeCheck className="h-10 w-10 flex-shrink-0 text-[#FECA00]" />
            Makna Logo <span className="text-[#FECA00]">HIMATIK</span>
          </h2>

          <ul className="space-y-6 text-base leading-relaxed text-gray-700 md:text-lg">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[#FECA00]" />
              <span>
                <span className="font-semibold text-black">Lingkaran:</span> Melambangkan persatuan, kesatuan, dan kekeluargaan antar mahasiswa Teknik Informatika & Komputer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[#FECA00]" />
              <span>
                <span className="font-semibold text-black">Warna hijau:</span> Simbol semangat pertumbuhan, inovasi, dan pengembangan teknologi yang berkelanjutan.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[#FECA00]" />
              <span>
                <span className="font-semibold text-black">Warna biru:</span> Melambangkan keilmuan, kecerdasan, dan ketenangan dalam menghadapi tantangan.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[#FECA00]" />
              <span>
                <span className="font-semibold text-black">Simbol teknologi:</span> Menunjukkan identitas HIMATIK sebagai wadah mahasiswa yang bergerak di bidang teknologi informasi & komputer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[#FECA00]" />
              <span>
                <span className="font-semibold text-black">Tulisan HIMATIK:</span> Identitas resmi Himpunan Mahasiswa Teknik Informatika & Komputer Politeknik Negeri Lhokseumawe.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
