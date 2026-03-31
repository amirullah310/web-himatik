'use client';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MemberShow() {
  const { member } = usePage().props as any;

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Members', href: '/members' },
        { title: member.name, href: `/members/${member.id}` },
      ]}
    >
      <Head title={member.name} />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400  to-purple-500 bg-clip-text text-transparent">
            Detail Member
          </h1>
          <Button asChild variant="outline" className="rounded-full px-4">
            <Link href="/members">
              <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
            </Link>
          </Button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="col-span-1 rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-6 shadow-lg dark:from-zinc-900 dark:to-zinc-950 dark:border-zinc-800"
          >
            <div className="flex flex-col items-center">
              <div className="relative mb-4 h-36 w-36 overflow-hidden rounded-full border-4 border-primary/60 shadow-lg">
                <img
                  src={`/storage/${member.picture}`}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
                {member.name || '-'}
              </h2>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                {member.nim || '-'}
              </p>
            </div>
          </motion.div>

          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 md:col-span-2 rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-6 shadow-lg dark:from-zinc-900 dark:to-zinc-950 dark:border-zinc-800"
          >
            <h3 className="mb-5 text-lg font-semibold text-primary">
              Informasi Pribadi
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoItem label="Email" value={member.email} />
              <InfoItem label="Alamat" value={member.address} />
              <InfoItem label="Tempat Lahir" value={member.born_at} />
              <InfoItem label="No Whatsapp" value={member.no_wa} />
              <InfoItem
                label="Tanggal Lahir"
                value={
                  member.birth_date_at
                    ? new Date(member.birth_date_at + 'T00:00:00').toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : '-'
                }
              />
            </div>
          </motion.div>
        </div>

        {/* Academic Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-6 shadow-lg dark:from-zinc-900 dark:to-zinc-950 dark:border-zinc-800"
        >
          <h3 className="mb-5 text-lg font-semibold text-primary">
            Informasi Akademik
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoItem label="Jurusan" value={member.department} />
            <InfoItem label="Program Studi" value={member.study_program} />
            <InfoItem label="Periode" value={member.period?.name} />
            <InfoItem label="Tahun Masuk" value={member.joined_college_on} />
            <InfoItem label="Tahun Lulus" value={member.graduated_college_on} />
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}

/** Reusable info item */
function InfoItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="transition-all hover:translate-x-1">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="font-semibold text-gray-800 dark:text-gray-200">
        {value || '-'}
      </p>
    </div>
  );
}
