"use client";

import React, { useState, useEffect } from "react";
import { Share, Loader2, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

interface Post {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  category_id: number;
  author_id: number;
  is_published: number;
  created_at: string;
  updated_at: string;
  categories: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
}

interface BlogPostClientProps {
  postId: string;
  initialData?: Post;
  error?: string | null;
}

export default function BlogPostClient({
  postId,
  initialData,
  error: initialError,
}: BlogPostClientProps) {
  const [post, setPost] = useState<Post | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData && !initialError);
  const [error, setError] = useState<string | null>(initialError || null);
  const router = useRouter();

  useEffect(() => {
    // If we have initial data, no need to fetch
    if (initialData) {
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://admin-api.pay.importa.biz/api/posts/${postId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const data = await response.json();

        if (data.status === 200 && data.data) {
          setPost(data.data);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        setError("Error loading post. Please try again later.");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, initialData]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.subtitle,
          url: window.location.href,
        });
      } catch (err) {
        // Error handling for share functionality
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        <span className="ml-2 text-gray-600">Loading post...</span>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-8">
        <p className="text-red-500 mb-4">{error || "Post not found"}</p>
        <button
          onClick={() => router.push("/blog")}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async () => {
    try {
      if (!post) return;

      // Encode the post data to pass as a URL parameter
      const postData = encodeURIComponent(
        JSON.stringify({
          id: post.id,
          title: post.title,
          subtitle: post.subtitle,
          content: post.content,
          category_id: post.category_id,
          image: post.image,
          is_published: post.is_published,
        })
      );

      router.push(`/dashboard/upload/fileUpload?edit=${postData}`);
    } catch (err) {
      console.error("Error navigating to edit page:", err);
      toast.error("Failed to navigate to edit page");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      setIsDeleting(true);

      // Get token from localStorage
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://admin-api.pay.importa.biz/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Post deleted successfully");
        router.push("/blog");
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete post");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete post";
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto px-4 pt-8">
        <button
          onClick={() => router.push("/blog")}
          className="inline-flex transform cursor-pointer items-center text-gray-600 hover:text-purple-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 leading-tight text-gray-900">
          {post.title}
        </h1>

        {post.subtitle && (
          <p className="text-xl text-gray-600 mb-6">{post.subtitle}</p>
        )}

        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex space-x-3 items-center">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
              {post.categories?.name || "Uncategorized"}
            </span>
            <span className="text-sm text-gray-500">
              {formatDate(post.created_at)}
            </span>
            <span className="text-sm text-gray-400">
              • {Math.ceil(post.content.split(/\s+/).length / 200)} min read
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              className="border border-blue-300 px-4 py-1.5 rounded-xl flex items-center space-x-2 cursor-pointer hover:bg-blue-50 transition-colors"
            >
              <span className="text-sm">Edit</span>
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="border border-red-300 px-4 py-1.5 rounded-xl flex items-center space-x-2 cursor-pointer hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-sm">Delete</span>
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="border border-gray-300 px-4 py-1.5 rounded-xl flex items-center space-x-2 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm">Share</span>
              <Share className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="w-full h-96 bg-gray-100 rounded-lg mb-8 overflow-hidden">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback in case of image loading error
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src =
                  "https://via.placeholder.com/800x400?text=Image+Not+Available";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-24 h-24 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-line mb-8">
            {post.content}
          </div>
        </div>

        {post.is_published === 0 && (
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              ⚠️ This post is currently unpublished
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Allow dynamic params to be generated on-demand
export const dynamicParams = true;
