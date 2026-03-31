import { motion } from "framer-motion";
import { History } from "lucide-react";
import bgHistory from "@/assets/images/gedung4.png";

export default function AboutHistory() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="relative bg-white px-6 sm:px-10 lg:px-20 py-10"
    >
      <div className="max-w-[1250px] mx-auto">
        {/* === TITLE === */}
        {/* <div className="flex items-center justify-center gap-3 mb-16">
          <span className="inline-block w-8 h-1 bg-purple-400 rounded-full" />
          <h2 className="text-3xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 flex items-center gap-3">

            Sejarah HIMATIK
          </h2>
          <span className="inline-block w-8 h-1 bg-purple-400 rounded-full" />
        </div> */}

        {/* === CONTENT === */}
        <div className="relative">
          {/* LEFT SIDE - Image floated on md+ */}
          <img
            src={bgHistory}
            alt="Sejarah HIMATIK"
            className="w-full md:w-1/2 md:float-left md:mr-8 md:mb-6 mb-6 rounded-xl drop-shadow-xl object-cover"
          />

          {/* RIGHT + BELOW - Text */}
          <div className="text-gray-700 text-base md:text-base leading-relaxed font-light text-justify">
                      <div className="flex items-center space-x-3">
            {/* <Info className="w-10 h-10 text-purple-400" /> */}
            <h1 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-6">
              Sejarah Singkat HIMATIK
            </h1>
          </div>
            <p className="mb-4">
              <span className="font-medium text-black">
                Himpunan Mahasiswa Teknik Informatika dan Komputer (HIMATIK)
              </span>{" "}
              lahir dari semangat kebersamaan mahasiswa Program Studi Teknik
              Informatika dan Komputer{" "}
              <span className="font-medium text-black">
                Politeknik Negeri Lhokseumawe
              </span>
              . Organisasi ini didirikan sebagai wadah untuk menampung aspirasi,
              memperjuangkan kepentingan mahasiswa, serta mengembangkan potensi
              di bidang akademik maupun non-akademik.
            </p>

            <p className="mb-4">
              Sejak awal berdirinya, HIMATIK telah menjadi ruang berkumpulnya
              mahasiswa untuk berkolaborasi, berorganisasi, dan menciptakan
              inovasi. Tidak hanya fokus pada advokasi mahasiswa, HIMATIK juga
              aktif menyelenggarakan kegiatan ilmiah, sosial, budaya, dan
              pengabdian masyarakat.
            </p>

            <p className="mb-4">
              Dalam setiap periode kepengurusan, HIMATIK terus berkembang
              sebagai wadah kaderisasi, pembinaan kepemimpinan, serta penggerak
              semangat solidaritas antar mahasiswa. Perjalanan panjangnya telah
              melahirkan berbagai program kerja yang bermanfaat, baik untuk
              mahasiswa, kampus, maupun masyarakat luas.
            </p>

            <p>
              Hingga saat ini,{" "}
              <span className="font-medium text-black">HIMATIK</span> tetap
              konsisten menjadi garda terdepan dalam mendukung pengembangan
              potensi mahasiswa, memperkuat rasa kekeluargaan, serta menjaga
              eksistensi mahasiswa sebagai agen perubahan.
            </p>
          </div>

          {/* Clear float supaya layout setelahnya normal */}
          <div className="clear-both" />
        </div>
      </div>
    </motion.section>
  );
}
