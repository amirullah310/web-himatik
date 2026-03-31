'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import Tilt from 'react-parallax-tilt';

type Division = {
  id: number;
  name: string;
  description?: string;
};

const toTitleCase = (text: string) =>
  text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AppBidangPage({ divisions }: { divisions: Division[] }) {
  return (
    <section className="relative overflow-hidden bg-white px-6 pb-24 pt-10 text-black md:px-10">
      {/* Background dekorasi halus */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#E9D5FF_1px,transparent_1px),linear-gradient(to_bottom,#E9D5FF_1px,transparent_1px)] opacity-[0.03]"
        style={{ backgroundSize: '80px 80px' }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        {divisions.length > 0 ? (
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.15 }}
          >
            {divisions.map((item, idx) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="h-full"
              >
                <Tilt
                  glareEnable={true}
                  glareMaxOpacity={0.25}
                  glareColor="#CBA5F5"
                  glareBorderRadius="20px"
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  transitionSpeed={400}
                  className="group relative flex h-full flex-col rounded-2xl border border-[#CBA5F5]/30 
                             bg-white/70 p-8 shadow-lg backdrop-blur-xl 
                             transition-all hover:-translate-y-2 hover:shadow-[0_8px_40px_rgba(147,51,234,0.15)] hover:border-[#A66DD4]/60"
                >
                  {/* Nomor */}
                  <div className="absolute -top-5 -left-5 flex h-14 w-14 items-center justify-center rounded-xl 
                                  bg-gradient-to-tr from-[#7E22CE] to-[#A66DD4] font-mono text-xl font-bold 
                                  text-white shadow-lg ring-4 ring-white/40">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  {/* Konten */}
                  <div className="mt-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <div className="text-xs font-semibold uppercase tracking-widest text-[#A66DD4]/90">
                        Bidang
                      </div>
                      <h3 className="text-2xl font-extrabold text-gray-900 transition-colors duration-300 group-hover:text-[#7E22CE]">
                        {toTitleCase(item.name)}
                      </h3>
                    </div>
                    <p className="text-base leading-relaxed text-gray-600 flex-grow">
                      {item.description || `Bidang ini adalah ${item.name}`}
                    </p>
                  </div>

                  {/* Tombol */}
                  <div className="mt-auto flex justify-end">
                    <Link href={route('bidang.show', item.id)}>
                      <motion.button
                        whileHover={{ scale: 1.08, rotate: -1 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex items-center gap-2 rounded-full 
                                   bg-gradient-to-r from-[#7E22CE] to-[#A855F7] 
                                   px-5 py-2.5 text-white font-semibold shadow-md 
                                   transition-all duration-300 hover:shadow-lg hover:brightness-110"
                      >
                        Lihat Proker
                        <ArrowUpRight size={18} />
                      </motion.button>
                    </Link>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center text-lg text-gray-500 italic">
            Tidak ada bidang.
          </div>
        )}
      </div>
    </section>
  );
}
