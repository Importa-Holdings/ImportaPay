// Updated BlogEditor component - Replace the textarea section
"use client";

import React, { useState, useCallback, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/store/authStore";
import dynamic from 'next/dynamic';

// Import RichTextEditor with SSR disabled and loading state
const RichTextEditor = dynamic<RichTextEditorProps>(
  () => import('./components/RichTextEditor').then((mod) => mod.RichTextEditor),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-[600px] border rounded-lg p-4">Loading editor...</div>
    )
  }
);

// Define RichTextEditorProps interface to match the component's props
interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

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
    if (typeof window !== "undefined") {
      // Check for editing post in sessionStorage first
      const editingPost = sessionStorage.getItem('editingPost');
      if (editingPost) {
        try {
          const parsedData = JSON.parse(editingPost);
          // Clear the session storage after retrieving the data
          sessionStorage.removeItem('editingPost');
          return createBlogPost({
            ...parsedData,
            isDraft: false,
          });
        } catch (e) {
          console.error("Error parsing editing post data:", e);
        }
      }

      // Fall back to URL params for backward compatibility
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

      // Finally, check for saved draft in localStorage
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
      const postData = {
        ...post,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem("draftPost", JSON.stringify(postData));

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

        {/* Rich Text Editor - Replaces the old toolbar and textarea */}
        <div className="mt-4">
          <RichTextEditor
            content={post.content}
            onChange={(content) => setPost({ ...post, content })}
            placeholder="Start writing your post here..."
          />
        </div>
      </main>
    </div>
  );
}

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

export default function BlogEditor() {
  return (
    <Suspense fallback={<BlogEditorFallback />}>
      <BlogEditorContent />
    </Suspense>
  );
}
