import { Link, PageProps, usePage, router, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Calendar, Eye, Share2, Bookmark, Heart, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaTelegram } from "react-icons/fa";
import { FaFacebook, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";
import { marked } from "marked";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import AppLoading from "@/components/homepage/app-loading";
import BlogLayout from "@/components/homepage/blog/BlogLayout";
import RelatedArticlesSidebar from "@/components/homepage/blog/RelatedArticlesSidebar";
import SectionLabelBlog from "@/components/Blog/app-label";

interface Category {
  id: number;
  name: string;
}

interface Author {
  id: number;
  name: string;
  picture?: string;
}

interface Comment {
  id: number;
  comment: string;
  user_id: number;
  created_at: string;
  is_hidden?: boolean;
  likes?: any[];
  user?: { name: string };
  replies?: Comment[];
}

export interface Article {
  id: number;
  title: string;
  picture?: string;
  slug: string;
  summary: string;
  content: string;
  author_id: number;
  status: "draft" | "published";
  created_at: string;
  author: Author;
  categories: Category[];
  view_count: number;
  like_count?: number;
  saved_count?: number;
  comments?: Comment[];
}

interface BlogArticleShowProps extends PageProps {
  article: Article;
  relatedArticles: Article[];
  popularArticles: Article[];
}

const getImageUrl = (path?: string) =>
  path ? `/storage/${path}` : "/images/penguin.png";

const BlogArticleShow: React.FC<BlogArticleShowProps> = ({
  article,
  relatedArticles,
  popularArticles,
}) => {
  const authUser = (usePage().props as any).auth?.user;

  const [isLoading, setIsLoading] = useState(true);
  const [mainComment, setMainComment] = useState("");
  const [replyOpen, setReplyOpen] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<Record<number, string>>({});
  const [openReplies, setOpenReplies] = useState<Record<number, boolean>>({});

  const commentForm = useForm({
    comment: "",
    parent_id: null as number | null,
  });

  const replyForm = useForm({
    comment: "",
    parent_id: null as number | null,
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.add("public-theme", "bg-white");
    return () => document.body.classList.remove("public-theme", "bg-white");
  }, []);

  const toggleReplies = (id: number) => {
    setOpenReplies((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Tautan berhasil disalin");
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    commentForm.setData("comment", mainComment);
    commentForm.setData("parent_id", null);

    commentForm.post(route("comments.store", article.id), {
      preserveScroll: true,
      onSuccess: () => {
        setMainComment("");
        router.reload({ only: ["article"] });
      },
    });
  };

  const handleReplySubmit = (e: React.FormEvent, parentId: number) => {
    e.preventDefault();

    replyForm.setData("comment", replyText[parentId] || "");
    replyForm.setData("parent_id", parentId);

    replyForm.post(route("comments.store", article.id), {
      preserveScroll: true,
      onSuccess: () => {
        setReplyText((prev) => ({ ...prev, [parentId]: "" }));
        setReplyOpen(null);
        router.reload({ only: ["article"] });
      },
    });
  };

  if (isLoading) return <AppLoading />;

  if (!article || article.status !== "published") {
    return (
      <BlogLayout title="Artikel Tidak Ditemukan">
        <main className="flex min-h-screen items-center justify-center bg-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-purple-500 mb-4">
              404 - Artikel Tidak Ditemukan
            </h1>
            <Link href={route("blog.index")} className="text-purple-600">
              Kembali ke Artikel
            </Link>
          </div>
        </main>
      </BlogLayout>
    );
  }

  const renderedContent = /<\/?[a-z][\s\S]*>/i.test(article.content)
    ? article.content
    : marked.parse(article.content);

  return (
    <BlogLayout title={article.title}>
      <SectionLabelBlog />

      {/* HEADER */}
      <section className="py-12 border-b bg-white">
        <div className="mx-auto max-w-[1250px] px-6">
          <h1 className="text-4xl font-bold mb-3">{article.title}</h1>

          <div className="flex gap-2 mb-4">
            {article.categories.map((cat) => (
              <span
                key={cat.id}
                className="bg-purple-50 text-purple-700 text-xs px-3 py-1 rounded-full"
              >
                {cat.name}
              </span>
            ))}
          </div>

          <div className="flex gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              {new Date(article.created_at).toLocaleDateString("id-ID")}
            </span>

            <span className="flex items-center gap-1">
              <Eye size={16} />
              {article.view_count} dilihat
            </span>

            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Share2 size={16} />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-44">
                <Button onClick={handleCopyLink} variant="ghost">
                  Salin Link
                </Button>

                <Button
                  variant="ghost"
                  onClick={() =>
                    window.open(
                      `https://api.whatsapp.com/send?text=${article.title} ${window.location.href}`
                    )
                  }
                >
                  <FaWhatsapp className="text-green-500" /> WhatsApp
                </Button>

                <Button
                  variant="ghost"
                  onClick={() =>
                    window.open(
                      `https://facebook.com/sharer/sharer.php?u=${window.location.href}`
                    )
                  }
                >
                  <FaFacebook className="text-blue-600" /> Facebook
                </Button>

                <Button
                  variant="ghost"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${window.location.href}`
                    )
                  }
                >
                  <FaXTwitter /> Twitter
                </Button>

                <Button
                  variant="ghost"
                  onClick={() =>
                    window.open(
                      `https://t.me/share/url?url=${window.location.href}`
                    )
                  }
                >
                  <FaTelegram className="text-sky-500" /> Telegram
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-[1300px] px-6 py-16 bg-white">
        <div className="grid lg:grid-cols-[2.5fr_1.2fr] gap-12">

          <div>

            <div className="border rounded-2xl p-8 shadow-sm">
              {article.picture && (
                <img
                  src={getImageUrl(article.picture)}
                  className="rounded-xl mb-10 h-72 w-full object-cover"
                />
              )}

              <article
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: renderedContent }}
              />

              <Separator className="my-10" />

              <div className="flex justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-pink-500" />
                  {article.like_count ?? 0}
                </div>

                <div className="flex items-center gap-2">
                  <Bookmark size={16} className="text-indigo-500" />
                  {article.saved_count ?? 0}
                </div>
              </div>
            </div>

            {/* KOMENTAR */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Komentar</h2>

              {authUser && (
                <form onSubmit={handleCommentSubmit}>
                  <textarea
                    rows={4}
                    value={mainComment}
                    onChange={(e) => setMainComment(e.target.value)}
                    className="w-full border rounded-lg p-3"
                    placeholder="Tulis komentar..."
                  />
                  <Button className="mt-3">Kirim</Button>
                </form>
              )}

              <div className="space-y-6 mt-8">
                {(article.comments ?? []).map((c) => (
                  <div key={c.id} className="border rounded-xl p-4">

                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold">{c.user?.name}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(c.created_at).toLocaleString("id-ID")}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          router.post(route("comments.like", c.id))
                        }
                        className="flex items-center gap-1 text-sm"
                      >
                        <ThumbsUp size={14} />
                        {c.likes?.length ?? 0}
                      </button>
                    </div>

                    <p className="mt-3">{c.comment}</p>

                    {(c.replies?.length ?? 0) > 0 && (
                      <button
                        onClick={() => toggleReplies(c.id)}
                        className="text-sm text-purple-600 mt-2"
                      >
                        {openReplies[c.id]
                          ? "Sembunyikan balasan"
                          : `Lihat ${c.replies.length} balasan`}
                      </button>
                    )}

                    {openReplies[c.id] && (
                      <div className="ml-6 mt-3 space-y-3">
                        {c.replies?.map((r) => (
                          <div key={r.id} className="border-l pl-3">
                            <p className="font-medium">{r.user?.name}</p>
                            <p className="text-sm">{r.comment}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 text-right">
              <Link href={route("blog.index")} className="text-purple-600">
                Kembali ke Artikel
              </Link>
            </div>
          </div>

          <RelatedArticlesSidebar
            article={article}
            relatedArticles={relatedArticles}
            popularArticles={popularArticles}
          />
        </div>
      </section>
    </BlogLayout>
  );
};

export default BlogArticleShow;