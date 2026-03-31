import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface ExpandableListProps {
  items: string[];
}

export const ExpandableList: React.FC<ExpandableListProps> = ({ items }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const initialCount = 3;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayedItems = isMobile ? items : isExpanded ? items : items.slice(0, initialCount);

  return (
    <>
      <ul className="space-y-5">
        <AnimatePresence initial={false}>
          {displayedItems.map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="flex items-start gap-4 rounded-2xl border border-gray-200/40 bg-white/60 p-5 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#FECA00]/40"
            >
              <div className="flex-shrink-0">
                <CheckCircle2 className="mt-1 h-6 w-6 text-[#FECA00]" strokeWidth={2.4} />
              </div>
              <span className="text-base md:text-lg leading-relaxed text-gray-800">
                {item}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {!isMobile && items.length > initialCount && (
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            className="rounded-full border border-[#FECA00]/50 px-6 text-[#FECA00] hover:bg-[#FECA00]/10 hover:text-black transition-all"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Sembunyikan' : 'Lihat Selengkapnya'}
          </Button>
        </div>
      )}
    </>
  );
};
