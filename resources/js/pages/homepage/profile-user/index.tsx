import { Head, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
  User,
  Lock,
  Bell,
  Heart,
  Bookmark,
  ChevronRight,
  Star,
  Info,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import AppFooter from '@/components/homepage/app-footer';
import AppHeader from '@/components/homepage/app-header';
import AppLoading from '@/components/homepage/app-loading';
import NotificationSection from '@/components/homepage/profile-user/notification-section';
import UpdateProfileInformation from '@/components/homepage/profile-user/update-profile-information';
import UpdateEmailPassword from './update-email-password';
import ProfileLabel from './ProfileLabel';

// Komponen untuk menampilkan daftar artikel
function ArticleList({ title, articles }) {
  if (!articles?.length) {
    return (
      <p className="text-gray-500 text-sm italic">
        Belum ada {title.toLowerCase()}.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => {
        const imageUrl = article.picture
          ? `/storage/${article.picture}`
          : '/images/default-thumbnail.jpg';

        return (
          <a
            key={article.id}
            href={route('blog.show', article.slug)}
            className="group block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:-translate-y-1"
          >
            <img
              src={imageUrl}
              alt={article.title}
              className="mb-4 h-40 w-full rounded-lg object-cover transition group-hover:scale-105"
            />
            <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
              {article.title}
            </h3>
            <p className="mt-1 text-sm text-gray-600 line-clamp-3">
              {article.summary}
            </p>
          </a>
        );
      })}
    </div>
  );
}

export default function ProfileUser() {
  const { props } = usePage();
  const { user, status, likedArticles = [], savedArticles = [] } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('account');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.add('public-theme');
    return () => {
      document.body.classList.remove('public-theme');
    };
  }, []);

  if (isLoading) return <AppLoading />;

  const tabs = [
    { id: 'account', label: 'Informasi Akun', icon: User },
    { id: 'security', label: 'Keamanan', icon: Lock },
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'liked', label: 'Berita Disukai', icon: Heart },
    { id: 'saved', label: 'Berita Tersimpan', icon: Bookmark },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return <UpdateProfileInformation user={user} status={status} />;
      case 'security':
        return <UpdateEmailPassword />;
      case 'notifications':
        return <NotificationSection />;
      case 'liked':
        return <ArticleList title="Berita Disukai" articles={likedArticles} />;
      case 'saved':
        return <ArticleList title="Berita Tersimpan" articles={savedArticles} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Head title="Profile Pengguna - HIMATIK PNL" />
      <AppHeader />
      <ProfileLabel />

      <main className="min-h-screen bg-gray-50 text-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
          {/* Header Profil */}
          {/* <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 flex items-center gap-6"
          >
            <img
              src={user.profile_photo_url || '/images/default-avatar.png'}
              alt={user.name}
              className="h-20 w-20 rounded-full border-4 border-indigo-100 object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">
                {user.name}
              </h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              <div className="mt-2 flex gap-3 text-xs">
                <span className="rounded-full bg-indigo-50 text-indigo-600 px-3 py-1 font-medium">
                  Anggota HIMATIK
                </span>
                <span className="rounded-full bg-green-50 text-green-600 px-3 py-1 font-medium">
                  Aktif
                </span>
              </div>
            </div>
            <div className="hidden sm:flex gap-6 text-center">
              <div>
                <p className="text-xl font-bold text-indigo-600">{likedArticles.length}</p>
                <p className="text-xs text-gray-500">Disukai</p>
              </div>
              <div>
                <p className="text-xl font-bold text-indigo-600">{savedArticles.length}</p>
                <p className="text-xs text-gray-500">Tersimpan</p>
              </div>
              <div>
                <p className="text-xl font-bold text-indigo-600">3</p>
                <p className="text-xs text-gray-500">Notifikasi</p>
              </div>
            </div>
          </motion.div> */}

          {/* Main Layout */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="grid grid-cols-1 gap-8 md:grid-cols-4"
          >
            {/* Sidebar */}
            <aside className="md:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <h2 className="mb-3 text-lg font-semibold">Menu Profil</h2>
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                          isActive
                            ? 'bg-indigo-100 text-indigo-600'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5" />
                          {tab.label}
                        </div>
                        {isActive && (
                          <ChevronRight className="h-4 w-4 text-indigo-500" />
                        )}
                      </button>
                    );
                  })}
                </nav>

                {/* Motivasi Card */}
                <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-sm text-indigo-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4" />
                    <span className="font-medium">Tips Hari Ini</span>
                  </div>
                  “Profil yang rapi menunjukkan profesionalisme. Selalu perbarui datamu!”
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <section className="md:col-span-3">
              <motion.div
                key={activeTab}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h2 className="mb-4 text-xl font-semibold">
                  {tabs.find((tab) => tab.id === activeTab)?.label ||
                    'Informasi Akun'}
                </h2>
                <div className="h-[1px] w-full bg-gray-100 mb-6" />
                {renderContent()}
              </motion.div>
            </section>
          </motion.div>
        </div>
      </main>

      <AppFooter />
    </>
  );
}
