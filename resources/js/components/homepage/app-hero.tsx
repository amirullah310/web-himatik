"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import bgVideo1 from "@/assets/images/PDKT2.mp4";
import bgVideo2 from "@/assets/images/PDKT2.mp4";
import bgVideo3 from "@/assets/images/PDKT2.mp4";
import bgVideo4 from "@/assets/images/PDKT2.mp4";

const videos = [
  { id: 0, src: bgVideo1, title: "PDKT TIK 2023" },
  { id: 1, src: bgVideo2, title: "Musyawarah Wilayah 2025" },
  { id: 2, src: bgVideo3, title: "PORMATIK 2025" },
  { id: 3, src: bgVideo4, title: "PKKMB JURUSAN TIK 2025" },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(10);
  const videoRef = useRef(null);

  // Ambil durasi asli video
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration)) {
      setDuration(video.duration);
    } else {
      setDuration(5); // fallback jika gambar
    }
  };

  // Progress bar jalan sesuai durasi video
  useEffect(() => {
    setProgress(0);
    let progressInterval;
    let switchTimeout;

    const totalDuration = duration * 1000;
    const stepTime = totalDuration / 100;

    progressInterval = setInterval(() => {
      setProgress((p) => (p < 100 ? p + 1 : 100));
    }, stepTime);

    switchTimeout = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
      setProgress(0);
    }, totalDuration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(switchTimeout);
    };
  }, [current, duration]);

  return (
    <section
      id="home"
      className="relative flex items-center w-full overflow-hidden text-white"
      style={{ height: "100dvh" }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          key={videos[current].id}
          ref={videoRef}
          src={videos[current].src}
          autoPlay
          muted
          playsInline
          onLoadedMetadata={handleLoadedMetadata}
          className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto max-w-[1310px] px-6 sm:px-8 lg:px-12 mt-5 flex flex-col justify-center h-full ">
        <motion.div
          className="flex flex-col items-start text-left space-y-5 sm:space-y-6"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block rounded-full bg-purple-500/90 px-5 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-black shadow-md"
          >
            SELAMAT DATANG DI
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="font-extrabold leading-tight tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-6xl space-y-1 drop-shadow-2xl"
          >
            <div className="text-white">Himpunan Mahasiswa</div>
            <div className="text-purple-500">Teknologi Informasi dan</div>
            <div className="text-purple-500">Komputer</div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-xl text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed"
          >
            Kami adalah wadah bagi mahasiswa untuk berkembang di bidang teknologi informasi,
            membangun kreativitas, dan memperkuat solidaritas.
          </motion.p>
        </motion.div>
      </div>

      {/* Overlay bawah */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-10" />

      {/* Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 ">
        {/* Desktop View */}
        <div className="hidden sm:flex justify-between px-10 sm:px-36 py-4">
          {videos.map((v, index) => (
            <div
              key={v.id}
              onClick={() => {
                setCurrent(index);
                setProgress(0);
              }}
              className={`relative cursor-pointer w-full flex flex-col items-start group transition-all duration-300 ${
                index === current ? "text-white" : "text-gray-400"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    index === current ? "bg-purple-500" : "bg-gray-500"
                  }`}
                />
                <span
                  className={`text-sm sm:text-base font-medium ${
                    index === current ? "font-semibold" : "opacity-70"
                  }`}
                >
                  {v.title}
                </span>
              </div>

              {/* progress bar bawah */}
              <div className="mt-1 h-[2px] w-full bg-white/20 overflow-hidden rounded-full">
                {index === current && (
                  <motion.div
                    className="h-full bg-purple-500"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="flex sm:hidden flex-col justify-center items-center px-6 py-3 text-center space-y-2">
          {/* Judul + Progress */}
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-sm font-medium">{videos[current].title}</span>
            </div>
            <div className="h-[2px] w-full bg-white/20 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-purple-500"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Indikator antar video */}
          <div className="flex justify-center items-center gap-2 mt-2">
            {videos.map((v, index) => (
              <div
                key={v.id}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  index === current ? "bg-purple-500 scale-110" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
