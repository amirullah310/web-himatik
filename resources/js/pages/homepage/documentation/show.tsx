import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import AppFooter from '@/components/homepage/app-footer';
import AppHeader from '@/components/homepage/app-header';
import AppLoading from '@/components/homepage/app-loading';
import Pagination from '@/components/homepage/blog/Pagination';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, ChevronRight, Eye, X, List, Grid3x3 } from 'lucide-react';
import axios from 'axios';
import SectionLabelBlog from '@/components/Blog/app-label';
interface Media {
  id: number;
  file: string;
  caption: string;
  thumbnail_file?: string;
}

interface Album {
  id: number;
  name: string;
  media: Media[];
}

interface AlbumShowPageProps {
  album: Album;
}

const AlbumShowPage: React.FC<AlbumShowPageProps> = ({ album }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState<number | null>(null);
  const [mediaCurrentPage, setMediaCurrentPage] = useState(1);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedMediaIds, setSelectedMediaIds] = useState<number[]>([]);
  const [isGridView, setIsGridView] = useState(true);
  const mediaPerPage = 12;

  const activeMediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMediaCurrentPage(1);
  }, [album.id]);

  const sortedMedia = [...(album.media || [])].sort((a, b) => b.id - a.id);

  const totalMediaPages = Math.ceil(sortedMedia.length / mediaPerPage);
  const mediaIndexOfLastItem = mediaCurrentPage * mediaPerPage;
  const mediaIndexOfFirstItem = mediaIndexOfLastItem - mediaPerPage;
  const paginatedMedia = sortedMedia.slice(mediaIndexOfFirstItem, mediaIndexOfLastItem);

  const handleMediaPaginationClick = useCallback((url: string | null) => {
    if (url) {
      setMediaCurrentPage(parseInt(url));
      const mediaSection = document.getElementById('media-gallery-section');
      if (mediaSection) {
        window.scrollTo({ top: mediaSection.offsetTop - 100, behavior: 'smooth' });
      }
    }
  }, []);

  // Pagination links
  const mediaPaginationLinks = [
    {
      url: mediaCurrentPage > 1 ? String(mediaCurrentPage - 1) : null,
      label: '« Previous',
      active: false,
    },
    ...Array.from({ length: totalMediaPages }, (_, i) => ({
      url: String(i + 1),
      label: String(i + 1),
      active: i + 1 === mediaCurrentPage,
    })),
    {
      url: mediaCurrentPage < totalMediaPages ? String(mediaCurrentPage + 1) : null,
      label: 'Next »',
      active: false,
    },
  ];

  const isVideo = (fileName: string) => {
    const videoExtensions = ['.mp4', '.webm', '.mkv', '.avi'];
    return videoExtensions.some((ext) => fileName.toLowerCase().endsWith(ext));
  };

  const openLightbox = useCallback(
    (item: Media) => {
      if (isSelecting) {
        toggleSelectMedia(item.id);
        return;
      }
      const index = paginatedMedia.findIndex((m) => m.id === item.id);
      if (index !== -1) {
        setSelectedMedia(item);
        setCurrentMediaIndex(index);
      }
    },
    [paginatedMedia, isSelecting]
  );

  const closeLightbox = useCallback(() => {
    setSelectedMedia(null);
    setCurrentMediaIndex(null);
  }, []);

  const handleNextMedia = useCallback(() => {
    if (currentMediaIndex !== null && currentMediaIndex < paginatedMedia.length - 1) {
      const nextIndex = currentMediaIndex + 1;
      setSelectedMedia(paginatedMedia[nextIndex] || null);
      setCurrentMediaIndex(nextIndex);
    }
  }, [currentMediaIndex, paginatedMedia]);

  const handlePrevMedia = useCallback(() => {
    if (currentMediaIndex !== null && currentMediaIndex > 0) {
      const prevIndex = currentMediaIndex - 1;
      setSelectedMedia(paginatedMedia[prevIndex] || null);
      setCurrentMediaIndex(prevIndex);
    }
  }, [currentMediaIndex, paginatedMedia]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedMedia) {
        if (event.key === 'ArrowRight') handleNextMedia();
        else if (event.key === 'ArrowLeft') handlePrevMedia();
        else if (event.key === 'Escape') closeLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMedia, handleNextMedia, handlePrevMedia, closeLightbox]);

  const toggleSelectMode = () => {
    setIsSelecting(!isSelecting);
    if (!isSelecting) setSelectedMediaIds([]);
  };

  const toggleSelectMedia = (id: number) => {
    setSelectedMediaIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const downloadSelected = async () => {
    if (selectedMediaIds.length === 0) return;
    const selectedFiles = album.media
      .filter((m) => selectedMediaIds.includes(m.id))
      .map((m) => m.file);

    try {
      const response = await axios.post(
        '/download-media',
        { media: selectedFiles },
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'media-download.zip');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Gagal mengunduh file:', error);
    }
  };

  if (isLoading) return <AppLoading />;

  const hasPrev = currentMediaIndex !== null && currentMediaIndex > 0;
  const hasNext = currentMediaIndex !== null && currentMediaIndex < paginatedMedia.length - 1;

  return (
    <>
      <Head title={`${album.name} - Dokumentasi`} />
      <AppHeader />

      <main className="min-h-screen bg-white text-black">
        {/* HEADER */}
        <SectionLabelBlog/>

        {/* TOOLBAR */}
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link
            href="/dokumentasi"
            className="inline-flex items-center gap-2 text-[#FECA00] hover:text-yellow-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Semua Album
          </Link>

          <div className="flex items-center gap-3">
            {/* TOGGLE VIEW */}
            <button
              onClick={() => setIsGridView(!isGridView)}
              className="flex items-center gap-2 rounded-full border border-gray-300 bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              {isGridView ? (
                <>
                  <List className="h-4 w-4" /> List
                </>
              ) : (
                <>
                  <Grid3x3 className="h-4 w-4" /> Grid
                </>
              )}
            </button>

            {/* SELECT MODE */}
            <button
              onClick={toggleSelectMode}
              className="px-3 py-1.5 rounded bg-gray-200 hover:bg-gray-300 text-sm font-medium"
            >
              {isSelecting ? 'Batal Pilih' : 'Pilih Foto'}
            </button>

            {/* SELECT ACTIONS */}
            {isSelecting && (
              <>
                <button
                  onClick={() => {
                    if (selectedMediaIds.length === paginatedMedia.length) {
                      setSelectedMediaIds([]);
                    } else {
                      setSelectedMediaIds(paginatedMedia.map((m) => m.id));
                    }
                  }}
                  className="px-3 py-1.5 rounded bg-gray-200 hover:bg-gray-300 text-sm font-medium"
                >
                  {selectedMediaIds.length === paginatedMedia.length
                    ? 'Batal Semua'
                    : 'Pilih Semua'}
                </button>

                {selectedMediaIds.length > 0 && (
                  <button
                    onClick={downloadSelected}
                    className="px-3 py-1.5 rounded bg-[#FECA00] hover:bg-yellow-500 text-sm font-medium"
                  >
                    Download {selectedMediaIds.length}
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* GRID / LIST */}
{/* GRID / LIST */}
<section id="media-gallery-section" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
  <AnimatePresence mode="wait">
    <motion.div
      key={isGridView ? 'grid' : 'list'}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {isGridView ? (
        // === GRID VIEW ===
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {paginatedMedia.map((item) => {
            const mediaPath = `/storage/${item.thumbnail_file || item.file}`;
            return (
              <motion.div
                key={item.id}
                className="group relative flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
                onClick={() => openLightbox(item)}
                whileHover={{ scale: 1.01 }}
              >
                <div className="relative w-full pb-[70%] bg-gray-100 overflow-hidden">
                  {isVideo(item.file) ? (
                    <video
                      src={mediaPath}
                      className="absolute inset-0 h-full w-full object-cover"
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={mediaPath}
                      alt={item.caption}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </div>

                <div className="w-full p-3 text-center">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {item.caption || 'Tanpa keterangan'}
                  </p>
                </div>

                {isSelecting && (
                  <div
                    className="absolute top-2 left-2 z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={selectedMediaIds.includes(item.id)}
                      onChange={() => toggleSelectMedia(item.id)}
                      className="h-5 w-5 cursor-pointer accent-[#FECA00]"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      ) : (
        // === LIST VIEW ===
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th scope="col" className="px-6 py-3 font-semibold">Nama</th>
                <th scope="col" className="px-6 py-3 font-semibold">Keterangan</th>
                <th scope="col" className="px-6 py-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMedia.map((item) => {
                const mediaPath = `/storage/${item.thumbnail_file || item.file}`;
                return (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => openLightbox(item)}
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      {isVideo(item.file) ? (
                        <video
                          src={mediaPath}
                          className="h-10 w-14 object-cover rounded"
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={mediaPath}
                          alt={item.caption}
                          className="h-10 w-14 object-cover rounded"
                        />
                      )}
                      <span className="truncate font-medium">{item.caption || 'Tanpa nama'}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 truncate">
                      File media #{item.id}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isSelecting ? (
                        <input
                          type="checkbox"
                          checked={selectedMediaIds.includes(item.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleSelectMedia(item.id);
                          }}
                          className="h-5 w-5 cursor-pointer accent-[#FECA00]"
                        />
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openLightbox(item);
                          }}
                          className="text-[#FECA00] hover:text-yellow-500 font-medium"
                        >
                          Lihat
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  </AnimatePresence>

  {totalMediaPages > 1 && (
    <Pagination
      links={mediaPaginationLinks}
      handlePaginationClick={handleMediaPaginationClick}
    />
  )}
</section>

      </main>

      <AppFooter />

      {/* LIGHTBOX */}
      <Dialog open={!!selectedMedia} onOpenChange={closeLightbox}>
        <DialogContent className="!fixed !top-1/2 !left-1/2 flex max-h-[95vh] max-w-screen-2xl -translate-x-1/2 -translate-y-1/2 flex-col justify-between overflow-hidden rounded-lg bg-black p-0 shadow-2xl">
          <DialogTitle className="sr-only">Pratinjau Media</DialogTitle>

          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-40 rounded-md bg-white/10 p-2 text-white hover:bg-[#FECA00]/30"
          >
            <X className="h-5 w-5" />
          </button>

          {hasPrev && (
            <button
              onClick={handlePrevMedia}
              className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-[#FECA00]/30"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          )}
          {hasNext && (
            <button
              onClick={handleNextMedia}
              className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-[#FECA00]/30"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          <div className="flex h-full w-full items-center justify-center px-12 pt-16">
            {selectedMedia &&
              (isVideo(selectedMedia.file) ? (
                <video
                  ref={activeMediaRef as React.RefObject<HTMLVideoElement>}
                  src={`/storage/${selectedMedia.file}`}
                  className="max-h-[70vh] max-w-full rounded-md object-contain"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  ref={activeMediaRef as React.RefObject<HTMLImageElement>}
                  src={`/storage/${selectedMedia.file}`}
                  alt={selectedMedia.caption}
                  className="max-h-[70vh] max-w-full rounded-md object-contain"
                />
              ))}
          </div>

          {selectedMedia?.caption && (
            <div className="max-h-24 w-full flex-shrink-0 overflow-y-auto px-12 py-4 text-left text-sm text-gray-300">
              <p>{selectedMedia.caption}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AlbumShowPage;
