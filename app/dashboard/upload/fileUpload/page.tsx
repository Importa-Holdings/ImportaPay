"use client";

import React, { useState, useCallback, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Bold,
  Hash,
  ImageIcon,
  Italic,
  LinkIcon,
  MoreHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/store/authStore";

interface BlogPost {
  id?: string;
  title: string;
  subtitle?: string;
  content: string;
  isDraft: boolean;
  category_id?: string;
  is_published?: boolean;
  image?: string;
}

// Ensure all functions are properly bound and serializable
const createBlogPost = (initial?: Partial<BlogPost>): BlogPost => ({
  title: "",
  content: "",
  isDraft: true,
  ...initial,
});

function BlogEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { token, user } = useAuthStore();
  const [post, setPost] = useState<BlogPost>(() => {
    // Check if we're in edit mode
    if (typeof window !== "undefined") {
      const editData = searchParams.get("edit");
      if (editData) {
        try {
          const parsedData = JSON.parse(decodeURIComponent(editData));
          return createBlogPost({
            ...parsedData,
            isDraft: false,
          });
        } catch (e) {
          console.error("Error parsing edit data:", e);
        }
      }

      // Load draft if exists and not in edit mode
      const saved = localStorage.getItem("draftPost");
      return saved ? JSON.parse(saved) : createBlogPost();
    }
    return createBlogPost();
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleNext = useCallback(() => {
    if (!post.title.trim() || !post.content.trim()) {
      toast.error("Please fill in both title and content before proceeding");
      return;
    }

    setIsSaving(true);
    try {
      // Save to localStorage before navigating
      const postData = {
        ...post,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem("draftPost", JSON.stringify(postData));

      // Navigate to the next step with the post data
      const queryParams = new URLSearchParams();
      if (post.id) {
        queryParams.set(
          "edit",
          JSON.stringify({
            id: post.id,
            title: post.title,
            subtitle: post.subtitle,
            content: post.content,
            category_id: post.category_id,
            is_published: post.is_published,
            image: post.image,
          })
        );
      }

      router.push(
        `/dashboard/upload/fileUpload/imagefile?${queryParams.toString()}`
      );
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("Failed to save draft");
    } finally {
      setIsSaving(false);
    }
  }, [post, router]);

  const handleBack = useCallback(() => {
    if (
      (post.title || post.content) &&
      !window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      )
    ) {
      return;
    }
    router.back();
  }, [post, router]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!token || !user) {
      router.push("/blog");
      return;
    }
  }, [user, token, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="flex items-center cursor-pointer space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to home</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleNext}
              disabled={isSaving}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Next"}
            </button>
          </div>
        </div>
      </header>

      {/* Editor Area */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Title Input */}
        <input
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          placeholder="New post title here..."
          className="w-full text-4xl font-bold mb-6 outline-none bg-transparent"
        />

        {/* Toolbar */}
        <div className="bg-white border border-gray-200 rounded-lg p-2 mb-4 sticky top-16 z-10">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Bold"
              title="Bold (Ctrl+B)"
            >
              <Bold className="w-5 h-5 text-gray-700" />
            </button>
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Italic"
              title="Italic (Ctrl+I)"
            >
              <Italic className="w-5 h-5 text-gray-700" />
            </button>
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Add Link"
              title="Add Link (Ctrl+K)"
            >
              <LinkIcon className="w-5 h-5 text-gray-700" />
            </button>

            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm text-gray-700 hover:border-gray-300 focus:outline-none focus:border-purple-500 cursor-pointer">
                <option>Body</option>
                <option>Heading 1</option>
                <option>Heading 2</option>
                <option>Heading 3</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Add link"
              title="Add link"
            >
              <LinkIcon className="w-5 h-5 text-gray-700" />
            </button>

            <button
              type="button"
              className="flex items-center space-x-1 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Add heading"
              title="Add heading"
            >
              <Hash className="w-4 h-4 text-gray-700" />
              <Hash className="w-4 h-4 text-gray-700 -ml-1" />
            </button>

            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="More options"
              title="More options"
            >
              <MoreHorizontal className="w-5 h-5 text-gray-700" />
            </button>

            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Insert image"
              title="Insert image"
            >
              <ImageIcon className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Content Editor */}
        <div className="mt-4">
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            placeholder="Start writing your post here..."
            className="w-full min-h-[500px] p-4 text-lg text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              lineHeight: 1.6,
            }}
          />
        </div>
      </main>
    </div>
  );
}

// Loading fallback component
function BlogEditorFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading editor...</p>
      </div>
    </div>
  );
}

// Main export wrapped in Suspense
export default function BlogEditor() {
  return (
    <Suspense fallback={<BlogEditorFallback />}>
      <BlogEditorContent />
    </Suspense>
  );
}
