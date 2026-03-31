import React from 'react';
import {
  Bookmark,
  Heart,
  Share2,
  BarChart3,
  Link as LinkIcon,
  Eye,
  Calendar,
  Tag,
} from 'lucide-react';
import { Article } from '@/pages/homepage/blog/show';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { FaWhatsapp, FaTelegram, FaXTwitter, FaFacebook } from 'react-icons/fa6';
import { toast } from 'sonner';

interface RelatedArticlesSidebarProps {
  article: Article;
  popularArticles: Article[];
  relatedArticles: Article[];
  onLike?: () => void;
  onSave?: () => void;
}

const RelatedArticlesSidebar: React.FC<RelatedArticlesSidebarProps> = ({
  article,
  popularArticles,
  relatedArticles,
  onLike,
  onSave,
}) => {
  const customToastStyle = {
    background: '#ffffff',
    color: '#000000',
    border: '1px solid #c084fc',
  };

  const handleCopyLink = () => {
    const link = window.location.href;
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success('Tautan berhasil disalin!', { style: customToastStyle }))
      .catch(() => toast.error('Gagal menyalin tautan.', { style: customToastStyle }));
  };

  const ArticleCard = ({ item }: { item: Article }) => {
    const category = item.categories?.[0]?.name || 'Umum';
    const date = new Date(item.created_at).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    return (
      <a
        href={route('blog.show', item.slug)}
        className="group flex gap-3 rounded-lg p-3 border border-gray-100 hover:border-purple-200 hover:bg-purple-50/40 transition duration-200"
      >
        <img
          src={item.picture ? `/storage/${item.picture}` : '/images/default-thumbnail.jpg'}
          alt={item.title}
          className="h-20 w-28 rounded-md object-cover shadow-sm group-hover:shadow-md transition"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 group-hover:text-purple-600 line-clamp-2 leading-snug">
              {item.title}
            </h4>
            <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
              <Tag className="h-3 w-3 text-purple-400" />
              <span>{category}</span>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3 text-gray-400" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="h-3 w-3 text-gray-400" />
              <span>{item.view_count ?? 0}</span>
            </div>
          </div>
        </div>
      </a>
    );
  };

  return (
    <div className="relative lg:col-span-1 w-full">
      <div className="sticky top-28 space-y-6">
        {/* 🔹 Interaksi Artikel */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm text-center">
          <div className="flex justify-between items-center mb-4 px-6">
            <button
              onClick={onLike}
              className="flex flex-col items-center text-gray-700 hover:text-pink-500 transition"
            >
              <Heart className="h-5 w-5 mb-1" />
              <span className="text-xs text-gray-500">Suka</span>
              <span className="text-sm font-semibold">{article.like_count ?? 0}</span>
            </button>

            <button
              onClick={onSave}
              className="flex flex-col items-center text-gray-700 hover:text-indigo-500 transition"
            >
              <Bookmark className="h-5 w-5 mb-1" />
              <span className="text-xs text-gray-500">Simpan</span>
              <span className="text-sm font-semibold">{article.saved_count ?? 0}</span>
            </button>

            <Popover>
              <PopoverTrigger asChild>
                <button className="flex flex-col items-center text-gray-700 hover:text-green-600 transition">
                  <Share2 className="h-5 w-5 mb-1" />
                  <span className="text-xs text-gray-500">Bagikan</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-48 rounded-md border border-gray-200 bg-white p-2 shadow-lg">
                <div className="flex flex-col gap-1">
                  <Button
                    onClick={handleCopyLink}
                    variant="ghost"
                    className="flex justify-start gap-2 text-black"
                  >
                    <LinkIcon className="h-4 w-4 text-purple-400" />
                    Salin Tautan
                  </Button>
                  <Separator className="bg-gray-200" />
                  <Button
                    onClick={() =>
                      window.open(
                        `https://api.whatsapp.com/send?text=${article.title} ${window.location.href}`,
                        '_blank'
                      )
                    }
                    variant="ghost"
                    className="flex justify-start gap-2 text-black"
                  >
                    <FaWhatsapp className="h-4 w-4 text-green-500" />
                    WhatsApp
                  </Button>
                  <Button
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
                        '_blank'
                      )
                    }
                    variant="ghost"
                    className="flex justify-start gap-2 text-black"
                  >
                    <FaFacebook className="h-4 w-4 text-blue-600" />
                    Facebook
                  </Button>
                  <Button
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?text=${article.title}&url=${window.location.href}`,
                        '_blank'
                      )
                    }
                    variant="ghost"
                    className="flex justify-start gap-2 text-black"
                  >
                    <FaXTwitter className="h-4 w-4 text-black" />
                    Twitter
                  </Button>
                  <Button
                    onClick={() =>
                      window.open(
                        `https://t.me/share/url?url=${window.location.href}&text=${article.title}`,
                        '_blank'
                      )
                    }
                    variant="ghost"
                    className="flex justify-start gap-2 text-black"
                  >
                    <FaTelegram className="h-4 w-4 text-sky-400" />
                    Telegram
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Separator className="my-3 bg-gray-200" />
          <p className="text-xs text-gray-500">
            Terima kasih sudah mendukung konten{' '}
            <span className="font-semibold text-purple-500">HIMATIK</span>
          </p>
        </div>

        {/* 🔹 Artikel Populer */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
          <h2 className="mb-4 border-b border-gray-100 pb-2 text-lg font-semibold text-gray-900 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-500" />
            Artikel Populer
          </h2>
          <div className="space-y-3">
            {popularArticles?.length ? (
              popularArticles.slice(0, 5).map((item) => <ArticleCard key={item.id} item={item} />)
            ) : (
              <p className="text-sm text-gray-500 italic">Belum ada artikel populer.</p>
            )}
          </div>
        </div>

        {/* 🔹 Artikel Terkait */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
          <h2 className="mb-4 border-b border-gray-100 pb-2 text-lg font-semibold text-gray-900">
            Artikel Terkait
          </h2>
          <div className="space-y-3">
            {relatedArticles?.length ? (
              relatedArticles.slice(0, 5).map((item) => <ArticleCard key={item.id} item={item} />)
            ) : (
              <p className="text-sm text-gray-500 italic">Tidak ada artikel terkait.</p>
            )}
          </div>
        </div>

        {/* 🔹 Statistik Artikel */}
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50 to-white p-6 shadow-sm text-gray-800">
          <h2 className="mb-3 font-semibold text-purple-700">Statistik Artikel</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Total Views</span>
              <span className="font-semibold text-gray-700">{article.view_count}</span>
            </li>
            <li className="flex justify-between">
              <span>Disukai</span>
              <span className="font-semibold text-gray-700">{article.like_count ?? 0}</span>
            </li>
            <li className="flex justify-between">
              <span>Disimpan</span>
              <span className="font-semibold text-gray-700">{article.saved_count ?? 0}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RelatedArticlesSidebar;
