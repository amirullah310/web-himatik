import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className }) => {
  const { ref, inView } = useInView({
    threshold: 0.2, // 20% bagian terlihat → trigger
    triggerOnce: false, // biar bisa bolak-balik
  });

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
