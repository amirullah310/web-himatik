"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Play } from "lucide-react";
import Video from "@/assets/images/PDKT2.mp4";
import bgHero from "@/assets/images/gedung4.png";

const VideoProfile = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-white px-6 sm:px-10 lg:px-20 py-16 text-gray-900">
      {/* Wave Atas */}
      <motion.svg
        viewBox="0 0 1000 300"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto text-gray-700 mb-10"
      >
        <motion.path
          d="M 50 100 Q 300 250, 600 150 T 950 220"
          stroke="black"
          strokeWidth="3"
          fill="transparent"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.polygon
          points="940,220 950,240 960,220"
          fill="black"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        />
      </motion.svg>

      {/* Konten Utama */}
      <div className="container mx-auto max-w-[1250px] flex flex-col items-start text-left space-y-12  px-6">
        {/* TEKS */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="space-y-6 w-full"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Apa itu <span className="text-purple-500">HIMATIK?</span>
          </h2>

<p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-[1250px]">
  <span className="font-semibold">HIMATIK</span> (Himpunan Mahasiswa Teknologi Informasi dan Komputer) 
  merupakan organisasi kemahasiswaan resmi yang bernaung di bawah Jurusan Teknologi Informasi dan Komputer, 
  <span className="font-semibold"> Politeknik Negeri Lhokseumawe</span>. 
  Organisasi ini menjadi wadah aspirasi, pengembangan diri, kreativitas, serta sarana kolaborasi 
  bagi seluruh mahasiswa program studi Informatika dan bidang-bidang terkait di lingkungan kampus. 
  <br /><br />
  Sejak berdirinya, HIMATIK berkomitmen untuk menumbuhkan semangat 
  <span className="font-semibold"> intelektual, profesional, dan solidaritas</span> 
  antar mahasiswa dalam menghadapi tantangan era digital yang terus berkembang. 
  Melalui berbagai kegiatan seperti seminar, pelatihan teknologi, lomba inovasi, 
  dan pengabdian masyarakat, HIMATIK berupaya menumbuhkan generasi muda yang 
  <span className="font-semibold"> berdaya saing global</span> namun tetap menjunjung tinggi nilai moral dan kebersamaan. 
  <br /><br />
  Kami hadir untuk membentuk <span className="font-semibold">generasi teknologi</span> 
  yang cerdas, kreatif, berjiwa kepemimpinan, dan berkomitmen terhadap inovasi serta kontribusi nyata bagi masyarakat. 
  HIMATIK menjadi ruang bagi mahasiswa untuk mengasah potensi, menyalurkan ide, serta membangun jejaring 
  yang bermanfaat di dunia akademik maupun profesional. 
  <br /><br />
  Dengan semangat 
  <span className="font-semibold text-purple-500"> inovatif, kolaboratif, dan inklusif</span>, 
  HIMATIK tidak hanya menjadi tempat untuk belajar, tetapi juga menjadi pusat inspirasi dan perubahan. 
  Bersama-sama, kami berupaya menciptakan ekosistem teknologi yang berkelanjutan dan berorientasi pada kemajuan bangsa.
</p>


          <div className="flex items-center gap-4">
            {/* Tombol Video */}
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-500 text-white rounded-full font-medium text-sm hover:bg-purple-700 transition-all duration-200"
            >
              <Play className="w-4 h-4" />
              Lihat Video
            </button>

            {/* Tombol Selengkapnya */}
            <button className="inline-flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-full text-gray-800 font-medium text-sm hover:bg-gray-100 transition-all duration-200 group">
              Selengkapnya
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal Video */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-black rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl border border-gray-700"
          >
            <video
              src={Video}
              controls
              autoPlay
              poster={bgHero}
              className="w-full h-full object-cover"
            >
              Browser Anda tidak mendukung video HTML5.
            </video>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition"
            >
              ✕
            </button>
          </motion.div>
        </div>
      )}

      {/* Wave Bawah */}
      <motion.svg
        viewBox="0 0 1000 300"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto mt-16 text-gray-700"
      >
        <motion.path
          d="M 900 50 Q 700 250, 450 150 T 150 220"
          stroke="black"
          strokeWidth="4"
          fill="transparent"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.polygon
          points="150,240 140,220 160,220"
          fill="black"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        />
      </motion.svg>
    </section>
  );
};

export default VideoProfile;
