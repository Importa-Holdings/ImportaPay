"use client";

import React, { useState, useMemo } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePosts } from "../hooks/usePosts";

interface Author {
  color: string;
  initial: string;
}

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: number;
  imageUrl?: string;
  authors?: Author[];
}

const AuthorMeta = ({ article, large = false }: { article: Article; large?: boolean }) => (
  <div className="flex items-center gap-3">
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#F3EEFF] font-bold text-[#6A0DAD] ${
        large ? "h-10 w-10 text-[12px]" : "h-8 w-8 text-[11px]"
      }`}
    >
      IT
    </span>
    <div className="leading-tight">
      <p className={`font-bold text-[#17131A] ${large ? "text-[14px]" : "text-[12px]"}`}>
        Importa Team
      </p>
      <p className="mt-0.5 text-[11px] text-[#86828D]">
        {article.date} · {article.readTime}min read
      </p>
    </div>
  </div>
);

const PostImage = ({ article, sizes }: { article: Article; sizes: string }) =>
  article.imageUrl ? (
    <Image
      src={article.imageUrl}
      alt={article.title}
      fill
      sizes={sizes}
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
  ) : null;

const FeaturedPost = ({ article }: { article: Article }) => (
  <Link
    href={`/blog/${article.id}`}
    className="group grid items-center gap-6 rounded-[24px] border border-[#EDE8F8] bg-white p-3 shadow-[0_8px_30px_rgba(106,13,173,0.06)] sm:p-4 md:grid-cols-[minmax(0,573px)_minmax(0,1fr)] md:gap-[47px]"
  >
    <div className="relative aspect-[573/357] overflow-hidden rounded-[16px] bg-gradient-to-b from-[#F0EBFE] to-[#E9E0FE]">
      <PostImage article={article} sizes="(max-width: 768px) 100vw, 573px" />
    </div>
    <div className="px-2 pb-4 md:px-0 md:pr-8 md:pb-0">
      <div className="flex flex-wrap items-center gap-2 text-[11px]">
        <span className="rounded-full bg-[#6A0DAD] px-2.5 py-1 font-bold text-white">
          Featured
        </span>
        <span className="font-medium text-[#6A0DAD] capitalize">{article.category}</span>
      </div>
      <h2 className="mt-4 line-clamp-3 text-[26px] font-black leading-[1.15] tracking-[-0.8px] text-[#17131A] md:text-[34px] md:tracking-[-1px]">
        {article.title}
      </h2>
      {article.description && (
        <p className="mt-4 line-clamp-3 text-[15px] leading-[26px] text-[#524E56]">
          {article.description}
        </p>
      )}
      <div className="mt-8 flex items-center justify-between gap-4">
        <AuthorMeta article={article} large />
        <span className="flex shrink-0 items-center gap-1.5 text-[14px] font-bold text-[#6A0DAD]">
          Read article
          <ArrowRight size={16} strokeWidth={2.25} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  </Link>
);

// Original card layout; its wide image box suits the banner-style post images.
export const ArticleCard = ({ article }: { article: Article }) => (
  <Link href={`/blog/${article.id}`} className="font-sans">
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full">
      {/* Image */}
      {article.imageUrl ? (
        <div className="w-full h-48 bg-gray-300 overflow-hidden relative">
          <Image
            src={article.imageUrl.startsWith('http') ? article.imageUrl : `https://admin-api.pay.importa.biz/storage/${article.imageUrl.replace(/^\//, '')}`}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              // Fallback in case of image loading error
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
            }}
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      )}
      <div className="p-6">
        {/* Category and Date */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span className="capitalize">{article.category}</span>
          <span>{article.date}</span>
        </div>
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight line-clamp-2">
          {article.title}
        </h3>
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {article.description}
        </p>
        {/* Authors */}
        {article.authors && article.authors.length > 0 && (
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {article.authors?.map((author: Author, index: number) => (
                <div
                  key={index}
                  className={`w-8 h-8 ${author.color} rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white`}
                >
                  {author.initial}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </Link>
);

export default function Categories({ searchTerm }: { searchTerm: string }) {
  const [activeTab, setActiveTab] = useState("All");
  const { posts, loading, error } = usePosts();

  const tabs = useMemo(() => {
    const categories = new Set(posts.map((post) => post.category));
    return ["All", ...Array.from(categories)];
  }, [posts]);

  // The newest post is featured, unless the reader is searching.
  const term = searchTerm.trim().toLowerCase();
  const featured = !term ? posts[0] : undefined;

  const filteredPosts = useMemo(() => {
    let filtered = posts.filter((post) => post.id !== featured?.id);

    if (activeTab !== "All") {
      filtered = filtered.filter((post) => post.category === activeTab);
    }

    if (term) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.description?.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [posts, featured, activeTab, term]);

  return (
    <section className="bg-white px-4 pt-12 pb-10 font-satoshi sm:px-6 md:pt-[72px]">
      <div className="mx-auto max-w-[1112px]">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-[15px] text-[#524E56]">
            <Loader2 className="mr-2 h-6 w-6 animate-spin text-[#6A0DAD]" />
            Loading posts...
          </div>
        ) : error ? (
          <div className="py-16 text-center">
            <p className="text-[15px] text-[#524E56]">
              We couldn&apos;t load the articles. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-full bg-[#6A0DAD] px-6 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-[#5C0DB8]"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {featured && <FeaturedPost article={featured} />}

            <div
              className={`flex flex-col gap-4 border-b border-[#ECEAEE] pb-5 md:flex-row md:items-center md:justify-between ${
                featured ? "mt-16 md:mt-[100px]" : ""
              }`}
            >
              <h2 className="text-[26px] font-black tracking-[-0.8px] text-[#17131A] md:text-[28px]">
                {term ? "Search results" : "Latest articles"}
              </h2>
              <div className="-mx-4 flex gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-medium whitespace-nowrap capitalize transition-colors ${
                      activeTab === tab
                        ? "bg-[#17131A] text-white"
                        : "text-[#86828D] hover:text-[#17131A]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <ArticleCard key={post.id} article={post} />
                ))}
              </div>
            ) : (
              <p className="py-16 text-center text-[15px] text-[#86828D]">
                No articles found{term ? ` for “${searchTerm.trim()}”` : " in this category yet"}.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
