"use client";
import { Button } from "@/components/ui/button";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, User, Moon, Sun } from "lucide-react"; // 🌙☀️ ICON
import { useEffect, useState } from "react";
import AppLogoHome from "./app-logo";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProfileAvatar = ({ auth }: { auth: any }) => {
  if (auth.user?.picture) {
    return (
      <motion.img
        src={`/storage/${auth.user.picture}`}
        alt="User Profile"
        className="h-full w-full rounded-full object-cover border border-gray-400"
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 200 }}
      />
    );
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-gray-100 dark:bg-gray-800">
      <User className="h-6 w-6 text-gray-500 dark:text-gray-300" />
    </div>
  );
};

export default function AppHeader() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("light"); // 🌗 state tema

  const { url, props } = usePage<{
    auth: { user?: { name: string; email: string; role_id?: number | null; picture?: string | null } };
  }>();
  const { auth } = props;

  const toggleMobileSidebar = () => setMobileSidebarOpen((prev) => !prev);

  // 🌓 Toggle tema
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as "light" | "dark") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const progress =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Beranda", href: "/" },
    { label: "Tentang", href: "/about" },
    { label: "Departemen", href: "/departemen" },
    { label: "Struktural", href: "/struktural" },
    { label: "Berita", href: "/berita" },
    { label: "Kontak", href: "/kontak" },
  ];

  const isActive = (href: string) => url === href || (href !== "/" && url.startsWith(href));

  const handleLogout = () => {
    Inertia.post(route("logout"), {}, {
      onSuccess: () => {
        Inertia.visit("/");
        setMobileSidebarOpen(false);
      },
    });
  };

  const userHasRole = auth.user && auth.user.role_id !== null;
  const isHome = url === "/";

  return (
    <>
      {/* HEADER */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md text-gray-800 dark:text-gray-100"
            : isHome
            ? "bg-transparent text-white dark:text-gray-100"
            : "bg-transparent text-gray-800 dark:text-gray-100"
        }`}
      >
        {/* Progress bar */}
        <motion.div
          className="absolute top-0 left-0 h-[3px] bg-purple-400 dark:bg-purple-500"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
<Link
  href="/"
  className="group flex items-center gap-3 transition-all duration-300"
>
  {/* Logo */}
  <motion.div
    whileHover={{ rotate: 10, scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
    // className="flex items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 p-1.5 shadow-md"
  >
    <AppLogoHome className="h-8 w-8 text-white" />
  </motion.div>

  {/* Teks HIMATIK */}
  <div className="flex flex-col leading-tight">
    <h3 className="text-lg font-extrabold tracking-wide dark:text-white group-hover:text-purple-600 transition-colors duration-300">
      HIMATIK
    </h3>
    <span className="text-[12px] font-medium dark:text-gray-400 tracking-wider group-hover:text-purple-400 transition-colors duration-300 opacity-70">
      Politeknik Negeri Lhokseumawe
    </span>
  </div>
</Link>


            {/* Nav Desktop */}
            <nav className="hidden lg:flex gap-8 font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm tracking-wide transition-all ${
                    isActive(item.href)
                      ? "text-purple-600 dark:text-purple-400 font-semibold"
                      : "hover:text-purple-500 dark:hover:text-purple-400"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute left-0 bottom-[-4px] h-[2px] bg-purple-500 dark:bg-purple-400 w-full rounded transition-all" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="hidden lg:flex items-center gap-4">
              {/* 🌗 Theme Toggle */}
              {/* <Button
                onClick={toggleTheme}
                variant="ghost"
                size="icon"
                className="hover:bg-transparent"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5  dark:text-gray-200" />
                ) : (
                  <Sun className="h-5 w-5 text-yellow-400" />
                )}
              </Button> */}

              {auth.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full p-0 hover:ring-2 hover:ring-purple-400/60"
                    >
                      <ProfileAvatar auth={auth} />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="z-50 w-56 border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md">
                    <DropdownMenuLabel>
                      <div className="truncate font-semibold">{auth.user.name}</div>
                      <div className="truncate text-xs text-neutral-500 dark:text-gray-400">
                        {auth.user.email}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={route("profile.edit")}>Profile</Link>
                    </DropdownMenuItem>
                    {userHasRole && (
                      <DropdownMenuItem asChild>
                        <Link href={route("dashboard")}>Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-purple-600 dark:text-purple-400 font-semibold hover:bg-purple-100 dark:hover:bg-gray-800"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button className="bg-purple-500 text-white hover:bg-purple-600 shadow-sm">
                    LOGIN
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              onClick={toggleMobileSidebar}
              variant="ghost"
              size="icon"
              className="lg:hidden"
            >
              {mobileSidebarOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={toggleMobileSidebar}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35 }}
              className="fixed top-0 right-0 z-50 flex h-full w-72 flex-col bg-white dark:bg-gray-900 p-6 shadow-lg text-gray-800 dark:text-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <AppLogoHome />
                <Button variant="ghost" size="icon" onClick={toggleMobileSidebar}>
                  <X />
                </Button>
              </div>

              <nav className="flex flex-col gap-4 font-medium">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={toggleMobileSidebar}
                    className={`rounded px-3 py-2 transition ${
                      isActive(item.href)
                        ? "bg-purple-500 text-white"
                        : "hover:bg-purple-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto pt-6 flex flex-col gap-3">
                {/* 🌗 Toggle di mobile */}
                {/* <Button
                  variant="outline"
                  onClick={toggleTheme}
                  className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {theme === "light" ? "Dark Mode" : "Light Mode"}
                </Button> */}

                {auth.user ? (
                  <Button
                    className="w-full bg-purple-500 text-white hover:bg-purple-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <Link href="/login" onClick={toggleMobileSidebar}>
                    <Button className="w-full bg-purple-500 text-white hover:bg-purple-600">
                      LOGIN
                    </Button>
                  </Link>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
