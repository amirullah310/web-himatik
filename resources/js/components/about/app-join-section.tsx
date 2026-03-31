"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, Heart } from "lucide-react";
import bgHistory from "@/assets/images/gedung.png";

export default function AppJoinSection() {
  const cards = [
    {
      icon: <Users className="h-6 w-6 text-purple-500" />,
      title: "Gabung Jadi Anggota HIMATIK",
      desc: "Jadilah bagian dari keluarga besar HIMATIK dan ikut berkontribusi dalam mengembangkan potensi mahasiswa di bidang teknologi dan informatika.",
      btnText: "Selengkapnya",
      href: "#",
    },
    {
      icon: <Briefcase className="h-6 w-6 text-indigo-500" />,
      title: "Gabung Jadi Pengurus",
      desc: "Tingkatkan kemampuan kepemimpinanmu dengan bergabung sebagai pengurus HIMATIK. Bersama kita wujudkan program yang berdampak nyata.",
      btnText: "Selengkapnya",
      href: "#",
    },
    {
      icon: <Heart className="h-6 w-6 text-pink-500" />,
      title: "Berkontribusi Bersama Kami",
      desc: "Dukung kegiatan sosial, teknologi, dan budaya HIMATIK untuk menciptakan perubahan positif bagi mahasiswa dan masyarakat.",
      btnText: "Selengkapnya",
      href: "#",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-purple-50/40 to-white dark:from-gray-950 dark:via-gray-900/70 dark:to-gray-950">
      <div className="max-w-[1250px] mx-auto text-center px-6">

        {/* 🔹 Gambar di atas Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <img
            src={bgHistory}
            alt="Gedung HIMATIK"
            className=" mx-auto w-full max-w-[1280px] h-[580px] object-cover object-center"
          />
        </motion.div>

        {/* 🔹 Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="relative rounded-2xl border border-purple-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg shadow-lg hover:shadow-purple-100 dark:hover:shadow-purple-900 transition-all duration-300 p-8 text-left"
            >
              {/* Icon Circle */}
              <div className="flex justify-left mb-6">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-tr from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/20 flex items-center justify-center">
                  {card.icon}
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                {card.desc}
              </p>

              {/* Subtle Glow on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-100/20 to-transparent opacity-0 hover:opacity-100 transition duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
