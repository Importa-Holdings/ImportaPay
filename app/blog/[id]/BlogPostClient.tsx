"use client";

import React, { useState, useEffect, useMemo, FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Link2,
  Loader2,
  Mail,
  Pencil,
  Share,
  Trash2,
} from "lucide-react";
import { useSubscribe } from "@/hooks/useSubscribe";
import { usePosts } from "../hooks/usePosts";
import { ArticleCard } from "../components/categories";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { useAuthStore } from "@/lib/store/authStore";
import DOMPurify from "dompurify";
import parse, {
  domToReact,
  DOMNode,
  HTMLReactParserOptions,
} from "html-react-parser";

type DOMElement = {
  type: "tag";
  name: string;
  children: DOMNode[];
  attribs: Record<string, string>;
};

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

type TocItem = { id: string; text: string; level: 1 | 2 };

const decodeEntities = (text: string) =>
  text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&(rsquo|lsquo|#39);/g, "'")
    .replace(/&(rdquo|ldquo|quot);/g, '"')
    .replace(/&[a-z#0-9]+;/gi, "");

// Gives each h1/h2 in the post an id so the "On this page" list can link to it.
function addHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();
  const out = (html || "").replace(
    /<h([12])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, level: string, attrs: string, inner: string) => {
      const text = decodeEntities(inner.replace(/<[^>]+>/g, "")).trim();
      if (!text) return match;
      let id =
        text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") ||
        "section";
      while (used.has(id)) id += "-2";
      used.add(id);
      toc.push({ id, text, level: level === "1" ? 1 : 2 });
      return `<h${level}${attrs.replace(/\sid="[^"]*"/i, "")} id="${id}">${inner}</h${level}>`;
    }
  );
  return { html: out, toc };
}

const readTime = (html: string) =>
  Math.max(
    1,
    Math.round(
      (html || "").replace(/<[^>]+>/g, " ").trim().split(/\s+/).length / 200
    )
  );

const NewsletterCard = () => {
  const [email, setEmail] = useState("");
  const { subscribe, isLoading, isSubscribed } = useSubscribe();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { success } = await subscribe(email);
    if (success) setEmail("");
  };

  return (
    <div className="rounded-[20px] border border-[#EDE8F8] bg-[#F8F6FF] p-5">
      <p className="text-[16px] font-black tracking-[-0.3px] text-[#17131A]">
        Subscribe to our newsletter
      </p>
      <p className="mt-1.5 text-[13px] leading-[20px] text-[#524E56]">
        Get the latest updates and news delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-2.5">
        <label className="relative block">
          <span className="sr-only">Email address</span>
          <Mail
            size={15}
            className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[#6B6870]"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={isLoading || isSubscribed}
            className="h-[42px] w-full rounded-full border border-[#EDE8F8] bg-white pr-3 pl-10 text-[13px] text-[#17131A] placeholder:text-[#A09CA6] focus:border-[#6A0DAD]/40 focus:ring-4 focus:ring-[#6A0DAD]/10 focus:outline-none disabled:opacity-60"
          />
        </label>
        <button
          type="submit"
          disabled={isLoading || isSubscribed}
          className={`flex h-[42px] w-full items-center justify-center gap-2 rounded-full text-[13px] font-bold text-white transition-colors disabled:cursor-not-allowed ${
            isSubscribed
              ? "bg-[#16A34A]"
              : "bg-[#6A0DAD] hover:bg-[#5C0DB8] disabled:opacity-70"
          }`}
        >
          {isLoading ? (
            "Subscribing..."
          ) : isSubscribed ? (
            <>
              <Check size={15} /> Subscribed!
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
    </div>
  );
};

const AuthorLine = ({ date, minutes }: { date: string; minutes: number }) => (
  <div className="flex items-center gap-3 text-left">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3EEFF] text-[13px] font-bold text-[#6A0DAD]">
      IT
    </span>
    <div className="leading-tight">
      <p className="text-[15px] font-bold text-[#17131A]">Importa Team</p>
      <p className="mt-0.5 text-[13px] text-[#86828D]">
        {date} · {minutes}min read
      </p>
    </div>
  </div>
);

export default function BlogPostClient({
  postId,
  initialData,
  error: initialError,
}: BlogPostClientProps) {
  const [post, setPost] = useState<Post | null>(initialData || null);
  const { user, token } = useAuthStore();
  const [isAuthor, setIsAuthor] = useState(false);
  const [loading, setLoading] = useState(!initialData && !initialError);
  const [error, setError] = useState<string | null>(initialError || null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { posts: allPosts } = usePosts();
  const relatedPosts = allPosts
    .filter((p) => p.id !== String(postId))
    .slice(0, 3);
  const { html: contentHtml, toc } = useMemo(
    () => addHeadingIds(post?.content || ""),
    [post?.content]
  );

  useEffect(() => {
    // Check if the current user is the author of the post
    if (user && post) {
      // Convert both to string for safe comparison
      setIsAuthor(String(user.id) === String(post.author_id));
    } else {
      setIsAuthor(false);
    }
  }, [user, post]);

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
      } catch {
        // Error handling for share functionality
        toast.error("Failed to share the post");
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center font-satoshi">
        <Loader2 className="h-8 w-8 animate-spin text-[#6A0DAD]" />
        <span className="ml-2 text-[#524E56]">Loading post...</span>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-8 font-satoshi">
        <p className="mb-4 text-[#524E56]">{error || "Post not found"}</p>
        <button
          onClick={() => router.push("/blog")}
          className="rounded-full bg-[#6A0DAD] px-6 py-2.5 font-bold text-white transition-colors hover:bg-[#5C0DB8]"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  const handleUpdate = async () => {
    try {
      if (!post) {
        toast.error("Post data is not available");
        return;
      }

      // Prepare a clean payload (avoid sending any circular refs)
      const editPayload = {
        id: post.id,
        title: post.title,
        subtitle: post.subtitle || "",
        content: post.content,
        category_id: post.category_id,
        image: post.image || "",
        is_published: post.is_published,
        isDraft: false,
        categories: post.categories
          ? { id: post.categories.id, name: post.categories.name }
          : null,
      };

      // Store in sessionStorage for the edit page to pick up
      sessionStorage.setItem("editingPost", JSON.stringify(editPayload));

      // Navigate to the editor
      router.push("/dashboard/upload/fileUpload");

      // Show loading state
      toast.loading("Loading editor...");
    } catch (err) {
      console.error("Error preparing edit mode:", err);
      toast.error("Failed to prepare edit mode. Please try again.");
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

  /* -------------------- helper to sanitize + normalize -------------------- */
  function renderRichContent(html: string): React.ReactNode {
    // sanitize incoming HTML
    const clean = DOMPurify.sanitize(html || "", {
      ADD_ATTR: ["target", "rel", "class"], // allow these if editor used them
    });

    const options: HTMLReactParserOptions = {
      replace: (node) => {
        if (!node || typeof node !== "object" || !("type" in node)) {
          return undefined;
        }

        if (node.type === "text") {
          return node.data;
        }

        if (node.type !== "tag") {
          return undefined;
        }

        const element = node as DOMElement;
        const { name, children = [], attribs = {} } = element;

        // Helper to render children safely
        const renderChildren = () => {
          return domToReact(children as DOMNode[], options);
        };

        // Helper to get image source with fallback
        const getImageSource = (): string => {
          return attribs.src || attribs["data-src"] || "";
        };

        // Headings — larger, serif, spaced like Medium
        // The page title is the only h1, so post h1/h2 become h2/h3
        if (name === "h1") {
          return (
            <h2
              id={attribs.id}
              className="mt-10 mb-3 scroll-mt-28 text-[26px] font-black leading-[1.2] tracking-[-0.6px] text-[#17131A] md:text-[30px]"
            >
              {renderChildren()}
            </h2>
          );
        }
        if (name === "h2") {
          return (
            <h3
              id={attribs.id}
              className="mt-8 mb-2 scroll-mt-28 text-[21px] font-black leading-[1.3] tracking-[-0.4px] text-[#17131A] md:text-[23px]"
            >
              {renderChildren()}
            </h3>
          );
        }
        if (name === "h3") {
          return (
            <h4 className="mt-6 mb-2 text-[19px] font-bold text-[#17131A]">
              {renderChildren()}
            </h4>
          );
        }

        // Paragraphs — good line-height and margin
        if (name === "p") {
          return (
            <p className="my-4 text-[17px] leading-[30px] text-[#524E56]">
              {renderChildren()}
            </p>
          );
        }

        // Lists — normalize spacing. Unwrap <li><p>…</p></li> to plain <li>
        if (name === "ul") {
          return (
            <ul className="mt-4 ml-6 list-disc space-y-2 text-[17px] leading-[28px] text-[#524E56] marker:text-[#6A0DAD]">
              {renderChildren()}
            </ul>
          );
        }
        if (name === "ol") {
          return (
            <ol className="mt-4 ml-6 list-decimal space-y-2 text-[17px] leading-[28px] text-[#524E56] marker:text-[#6A0DAD]">
              {renderChildren()}
            </ol>
          );
        }
        if (name === "li") {
          // unwrap paragraph inside li if present
          if (
            children.length === 1 &&
            "type" in children[0] &&
            children[0].type === "tag" &&
            "name" in children[0] &&
            children[0].name === "p" &&
            "children" in children[0]
          ) {
            return (
              <li
                key={
                  node.attribs.key || Math.random().toString(36).substr(2, 9)
                }
                className="ml-0"
              >
                {domToReact(children[0].children as DOMNode[], options)}
              </li>
            );
          }
          return (
            <li
              key={node.attribs.key || Math.random().toString(36).substr(2, 9)}
              className="ml-0"
            >
              {domToReact(children as DOMNode[], options)}
            </li>
          );
        }

        // Images — drop broken/no-src images and ensure responsive + rounded
        if (name === "img") {
          const src = getImageSource();
          if (!src) return null; // remove empty img tags that break layout
          return (
            <img
              src={src}
              alt={attribs.alt || ""}
              loading="lazy"
              className={`${attribs.class || ""} my-8 h-auto w-full rounded-[16px]`}
            />
          );
        }

        // highlight / mark
        if (
          name === "mark" ||
          (name === "span" && attribs.class?.includes("highlight"))
        ) {
          return (
            <mark className="bg-yellow-200 px-1 rounded">
              {renderChildren()}
            </mark>
          );
        }

        // links: keep underline + inherit color (and open external links in new tab)
        if (name === "a") {
          const href = attribs.href || "#";
          const isExternal =
            href &&
            /^(https?:)?\/\//.test(href) &&
            !href.startsWith(window.location.origin);
          return (
            <a
              href={href}
              target={isExternal ? "_blank" : attribs.target || undefined}
              rel={
                isExternal ? "noopener noreferrer" : attribs.rel || undefined
              }
              className="text-[#6A0DAD] underline underline-offset-2 hover:text-[#5C0DB8]"
            >
              {renderChildren()}
            </a>
          );
        }

        // blockquote
        if (name === "blockquote") {
          return (
            <blockquote className="my-6 border-l-4 border-[#6A0DAD] pl-4 text-[18px] text-[#17131A] italic">
              {renderChildren()}
            </blockquote>
          );
        }

        // code inline
        if (name === "code") {
          return (
            <code className="bg-gray-100 px-1 py-[2px] rounded text-sm font-mono">
              {renderChildren()}
            </code>
          );
        }

        // preformatted code
        if (name === "pre") {
          return (
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto my-6">
              {renderChildren()}
            </pre>
          );
        }

        // fallback: return nothing to let parser render default nodes
        return undefined;
      },
    };
    // IMPORTANT: return the parsed React nodes
    return parse(clean, options);
  }
  /* -------------------- end helper -------------------- */

  const minutes = readTime(post.content);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const shareButtons = (
    <div className="flex items-center gap-2">
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#EDE8F8] text-[#17131A] transition-colors hover:border-[#6A0DAD]/40 hover:text-[#6A0DAD]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#EDE8F8] text-[#17131A] transition-colors hover:border-[#6A0DAD]/40 hover:text-[#6A0DAD]"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
        </svg>
      </a>
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#EDE8F8] text-[#17131A] transition-colors hover:border-[#6A0DAD]/40 hover:text-[#6A0DAD]"
      >
        <Link2 size={16} />
      </button>
      <button
        onClick={handleShare}
        aria-label="More sharing options"
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#EDE8F8] text-[#17131A] transition-colors hover:border-[#6A0DAD]/40 hover:text-[#6A0DAD]"
      >
        <Share size={15} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-satoshi">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-[#F8F6FF] px-4 pt-[112px] pb-14 sm:px-6 md:pt-[150px] lg:pt-[172px] lg:pb-[96px]">
        <div className="mx-auto flex max-w-[860px] flex-col items-center text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[15px] font-medium text-[#6B6870] transition-colors hover:text-[#6A0DAD]"
          >
            <ArrowLeft size={17} strokeWidth={2.25} />
            All articles
          </Link>
          <p className="mt-8 text-[15px] font-bold text-[#6A0DAD] capitalize md:mt-[48px]">
            {post.categories?.name || "Uncategorized"}
          </p>
          <h1 className="mt-4 text-[36px] font-black leading-[1.1] tracking-[-1.3px] text-[#17131A] sm:text-[46px] md:text-[56px] md:tracking-[-2.2px]">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="mt-6 max-w-[620px] text-[17px] leading-[28px] text-[#524E56] md:text-[18px] md:leading-[29px]">
              {post.subtitle}
            </p>
          )}
          <div className="mt-8 md:mt-10">
            <AuthorLine date={formatDate(post.created_at)} minutes={minutes} />
          </div>

          {isAuthor && token && (
            <div className="mt-6 flex gap-2">
              <button
                onClick={handleUpdate}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-[#EDE8F8] bg-white px-4 py-1.5 text-[13px] font-medium text-[#17131A] transition-colors hover:border-[#6A0DAD]/40"
              >
                Edit <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-1.5 text-[13px] font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"} <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Cover image: shown whole, whatever its shape */}
      {post.image && (
        <div className="px-4 sm:px-6">
          <div className="mx-auto -mt-6 max-w-[1160px] overflow-hidden rounded-[24px] bg-gradient-to-b from-[#F0EBFE] to-[#E9E0FE] md:-mt-10">
            <img
              src={post.image}
              alt={post.title}
              className="mx-auto h-auto max-h-[556px] w-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Body + sidebar */}
      <div className="mx-auto grid max-w-[1160px] gap-12 px-4 pt-12 pb-16 sm:px-6 md:pt-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16 lg:px-0">
        <div className="min-w-0">
          <article className="mx-auto max-w-[760px]">
            {renderRichContent(contentHtml)}
          </article>

          {post.is_published === 0 && (
            <div className="mt-8 rounded-[12px] border border-yellow-200 bg-yellow-50 p-4">
              <p className="text-[14px] text-yellow-800">
                This post is currently unpublished
              </p>
            </div>
          )}

          <div className="mx-auto mt-12 flex max-w-[760px] flex-wrap items-center justify-between gap-4 border-t border-[#ECEAEE] pt-8">
            <AuthorLine date={formatDate(post.created_at)} minutes={minutes} />
            {shareButtons}
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          {toc.length > 0 && (
            <nav aria-label="On this page" className="hidden lg:block">
              <p className="text-[13px] font-bold tracking-[0.08em] text-[#17131A] uppercase">
                On this page
              </p>
              <ul className="mt-4 space-y-2.5 border-l border-[#ECEAEE]">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`-ml-px block border-l border-transparent text-[13px] leading-[19px] text-[#6B6870] transition-colors hover:border-[#6A0DAD] hover:text-[#6A0DAD] ${
                        item.level === 1 ? "pl-4 font-medium" : "pl-7"
                      }`}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <NewsletterCard />
        </aside>
      </div>

      {/* Keep reading */}
      {relatedPosts.length > 0 && (
        <section className="px-4 pb-16 sm:px-6 md:pb-[96px]">
          <div className="mx-auto max-w-[1160px] rounded-[28px] bg-[#F8F6FF] px-5 py-10 md:px-10 md:py-12">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-[26px] font-black tracking-[-0.8px] text-[#17131A] md:text-[28px]">
                Keep reading
              </h2>
              <Link
                href="/blog"
                className="flex items-center gap-1.5 text-[14px] font-bold text-[#6A0DAD] hover:text-[#5C0DB8]"
              >
                View all articles
                <ArrowRight size={16} strokeWidth={2.25} />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <ArticleCard key={related.id} article={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// Allow dynamic params to be generated on-demand
export const dynamicParams = true;
