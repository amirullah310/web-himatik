// resources/js/Pages/bidang/index.tsx
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Layers3, ClipboardList, Users2 } from 'lucide-react';

import AppFooter from '@/components/homepage/app-footer';
import AppHeader from '@/components/homepage/app-header';
import AppLoading from '@/components/homepage/app-loading';
import SectionLabelBidang from '@/components/homepage/bidang/app-label';
import AppBidangPage from '@/components/homepage/bidang/app-bidang';
import maskot from '@/assets/images/banner-man.png';
import AppScrollToTop from '@/components/homepage/app-scroll-to-top';
import SectionLabelHome from '@/components/homepage/app-label-bottom';

interface Division {
  id: number;
  name: string;
  description?: string;
}

interface BidangPageProps {
  divisions: Division[];
}

const BidangPage: React.FC<BidangPageProps> = ({ divisions }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Statistik dummy – bisa diganti dari API kalau ada data sebenarnya
  const totalBidang = divisions.length;
  const totalProker = divisions.length * 5; // contoh simulasi
  const totalAnggota = divisions.length * 10; // contoh simulasi

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
      <Head title="Departemen - HIMATIK" />
      <AppHeader isBirthday={false} />

      <main className="bg-white text-gray-900">
        <SectionLabelBidang />
        {/* 🔹 Informasi tentang Departemen HIMATIK */
        <section className="relative bg-gradient-to-b from-white via-purple-50/40 to-white pt-30">
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
        Apa itu Departemen dalam Organisasi?
      </h2>

      <p className="text-gray-600 leading-relaxed text-lg">
        Dalam HIMATIK, departemen merupakan unit kerja yang memiliki fokus dan tanggung jawab
        khusus dalam bidang tertentu. Setiap departemen berperan penting dalam menjalankan program
        kerja, mendukung pengurus inti, serta memastikan seluruh kegiatan organisasi berjalan
        efektif dan terarah sesuai visi serta misi HIMATIK.
      </p>

      <p className="text-gray-600 leading-relaxed text-lg">
        Melalui pembagian departemen, HIMATIK berupaya menciptakan lingkungan kerja yang kolaboratif
        dan terstruktur. Setiap anggota memiliki kesempatan untuk berkontribusi sesuai minat dan
        keahliannya — baik di bidang pengembangan teknologi, sumber daya manusia, sosial masyarakat,
        hingga hubungan eksternal kampus.
      </p>

      <p className="text-gray-600 leading-relaxed text-lg">
        Dengan koordinasi yang baik antar-departemen, HIMATIK tidak hanya menjadi wadah aspirasi
        mahasiswa informatika, tetapi juga menjadi pusat inovasi dan penggerak kemajuan di bidang
        teknologi serta pengembangan diri mahasiswa.
      </p>
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
        className="w-[500px] h-[500px] object-cover"
      />
    </motion.div>
  </div>
</section>}
        {/* 🔹 Statistik Card Section */}
        <section className="pt-16 md:pt-10 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[1250px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
          >
            {[
              {
                icon: <Layers3 className="h-5 w-5" />,
                iconBg: 'bg-indigo-100',
                iconColor: 'text-indigo-600',
                title: 'Total Departemen',
                value: totalBidang,
                desc: 'Jumlah seluruh bidang atau departemen yang ada di HIMATIK.',
              },
              {
                icon: <ClipboardList className="h-5 w-5" />,
                iconBg: 'bg-purple-100',
                iconColor: 'text-purple-600',
                title: 'Total Program Kerja',
                value: totalProker,
                desc: 'Rangkaian program kerja aktif yang dijalankan oleh tiap departemen.',
              },
              {
                icon: <Users2 className="h-5 w-5" />,
                iconBg: 'bg-yellow-100',
                iconColor: 'text-yellow-600',
                title: 'Total Anggota Departemen',
                value: totalAnggota,
                desc: 'Mahasiswa aktif yang berperan langsung dalam setiap bidang HIMATIK.',
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

        {/* 🔹 Daftar Bidang (Departemen) */}
        <AppBidangPage divisions={divisions} />
        <SectionLabelHome/>
      </main>
      <AppScrollToTop />

      <AppFooter />
    </>
  );
};

export default BidangPage;
