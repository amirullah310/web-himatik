import { usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import bgHero from "@/assets/images/logoo.png";

export default function AppVisiMisi() {
  const { visi = [], misi = [] } = usePage().props as {
    visi?: string[];
    misi?: string[];
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white px-6 sm:px-10 lg:px-20 py-20 text-gray-900 dark:text-gray-100">
      {/* === JUDUL UTAMA === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        // className="text-center mb-20"
      >
        {/* <div className="flex justify-center mb-4">
          <span className="inline-block w-20 h-[3px] bg-gradient-to-r from-purple-400 to-purple-600 rounded-full" />
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Visi & Misi
        </h2>
        <p className="mt-3 text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Menjadi dasar arah gerak dan komitmen HIMATIK dalam mewujudkan inovasi serta pengabdian.
        </p> */}
      </motion.div>

      {/* === KONTEN UTAMA === */}
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        {/* === LEFT: VISI & MISI === */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* --- VISI --- */}
          <div>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-purple-500 mb-2">
              Tentang Kami
            </p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white relative inline-block">
              Visi Kami
              <span className="absolute -bottom-2 left-0 w-14 sm:w-20 h-1 bg-purple-400 rounded-full"></span>
            </h3>
            <div className="mt-6 bg-white/80 dark:bg-gray-900/40 backdrop-blur-md p-7 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              {visi.length > 0 ? (
                visi.map((item, i) => (
                  <p
                    key={i}
                    className="leading-relaxed text-gray-700 dark:text-gray-300 mb-4 text-base sm:text-lg"
                  >
                    {item}
                  </p>
                ))
              ) : (
                <p className="text-gray-400 text-sm">Belum ada visi.</p>
              )}
            </div>
          </div>

          {/* --- MISI --- */}
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white relative inline-block">
              Misi Kami
              <span className="absolute -bottom-2 left-0 w-14 sm:w-20 h-1 bg-purple-400 rounded-full"></span>
            </h3>
            <ul className="mt-8 space-y-5">
              {misi.length > 0 ? (
                misi.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-500 text-sm sm:text-base font-bold text-white shadow-md">
                      {i + 1}
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                      {item}
                    </p>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 text-sm">Belum ada misi.</li>
              )}
            </ul>
          </div>
        </motion.div>

        {/* === RIGHT: IMAGE + BADGE === */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center items-center"
        >
          {/* Background image */}
          <div
            className="w-full h-80 sm:h-80 lg:h-[560px] rounded-2xl bg-cover bg-center shadow-xl relative overflow-hidden border border-gray-200 dark:border-gray-700"
            style={{ backgroundImage: `url(${bgHero})` }}
          >
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent rounded-2xl"></div> */}
          </div>

          {/* Floating badge */}
          <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 flex h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-white dark:bg-gray-900 shadow-2xl border-2 border-purple-400">
            <div className="text-center leading-tight">
              <p className="text-lg sm:text-xl font-extrabold text-purple-500">
                {new Date().getFullYear()}
              </p>
              <p className="text-[10px] sm:text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-300">
                HIMATIK
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
