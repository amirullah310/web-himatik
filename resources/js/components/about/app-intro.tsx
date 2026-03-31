import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import bgHero from "@/assets/images/gedung3.png";

export default function AboutIntro() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative bg-white p-10 md:p-16"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* RIGHT SIDE - Image (mobile first) */}
        <div className="flex justify-center md:justify-end order-1 md:order-2">
          <img 
            src={bgHero} 
            alt="HIMATIK Illustration" 
            className="w-full max-w-md md:max-w-lg object-contain drop-shadow-xl rounded-xl"
          />
        </div>

        {/* LEFT SIDE - Text */}
        <div className="text-left space-y-6 order-2 md:order-1">
          <div className="flex items-center space-x-3">
            {/* <Info className="w-10 h-10 text-purple-400" /> */}
            <h1 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
              Apa Itu HIMATIK?
            </h1>
          </div>

          <p className="text-base md:text-base text-gray-700 leading-relaxed font-light text-justify">
            <span className="font-medium text-black">
              Himpunan Mahasiswa Teknik Informasi dan Komputer (HIMATIK)
            </span>{' '}
            adalah organisasi kemahasiswaan di lingkungan{' '}
            <span className="text-black font-medium">Politeknik Negeri Lhokseumawe</span>{' '}
            yang menjadi wadah bagi mahasiswa Program Studi Teknik Informatika dan Komputer. 
            HIMATIK berfungsi sebagai{' '}
            <span className="text-black font-medium">organisasi himpunan mahasiswa</span>{' '}
            yang menampung aspirasi, mengembangkan potensi, serta mendukung kegiatan akademik maupun non-akademik. 
            Dengan semangat kebersamaan dan profesionalisme, HIMATIK berkomitmen untuk menciptakan 
            lingkungan belajar yang aktif, inovatif, dan berdaya saing, serta berkontribusi positif bagi 
            mahasiswa maupun kampus secara keseluruhan.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
