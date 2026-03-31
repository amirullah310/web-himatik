// resources/js/pages/homepage/bidang/show.tsx
import { Head, Link, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, FolderKanban } from 'lucide-react';
import { Calendar as BigCalendar, dateFnsLocalizer, Event as CalendarEvent } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import idLocale from 'date-fns/locale/id';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import AppHeader from '@/components/homepage/app-header';
import AppFooter from '@/components/homepage/app-footer';
import AppLoading from '@/components/homepage/app-loading';
import SectionLabelBidang from '@/components/homepage/bidang/app-label';
import AppScrollToTop from '@/components/homepage/app-scroll-to-top';

type DivisionPlan = {
  id: number;
  division_id: number;
  name: string;
  description?: string;
  scheduled_at?: string;
};

type OtherDivision = {
  id: number;
  name: string;
  plans_count?: number;
};

const ShowBidang: React.FC = () => {
  const { division, division_plans, other_divisions, division_plans_all }: any = usePage().props;

  const plans: DivisionPlan[] = division_plans || [];
  const otherDivisions: OtherDivision[] = other_divisions || [];
  const allPlans: DivisionPlan[] = division_plans_all || plans;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.add('public-theme');
    return () => document.body.classList.remove('public-theme');
  }, []);

  if (isLoading) return <AppLoading />;

  // Kalender Setup
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales: { id: idLocale },
  });

  const activePlans = plans.filter(plan => plan.division_id === division.id);

  const events: CalendarEvent[] = allPlans
    .filter(plan => plan.scheduled_at)
    .map((plan, idx) => {
      const start = new Date(plan.scheduled_at!);
      const end = new Date(start.getTime() + 5 * 60 * 1000);
      return {
        title: plan.name,
        start,
        end,
        allDay: false,
        desc: plan.description || 'Tidak ada deskripsi.',
        division_id: plan.division_id,
        id: `${plan.id}-${idx}`,
      };
    });

  // Warna berbeda untuk tiap bidang (biar kalender lebih informatif)
  const divisionColors: Record<number, string> = {};
  allPlans.forEach((plan, idx) => {
    if (!divisionColors[plan.division_id]) {
      const colors = ['#2563EB', '#059669', '#9333EA', '#D97706', '#DC2626', '#0EA5E9'];
      divisionColors[plan.division_id] = colors[idx % colors.length];
    }
  });

  const eventStyleGetter = (event: any) => {
    const backgroundColor = divisionColors[event.division_id] || '#4B5563';
    return {
      style: {
        backgroundColor,
        color: 'white',
        borderRadius: '6px',
        border: 'none',
        padding: '2px 4px',
      },
    };
  };

  return (
    <>
      <Head title={`Bidang ${division.name} - HIMATIK`} />
      <AppHeader isBirthday={false} />
      <SectionLabelBidang />

      <main className="bg-[#FAFAFA] min-h-screen text-gray-900">
        <section className="px-4 sm:px-8 md:px-10 lg:px-12 py-10 md:py-16">
          <div className="mx-auto max-w-[1220px]">
            <div className="mb-8">
              <Link href={route('bidang.index')}>
                <button className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 hover:bg-gray-200 transition">
                  <ArrowLeft size={18} /> Kembali
                </button>
              </Link>
            </div>

            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-extrabold text-black">
                Program Kerja {division.name}
              </h1>
            </div>

            {/* Daftar Program Kerja */}
            {activePlans.length > 0 ? (
              <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1 }}
              >
                {activePlans.map((plan, idx) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
                  >
                    <h3 className="text-lg font-semibold mb-2 text-black">
                      {String(idx + 1).padStart(2, '0')}. {plan.name}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {plan.description || 'Tidak ada deskripsi.'}
                    </p>
                    {plan.scheduled_at && (
                      <p className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        {new Date(plan.scheduled_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="text-center text-gray-500 italic mt-10">
                Belum ada program kerja untuk bidang ini.
              </p>
            )}

            {/* Kalender */}
            {events.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-black mb-4">Kalender Kegiatan</h2>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
                  <BigCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    popup
                    tooltipAccessor="desc"
                    eventPropGetter={eventStyleGetter}
                  />
                </div>

                {/* Legenda Bidang */}
                <div className="mt-6 flex flex-wrap gap-4 text-sm">
                  {Object.entries(divisionColors).map(([id, color]) => (
                    <div key={id} className="flex items-center gap-2">
                      <span
                        className="inline-block w-4 h-4 rounded"
                        style={{ backgroundColor: color }}
                      ></span>
                      <span className="text-gray-700">
                        {otherDivisions.find(d => d.id === Number(id))?.name ||
                          (division.id === Number(id) ? division.name : 'Bidang Lain')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bidang Lain */}
            <div className="mt-16">
              <h2 className="text-xl font-bold text-black flex items-center gap-2 mb-4">
                <FolderKanban size={20} className="text-gray-700" /> Bidang Lain
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {otherDivisions.length > 0 ? (
                  otherDivisions.map((d) => (
                    <Link
                      key={d.id}
                      href={route('bidang.show', d.id)}
                      className="block rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition"
                    >
                      <p className="font-semibold text-black">{d.name}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {d.plans_count || 0} Program Kerja
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic col-span-full">
                    Tidak ada bidang lain.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
          <AppScrollToTop/>

      <AppFooter />
    </>
  );
};

export default ShowBidang;
