import { StructureMemberFormModal } from '@/components/TableStructureMember/StructureMemberFormModal';
import { StructureMemberTable } from '@/components/TableStructureMember/StructureMemberTable';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { router, Head, usePage } from '@inertiajs/react';
import { Plus, Users2, Layers3, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function StructureMemberIndex() {
  const {
    data = [],
    periods = [],
    structures = [],
    selectedPeriodId = null,
    selectedStructureId = null,
  } = usePage().props as any;

  const [formOpen, setFormOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  const selectedStructure = structures.find(
    (s: any) => String(s.id) === String(selectedStructureId)
  );
  const selectedStructureName = selectedStructure?.name || '';
  const loading = data.length === 0;

  const handlePeriodChange = (value: string) => {
    router.get(
      route('structure-members.index'),
      { period_id: value, structure_id: selectedStructureId || undefined },
      { preserveScroll: true, preserveState: true }
    );
  };

  const handleStructureChange = (value: string) => {
    router.get(
      route('structure-members.index'),
      { structure_id: value, period_id: selectedPeriodId || undefined },
      { preserveScroll: true, preserveState: true }
    );
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Structure', href: '/structures' },
        { title: 'Structure Members', href: '/structure-members' },
      ]}
    >
      <Head title="Anggota Struktur" />

      <motion.div
        className="flex h-full flex-1 flex-col gap-10 rounded-xl bg-gradient-to-b from-background to-purple-50/40 dark:from-background dark:to-purple-950/20 p-6 sm:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <header className="flex flex-col gap-2 border-b pb-4 border-border/50">
          <div className="flex items-center gap-3">
            <Users2 className="h-8 w-8 text-purple-500 dark:text-purple-400" />
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Anggota Struktur
            </h1>
          </div>
          <p className="text-muted-foreground text-base max-w-2xl">
            Kelola data anggota setiap posisi dan struktur organisasi HIMATIK.
          </p>
        </header>

        {/* Statistik Singkat */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard
              icon={<Users2 className="h-5 w-5 text-purple-500 dark:text-purple-400" />}
              title="Total Anggota"
              value={data.length}
              subtitle="Jumlah anggota terdaftar dalam struktur"
            />
            <InfoCard
              icon={<Layers3 className="h-5 w-5 text-purple-500 dark:text-purple-400" />}
              title="Total Struktur"
              value={structures.length}
              subtitle="Struktur organisasi yang aktif"
            />
            <InfoCard
              icon={<CalendarDays className="h-5 w-5 text-purple-400 dark:text-purple-300" />}
              title="Total Periode"
              value={periods.length}
              subtitle="Periode kepengurusan tersedia"
            />
          </div>
        </section>

        {/* Tabel Data */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              <Users2 className="h-6 w-6 text-purple-500 dark:text-purple-400" />
              Daftar Anggota Struktur
              {selectedStructureName && (
                <span className="text-lg text-muted-foreground ml-1">
                  ({selectedStructureName})
                </span>
              )}
            </h2>

            <Button
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md hover:shadow-lg transition"
              onClick={() => {
                setEditingData(null);
                setFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Tambah Anggota
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
              <Card className="rounded-2xl bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md shadow-md border border-white/40 dark:border-zinc-700/60 p-4 sm:p-6">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-muted-foreground">
                    Tabel Anggota Struktur
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <StructureMemberTable
                    data={data}
                    structures={structures}
                    periods={periods}
                    selectedStructureId={selectedStructureId}
                    selectedPeriodId={selectedPeriodId}
                    onEdit={(member) => {
                      setEditingData(member);
                      setFormOpen(true);
                    }}
                    onChangePeriod={handlePeriodChange}
                    onChangeStructure={handleStructureChange}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </section>

        {/* Modal Form */}
        <StructureMemberFormModal
          open={formOpen}
          onClose={() => setFormOpen(false)}
          initialData={editingData}
          structures={structures}
          selectedStructureId={selectedStructureId}
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
      className="rounded-2xl border border-white/40 dark:border-zinc-700/60 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md p-6 shadow-sm hover:shadow-lg transition"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100/70 dark:bg-purple-900/40 shadow-inner">
          {icon}
        </div>
        <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
          {value}
        </span>
      </div>
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
    </motion.div>
  );
}
