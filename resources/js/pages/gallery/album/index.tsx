import { AlbumFormModal } from '@/components/TableAlbum/AlbumFormModal';
import { AlbumTable } from '@/components/TableAlbum/AlbumTable';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Plus, Images, Music, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export default function AlbumIndex() {
  const { albums = [], success, error } = usePage().props as any;

  const [openFormModal, setOpenFormModal] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Notifikasi dari server
  useEffect(() => {
    if (success) toast.success(success);
    if (error) toast.error(error);
  }, [success, error]);

  const handleOpenCreateModal = () => {
    setEditData(null);
    setOpenFormModal(true);
  };

  const handleOpenEditModal = (album: any) => {
    setEditData(album);
    setOpenFormModal(true);
  };

  const handleCloseFormModal = () => {
    setOpenFormModal(false);
    setEditData(null);
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Gallery', href: '#' },
        { title: 'Albums', href: '/gallery-album' },
      ]}
    >
      <Head title="Manajemen Album" />

      <motion.div
        className="flex h-full flex-1 flex-col gap-10 rounded-xl bg-gradient-to-b from-background to-purple-50/40 dark:to-purple-950/30 p-6 sm:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <header className="flex flex-col gap-2 border-b pb-4 dark:border-purple-900/30">
          <div className="flex items-center gap-3">
            <Images className="h-8 w-8 text-purple-500" />
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Manajemen Album
            </h1>
          </div>
          <p className="text-muted-foreground text-base max-w-2xl">
            Kelola koleksi album galeri HIMATIK untuk dokumentasi kegiatan dan momen penting.
          </p>
        </header>

        {/* Statistik */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard
              icon={<Images className="h-5 w-5 text-purple-500" />}
              title="Total Album"
              value={albums.length}
              subtitle="Jumlah album yang tersimpan"
            />
            <InfoCard
              icon={<Camera className="h-5 w-5 text-purple-400" />}
              title="Koleksi Dokumentasi"
              value="Terlengkap"
              subtitle="Simpan setiap momen berharga"
            />
            <InfoCard
              icon={<Music className="h-5 w-5 text-purple-500" />}
              title="Kemudahan Kelola"
              value="Mudah"
              subtitle="Tambah & ubah album hanya beberapa klik"
            />
          </div>
        </section>

        {/* Tabel Album */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              <Images className="h-6 w-6 text-purple-500" />
              Daftar Album
            </h2>
            <Button
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md hover:shadow-lg transition"
              onClick={handleOpenCreateModal}
            >
              <Plus className="mr-2 h-4 w-4" /> Tambah Album
            </Button>
          </div>

          {loading ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="rounded-2xl bg-white/80 dark:bg-purple-950/50 backdrop-blur-md shadow-md border border-white/40 dark:border-purple-800 p-4 sm:p-6 transition">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-muted-foreground">
                    Tabel Daftar Album
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AlbumTable data={albums} onEdit={handleOpenEditModal} />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </section>

        {/* Modal Tambah / Edit */}
        <AlbumFormModal
          open={openFormModal}
          onClose={handleCloseFormModal}
          initialData={editData}
        />
      </motion.div>
    </AppLayout>
  );
}

/* Komponen InfoCard */
function InfoCard({
  icon,
  title,
  value,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-white/40 dark:border-purple-800 bg-white/80 dark:bg-purple-950/40 backdrop-blur-md p-6 shadow-sm hover:shadow-lg hover:bg-white/90 dark:hover:bg-purple-900/50 transition"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100/70 dark:bg-purple-900/60 shadow-inner">
          {icon}
        </div>
        <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{value}</span>
      </div>
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
    </motion.div>
  );
}
