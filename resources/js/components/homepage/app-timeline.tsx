"use client";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { id } from "date-fns/locale";
import { motion } from "framer-motion";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { id };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

// Data event
const events = [
  {
    title: "Pameran September Hitam 2025",
    start: new Date(2025, 8, 5),
    end: new Date(2025, 8, 6),
    desc: `Pameran September Hitam merupakan inisiatif untuk memperingati dan merefleksikan sejarah perjuangan serta ekspresi seni mahasiswa.`,
  },
  {
    title: "Maker",
    start: new Date(2025, 8, 23),
    end: new Date(2025, 8, 26),
    desc: `Acara kreatif yang dilaksanakan pada 23–26 September 2025, sebagai wadah kolaborasi dan inovasi mahasiswa.`,
  },
  {
    title: "Leaders Dialogue",
    start: new Date(2025, 8, 28),
    end: new Date(2025, 8, 28),
    desc: `Leaders Dialogue berupa talkshow dengan para tokoh pemimpin inspiratif yang akan berbagi pengalaman dan wawasan.`,
  },
  {
    title: "Workshop UI/UX",
    start: new Date(2025, 8, 12),
    end: new Date(2025, 8, 12),
    desc: `Workshop pengenalan dasar desain antarmuka (UI) dan pengalaman pengguna (UX) untuk mahasiswa pemula.`,
  },
  {
    title: "Hackathon HIMATIK",
    start: new Date(2025, 8, 19),
    end: new Date(2025, 8, 20),
    desc: `Kompetisi hackathon internal untuk mengasah keterampilan teknologi dan kreativitas mahasiswa HIMATIK.`,
  },
  {
    title: "Tech Talk: AI & Masa Depan",
    start: new Date(2025, 8, 8),
    end: new Date(2025, 8, 8),
    desc: `Diskusi terbuka mengenai perkembangan Artificial Intelligence dan dampaknya bagi masa depan dunia.`,
  },
];

export default function AppTimeline() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-6">
      <div className="mx-auto max-w-[1200px]">
        {/* Judul */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-[#FECA00]">
            HIMATIK
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">
            Linimasa HIMATIK 2025
          </h2>
          <div className="mt-3 h-1 w-16 mx-auto rounded-full bg-[#FECA00]"></div>
        </motion.div>

        {/* Konten */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Kalender */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              messages={{
                month: "Bulan",
                week: "Minggu",
                day: "Hari",
                today: "Hari ini",
                agenda: "Agenda",
              }}
            />
          </motion.div>

          {/* Daftar Event */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-b from-purple-100 to-purple-200 rounded-2xl p-6 shadow-inner max-h-[600px] overflow-y-auto"
          >
            <h3 className="text-xl font-bold text-purple-800 mb-6">
              Daftar Kegiatan
            </h3>
            <div className="space-y-5">
              {events.map((event, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  <h4 className="text-base font-bold text-purple-700 mb-1">
                    {event.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {event.desc}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    📆 {format(event.start, "dd MMM yyyy", { locale: id })}{" "}
                    {event.end &&
                      ` - ${format(event.end, "dd MMM yyyy", { locale: id })}`}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
