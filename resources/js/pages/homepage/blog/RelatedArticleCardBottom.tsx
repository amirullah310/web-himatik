import { Link, router } from "@inertiajs/react";
import {
  Calendar,
  Heart,
  Bookmark,
  Download,
  FileText,
  File,
} from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface Category {
  id: number;
  name: string;
}

interface Author {
  name?: string;
}

interface Article {
  id: number;
  title: string;
  picture?: string;
  slug: string;
  summary?: string;
  created_at: string;
  view_count: number;
  categories: Category[];
  author?: Author;
  liked?: boolean;
  saved?: boolean;
  like_count?: number;
  saved_count?: number;
}

const RelatedArticleCardBottom: React.FC<{ article: Article }> = ({
  article,
}) => {
  const [liked, setLiked] = useState(article.liked || false);
  const [saved, setSaved] = useState(article.saved || false);
  const [likeCount, setLikeCount] = useState(article.like_count || 0);

  const getImageUrl = (path?: string) =>
    path ? `/storage/${path}` : "/images/penguin.png";

  // --- Fungsi untuk Like ---
  const handleLike = () => {
    const routeName = liked ? "article.unlike" : "article.like";

    router.post(route(routeName, article.id), {}, {
      preserveScroll: true,
      onSuccess: () => {
        setLiked(!liked);
        setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
      },
    });
  };

  // --- Fungsi untuk Simpan ---
  const handleSave = () => {
    const routeName = saved ? "article.unsave" : "article.save";

    router.post(route(routeName, article.id), {}, {
      preserveScroll: true,
      onSuccess: () => {
        setSaved(!saved);
      },
    });
  };

  return (
    <div className="group w-full max-w-md mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500">
      {/* Gambar */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={getImageUrl(article.picture)}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-80 group-hover:opacity-70 transition-all" />

        {/* Tombol Like & Simpan */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={handleLike}
            className={`p-2 rounded-full bg-white/90 hover:bg-white shadow transition-all ${
              liked ? "text-red-500" : "text-gray-600"
            }`}
          >
            <Heart
              size={18}
              fill={liked ? "currentColor" : "none"}
              strokeWidth={1.8}
            />
          </button>

          <button
            onClick={handleSave}
            className={`p-2 rounded-full bg-white/90 hover:bg-white shadow transition-all ${
              saved ? "text-blue-500" : "text-gray-600"
            }`}
          >
            <Bookmark
              size={18}
              fill={saved ? "currentColor" : "none"}
              strokeWidth={1.8}
            />
          </button>
        </div>
      </div>

      {/* Konten */}
      <div className="p-5 flex flex-col gap-3">
        {/* Kategori */}
        {article.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.categories.map((cat) => (
              <span
                key={cat.id}
                className="text-[11px] font-semibold uppercase text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        {/* Judul */}
        <h2 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-black">
          {article.title}
        </h2>

        {/* Tanggal & Jumlah View */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar size={13} className="text-gray-400" />
            <span>
              {new Date(article.created_at).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>{article.view_count.toLocaleString("id-ID")}x</span>
          </div>
        </div>

        {/* Jumlah Like & Simpan */}
        <div className="flex flex-col gap-1 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Heart
              size={12}
              className={liked ? "text-red-500" : "text-gray-400"}
              fill={liked ? "currentColor" : "none"}
            />
            <span>{likeCount} suka</span>
          </div>
          <div className="flex items-center gap-1">
            <Bookmark
              size={12}
              className={saved ? "text-blue-500" : "text-gray-400"}
              fill={saved ? "currentColor" : "none"}
            />
            <span>{article.saved_count?.toLocaleString("id-ID") || 0} tersimpan</span>
          </div>
        </div>

        {/* Ringkasan */}
        {article.summary && (
          <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">
            {article.summary}
          </p>
        )}

        {/* Tombol Selengkapnya & Download */}
        <div className="flex items-center justify-between mt-2">
          <Link
            href={route("blog.show", article.slug)}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-full px-4 py-1.5 hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            Selengkapnya
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          {/* Dropdown Download */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-full px-3 py-1.5 hover:bg-gray-100 transition-all">
                <Download size={16} />
              
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem asChild>
                <a
                  href={route("blog.download", [article.slug, "pdf"])}
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <FileText size={14} /> PDF
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href={route("blog.download", [article.slug, "word"])}
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <File size={14} /> Word
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default RelatedArticleCardBottom;
