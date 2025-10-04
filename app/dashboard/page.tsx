"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Navbar } from "../../components/navbar/Navbar";
import { useRouter } from "next/navigation";
import { usePosts } from "../blog/hooks/usePosts";
import { useAuthStore } from "@/lib/store/authStore";

export default function Dashboard() {
  const router = useRouter();
  const { user, token } = useAuthStore();
  const { posts, loading, error, hasMore, loadMore } = usePosts();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!token || !user) {
      router.push("/blog");
      return;
    }
  }, [user, token, router]);

  // Show loading state while checking auth
  if (typeof window !== "undefined" && (!user || !token)) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="max-w-5xl mx-auto w-full pt-12 pb-8 px-4 mt-12">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-700"></div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="max-w-5xl mx-auto w-full pt-12 pb-8 px-4 mt-12">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-700"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="max-w-5xl mx-auto w-full pt-12 pb-8 px-4 mt-12">
          <div className="text-red-500 text-center py-12">
            Error loading posts: {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="max-w-5xl mx-auto w-full pt-12 pb-8 px-4 mt-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Home</h1>
          <button
            className="bg-purple-700 text-white px-6 py-2 rounded-xl font-semibold shadow hover:bg-purple-800 transition"
            onClick={() => router.push("/dashboard/upload")}
          >
            + New post
          </button>
        </div>
        <div className="font-medium mb-4">Recent posts</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="bg-gray-100 rounded-t-xl h-56 flex items-center justify-center overflow-hidden">
                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500 ml-auto">
                    {post.date}
                  </span>
                </div>
                <h3 className="font-bold text-lg leading-snug mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {post.description || post.content.substring(0, 150)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
        {hasMore && (
          <div className="flex justify-center mb-12">
            <button
              onClick={loadMore}
              disabled={loading}
              className={`border border-purple-500 text-purple-600 px-8 py-2 rounded-xl font-medium transition ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-50"
              }`}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
      {/* Bottom Navigation */}
      <div className="fixed bottom-6 left-0 w-full flex justify-center">
        <div className="bg-white shadow-md rounded-full flex items-center px-8 py-3 space-x-12 border border-gray-200">
          <Link
            href="/dashboard"
            className="flex flex-col items-center text-purple-700 hover:text-purple-800 cursor-pointer hover:scale-105 transition-transform"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-home mb-1"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="text-xs">Home</span>
          </Link>
          <Link
            href="/dashboard/upload"
            className="flex flex-col items-center text-gray-500 hover:text-purple-700 cursor-pointer hover:scale-105 transition-transform"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-file-text mb-1"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span className="text-xs">Drafts</span>
          </Link>
          <Link
            href="/blog"
            className="flex flex-col items-center text-gray-500 hover:text-purple-700 cursor-pointer hover:scale-105 transition-transform"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-check-square mb-1"
            >
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            <span className="text-xs">Published</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
