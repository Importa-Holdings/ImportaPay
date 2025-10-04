"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

export default function UploadEmpty() {
  const router = useRouter();
  const { user, token } = useAuthStore();

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
        <div className="max-w-5xl mx-auto w-full pt-12 pb-8 px-4 mt-12">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-700"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white relative">
      <div className="flex flex-col items-center justify-center flex-1">
        {/* Folder SVG */}
        <svg
          width="120"
          height="80"
          viewBox="0 0 120 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-8"
        >
          <rect x="10" y="30" width="100" height="40" rx="8" fill="#F3F4F6" />
          <rect x="10" y="20" width="40" height="20" rx="4" fill="#E5E7EB" />
        </svg>
        <div className="font-bold text-xl mb-2 text-center">No posts yet</div>
        <div className="text-gray-500 text-sm mb-6 text-center max-w-xs">
          You don't have any posts yet. Start a new post when ready
        </div>
        <Link href="/dashboard/upload/fileUpload">
          <button className="bg-purple-700 text-white px-10 py-3 rounded-xl font-medium shadow hover:bg-purple-800 transition flex items-center justify-center mb-12">
            <span className="mr-2 text-lg">+</span> New post
          </button>
        </Link>
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
