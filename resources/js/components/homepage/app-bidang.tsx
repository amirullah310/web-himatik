"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/images/logoo.png";
import maskot from "@/assets/images/banner-man.png";

type Division = {
  id: number;
  name: string;
  description?: string;
};

const toTitleCase = (text: string) =>
  text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AppBidang({ divisions }: { divisions: Division[] }) {
  return (
    <section className="relative overflow-hidden bg-white px-6 pt-20 pb-10 text-black md:px-10">
      {/* === HEADER === */}
      {/* <div className="flex items-center justify-center gap-3 mb-10">
        <span className="inline-block w-8 h-1 bg-purple-400 rounded-full" />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 b">
          Departemen
        </h2>
        <span className="inline-block w-8 h-1 bg-purple-400 rounded-full" />
      </div> */}
<section className="relative bg-gradient-to-b from-white via-purple-50/40 to-white pb-10">
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
</section>


      <div className="relative z-10 mx-auto max-w-[1200px]">
        {divisions.length > 0 ? (
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.15 }}
          >
            {divisions.map((item, idx) => (
              <FlipCard key={item.id} item={item} index={idx} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center text-lg text-gray-500 italic">
            Tidak ada Departemen.
          </div>
        )}
      </div>
    </section>
  );
}

// 🔹 Komponen Kartu Flip
function FlipCard({ item, index }: { item: Division; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    
    <motion.div
      variants={cardVariants}
      className="relative h-[420px] [perspective:1000px]" // 🔸 tinggi seperti versi sebelumnya
    >

      <motion.div
        className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] cursor-pointer"
        animate={{ rotateY: flipped ? 180 : 0 }}
        onClick={() => setFlipped(!flipped)}
      >
        {/* === FRONT SIDE === */}
        <div className="absolute inset-0 backface-hidden flex flex-col rounded-2xl border border-purple-300/30 bg-white p-8 shadow-md transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-purple-400/50">
          {/* Nomor */}
          <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-purple-500 font-mono text-lg font-bold text-white shadow-lg">
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Konten */}
          <div className="mt-6 flex flex-col flex-grow">
            <div className="mb-3">
              <div className="text-sm uppercase tracking-wider text-purple-400/80">
                Departemen
              </div>
              <div className="text-2xl font-extrabold transition-colors duration-300 group-hover:text-purple-500">
                {toTitleCase(item.name)}
              </div>
            </div>
            <p className="text-base leading-relaxed text-gray-600 flex-grow">
              {item.description || `Departemen ini adalah ${item.name}`}
            </p>
          </div>

          {/* Button */}
          {/* <div className="mt-6 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-gradient-to-br from-purple-300 to-purple-400 p-3 text-black shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <ArrowUpRight size={20} className="text-purple-900" />
            </motion.button>
          </div> */}
        </div>

        {/* === BACK SIDE === */}
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-200 to-purple-400 backface-hidden [transform:rotateY(180deg)] shadow-xl">
          <img
            src={logo}
            alt="Logo HIMATIK"
            className="w-44 h-44 object-contain drop-shadow-lg"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
