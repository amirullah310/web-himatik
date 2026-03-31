// resources/js/Pages/blog/index.tsx
import { Link, PageProps, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Calendar, Search, ChevronRight, Newspaper, Eye, Users2 } from "lucide-react";
import { motion } from "framer-motion";

import AppLoading from "@/components/homepage/app-loading";
import BlogLayout from "@/components/homepage/blog/BlogLayout";
import Pagination from "@/components/homepage/blog/Pagination";
import SectionLabelBlog from "@/components/Blog/app-label";
import RelatedArticleCardBottom from "./RelatedArticleCardBottom";
import AppScrollToTop from "@/components/homepage/app-scroll-to-top";
import SectionLabelHome from "@/components/homepage/app-label-bottom";

// === TIPE DATA ===
interface Category {
  id: number;
  name: string;
}

interface Author {
  id: number;
  name: string;
  picture?: string;
  role?: {
    id: number;
    name: string;
  };
}

interface Article {
  id: number;
  title: string;
  picture?: string;
  slug: string;
  summary: string;
  content: string;
  author_id: number;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
  view_count: number;
  author: Author;
  categories: Category[];
}

interface ArticlesPaginationData {
  current_page: number;
  data: Article[];
  links: { url: string | null; label: string; active: boolean }[];
}

interface BlogPageProps extends PageProps {
  articles: ArticlesPaginationData;
  categories: Category[];
  search?: string;
  per_page?: number;
  selected_category_id?: number;
}

// === SIDEBAR ===
const Sidebar = ({
  categories = [],
  recentPosts = [],
  allArticles = [],
}: {
  categories?: Category[];
  recentPosts?: Article[];
  allArticles?: Article[];
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = route("blog.index", { search: query });
    }
  };

  return (
    <aside className="space-y-10 lg:sticky lg:top-24 h-fit">
      {/* Search */}
      {/* <div className="p-5 rounded-2xl border border-gray-200 shadow-sm bg-white hover:shadow-md transition">
        <h3 className="text-lg font-bold mb-4 border-b pb-2 text-gray-900">
          Cari Berita
        </h3>
        <form onSubmit={handleSearch} className="flex">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari berita..."
              className="w-full border border-gray-300 pl-8 pr-3 py-2 rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-900 text-white font-medium px-4 rounded-r-md hover:bg-black transition"
          >
            Cari
          </button>
        </form>
      </div> */}

      {/* Categories */}
      {categories.length > 0 && (
        <div className="p-5 rounded-2xl border border-gray-200 shadow-sm bg-white hover:shadow-md transition">
          <h3 className="text-lg font-bold mb-4 border-b pb-2 text-gray-900">
            Kategori
          </h3>
          <ul className="space-y-2">
            {categories.map((cat) => {
              const count = allArticles.filter((a) =>
                a.categories.some((c) => c.id === cat.id)
              ).length;

              return (
                <li key={cat.id}>
                  <Link
                    href={route("blog.index", { category_id: cat.id })}
                    className="flex items-center justify-between text-sm text-gray-700 hover:text-gray-900 transition"
                  >
                    <span className="flex items-center gap-1">
                      <ChevronRight size={14} />
                      {cat.name}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">
                      ({count})
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div className="p-5 rounded-2xl border border-gray-200 shadow-sm bg-white hover:shadow-md transition">
          <h3 className="text-lg font-bold mb-4 border-b pb-2 text-gray-900">
            Berita Terbaru
          </h3>
          <div className="space-y-4">
            {recentPosts.slice(0, 5).map((post) => (
              <Link
                key={post.id}
                href={route("blog.show", post.slug)}
                className="flex items-center gap-3 group"
              >
                {post.picture ? (
                  <img
                    src={`/storage/${post.picture}`}
                    alt={post.title}
                    className="w-16 h-12 object-cover rounded-lg group-hover:opacity-90 transition"
                  />
                ) : (
                  <div className="w-16 h-12 bg-gray-200 rounded-lg" />
                )}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-gray-800 line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center text-xs text-gray-500 gap-1 mt-1">
                    <Calendar size={12} />
                    <span>
                      {new Date(post.created_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

// === HALAMAN BLOG ===
const BlogPage: React.FC<BlogPageProps> = ({
  articles,
  categories,
  search: initialSearch,
  per_page: initialPerPage,
  selected_category_id: initialSelectedCategoryId,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialSearch || "");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <AppLoading />;

  const allArticles = articles?.data || [];

  const handlePaginationClick = (url: string | null) => {
    if (url) router.visit(url, { preserveScroll: true });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = route("blog.index", { search: searchQuery });
    }
  };

  // === Statistik Data ===
  const totalBerita = allArticles.length;
  const totalViews = allArticles.reduce((sum, a) => sum + (a.view_count || 0), 0);
  const totalPenulis = new Set(allArticles.map((a) => a.author_id)).size;

  return (
    <BlogLayout title="Berita - HIMATIK">
      <SectionLabelBlog />

      {/* 🔹 Statistik Blog Section */}
      <section className="pt-16 md:pt-20 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[1250px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
        >
          {[ 
            {
              icon: <Newspaper className="h-5 w-5" />,
              iconBg: "bg-blue-100",
              iconColor: "text-blue-600",
              title: "Total Berita",
              value: totalBerita,
              desc: "Jumlah seluruh berita yang telah diterbitkan HIMATIK.",
            },
            {
              icon: <Eye className="h-5 w-5" />,
              iconBg: "bg-purple-100",
              iconColor: "text-purple-600",
              title: "Total Pembaca",
              value: totalViews,
              desc: "Total jumlah pembaca dari seluruh artikel yang telah dipublikasikan.",
            },
            {
              icon: <Users2 className="h-5 w-5" />,
              iconBg: "bg-yellow-100",
              iconColor: "text-yellow-600",
              title: "Total Penulis",
              value: totalPenulis,
              desc: "Jumlah penulis aktif yang berkontribusi menulis berita di HIMATIK.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 p-6"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor} mb-4`}>
                {card.icon}
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-1">{card.title}</h4>
              <p className="text-3xl font-bold text-gray-900 mb-2">{card.value}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* === BAGIAN UTAMA === */}
      <section className="w-full bg-gray-50 py-12">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-12">
          {allArticles.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-12">
              {/* Semua Berita */}
              <div>
                <div className="flex items-center justify-between mb-6 border-b pb-2 flex-wrap gap-3">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Berita Terbaru
                  </h2>

{/* 🔹 Kolom Pencarian (fungsi sama seperti sidebar) */}
<form onSubmit={handleSearchSubmit} className="flex items-center gap-0 w-full max-w-sm">
  <div className="relative flex-1">
    <Search
      size={16}
      className="absolute left-3 top-2.5 text-gray-400"
    />
    <input
      type="text"
      placeholder="Cari berita..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full border border-gray-300 pl-8 pr-3 py-2 rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
    />
  </div>

  <button
    type="submit"
    className="bg-gray-900 text-white px-4 py-2 rounded-r-md text-sm font-medium hover:bg-black transition"
  >
    Cari
  </button>
</form>

                </div>

                {/* 🔹 Daftar Artikel */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
                  {allArticles.map((article) => (
                    <RelatedArticleCardBottom
                      key={article.id}
                      article={article}
                    />
                  ))}
                </div>

                {/* 🔹 Berita Terpopuler */}
                {allArticles.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-900">
                      Berita Terpopuler
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                      {allArticles
                        .slice()
                        .sort((a, b) => b.view_count - a.view_count)
                        .slice(0, 6)
                        .map((article) => (
                          <RelatedArticleCardBottom
                            key={`popular-${article.id}`}
                            article={article}
                          />
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:pl-4">
                <Sidebar
                  categories={categories}
                  recentPosts={allArticles.slice(0, 5)}
                  allArticles={allArticles}
                />
              </div>
            </div>
          ) : (
            <p className="rounded-lg border border-gray-200 bg-white py-10 text-center text-lg text-gray-500">
              Tidak ada artikel yang ditemukan.
            </p>
          )}

          {/* Pagination */}
          <div className="mt-12">
            <Pagination
              links={articles.links}
              handlePaginationClick={handlePaginationClick}
            />
          </div>
        </div>
      </section>
        {/* <SectionLabelHome/> */}
      <AppScrollToTop />
    </BlogLayout>
  );
};


export default BlogPage;
