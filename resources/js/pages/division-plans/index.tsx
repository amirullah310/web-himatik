import { DivisionPlansFormModal } from '@/components/TableDivisionPlans/DivisionPlansFormModal';
import { DivisionPlansTable } from '@/components/TableDivisionPlans/DivisionPlansTable';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Plus, ClipboardList, Layers3, FolderKanban } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

export default function DivisionPlansIndex() {
  const { division_plans = [], divisions = [] } = usePage().props;

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const loading = division_plans.length === 0;

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Divisi', href: '/divisions' },
        { title: 'Rencana Divisi', href: '/division-plans' },
      ]}
    >
      <Head title="Rencana Divisi" />

      <motion.div
        className="flex h-full flex-1 flex-col gap-10 rounded-xl bg-gradient-to-b from-background to-purple-50/40 dark:to-purple-950/20 p-6 sm:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <header className="flex flex-col gap-2 border-b pb-4 border-border/50">
          <div className="flex items-center gap-3">
            <ClipboardList className="h-8 w-8 text-purple-500 dark:text-purple-400" />
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-purple-600 dark:from-purple-300 dark:to-purple-500 bg-clip-text text-transparent">
              Rencana Divisi
            </h1>
          </div>
          <p className="text-muted-foreground text-base max-w-2xl">
            Kelola daftar rencana kegiatan atau program kerja setiap divisi HIMATIK.
          </p>
        </header>

        {/* Statistik Ringkas */}
        <section>
          <h2 className="mb-4 text-lg font-semibold tracking-wide text-muted-foreground">
            Statistik Rencana
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard
              icon={<ClipboardList className="h-5 w-5 text-purple-500 dark:text-purple-400" />}
              title="Total Rencana"
              value={division_plans.length}
              subtitle="Jumlah total proker divisi"
            />
            <InfoCard
              icon={<Layers3 className="h-5 w-5 text-purple-400 dark:text-purple-300" />}
              title="Total Divisi"
              value={divisions.length}
              subtitle="Jumlah divisi terdaftar"
            />
            <InfoCard
              icon={<FolderKanban className="h-5 w-5 text-purple-500 dark:text-purple-400" />}
              title="Rencana per Divisi"
              value={
                divisions.length > 0
                  ? (division_plans.length / divisions.length).toFixed(1)
                  : '0'
              }
              subtitle="Rata-rata rencana per divisi"
            />
          </div>
        </section>

        {/* Tabel Rencana Divisi */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              <ClipboardList className="h-6 w-6 text-purple-500 dark:text-purple-400" />
              Daftar Rencana Divisi
            </h2>
            <Button
              className="bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 text-white shadow-md hover:shadow-lg transition"
              onClick={() => {
                setEditData(null);
                setOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Tambah Rencana
            </Button>
          </div>

          {loading ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-md border border-white/40 dark:border-zinc-700/50 p-4 sm:p-6">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-muted-foreground">
                    Tabel Daftar Rencana
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DivisionPlansTable
                    data={division_plans}
                    divisions={divisions}
                    onEdit={(plan) => {
                      setEditData(plan);
                      setOpen(true);
                    }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </section>

        {/* Modal Form */}
        <DivisionPlansFormModal
          open={open}
          onClose={() => {
            setOpen(false);
            setEditData(null);
          }}
          initialData={editData}
          divisions={divisions}
        />
      </motion.div>
    </AppLayout>
  );
}

/* Komponen InfoCard */
function InfoCard({ icon, title, value, subtitle }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-white/40 dark:border-zinc-700/50 
                 bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md 
                 p-6 shadow-sm hover:shadow-lg hover:bg-white/90 dark:hover:bg-zinc-800/80 transition"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100/70 dark:bg-purple-900/50 shadow-inner">
          {icon}
        </div>
        <span className="text-2xl font-bold text-purple-600 dark:text-purple-400 truncate max-w-[160px] text-right">
          {value}
        </span>
      </div>
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
    </motion.div>
  );
}
