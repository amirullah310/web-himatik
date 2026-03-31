import BirthdayCalendar from '@/components/homepage/dashboard/birthday-calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Eye, FileText, GalleryHorizontal, User, Users } from 'lucide-react';
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from 'recharts';
import { motion } from 'framer-motion';
import AIAssistant from './dashboard/ai-assistent';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

interface Article {
  id: number;
  title: string;
  slug: string;
  view_count: number;
  picture: string;
}

const getImageUrl = (path?: string): string => {
  return path ? `/storage/${path}` : '/images/penguin.png';
};

export default function Dashboard() {
  const {
    totalMembersCount,
    activeMembersCount,
    activePeriodName,
    totalArticlesCount,
    publishedArticlesCount,
    draftArticlesCount,
    totalAlbumsCount,
    publicAlbumsCount,
    privateAlbumsCount,
    totalMediaCount,
    birthdays,
    popularArticles,
  } = usePage().props;

  // Gunakan data organisasi untuk menggantikan dummy chart
  const organizationProgress = [
    { name: 'Anggota', progress: (activeMembersCount / totalMembersCount) * 100 || 0 },
    { name: 'Artikel', progress: (publishedArticlesCount / totalArticlesCount) * 100 || 0 },
    { name: 'Album', progress: (publicAlbumsCount / totalAlbumsCount) * 100 || 0 },
    { name: 'Media', progress: (totalMediaCount / 1000) * 100 || 0 }, // contoh
  ];

  // Grafik pertumbuhan data (dummy tapi berbasis total)
  const growthChart = [
    { date: 'Jan', value: totalMembersCount },
    { date: 'Feb', value: totalArticlesCount },
    { date: 'Mar', value: totalAlbumsCount },
    { date: 'Apr', value: totalMediaCount },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-10 rounded-xl bg-gradient-to-b from-background to-purple-50/40 dark:to-muted/30 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <header className="flex flex-col gap-2 border-b pb-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Dashboard HIMATIK
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl">
            Selamat datang di pusat kontrol organisasi. Kelola data, pantau aktivitas, dan akses informasi penting di sini.
          </p>
        </header>

        {/* Statistik Utama */}
        <section>
          <h2 className="mb-4 text-lg font-semibold tracking-wide text-muted-foreground">
            Statistik Utama
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <DashboardCard title="Total Anggota" value={totalMembersCount} subtitle="Seluruh periode" icon={<Users className="h-5 w-5 text-purple-500" />} />
            <DashboardCard title="Anggota Aktif" value={activeMembersCount} subtitle={`Periode: ${activePeriodName}`} icon={<User className="h-5 w-5 text-purple-400" />} />
            <DashboardCard title="Total Artikel" value={totalArticlesCount || '0'} subtitle={`Diterbitkan: ${publishedArticlesCount || '0'} | Draft: ${draftArticlesCount || '0'}`} icon={<FileText className="h-5 w-5 text-purple-500" />} />
            <DashboardCard title="Total Album" value={totalAlbumsCount || '0'} subtitle={`Publik: ${publicAlbumsCount || '0'} | Privat: ${privateAlbumsCount || '0'}`} icon={<GalleryHorizontal className="h-5 w-5 text-purple-500" />} />
            <DashboardCard title="Total Dokumentasi" value={totalMediaCount || '0'} subtitle="Foto & Video" icon={<GalleryHorizontal className="h-5 w-5 text-purple-400" />} />
          </div>
        </section>

        {/* Progress Section */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Progress organisasi */}
          <Card className="p-6 shadow-sm bg-gradient-to-br from-white/90 to-purple-50 dark:from-card dark:to-muted">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-muted-foreground">
                Progress Data Organisasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {organizationProgress.map((p) => (
                  <div key={p.name}>
                    <div className="flex justify-between text-sm font-medium">
                      <span>{p.name}</span>
                      <span className="text-muted-foreground">{p.progress.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
                      <div
                        className="h-2 bg-purple-500 rounded-full"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Grafik Pertumbuhan */}
          <Card className="p-6 shadow-sm bg-gradient-to-br from-white/90 to-purple-50 dark:from-card dark:to-muted">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-muted-foreground">
                Grafik Pertumbuhan Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={growthChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#C084FC" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Berita Populer */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">Berita Populer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {popularArticles && popularArticles.length > 0 ? (
              popularArticles.map((article: Article) => (
                <Link key={article.id} href={route('blog.show', article.slug)}>
                  <motion.div whileHover={{ scale: 1.03 }}>
                    <Card className="overflow-hidden rounded-2xl border-none shadow-md transition hover:shadow-xl bg-gradient-to-br from-white to-purple-50 dark:from-card dark:to-muted">
                      <img
                        src={getImageUrl(article.picture)}
                        alt={article.title}
                        className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <CardContent className="flex flex-col gap-3 p-5">
                        <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-black dark:text-purple-400">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Eye className="h-4 w-4 text-black" />
                          <span>{article.view_count} kali dilihat</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">Tidak ada berita populer saat ini.</p>
            )}
          </div>
        </section>

        {/* Kalender Ulang Tahun
        <section>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">Kalender Ulang Tahun</h2>
          <Card className="p-6 shadow-sm bg-gradient-to-br from-white/90 to-purple-50 dark:from-card dark:to-muted">
            <BirthdayCalendar birthdays={birthdays} />
          </Card>
        </section> */}
      </div>
      <AIAssistant/>

    </AppLayout>
  );
}

/* Komponen Kartu Dashboard */
function DashboardCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className="rounded-2xl border-none bg-gradient-to-br from-white to-purple-50 dark:from-card dark:to-muted shadow-md hover:shadow-lg transition">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-950/30">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight text-purple-500 dark:text-purple-400">
            {value}
          </div>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        </CardContent>
      </Card>
    </motion.div>
  );
}
