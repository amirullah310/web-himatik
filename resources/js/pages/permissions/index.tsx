import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PermissionTable } from '@/components/PermissionTable';
import { PermissionFormModal } from '@/components/PermissionFormModal';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, ShieldCheck, LockKeyhole } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Permission', href: '/permissions' }];

export default function Permission() {
  const { permissions } = usePage().props as { permissions?: any };
  const permissionData = Array.isArray(permissions) ? permissions : permissions?.data ?? [];

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState<{ id?: number; name: string; key: string; description?: string } | null>(null);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manajemen Permission" />

      <motion.div
        className="flex h-full flex-1 flex-col gap-10 rounded-xl 
        bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 
        dark:from-[#0a0a0a] dark:via-[#0f0f0f] dark:to-[#111111]
        p-6 sm:p-8 transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <header className="flex flex-col gap-3 border-b border-gray-200 dark:border-[#1c1c1c] pb-4">
          <div className="flex items-center gap-3">
            <LockKeyhole className="h-8 w-8 text-purple-400" />
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight 
              bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Manajemen Permission
            </h1>
          </div>
          <p className="text-muted-foreground text-base max-w-2xl">
            Kelola hak akses untuk mengatur siapa yang dapat mengakses fitur-fitur di dalam sistem HIMATIK.
          </p>
        </header>

        {/* Statistik Singkat */}
        <section>
          <h2 className="mb-4 text-lg font-semibold tracking-wide text-muted-foreground">
            Statistik Singkat
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard
              icon={<ShieldCheck className="h-5 w-5 text-purple-400" />}
              title="Total Permission"
              value={permissionData.length}
              subtitle="Jumlah izin akses yang aktif di sistem"
            />
            <InfoCard
              icon={<Plus className="h-5 w-5 text-purple-400" />}
              title="Tambahkan Hak Akses"
              value="Cepat"
              subtitle="Buat izin baru hanya dengan sekali klik"
            />
            <InfoCard
              icon={<LockKeyhole className="h-5 w-5 text-purple-400" />}
              title="Keamanan Terjaga"
              value="100%"
              subtitle="Kontrol penuh terhadap akses sistem"
            />
          </div>
        </section>

        {/* Tabel Permission */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-purple-400" />
              Daftar Permission
            </h2>
            <Button
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md 
              hover:shadow-lg hover:from-purple-600 hover:to-purple-700 transition 
              dark:shadow-purple-900/40"
              onClick={() => {
                setEditData(null);
                setOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Tambah Permission
            </Button>
          </div>

          {loading ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
              <Card
                className="rounded-2xl bg-white/90 dark:bg-[#0d0d0d]/80 
                backdrop-blur-md shadow-lg dark:shadow-[0_0_25px_rgba(139,92,246,0.15)]
                border border-gray-200/50 dark:border-[#2b2b2b] 
                p-4 sm:p-6 transition-colors"
              >
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-muted-foreground">
                    Tabel Daftar Permission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {permissionData.length > 0 ? (
                    <PermissionTable
                      data={permissionData}
                      onEdit={(permission) => {
                        setEditData(permission);
                        setOpen(true);
                      }}
                    />
                  ) : (
                    <div className="py-10 text-center text-sm text-muted-foreground">
                      Belum ada permission yang terdaftar.
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </section>

        {/* Modal Tambah/Ubah Permission */}
        <PermissionFormModal
          open={open}
          onClose={() => {
            setOpen(false);
            setEditData(null);
          }}
          initialData={editData || { name: '', key: '', description: '' }}
        />
      </motion.div>
    </AppLayout>
  );
}

/* Info Card Component */
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
      className="rounded-2xl border border-gray-200/70 dark:border-[#242424]
      bg-white/90 dark:bg-[#111111]/80 backdrop-blur-md p-6 
      shadow-md dark:shadow-[0_0_20px_rgba(139,92,246,0.1)]
      hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full 
          bg-purple-100/70 dark:bg-purple-900/30 shadow-inner">
          {icon}
        </div>
        <span className="text-3xl font-bold text-purple-500">{value}</span>
      </div>
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
    </motion.div>
  );
}
