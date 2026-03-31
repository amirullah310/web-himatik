// resources/js/Pages/struktural/index.tsx
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Users, Layers, Crown } from 'lucide-react';

import AppFooter from '@/components/homepage/app-footer';
import AppHeader from '@/components/homepage/app-header';
import AppLoading from '@/components/homepage/app-loading';
import SectionLabelStruktural from '@/components/homepage/struktural/app-label';
import AppStrukturalPage from '@/components/homepage/struktural/app-struktural';
import maskot from '@/assets/images/banner-man.png';
import AppScrollToTop from '@/components/homepage/app-scroll-to-top';
import SectionLabelHome from '@/components/homepage/app-label-bottom';

interface StructureMember {
  id: number;
  name: string;
  position: string;
  picture?: string | null;
  division?: string | null;
}

interface StrukturalPageProps {
  structureMembers: StructureMember[];
}

const StrukturalPage: React.FC<StrukturalPageProps> = ({ structureMembers }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Hitung data statistik
  const totalAnggota = structureMembers.length;
  const totalDepartemen = new Set(
    structureMembers.map((m) => m.division?.toLowerCase() || '')
  ).size;
  const totalPengurusInti = structureMembers.filter((m) =>
    m.division?.toLowerCase().includes('inti')
  ).length;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.add('public-theme');
    return () => {
      document.body.classList.remove('public-theme');
    };
  }, []);

  if (isLoading) return <AppLoading />;

  return (
    <>
      <Head title="Struktural - HIMATIK" />
      <AppHeader isBirthday={false} />

      <main className="bg-white text-gray-900">
        <SectionLabelStruktural />

        {/* 🔹 Informasi tentang Struktural HIMATIK */}
        <section className="relative pt-24 bg-gradient-to-b from-white via-purple-50/40 to-white">
          <div className="max-w-[1250px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-10 items-center">
            {/* Kiri: Teks */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
                Mengenal Lebih Dekat Struktur Organisasi HIMATIK
              </h2>

              <p className="text-gray-600 leading-relaxed text-lg">
                Struktur organisasi HIMATIK dibentuk dengan tujuan menciptakan sistem kerja yang
                efektif, kolaboratif, dan berkelanjutan. Setiap elemen di dalam HIMATIK memiliki
                peranan penting dalam menjalankan visi dan misi organisasi — mulai dari pengurus inti
                yang menjadi motor penggerak utama, hingga setiap departemen yang fokus pada bidang
                pengembangan tertentu.
              </p>

              <p className="text-gray-600 leading-relaxed text-lg">
                Melalui struktur yang tersusun dengan baik, HIMATIK berupaya menciptakan lingkungan
                organisasi yang kondusif bagi mahasiswa untuk mengasah kemampuan kepemimpinan,
                manajerial, serta teknis di bidang informatika dan teknologi informasi. Kolaborasi
                antardepartemen menjadi kunci utama dalam mewujudkan berbagai program dan kegiatan
                yang berdampak positif bagi seluruh anggota.
              </p>

              {/* <p className="text-gray-600 leading-relaxed text-lg">
                Tidak hanya berfokus pada kegiatan akademik, HIMATIK juga menumbuhkan nilai sosial,
                kreativitas, dan inovasi melalui kerja sama lintas bidang. Setiap anggota struktural
                diharapkan mampu beradaptasi, berkontribusi, dan menginspirasi mahasiswa lain untuk
                ikut serta dalam membangun HIMATIK yang dinamis dan berdaya saing tinggi.
              </p> */}
            </motion.div>

            {/* Kanan: Gambar Maskot */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="flex justify-center md:justify-end"
            >
              <img
                src={maskot}
                alt="Maskot HIMATIK"
                className="w-[500px] h-[500px] object-cover "
              />
            </motion.div>
          </div>
        </section>

        {/* 🔹 Statistik Card Section */}
        <section className="pt-16 md:pt-8 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[1250px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
          >
            {[
              {
                icon: <Crown className="h-5 w-5" />,
                iconBg: 'bg-yellow-100',
                iconColor: 'text-yellow-600',
                title: 'Pengurus Inti',
                value: totalPengurusInti,
                desc: 'Struktur kepengurusan utama HIMATIK yang memimpin arah organisasi.',
              },
              {
                icon: <Layers className="h-5 w-5" />,
                iconBg: 'bg-purple-100',
                iconColor: 'text-purple-600',
                title: 'Total Departemen',
                value: totalDepartemen,
                desc: 'Unit kerja HIMATIK yang berfokus pada bidang masing-masing.',
              },
              {
                icon: <Users className="h-5 w-5" />,
                iconBg: 'bg-indigo-100',
                iconColor: 'text-indigo-600',
                title: 'Total Anggota',
                value: totalAnggota,
                desc: 'Mahasiswa aktif yang tergabung dan berkontribusi dalam HIMATIK.',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 p-6"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor} mb-4`}
                >
                  {card.icon}
                </div>

                <h4 className="text-lg font-semibold text-gray-800 mb-1">{card.title}</h4>
                <p className="text-3xl font-bold text-gray-900 mb-2">{card.value}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* 🔹 Struktur Organisasi Section */}
        <AppStrukturalPage strukturalList={structureMembers} />
      </main>
      <AppScrollToTop />
      <SectionLabelHome/>
      <AppFooter />
    </>
  );
};

export default StrukturalPage;
