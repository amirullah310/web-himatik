import { motion } from "framer-motion";

// Fungsi untuk generate partikel random
const generateParticles = (count: number) => {
  const shapes = ["circle", "square", "star"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 12 + 8, // ukuran 8px – 20px
    top: Math.random() * 100, // posisi vertikal (vh)
    left: Math.random() * 100, // posisi horizontal (vw)
    duration: Math.random() * 20 + 15, // 15s – 35s
    delay: Math.random() * 10,
    shape: shapes[Math.floor(Math.random() * shapes.length)], // bentuk random
  }));
};

// Komponen partikel
const Particle = ({ p }: { p: any }) => {
  const baseStyle: React.CSSProperties = {
    position: "absolute",
    top: `${p.top}vh`,
    left: `${p.left}vw`,
    width: `${p.size}px`,
    height: `${p.size}px`,
    backgroundColor: "rgba(254,202,0,0.6)", // kuning transparan
    boxShadow: "0 0 12px rgba(254,202,0,0.5)",
  };

  // Bentuk
  if (p.shape === "circle") {
    baseStyle.borderRadius = "50%";
  } else if (p.shape === "star") {
    baseStyle.backgroundColor = "transparent";
    baseStyle.boxShadow = "none";
  }

  return (
    <motion.span
      initial={{ y: "100vh", opacity: 0, rotate: 0 }}
      animate={{
        y: ["100vh", "-20vh"],
        opacity: [0, 1, 0],
        rotate: p.shape === "square" ? [0, 360] : 0,
      }}
      transition={{
        duration: p.duration,
        repeat: Infinity,
        delay: p.delay,
        ease: "easeInOut",
      }}
      style={baseStyle}
    >
      {/* Custom bentuk bintang ✨ */}
      {p.shape === "star" && (
        <svg
          viewBox="0 0 24 24"
          fill="rgba(254,202,0,0.8)"
          stroke="rgba(254,202,0,0.9)"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        >
          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.78 1.402 8.173L12 18.896l-7.336 3.867 1.402-8.173L.132 9.21l8.2-1.192z" />
        </svg>
      )}
    </motion.span>
  );
};

export default function AppBackgroundAnimation() {
  const particles = generateParticles(20); // jumlah partikel

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {particles.map((p) => (
        <Particle key={p.id} p={p} />
      ))}
    </div>
  );
}
