import logo from '@/assets/images/logoo.png';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React from 'react';

const AppLoading: React.FC = () => {
  // ✨ Teks muncul 1/1 huruf dengan lembut
  const textVariants = {
    hidden: { opacity: 0, x: 12 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 1.2 + i * 0.1,
        duration: 0.4,
        ease: [0.42, 0, 0.58, 1],
      },
    }),
  };

  return (
    <>
      <Head>
        <title>HIMATIK - PNL</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-[#f5f0fa] to-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        {/* ⚙️ Logo dan teks */}
        <div className="relative z-10 flex items-center">
          {/* Logo bergerak halus dari kanan ke kiri */}
          <motion.div
            className="rounded-full p-3 md:p-5 lg:p-6 shadow-2xl bg-white/40 backdrop-blur-md"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: -20, opacity: 1 }}
            transition={{
              duration: 2.4,
              ease: [0.25, 1, 0.5, 1],
            }}
          >
            <motion.img
              src={logo}
              alt="HIMATIK Logo"
              className="h-16 w-16 md:h-24 md:w-24 lg:h-28 lg:w-28 object-contain drop-shadow-[0_0_25px_rgba(147,51,234,0.8)]"
              animate={{
                scale: [1, 1.05, 1],
                filter: [
                  'drop-shadow(0 0 15px rgba(147,51,234,0.5))',
                  'drop-shadow(0 0 35px rgba(147,51,234,0.9))',
                  'drop-shadow(0 0 15px rgba(147,51,234,0.5))',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* ✨ Teks HIMATIK muncul lembut mengikuti gerak logo */}
          <motion.div
            className="ml-3 flex text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-purple-300"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              WebkitTextStroke: '0.8px white',
            }}
          >
            {'HIMATIK'.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={textVariants}
                initial="hidden"
                animate="visible"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default AppLoading;
