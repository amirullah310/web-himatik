import { DivisionFormModal } from '@/components/TableDivision/DivisionFormModal';
import { DivisionTable } from '@/components/TableDivision/DivisionTable';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Plus, Users2, Building2, CalendarDays } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

export default function DivisionIndex() {
  const { divisions = [], periods = [], selectedPeriod = '', activePeriod = null } = usePage().props as any;

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const loading = divisions.length === 0;

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Divisi', href: '/divisions' },
      ]}
    >
      <Head title="Manajemen Divisi" />

      <motion.div
        className="flex h-full flex-1 flex-col gap-10 rounded-xl bg-gradient-to-b from-background to-purple-50/30 dark:from-background dark:to-purple-900/20 p-6 sm:p-8 transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <header className="flex flex-col gap-2 border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-purple-400" />
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Manajemen Divisi
            </h1>
          </div>
          <p className="text-muted-foreground text-base max-w-2xl">
            Kelola struktur divisi HIMATIK, termasuk pengurus dan periode kepengurusan.
          </p>
        </header>

        {/* Statistik Singkat */}
        <section>
          <h2 className="mb-4 text-lg font-semibold tracking-wide text-muted-foreground">Statistik Divisi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard
              icon={<Users2 className="h-5 w-5 text-purple-400" />}
              title="Total Divisi"
              value={divisions.length}
              subtitle="Jumlah seluruh divisi yang terdaftar"
            />
            <InfoCard
              icon={<CalendarDays className="h-5 w-5 text-purple-400" />}
              title="Periode Aktif"
              value={activePeriod ? activePeriod.name : 'Belum Ada'}
              subtitle={activePeriod ? 'Periode sedang berjalan' : 'Belum ada periode aktif'}
            />
            <InfoCard
              icon={<Building2 className="h-5 w-5 text-purple-400" />}
              title="Periode Tersedia"
              value={periods.length}
              subtitle="Periode yang memiliki data divisi"
            />
          </div>
        </section>

        {/* Tabel Divisi */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              <Users2 className="h-6 w-6 text-purple-400" />
              Daftar Divisi
            </h2>
            <Button
              className="bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-md hover:shadow-lg transition"
              onClick={() => {
                setEditData(null);
                setOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Tambah Divisi
            </Button>
          </div>

          {loading ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
              <Card className="rounded-2xl border border-border bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md shadow-md p-4 sm:p-6 transition">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-muted-foreground">
                    Tabel Daftar Divisi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DivisionTable
                    data={divisions}
                    onEdit={(division) => {
                      setEditData(division);
                      setOpen(true);
                    }}
                    periods={periods}
                    selectedPeriod={selectedPeriod}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </section>

        {/* Modal Tambah/Ubah Divisi */}
        <DivisionFormModal
          open={open}
          onClose={() => {
            setOpen(false);
            setEditData(null);
          }}
          initialData={editData}
          periods={periods}
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
      className="rounded-2xl border border-border bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md p-6 shadow-sm hover:shadow-lg transition"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100/70 dark:bg-purple-900/40 shadow-inner">
          {icon}
        </div>
        <span className="text-2xl font-bold text-purple-400 truncate max-w-[160px] text-right">
          {value}
        </span>
      </div>
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
    </motion.div>
  );
}
