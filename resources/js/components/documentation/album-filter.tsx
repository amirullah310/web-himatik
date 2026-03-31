import { motion } from 'framer-motion';
import { Search, Folder, Download } from 'lucide-react';
import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface Media {
  id: number;
  file: string;
  thumbnail_file?: string;
}

interface Album {
  id: number;
  name: string;
  media_count: number;
  preview_media: Media[];
  all_media?: Media[];
  media?: Media[];
}

interface AlbumFilterProps {
  albums: Album[];
  selectedAlbumName: string;
  setSelectedAlbumName: React.Dispatch<React.SetStateAction<string>>;
  currentSearch: string;
  setCurrentSearch: React.Dispatch<React.SetStateAction<string>>;
}

const fadeInSlideUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

declare global {
  interface Window {
    _searchTimeout?: ReturnType<typeof setTimeout>;
  }
}

const AlbumFilter: React.FC<AlbumFilterProps> = ({
  albums,
  selectedAlbumName,
  setSelectedAlbumName,
  currentSearch,
  setCurrentSearch,
}) => {
  const [downloadingAlbumId, setDownloadingAlbumId] = useState<number | null>(
    null
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setCurrentSearch(newSearch);
    if (window._searchTimeout) clearTimeout(window._searchTimeout);
    window._searchTimeout = setTimeout(() => {
      console.log('Searching for:', newSearch);
    }, 300);
  };

  // 🔽 Fungsi download semua media dalam album
  const handleDownloadAlbum = async (album: Album) => {
    const mediaList = album.media || album.all_media || album.preview_media || [];

    if (mediaList.length === 0) {
      return alert('Album ini tidak memiliki media.');
    }

    setDownloadingAlbumId(album.id);

    try {
      // Jika hanya 1 file → download langsung
      if (mediaList.length === 1) {
        const singleFile = mediaList[0];
        const fileUrl = `/storage/${singleFile.file}`;
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = singleFile.file.split('/').pop() || 'media';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setDownloadingAlbumId(null);
        return;
      }

      // Jika banyak file → buat ZIP
      const zip = new JSZip();
      for (const media of mediaList) {
        const fileUrl = `/storage/${media.file}`;
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const fileName = media.file.split('/').pop() || `media-${media.id}`;
        zip.file(fileName, blob);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, `${album.name.replace(/\s+/g, '_')}.zip`);
    } catch (error) {
      console.error(error);
      alert('Gagal mengunduh album.');
    } finally {
      setDownloadingAlbumId(null);
    }
  };

  // Filter album berdasarkan pencarian
  const filteredAlbums = albums.filter((album) =>
    album.name.toLowerCase().includes(currentSearch.toLowerCase())
  );

  // Tambahkan opsi "Semua Album" di awal list
  const displayAlbums = [
    { id: 0, name: 'Semua Album', media_count: 0, preview_media: [] },
    ...filteredAlbums,
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInSlideUp}
      className="
        flex flex-col gap-3 
        w-full 
        sm:max-w-sm 
        lg:max-w-xs 
        mx-auto 
        lg:mx-0 
        px-2 sm:px-0
      "
    >
      <h3 className="text-sm font-medium text-gray-600 text-center sm:text-left">
        Pilih Album
      </h3>

      {/* Input Pencarian */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Cari album..."
          value={currentSearch}
          onChange={handleSearchChange}
          className="
            w-full rounded-md border border-gray-300 
            py-2 pl-3 pr-9 text-sm text-gray-800 
            placeholder-gray-400
            focus:border-purple-400 focus:ring-1 focus:ring-purple-400
            transition
          "
        />
        <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>

      {/* List Album */}
      <div className="flex flex-col divide-y divide-gray-200 border rounded-md overflow-hidden">
        {displayAlbums.length > 0 ? (
          displayAlbums.map((album) => (
            <div
              key={album.id}
              className={`flex items-center justify-between w-full px-3 py-2 text-sm transition-colors duration-200
                ${
                  selectedAlbumName === album.name ||
                  (album.name === 'Semua Album' && selectedAlbumName === '')
                    ? 'bg-purple-100 font-medium text-purple-700'
                    : 'hover:bg-purple-50 text-gray-700'
                }
              `}
            >
              {/* Tombol pilih album */}
              <button
                onClick={() =>
                  setSelectedAlbumName(
                    album.name === 'Semua Album' ? '' : album.name
                  )
                }
                className="flex items-center gap-2 flex-1 text-left"
              >
                <Folder className="h-4 w-4 text-gray-500" />
                <span>{album.name}</span>
              </button>

              {/* Tombol download album */}
              {album.id !== 0 && album.media_count > 0 && (
                <button
                  onClick={() => handleDownloadAlbum(album)}
                  className="ml-2 p-1.5 text-gray-500 hover:text-purple-600 transition"
                  title="Download semua media di album ini"
                  disabled={downloadingAlbumId === album.id}
                >
                  {downloadingAlbumId === album.id ? (
                    <span className="text-xs text-purple-600 animate-pulse">
                      Memproses...
                    </span>
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm p-3 text-center">
            Tidak ada album ditemukan
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default AlbumFilter;
