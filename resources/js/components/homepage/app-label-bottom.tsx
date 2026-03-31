"use client";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import bgHero from "@/assets/images/gedung4.png";

export default function SectionLabelHome() {
  return (
    <section
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-white text-black"
      style={{
        backgroundImage: `url(${bgHero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay kabut (biar teks lebih jelas) */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />

      {/* Overlay putih bawah (gradient) */}
      <div className="absolute inset-x-0 top-0 h-50 bg-gradient-to-b from-white to-transparent" />

      <div className="absolute inset-x-0 bottom-0 h-50 bg-gradient-to-t from-white to-transparent" />

      {/* Konten */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-6"
      >
        {/* Ikon telepon */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 shadow-md">
          <Phone className="h-7 w-7 text-black" />
        </div>

        {/* Teks utama */}
<h1
  className="mb-6 text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl"
  style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.6)" }}
>
  Butuh informasi lebih lanjut? <br />
  Jangan ragu untuk menghubungi HIMATIK!
</h1>


        {/* Tombol Contact */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="mailto:himatik@example.com" // ganti sesuai email/contact HIMATIK
          className="inline-block rounded-full bg-yellow-400 px-6 py-3 font-semibold text-black shadow-lg transition-colors hover:bg-yellow-500"
        >
          Contact Us
        </motion.a>
      </motion.div>
    </section>
  );
}
