import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Camera, Image as ImageIcon, Video, Phone, Mail, Linkedin } from 'lucide-react';

import AppFooter from '@/components/homepage/app-footer';
import AppHeader from '@/components/homepage/app-header';
import AppLoading from '@/components/homepage/app-loading';
import AlbumFilter from '@/components/documentation/album-filter';
import AlbumGrid from '@/components/documentation/album-grid';
import DocumentationHeader from '@/components/documentation/dokumentasi-header';
import Pagination from '@/components/homepage/blog/Pagination';
import AppScrollToTop from '@/components/homepage/app-scroll-to-top';
import SectionLabelHome from '@/components/homepage/app-label-bottom';

interface Album {
  id: number;
  name: string;
  media_count: number;
  preview_media: any[];
}

interface DocumentationPageProps {
  albums: Album[];
}

const DocumentationPage: React.FC<DocumentationPageProps> = ({ albums }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAlbumName, setSelectedAlbumName] = useState<string>('');
  const [currentSearch, setCurrentSearch] = useState<string>('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 9;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.add('public-theme');
    return () => {
      document.body.classList.remove('public-theme');
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedAlbumName, currentSearch]);

  const filteredAlbums = albums.filter((album) => {
    const matchesDropdown = selectedAlbumName === '' || album.name === selectedAlbumName;
    const matchesSearch = album.name.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesDropdown && matchesSearch;
  });

  const totalPages = Math.ceil(filteredAlbums.length / albumsPerPage);
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const paginatedAlbums = filteredAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  const handleClientPaginationClick = (url: string | null) => {
    if (url) {
      setCurrentPage(parseInt(url));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const paginationLinks = [
    {
      url: currentPage > 1 ? String(currentPage - 1) : null,
      label: '« Sebelumnya',
      active: false,
    },
    ...Array.from({ length: totalPages }, (_, i) => ({
      url: String(i + 1),
      label: String(i + 1),
      active: i + 1 === currentPage,
    })),
    {
      url: currentPage < totalPages ? String(currentPage + 1) : null,
      label: 'Berikutnya »',
      active: false,
    },
  ];

  const fadeInSlideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  // Hitung statistik (dummy untuk foto/video bila belum ada data terpisah)
  const totalAlbum = albums.length;
  const totalFoto = albums.reduce((sum, album) => sum + (album.media_count || 0), 0);
  const totalVideo = Math.floor(totalFoto * 0.2); // contoh estimasi 20% dari foto

  if (isLoading) return <AppLoading />;

  return (
    <>
      <Head title="Dokumentasi - HIMATIK" />
      <AppHeader />

      <main className="min-h-screen bg-white text-gray-900">
        <DocumentationHeader />

        {/* === STATISTIK CARD SECTION === */}
        <section className="py-16 md:py-20 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[1250px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
          >
            {[
              {
                icon: <Camera className="h-5 w-5" />,
                iconBg: 'bg-blue-100',
                iconColor: 'text-blue-600',
                title: 'Total Album',
                value: totalAlbum,
                desc: 'Kumpulan momen kegiatan HIMATIK yang terdokumentasi.',
              },
              {
                icon: <ImageIcon className="h-5 w-5" />,
                iconBg: 'bg-purple-100',
                iconColor: 'text-purple-600',
                title: 'Total Foto',
                value: totalFoto,
                desc: 'Jumlah total dokumentasi foto dari seluruh kegiatan.',
              },
              {
                icon: <Video className="h-5 w-5" />,
                iconBg: 'bg-indigo-100',
                iconColor: 'text-indigo-600',
                title: 'Total Video',
                value: totalVideo,
                desc: 'Dokumentasi video kegiatan, seminar, dan event HIMATIK.',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 p-6"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor} mb-4`}
                >
                  {card.icon}
                </div>

                <h4 className="text-lg font-semibold text-gray-800 mb-1">{card.title}</h4>
                <p className="text-3xl font-bold text-gray-900 mb-2">{card.value}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Informasi tambahan */}
          {/* <div className="max-w-[1250px] mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-600 px-4">
            <div>
              <p className="font-semibold mb-1">Bergabung di Discord</p>
              <p>
                Ingin berdiskusi lebih dalam tentang dokumentasi atau event HIMATIK?
                Bergabunglah di{' '}
                <a href="#" className="text-purple-600 hover:underline">
                  server Discord resmi HIMATIK
                </a>{' '}
                dan temukan komunitas aktif kami.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Kontak Umum</p>
              <p>
                Untuk kolaborasi, publikasi, atau pertanyaan umum, kirim email ke{' '}
                <a
                  href="mailto:himatik@kbmpnl.com"
                  className="text-purple-600 hover:underline"
                >
                  himatik@kbmpnl.com
                </a>
                .
              </p>
            </div>
          </div> */}
        </section>

        {/* === MAIN SECTION (FILTER + GRID) === */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInSlideUp}
          className="mx-auto max-w-[1320px] px-6 pb-12 sm:px-8 lg:px-10"
        >
          <div
            className="
              grid 
              grid-cols-1 
              lg:grid-cols-[75%_25%] 
              gap-10
            "
          >
            {/* SIDEBAR */}
            <aside
              className="
                order-1 
                lg:order-2 
                bg-gray-50 
                border 
                border-gray-200 
                rounded-2xl 
                p-6 
                h-fit 
                sticky 
                top-24 
                shadow-md
              "
            >
              <AlbumFilter
                albums={albums}
                selectedAlbumName={selectedAlbumName}
                setSelectedAlbumName={setSelectedAlbumName}
                currentSearch={currentSearch}
                setCurrentSearch={setCurrentSearch}
              />
            </aside>

            {/* MAIN CONTENT */}
            <div className="order-2 lg:order-1 flex flex-col">
              {paginatedAlbums.length > 0 ? (
                <AlbumGrid
                  albums={paginatedAlbums}
                  className="
                    grid 
                    grid-cols-1 
                    sm:grid-cols-2 
                    lg:grid-cols-3 
                    gap-8
                  "
                />
              ) : (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInSlideUp}
                  className="rounded-xl border border-gray-200 bg-gray-50 py-12 text-center text-lg text-gray-500"
                >
                  <p>Tidak ada album yang ditemukan untuk kriteria ini.</p>
                </motion.div>
              )}

              {totalPages > 1 && (
                <div className="mt-10">
                  <Pagination
                    links={paginationLinks}
                    handlePaginationClick={handleClientPaginationClick}
                  />
                </div>
              )}
            </div>
          </div>
        </motion.section>
      </main>
            <AppScrollToTop />
            <SectionLabelHome/>
      <AppFooter />
    </>
  );
};

export default DocumentationPage;
