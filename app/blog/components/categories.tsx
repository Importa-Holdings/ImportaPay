"use client";

import React, { useState, useMemo } from "react";
import { Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePosts } from "../hooks/usePosts";

export default function Categories() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { posts, loading, error } = usePosts();

  // Extract unique categories from posts
  const tabs = useMemo(() => {
    const categories = new Set(posts.map(post => post.category));
    return ["All", ...Array.from(categories)];
  }, [posts]);

  // Filter posts based on active tab and search term
  const filteredPosts = useMemo(() => {
    if (loading || error) return [];
    
    let filtered = [...posts];

    if (activeTab !== "All") {
      filtered = filtered.filter((post) => post.category === activeTab);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          (post.description && post.description.toLowerCase().includes(term))
      );
    }

    return filtered;
  }, [posts, activeTab, searchTerm, loading, error]);

  const ArticleCard = ({ article }: { article: any }) => (
    <Link href={`/blog/${article.id}`}>
      <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full">
        {/* Image */}
        {article.imageUrl ? (
          <div className="w-full h-48 bg-gray-300 overflow-hidden">
            <img 
              src={article.imageUrl.startsWith('http') ? article.imageUrl : `https://admin-api.pay.importa.biz/storage/${article.imageUrl.replace(/^\//, '')}`}
              alt={article.title}
              className="w-full h-full object-cover"
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
                {article.authors.map((author: any, index: number) => (
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

  return (
    <div className="min-h-screen bg-white m-0 md:m-24">
      {/* Header with purple accent */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Navigation Tabs and Search */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Tabs */}
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab
                      ? "text-purple-600 border-b-2 border-purple-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="relative max-w-md w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Article Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            <span className="ml-2 text-gray-600">Loading posts...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Error loading posts. Please try again later.</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <ArticleCard key={post.id} article={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
