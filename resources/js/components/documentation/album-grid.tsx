import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Share2,
  Download,
  Eye,
  X,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface Media {
  id: number;
  file: string;
  thumbnail_file?: string;
  width?: number;
  height?: number;
}

interface Album {
  id: number;
  name: string;
  media_count: number;
  created_at?: string;
  preview_media: Media[];
  all_media?: Media[];
  media?: Media[];
  can_edit?: boolean;
}

interface AlbumGridProps {
  albums: Album[];
}

const AlbumGrid: React.FC<AlbumGridProps> = ({ albums }) => {
  const allMedia: (Media & {
    albumName: string;
    albumId: number;
    can_edit?: boolean;
  })[] = albums.flatMap((album) =>
    (album.media || album.all_media || album.preview_media || []).map((m) => ({
      ...m,
      albumName: album.name,
      albumId: album.id,
      can_edit: album.can_edit,
    }))
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedMediaIds, setSelectedMediaIds] = useState<number[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const isVideo = (fileName: string) => {
    if (!fileName) return false;
    const videoExtensions = ['.mp4', '.webm', '.mkv', '.avi'];
    return videoExtensions.some((ext) => fileName.toLowerCase().endsWith(ext));
  };

  const handleShare = async (albumId: number, albumName: string) => {
    const url = `${window.location.origin}/dokumentasi/albums/${albumId}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: albumName,
          text: 'Lihat album ini!',
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link album disalin ke clipboard!');
      }
    } catch {
      alert('Gagal membagikan album.');
    }
  };

  const handleViewMedia = (mediaPath: string, isVid: boolean) => {
    if (isVid) setSelectedVideo(mediaPath);
    else setSelectedImage(mediaPath);
  };

  const handleDownloadImage = (media: Media) => {
    try {
      const url = `/storage/${media.file}`;
      const a = document.createElement('a');
      a.href = url;
      a.download = media.file.split('/').pop() || 'media';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      alert('Gagal mengunduh media.');
    }
  };

  const handleDownloadSelected = async () => {
    if (selectedMediaIds.length === 0)
      return alert('Tidak ada foto yang dipilih.');

    const selectedItems = allMedia.filter((m) =>
      selectedMediaIds.includes(m.id)
    );

    if (selectedItems.length === 1) {
      return handleDownloadImage(selectedItems[0]);
    }

    setIsDownloading(true);
    try {
      const zip = new JSZip();

      for (const media of selectedItems) {
        const fileUrl = `/storage/${media.file}`;
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const fileName = media.file.split('/').pop() || `media-${media.id}`;
        zip.file(fileName, blob);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, 'media-terpilih.zip');
    } catch (error) {
      console.error(error);
      alert('Gagal membuat file ZIP.');
    } finally {
      setIsDownloading(false);
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedMediaIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedMediaIds.length === allMedia.length) {
      setSelectedMediaIds([]);
    } else {
      setSelectedMediaIds(allMedia.map((m) => m.id));
    }
  };

  const containerVariants = {
    visible: {
      opacity: 1,
      transition: { when: 'beforeChildren', staggerChildren: 0.07 },
    },
    hidden: { opacity: 0 },
  };

  const itemVariants = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    hidden: { opacity: 0, y: 30, scale: 0.95 },
  };

  return (
    <div className="mx-auto max-w-7xl px-4">
      {allMedia.length > 0 && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Galeri ({allMedia.length} foto/video)
          </h2>

          <div className="flex items-center gap-3">
            {selectionMode ? (
              <>
                <button
                  onClick={toggleSelectAll}
                  className="text-sm px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  {selectedMediaIds.length === allMedia.length
                    ? 'Batalkan Pilih Semua'
                    : 'Pilih Semua'}
                </button>

                <button
                  onClick={handleDownloadSelected}
                  disabled={isDownloading}
                  className={`text-sm px-3 py-1.5 rounded-md flex items-center gap-1 ${
                    isDownloading
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  <Download className="h-4 w-4" />{' '}
                  {isDownloading ? 'Sedang memproses...' : 'Download Terpilih'}
                </button>

                <button
                  onClick={() => {
                    setSelectionMode(false);
                    setSelectedMediaIds([]);
                  }}
                  className="text-sm px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300"
                >
                  Selesai
                </button>
              </>
            ) : (
              <button
                onClick={() => setSelectionMode(true)}
                className="text-sm px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Pilih Foto
              </button>
            )}
          </div>
        </div>
      )}

      {allMedia.length > 0 ? (
        <>
<motion.div
  initial="hidden"
  animate="visible"
  variants={containerVariants}
  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
>

            {allMedia.map((media) => {
              const mediaPath = `/storage/${media.thumbnail_file || media.file}`;
              const isVid = isVideo(media.file);
              const isSelected = selectedMediaIds.includes(media.id);

              return (
                <motion.div
                  key={media.id}
                  variants={itemVariants}
                  className={`relative group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-500 ${
                    isSelected ? 'ring-4 ring-blue-500' : ''
                  }`}
                >
                  <div className="relative w-full aspect-square overflow-hidden">
                    {isVid ? (
                      <video
                        src={mediaPath}
                        className="w-full h-full object-cover"
                        preload="metadata"
                        playsInline
                        muted
                      />
                    ) : (
                      <img
                        src={mediaPath}
                        alt={media.albumName}
                        className="w-full h-full object-cover transform group-hover:scale-[1.05] transition-transform duration-500 ease-out"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://placehold.co/600x600/EEE/AAA?text=No+Image';
                        }}
                      />
                    )}

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Album name */}
                    <div className="absolute bottom-0 left-0 w-full px-3 py-2 text-white text-sm font-medium">
                      {media.albumName}
                    </div>

                    {/* ✅ Checkbox Select Mode */}
                    {selectionMode && (
                      <button
                        onClick={() => toggleSelect(media.id)}
                        className="absolute top-2 left-2 bg-white/80 hover:bg-white text-blue-600 rounded-full p-1.5"
                      >
                        {isSelected ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <Circle className="h-5 w-5" />
                        )}
                      </button>
                    )}

                    {/* Action buttons */}
                    {!selectionMode && (
                      <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleShare(media.albumId, media.albumName);
                          }}
                          title="Bagikan album"
                          className="bg-black/40 hover:bg-black/70 p-1.5 rounded-full text-white"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleViewMedia(`/storage/${media.file}`, isVid);
                          }}
                          title="Lihat media"
                          className="bg-black/40 hover:bg-black/70 p-1.5 rounded-full text-white"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleDownloadImage(media);
                          }}
                          title="Download media"
                          className="bg-black/40 hover:bg-black/70 p-1.5 rounded-full text-white"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Modal Preview */}
          <AnimatePresence>
            {(selectedImage || selectedVideo) && (
              <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="relative max-w-5xl max-h-[90vh] p-4">
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setSelectedVideo(null);
                    }}
                    className="absolute -top-10 right-0 text-white hover:text-gray-300"
                  >
                    <X className="h-6 w-6" />
                  </button>

                  {selectedVideo ? (
                    <video
                      src={selectedVideo}
                      controls
                      className="max-h-[80vh] w-auto rounded-xl shadow-lg"
                    />
                  ) : (
                    <img
                      src={selectedImage!}
                      alt="Preview"
                      className="max-h-[80vh] w-auto rounded-xl shadow-lg object-contain"
                    />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="py-20 text-center text-gray-500">
          <Camera className="mx-auto h-12 w-12 mb-3 text-gray-400" />
          <p className="text-lg">Tidak ada media yang ditemukan.</p>
        </div>
      )}
    </div>
  );
};

export default AlbumGrid;
