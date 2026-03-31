import { motion } from 'framer-motion';
import React from 'react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
    handlePaginationClick: (url: string | null) => void;
}

const fadeInSlideUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Pagination: React.FC<PaginationProps> = ({ links, handlePaginationClick }) => {
    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInSlideUp}
            className="mt-20 flex justify-center space-x-2"
        >
            {links.map((link) => (
                <button
                    key={link.label}
                    onClick={() => handlePaginationClick(link.url)}
                    disabled={!link.url}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors duration-200 border 
                        ${
                            link.active
                                ? 'bg-[#FECA00] text-black border-[#FECA00] shadow-md'
                                : 'bg-white text-black border-gray-300 hover:bg-[#FECA00]/20 hover:text-[#FECA00]'
                        } 
                        ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                />
            ))}
        </motion.div>
    );
};

export default Pagination;
