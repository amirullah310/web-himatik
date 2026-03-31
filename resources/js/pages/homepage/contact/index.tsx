import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Phone, Mail, Instagram, Facebook, Linkedin } from 'lucide-react';

import Swal from "sweetalert2";

import AppFooter from '@/components/homepage/app-footer';
import AppHeader from '@/components/homepage/app-header';
import AppLoading from '@/components/homepage/app-loading';
import InputError from '@/components/input-error';
import SectionLabelContact from '@/components/contact/app-label';

import bgHero from "@/assets/images/gedung4.png";
import AppScrollToTop from '@/components/homepage/app-scroll-to-top';

const ContactPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.add('public-theme');
    return () => {
      document.body.classList.remove('public-theme');
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    Swal.fire({
      title: "Mengirim Pesan...",
      text: "Mohon tunggu sebentar",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    post(route("contact.send"), {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "Pesan Berhasil Terkirim!",
          text: "Terima kasih telah menghubungi kami.",
          confirmButtonColor: "#8B5CF6",
        });

        reset();
      },
      onError: () => {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengirim",
          text: "Silakan periksa kembali isian Anda.",
          confirmButtonColor: "#EF4444",
        });
      },
      preserveScroll: true,
    });
  }

  if (isLoading) return <AppLoading />;

  return (
    <>
      <Head title="Kontak - HIMATIK" />
      <AppHeader />
      <main className="min-h-screen text-black">

        <SectionLabelContact />

        {/* Contact Cards Section */}
        <section className="py-16 md:py-20 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[1250px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
          >
            {[{
              iconBg: "bg-blue-100",
              iconColor: "text-blue-500",
              title: "Tim Penjualan",
              desc: "Kami senang berdiskusi tentang peluang kerja sama dengan Anda.",
              btnText: "Hubungi Penjualan",
              href: "#",
            },
            {
              iconBg: "bg-purple-100",
              iconColor: "text-purple-500",
              title: "Bantuan & Dukungan",
              desc: "Hubungi kami jika Anda membutuhkan bantuan atau informasi lebih lanjut.",
              btnText: "Dapatkan Dukungan",
              href: "#",
            },
            {
              iconBg: "bg-indigo-100",
              iconColor: "text-indigo-500",
              title: "Media & Pers",
              desc: "Dapatkan berita, informasi, dan sumber media terbaru dari HIMATIK.",
              btnText: "Kunjungi Newsroom",
              href: "#",
            }].map((card, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition p-6">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.iconBg} ${card.iconColor} mb-4`}>
                  {i === 0 && <Phone className="h-5 w-5" />}
                  {i === 1 && <Mail className="h-5 w-5" />}
                  {i === 2 && <Linkedin className="h-5 w-5" />}
                </div>

                <h4 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h4>
                <p className="text-gray-500 text-sm mb-5">{card.desc}</p>
                <a href={card.href} className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700 transition">
                  {card.btnText}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </motion.div>

          {/* Informasi */}
          <div className="max-w-[1250px] mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-600 px-4">
            <div>
              <p className="font-semibold mb-1">Bergabung di Discord</p>
              <p>
                Jika Anda memiliki pertanyaan teknis, bergabunglah di{" "}
                <a href="#" className="text-purple-600 hover:underline">server Discord resmi HIMATIK</a>.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Komunikasi Umum</p>
              <p>
                Untuk kerja sama atau kemitraan, kirim email ke{" "}
                <a href="mailto:himatik@kbmpnl.com" className="text-purple-600 hover:underline">
                  himatik@kbmpnl.com
                </a>.
              </p>
            </div>
          </div>
        </section>

        {/* Konten utama */}
        <section className="pb-16 md:pb-20">
          <div className="mx-auto max-w-[1250px] bg-white grid grid-cols-1 md:grid-cols-2 gap-10 px-4">

            {/* Informasi Kontak */}
            <section
              className="relative rounded-2xl overflow-hidden bg-cover bg-center py-12 sm:py-16 md:py-20 shadow-2xl"
              style={{ backgroundImage: `url(${bgHero})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100/90 to-purple-900/80 rounded-2xl" />

              <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
                className="relative z-10 p-6 sm:p-8 md:p-10 text-white">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-purple-100">Jangan ragu untuk menghubungi kami</h3>
                <p className="mb-6 text-sm sm:text-base text-purple-200">Kami siap membantu Anda kapan saja.</p>

                <div className="space-y-6">
                  {[{
                    icon: <Phone />, title: 'Hubungan Organisasi (HIMATIK)', text: '0822-8888-8949'
                  },
                  {
                    icon: <Phone />, title: 'Media Partnership', text: '0822-8888-8949'
                  },
                  {
                    icon: <Mail />, title: 'Email', text: 'himatik@kbmpnl.com'
                  }].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-400 text-black shadow-lg shadow-purple-900/30">
                        {React.cloneElement(item.icon, { className: "h-5 w-5" })}
                      </div>
                      <div>
                        <p className="font-semibold text-base">{item.title}</p>
                        <p className="text-purple-200 text-sm">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sosial Media */}
                <div className="mt-8 flex gap-6">
                  {[{
                    icon: <Instagram />, href: 'https://instagram.com/himatik'
                  },
                  {
                    icon: <Facebook />, href: 'https://facebook.com/himatik'
                  },
                  {
                    icon: <Linkedin />, href: 'https://linkedin.com/company/himatik'
                  }].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="text-purple-200 hover:text-purple-400 transition">
                      {React.cloneElement(s.icon, { className: "h-5 w-5" })}
                    </a>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Formulir */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
              className="rounded-2xl border border-purple-100 bg-white shadow-lg p-6 sm:p-10">
              <h3 className="text-2xl font-bold mb-6 text-purple-400">Kirim Pesan</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                      placeholder="Nama Lengkap"
                      className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-purple-400 focus:ring-purple-400"
                      required
                    />
                    <InputError message={errors.name} className="mt-1" />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="phone"
                      value={data.phone}
                      onChange={(e) => setData("phone", e.target.value)}
                      placeholder="Nomor Telepon"
                      className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-purple-400 focus:ring-purple-400"
                      required
                    />
                    <InputError message={errors.phone} className="mt-1" />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    placeholder="Alamat Email"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-purple-400 focus:ring-purple-400"
                    required
                  />
                  <InputError message={errors.email} className="mt-1" />
                </div>

                <div>
                  <input
                    type="text"
                    name="subject"
                    value={data.subject}
                    onChange={(e) => setData("subject", e.target.value)}
                    placeholder="Subjek Pesan"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-purple-400 focus:ring-purple-400"
                    required
                  />
                  <InputError message={errors.subject} className="mt-1" />
                </div>

                <div>
                  <textarea
                    name="message"
                    rows={5}
                    value={data.message}
                    onChange={(e) => setData("message", e.target.value)}
                    placeholder="Tulis pesan Anda di sini..."
                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-purple-400 focus:ring-purple-400"
                    required
                  />
                  <InputError message={errors.message} className="mt-1" />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-md bg-purple-400 px-6 py-3 font-semibold text-white hover:bg-purple-500 transition disabled:bg-purple-200"
                  >
                    {processing ? "Mengirim..." : "Kirim Pesan"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Map Section */}
          <div className="max-w-[1250px] mx-auto mt-16 px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-purple-100">
              <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-md shadow-md">
                <h4 className="text-purple-600 font-semibold text-sm md:text-base">Lokasi Kami</h4>
                <p className="text-gray-600 text-xs md:text-sm">Politeknik Negeri Lhokseumawe, Aceh</p>
              </div>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3973.89519653191!2d97.1552630!3d5.1205869!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304783da9c916c53%3A0x44a5c80e38d12db5!2sPoliteknik%20Negeri%20Lhokseumawe!5e0!3m2!1sid!2sid!4v1754219999999!5m2!1sid!2sid"
                className="h-[300px] sm:h-[400px] md:h-[500px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Politeknik Negeri Lhokseumawe"
              ></iframe>
            </motion.div>
          </div>
        </section>
      </main>

      <AppScrollToTop />
      <AppFooter />
    </>
  );
};

export default ContactPage;
