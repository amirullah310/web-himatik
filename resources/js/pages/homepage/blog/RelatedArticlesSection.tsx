import RelatedArticleCard from './RelatedArticleCard';
import Sidebar from './Sidebar';

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

export default function RelatedArticlesSection({ articles }: { articles: Article[] }) {
  if (!articles || articles.length === 0) return null;

  const [main, ...rest] = articles;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-10">
      {/* HEADLINE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Headline Besar */}
        <div className="lg:col-span-2">
          <RelatedArticleCard article={main} large />
        </div>

        {/* 4 Artikel Kecil */}
        <div className="grid grid-cols-2 gap-4">
          {rest.slice(0, 4).map((a, i) => (
            <RelatedArticleCard key={i} article={a} />
          ))}
        </div>
      </div>

      {/* MAIN SECTION */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* KONTEN UTAMA */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Popular news</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {rest.slice(4, 8).map((a, i) => (
              <RelatedArticleCard key={i} article={a} large={false} />
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <Sidebar />
      </div>
    </section>
  );
}
