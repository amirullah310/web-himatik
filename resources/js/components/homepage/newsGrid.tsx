import React from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { BookOpen, Layers, Lightbulb, Users } from "lucide-react";
import bgHero from "@/assets/images/image.png";

const cards = [
  { id: 1, title: "Revolutionise Your Workspace With Us At Gridworks", tag: "Entrepreneurship", icon: <Lightbulb className="w-4 h-4" /> },
  { id: 2, title: "Coworking Spaces Built For Your Start Startups", tag: "Startups Weekly", icon: <Layers className="w-4 h-4" /> },
  { id: 3, title: "Everything Your Team Could Need, We Have Got It", tag: "Week in Review", icon: <Users className="w-4 h-4" /> },
  { id: 4, title: "How to grow and scale your business without hiring more people", tag: "Creativity", icon: <BookOpen className="w-4 h-4" /> },
  { id: 5, title: "How training my brain to focus helped me to build two profitable businesses", tag: "Motivation", icon: <Lightbulb className="w-4 h-4" /> },
  { id: 6, title: "How to escape competition (and build a business on your own terms)", tag: "Personal Development", icon: <Users className="w-4 h-4" /> },
  { id: 7, title: "Sell Something Bigger Than Your Otherwise Boring Business", tag: "Life Lessons", icon: <BookOpen className="w-4 h-4" /> },
  { id: 8, title: "The unofficial (slightly sarcastic) thesaurus for business buzzwords", tag: "Business", icon: <Layers className="w-4 h-4" /> },
  { id: 9, title: "Bootstrapping Guide: How to Start a Business with No Money", tag: "Innovation", icon: <Lightbulb className="w-4 h-4" /> },
];

const widthLayout = [
  ["w-[400px]", "w-[400px]", "w-[400px]"],
  ["w-[500px]", "w-[350px]", "w-[380px]"],
  ["w-[600px]", "w-[300px]", "w-[320px]"],
];

export default function NewsGrid() {
  const containerVariants = {
    visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.08 } },
    hidden: { opacity: 0 },
  };

  const itemVariants = {
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
    hidden: { opacity: 0, y: 30, scale: 0.95 },
  };

  return (
    <section className="py-10 flex justify-center mb-20">
      <div className="w-[1250px]">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Galeri Artikel</h2>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col gap-6"
        >
          {widthLayout.map((rowWidths, rowIndex) => (
            <div key={rowIndex} className="flex gap-6 justify-between">
              {cards.slice(rowIndex * 3, rowIndex * 3 + 3).map((card, cardIndex) => (
                <motion.div
                  key={card.id}
                  variants={itemVariants}
                  className={`overflow-hidden rounded-2xl bg-white relative group h-56 ${rowWidths[cardIndex]} transition-all duration-300`}
                  style={{
                    boxShadow: `
                      inset 0 0 25px rgba(168, 85, 247, 0.4),
                      inset 0 0 50px rgba(168, 85, 247, 0.15)
                    `, // ungu lembut selalu aktif
                  }}
                >
                  {/* Background */}
                  <div className="relative h-full">
                    <img
                      src={bgHero}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70" />
                  </div>

                  {/* Overlay text */}
                  <div className="absolute bottom-0 p-4 text-white">
                    <h3 className="text-lg font-semibold leading-tight mb-2 group-hover:text-purple-400 transition-colors">
                      {card.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="flex items-center gap-1 text-gray-200">{card.icon}</span>
                      <span className="bg-purple-500/90 text-white px-2 py-1 rounded-md shadow-inner shadow-purple-400/40">
                        {card.tag}
                      </span>
                    </div>
                  </div>

                  <Link href="#" className="absolute inset-0" />
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
