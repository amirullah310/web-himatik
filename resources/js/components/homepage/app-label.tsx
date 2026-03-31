'use client';
import { LucideAsterisk } from 'lucide-react';

export default function AppLabel() {
  const items = Array.from({ length: 6 }); // lebih sedikit karena kalimat panjang

  return (
    <div className="relative overflow-hidden bg-purple-500 py-4">
      {/* Fade overlay kiri */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-purple-500 to-transparent z-10" />
      {/* Fade overlay kanan */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-purple-500 to-transparent z-10" />

      <div className="flex whitespace-nowrap animate-scroll">
        {items.map((_, idx) => (
          <div
            key={idx}
            className="flex items-center px-6 text-base md:text-lg font-medium text-white space-x-3"
          >
            <span>
              HIMATIK adalah wadah bagi mahasiswa untuk berkembang di bidang teknologi informasi, 
              membangun kreativitas, dan memperkuat solidaritas.
            </span>
            {/* <LucideAsterisk className="h-4 w-4 shrink-0 opacity-70" /> */}
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((_, idx) => (
          <div
            key={`copy-${idx}`}
            className="flex items-center px-6 text-base md:text-lg font-medium text-white space-x-3"
          >
            <span>
              HIMATIK adalah wadah bagi mahasiswa untuk berkembang di bidang teknologi informasi, 
              membangun kreativitas, dan memperkuat solidaritas.
            </span>
            {/* <LucideAsterisk className="h-4 w-4 shrink-0 opacity-70" /> */}
          </div>
        ))}
      </div>

      {/* Animasi scroll */}
      <style jsx>{`
        .animate-scroll {
          display: flex;
          animation: scroll 30s linear infinite;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
