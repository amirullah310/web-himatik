import { Link } from '@inertiajs/react';
import { Calendar, Eye } from 'lucide-react';

interface Category {
  id: number;
  name: string;
}

interface Author {
  name?: string;
}

interface Article {
  slug: string;
  picture?: string;
  title: string;
  categories: Category[];
  author: Author;
  created_at: string;
  view_count: number;
}

export default function RelatedArticleCard({
  article,
  large = false,
}: {
  article: Article;
  large?: boolean;
}) {
  return (
    <Link
      href={route('blog.show', article.slug)}
      className={`group relative flex flex-col overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ${
        large ? 'h-[380px] md:h-[460px]' : 'h-[180px]'
      }`}
    >
      {/* Gambar artikel */}
      <img
        src={article.picture ? `/storage/${article.picture}` : '/images/penguin.png'}
        alt={article.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Overlay gradient agar teks tetap terbaca */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl" />

      {/* Konten teks */}
      <div className="relative z-10 p-5 flex flex-col justify-end h-full text-white">
        {article.categories?.[0] && (
          <span className="bg-purple-400 text-white text-[10px] font-semibold uppercase px-2 py-1 rounded mb-2 w-fit shadow">
            {article.categories[0].name}
          </span>
        )}
        <h3
          className={`font-bold leading-tight ${
            large ? 'text-2xl md:text-3xl' : 'text-sm md:text-base'
          } group-hover:text-purple-300 transition`}
        >
          {article.title}
        </h3>

        <div className="mt-3 flex items-center gap-4 text-xs text-gray-200">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-purple-400" /> {article.view_count}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            {new Date(article.created_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}
