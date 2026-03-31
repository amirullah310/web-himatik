import { PeriodFormModal } from '@/components/TablePeriods/PeriodFormModal';
import { PeriodTable } from '@/components/TablePeriods/PeriodTable';
import { MissionManagementModal } from '@/components/VissionMissionModal/MissionManagementModal';
import { VissionManagementModal } from '@/components/VissionMissionModal/VissionManagementModal';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Plus, CalendarDays, Flag, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function PeriodsPage() {
  const { periods = [] } = usePage().props as { periods: any[] };

  const [openPeriodForm, setOpenPeriodForm] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const [managedVissionPeriodId, setManagedVissionPeriodId] = useState<number | null>(null);
  const [managedMissionPeriodId, setManagedMissionPeriodId] = useState<number | null>(null);

  const managedPeriodForVissions = periods.find((p) => p.id === managedVissionPeriodId) || null;
  const managedPeriodForMissions = periods.find((p) => p.id === managedMissionPeriodId) || null;

  const activePeriod = periods.find((p) => p.is_active);

  return (
    <AppLayout breadcrumbs={[{ title: 'Periode', href: '/periods' }]}>
      <Head title="Manajemen Periode" />

      <motion.div
        className="flex h-full flex-1 flex-col gap-10 rounded-xl bg-gradient-to-b from-background to-purple-50/40 dark:to-gray-950 p-6 sm:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <header className="flex flex-col gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-8 w-8 text-purple-400" />
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
              Manajemen Periode
            </h1>
          </div>
          <p className="text-muted-foreground text-base max-w-2xl">
            Kelola periode kepengurusan, visi, dan misi HIMATIK dengan mudah dan terstruktur.
          </p>
        </header>

        {/* Statistik */}
        <section>
          <h2 className="mb-4 text-lg font-semibold tracking-wide text-muted-foreground">Statistik Periode</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard
              icon={<Flag className="h-5 w-5 text-purple-400" />}
              title="Periode Aktif"
              value={activePeriod ? activePeriod.name : 'Belum Ada'}
              subtitle={activePeriod ? 'Periode yang sedang berjalan' : 'Belum ada periode aktif'}
            />
            <InfoCard
              icon={<CalendarDays className="h-5 w-5 text-purple-400" />}
              title="Total Periode"
              value={periods.length}
              subtitle="Jumlah seluruh periode yang tercatat"
            />
            <InfoCard
              icon={<Target className="h-5 w-5 text-purple-400" />}
              title="Manajemen Visi & Misi"
              value="Aktif"
              subtitle="Kelola tujuan dan arah organisasi"
            />
          </div>
        </section>

        {/* Daftar Periode */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-purple-400" />
              Daftar Periode
            </h2>
            <Button
              className="bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-md hover:shadow-lg transition dark:shadow-purple-800/30"
              onClick={() => {
                setEditData(null);
                setOpenPeriodForm(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Tambah Periode
            </Button>
          </div>

          {periods.length === 0 ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
              <Card className="rounded-2xl bg-white/80 dark:bg-black backdrop-blur-md shadow-md border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-muted-foreground">
                    Tabel Daftar Periode
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PeriodTable
                    data={periods}
                    onEdit={(period) => {
                      setEditData(period);
                      setOpenPeriodForm(true);
                    }}
                    onManageVisions={(period) => setManagedVissionPeriodId(period.id)}
                    onManageMissions={(period) => setManagedMissionPeriodId(period.id)}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </section>

        {/* Modal Tambah/Ubah Periode */}
        <PeriodFormModal
          open={openPeriodForm}
          onClose={() => {
            setOpenPeriodForm(false);
            setEditData(null);
          }}
          initialData={editData || { name: '', started_at: '', ended_at: '', is_active: false }}
        />

        {/* Modal Manajemen Visi & Misi */}
        {managedPeriodForVissions && (
          <VissionManagementModal
            open={!!managedVissionPeriodId}
            onClose={() => setManagedVissionPeriodId(null)}
            period={managedPeriodForVissions}
          />
        )}
        {managedPeriodForMissions && (
          <MissionManagementModal
            open={!!managedMissionPeriodId}
            onClose={() => setManagedMissionPeriodId(null)}
            period={managedPeriodForMissions}
          />
        )}
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
      className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black backdrop-blur-md p-6 shadow-sm hover:shadow-lg transition"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100/70 dark:bg-purple-900/30 shadow-inner">
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
