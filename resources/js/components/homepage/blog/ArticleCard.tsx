import { Link } from "@inertiajs/react";
import { Calendar, User, Bookmark, Eye } from "lucide-react"; 
import React from "react";

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
  created_at: string;
  view_count: number;
  author: Author;
  categories: Category[];
}

interface ArticleCardProps {
  article: Article;
}

const getImageUrl = (path?: string): string => {
  return path ? `/storage/${path}` : "/images/penguin.png";
};

const toTitleCase = (text: string): string => {
  if (!text) return "";
  let formattedText = text.replace(/([A-Z])/g, " $1").trim();
  return formattedText
    .toLowerCase()
    .split(" ")
    .map((word) => {
      if (word.length === 0) return "";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link
      href={route("blog.show", article.slug)}
      className="group relative block flex h-full transform flex-col overflow-hidden 
                 rounded-2xl border border-gray-200 bg-white 
                 shadow-[0_6px_20px_rgba(0,0,0,0.12)] 
                 transition-all duration-300 hover:scale-[1.01] hover:border-purple-400 hover:shadow-[0_10px_25px_rgba(0,0,0,0.18)]"
    >
      {/* Header Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={getImageUrl(article.picture)}
          alt={article.title}
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
          loading="lazy"
        />

        {/* 👀 View Counter di atas gambar */}
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 shadow-md">
          <Eye className="h-4 w-4 text-purple-500" />
          {article.view_count.toLocaleString("id-ID")}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col p-6">
        {/* Meta Info */}
        <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <User className="h-4 w-4 text-purple-500" />
            {toTitleCase(article.author.name || "Admin")}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-purple-500" />
            {new Date(article.created_at).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {article.categories[0] && (
            <span className="flex items-center gap-1">
              <Bookmark className="h-4 w-4 text-purple-500" />
              {article.categories[0].name}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="mb-3 text-2xl font-bold leading-snug text-black transition-colors duration-300 group-hover:text-purple-600">
          {toTitleCase(article.title)}
        </h2>

        {/* Summary */}
        <p className="line-clamp-4 text-base leading-relaxed text-gray-700">
          {article.summary}
        </p>
      </div>
    </Link>
  );
};

export default ArticleCard;
