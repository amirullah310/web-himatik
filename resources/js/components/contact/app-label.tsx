"use client";
import { motion } from "framer-motion";
import bgHero from "@/assets/images/gedung4.png";


export default function SectionLabelContact() {
  return (
    <section
      className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-white text-black"
      style={{
        backgroundImage: `url(${bgHero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay transparan penuh biar teks jelas */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />

      {/* Overlay putih bawah (gradient) */}
      <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-white to-transparent" />

      {/* Konten */}
      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-black uppercase sm:text-4xl md:text-5xl">
          Hubungi Kami
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-800 sm:text-lg md:text-xl">
          Kami siap mendengar dari Anda. Sampaikan pertanyaan atau masukan Anda melalui form di bawah ini.
        </p>
      </motion.div> */}
                  <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-6"
      >
        <h1
          className="mb-4 text-3xl font-extrabold tracking-tight uppercase sm:text-4xl md:text-5xl text-white"
          style={{
            // WebkitTextStroke: "1px black",
            textShadow:
              "2px 2px 6px rgba(0,0,0,0.8), 0 0 15px rgba(255,255,255,0.3)",
          }}
        >
          Hubungi Kami
        </h1>
        <p
          className="mx-auto max-w-2xl text-base leading-relaxed sm:text-lg md:text-xl text-white font-semibold"
          style={{
            textShadow: "1px 1px 4px rgba(0,0,0,0.8)",
          }}
        >
          Kami siap mendengar dari Anda. Sampaikan pertanyaan atau masukan Anda melalui form di bawah ini.
          {/* <span className="font-semibold">Teknologi Informasi dan Komputer</span> */}
        </p>
      </motion.div>
    </section>
  );
}
