import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import axios, { AxiosError } from "axios";

interface Post {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  authors: {
    initial: string;
    color: string;
  }[];
  content: string;
  imageUrl?: string;
  is_published: boolean;
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    hasMore: false,
    total: 0,
    perPage: 2, // Show 2 posts initially
  });

  const { user, token } = useAuthStore();

  interface ApiPost {
    id: number | string;
    title: string;
    subtitle?: string;
    content: string;
    image?: string;
    created_at?: string;
    is_published: number | boolean;
    categories?: {
      name: string;
    };
  }

  const formatPost = useCallback(
    (post: ApiPost) => {
      const postDate = post.created_at ? new Date(post.created_at) : new Date();

      return {
        id: post.id.toString(),
        title: post.title,
        description: post.subtitle || "",
        category: post.categories?.name || "Uncategorized",
        date: postDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        authors: [
          {
            initial: user?.first_name?.charAt(0) || "U",
            color: `bg-${
              ["purple", "blue", "green", "yellow", "red", "pink", "indigo"][
                user?.id ? Number(user.id) % 7 : 0
              ]
            }-500`,
          },
        ],
        content: post.content,
        imageUrl: post.image
          ? post.image.startsWith("http")
            ? post.image
            : `https://admin-api.pay.importa.biz/storage/${post.image.replace(
                /^\//,
                ""
              )}`
          : undefined,
        is_published: post.is_published === 1,
      };
    },
    [user]
  );

  const fetchPosts = useCallback(
    async (page = 1): Promise<Post[]> => {
      try {
        setLoading(true);

        const config = {
          headers: {
            accept: "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          withCredentials: true,
        };

        const response = await axios.get(
          `https://admin-api.pay.importa.biz/api/posts?page=${page}`,
          config
        );

        const { data, current_page, last_page, total } = response.data.data;

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received from API");
        }

        const formattedPosts = data.map(formatPost);

        setPagination((prev) => ({
          currentPage: current_page,
          lastPage: last_page,
          hasMore: current_page < last_page,
          total,
          perPage: prev.perPage,
        }));

        return formattedPosts;
      } catch (err) {
        console.error("Error in fetchPosts:", err);
        const error = err as AxiosError;
        setError(
          error.response
            ? new Error(`HTTP error! status: ${error.response.status}`)
            : new Error("Failed to fetch posts")
        );
        return [];
      } finally {
        setLoading(false);
      }
    },
    [token, formatPost]
  );

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await fetchPosts(1);
        setPosts(posts);
      } catch (err) {
        console.error("Error in loadPosts:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to load posts")
        );
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [fetchPosts]);

  const loadMorePosts = async () => {
    if (pagination.hasMore) {
      try {
        const nextPage = pagination.currentPage + 1;
        const newPosts = await fetchPosts(nextPage);
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      } catch (err) {
        console.error("Error loading more posts:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to load more posts")
        );
      }
    }
  };

  return {
    posts,
    loading,
    error,
    hasMore: pagination.hasMore,
    loadMore: loadMorePosts,
  };
}
