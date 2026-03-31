import logo from "@/assets/images/logoo.png";
import { usePage } from "@inertiajs/react";
import { SiInstagram, SiTiktok, SiYoutube } from "react-icons/si";

export default function AppFooter() {
  const { latestArticles } = usePage().props as {
    latestArticles?: { id: number; title: string; slug: string }[];
  };

  const navItems = [
    { label: "Beranda", href: "/" },
    { label: "Tentang", href: "/about" },
    { label: "Departemen", href: "/departemen" },
    { label: "Struktural", href: "/struktural" },
    { label: "Berita", href: "/berita" },
    { label: "Kontak", href: "/kontak" },
  ];

  const socialLinks = [
    { icon: SiYoutube, href: "https://www.youtube.com/@himatikpnl" },
    { icon: SiTiktok, href: "https://www.tiktok.com/@himatikpnl" },
    { icon: SiInstagram, href: "https://www.instagram.com/himatik.pnl/" },
  ];

  return (
    <footer className="bg-white text-gray-700  ">
      {/* Top Section */}
      <div className="mx-auto max-w-[1250px] px-6 pt-16 pb-10 border-b border-gray-200">
        {/* Header */}
        <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-3 mb-8 md:mb-0">
            <img src={logo} alt="Logo HIMATIK" className="h-10 w-10" />
            <div>
              <h3 className="text-xl font-extrabold text-black">HIMATIK</h3>
              <p className="text-sm text-gray-600">
                Himpunan Mahasiswa Teknologi Informasi & Komputer <br />
                Politeknik Negeri Lhokseumawe
              </p>
            </div>
          </div>
        </div>

        {/* Grid Links */}
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Navigasi */}
          <div>
            <h4 className="mb-4 font-bold text-black text-lg">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="hover:text-purple-500 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Berita Terbaru */}
          <div>
            <h4 className="mb-4 font-bold text-black text-lg">Berita Terbaru</h4>
            <ul className="space-y-2 text-sm">
              {latestArticles && latestArticles.length > 0 ? (
                latestArticles.map((a) => (
                  <li key={a.id}>
                    <a
                      href={`/berita/${a.slug}`}
                      className="hover:text-purple-500 transition-colors"
                    >
                      {a.title}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 italic">Belum ada berita</li>
              )}
            </ul>
          </div>

          {/* Kontak Kami */}
          <div>
            <h4 className="mb-4 font-bold text-black text-lg">Kontak Kami</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <strong>Alamat:</strong> Politeknik Negeri Lhokseumawe, Aceh
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:himatik@pnl.ac.id"
                  className="hover:text-purple-500"
                >
                  himatik@pnl.ac.id
                </a>
              </li>
              <li>
                <strong>Telepon:</strong>{" "}
                <a href="tel:+62645200000" className="hover:text-purple-500">
                  +62 645 200000
                </a>
              </li>
            </ul>
          </div>

          {/* Media Sosial */}
          <div>
            <h4 className="mb-4 font-bold text-black text-lg">Media Sosial</h4>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gray-100 p-2 text-gray-600 shadow-sm hover:bg-purple-500 hover:text-white transition-all"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mx-auto max-w-[1250px] px-6 py-6 flex flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row border-t border-gray-200">
        <div>© {new Date().getFullYear()} HIMATIK. Hak cipta dilindungi.</div>
      </div>
    </footer>
  );
}
