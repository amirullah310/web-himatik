'use client';

import { motion } from 'framer-motion';
import bgHero from "@/assets/images/gedung4.png"; // ✅ Import gambar background

type Struktur = {
  id: number;
  name: string;
  position: string;
  picture?: string | null;
  structure_id?: number | null;
  division?: string | null;
};

// Fungsi bantu untuk menjadikan huruf kapital di setiap awal kata
const toTitleCase = (text: string) =>
  text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export default function AppStruktural({ strukturalList }: { strukturalList: Struktur[] }) {
  // Kelompokkan anggota berdasarkan divisi
  const grouped = strukturalList.reduce<Record<string, Struktur[]>>((acc, person) => {
    const division =
      person.division && person.division.trim() !== ""
        ? "Departemen " + toTitleCase(person.division)
        : "Pengurus Inti";

    if (!acc[division]) acc[division] = [];
    acc[division].push(person);
    return acc;
  }, {});

  return (
    <section
      className="relative overflow-hidden px-6 py-20 text-black bg-cover bg-center"
      style={{ backgroundImage: `url(${bgHero})` }} // ✅ pakai .src
    >
      {/* Overlay putih transparan */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] z-0" />

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />


      {/* Efek Glow */}
      <div className="absolute top-[-150px] left-[-150px] h-[400px] w-[400px] rounded-full bg-yellow-400/20 blur-[160px] z-0" />
      <div className="absolute bottom-[-150px] right-[-150px] h-[400px] w-[400px] rounded-full bg-purple-300/20 blur-[160px] z-0" />

      {/* Konten */}
      <div className="relative z-10 mx-auto max-w-[1200px]">
        {/* Judul Besar */}
        <h2 className="relative mb-16 text-center text-4xl font-extrabold tracking-wide md:text-5xl drop-shadow-lg">
          <span className="text-yellow-400">Struktural</span> HIMATIK
          <div className="absolute -bottom-4 left-1/2 h-[3px] w-32 -translate-x-1/2 rounded-full bg-yellow-400" />
        </h2>

        {/* Loop tiap divisi */}
        {Object.entries(grouped).map(([division, members]) => (
          <div key={division} className="mb-20">
            {/* Nama Divisi */}
            <h3 className="mb-10 text-center text-2xl font-bold text-yellow-400 md:text-3xl drop-shadow-md">
              {division}
            </h3>

            {/* Grid Anggota */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {members.map((person, i) => (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                >
                  <div className="group relative flex flex-col items-center rounded-2xl border border-purple-500/40 bg-white/10 p-5 text-center shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(250,204,21,0.3)]">
                    {/* Foto */}
                    <div className="mb-6 aspect-[3/4] w-full overflow-hidden rounded-xl shadow-lg">
                      <img
                        src={person.picture ?? '/images/default-profile.png'}
                        alt={person.name}
                        title={person.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    {/* Nama & Jabatan */}
                    <h3 className="mb-1 text-xl font-bold text-black drop-shadow-sm">
                      {toTitleCase(person.name)}
                    </h3>
                    <p className="text-lg font-semibold text-yellow-400 drop-shadow-sm">
                      {toTitleCase(person.position)}
                    </p>

                    {/* Aksen Glow di Card */}
                    <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-yellow-400/20 via-transparent to-purple-500/20 blur-xl" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Jika kosong */}
        {strukturalList.length === 0 && (
          <p className="text-center text-gray-500 drop-shadow-sm">
            Tidak ada anggota struktural yang tersedia.
          </p>
        )}
      </div>
    </section>
  );
}
