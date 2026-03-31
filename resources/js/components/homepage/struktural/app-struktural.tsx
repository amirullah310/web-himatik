'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

type Struktur = {
  id: number;
  name: string;
  position: string;
  picture?: string | null;
  structure_id?: number | null;
  division?: string | null;
};

const toTitleCase = (text: string) =>
  text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export default function AppStrukturalPage({ strukturalList }: { strukturalList: Struktur[] }) {
  const grouped = strukturalList.reduce<Record<string, Struktur[]>>((acc, person) => {
    const division =
      person.division && person.division.trim() !== ''
        ? 'Departemen ' + toTitleCase(person.division)
        : 'Pengurus Inti';
    if (!acc[division]) acc[division] = [];
    acc[division].push(person);
    return acc;
  }, {});

  const divisionNames = Object.keys(grouped);
  const [selectedDivision, setSelectedDivision] = useState(divisionNames[0] || '');

  return (
    <section className="relative flex min-h-screen bg-[#fafafa] text-gray-900">
      <div className="relative z-10 mx-auto flex w-full max-w-[1290px] flex-col md:flex-row px-4 py-20 md:px-10 gap-10">
        {/* SIDEBAR */}
        <aside className="md:w-1/4 w-full bg-white rounded-2xl shadow-md border border-gray-100 p-6 h-fit md:sticky md:top-24">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-6 border-b border-gray-200 pb-3">
            Departemen
          </h2>
          <ul className="space-y-3">
            {divisionNames.map((division) => (
              <motion.li
                key={division}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => setSelectedDivision(division)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedDivision === division
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  {division}
                </button>
              </motion.li>
            ))}
          </ul>
        </aside>

        {/* MAIN CONTENT */}
        <main className="md:w-3/4 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDivision}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 border-b border-gray-200 pb-3">
                {selectedDivision}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {grouped[selectedDivision]?.map((person, i) => (
                  <motion.div
                    key={person.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                  >
                    <Tilt
                      tiltMaxAngleX={10}
                      tiltMaxAngleY={10}
                      glareEnable={true}
                      glareMaxOpacity={0.15}
                      scale={1.03}
                    >
                      <div className="group relative flex flex-col items-center rounded-xl bg-white p-5 text-center shadow-sm border border-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-gray-300">
                        <div className="mb-5 aspect-[3/4] w-full overflow-hidden rounded-lg relative">
                          <img
                            src={person.picture ?? '/images/default-profile.png'}
                            alt={person.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {toTitleCase(person.name)}
                        </h3>
                        <p className="text-sm font-medium text-gray-600">
                          {toTitleCase(person.position)}
                        </p>
                      </div>
                    </Tilt>
                  </motion.div>
                ))}
              </div>

              {(!grouped[selectedDivision] || grouped[selectedDivision].length === 0) && (
                <div className="text-center text-gray-500 italic py-20">
                  Tidak ada anggota untuk divisi ini.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </section>
  );
}
