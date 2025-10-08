import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useAuthStore } from "@/lib/store/authStore";

export interface Category {
  id: string | number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
}

const API_BASE_URL = "https://admin-api.pay.importa.biz/api";

export const useCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const { token } = useAuthStore();
  const [hasLoaded, setHasLoaded] = useState(false);

  const getAuthHeaders = useCallback(() => {
    if (!token) {
      console.error("No authentication token available");
      // Instead of throwing, we'll return headers without the Authorization
      // The API will return 401 if the token is required
      return {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-TOKEN": "",
      };
    }
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "X-CSRF-TOKEN": "",
    };
  }, [token]);

  const fetchCategories = useCallback(async (): Promise<Category[]> => {
    setIsLoading(true);
    setError(null);

    try {
      const headers = getAuthHeaders();

      const response = await axios.get<{ data: Category[] }>(
        `${API_BASE_URL}/categories`,
        {
          headers,
          withCredentials: true,
          validateStatus: (status) => status < 500, // Don't throw for 4xx errors
        }
      );

      if (response.status === 401) {
        const error = new Error("Session expired. Please log in again.");
        throw error;
      }

      if (response.status >= 400) {
        const error = new Error(
          `Failed to fetch categories: ${response.status} ${response.statusText}`
        );
        // console.error("API error:", error);
        throw error;
      }

      // The API returns the categories array directly, not wrapped in a data property
      const categories = Array.isArray(response.data) ? response.data : [];
      return categories;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const errorMessage =
        error.response?.data?.message || "Failed to fetch categories";
      // console.error("Error fetching categories:", error);
      setError(errorMessage);
      toast.error(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [getAuthHeaders]); // Now we can depend on getAuthHeaders directly since it's memoized

  const loadCategories = useCallback(async () => {
    // Don't try to load if we don't have a token
    if (!token) {
      setCategories([]);
      setIsLoading(false);
      return [];
    }

    setIsLoading(true);
    try {
      const data = await fetchCategories();
      setCategories(data);
      return data;
    } catch (err) {
      console.error("Error in loadCategories:", err);
      setCategories([]);
      throw err; // Re-throw to allow error handling in the component
    } finally {
      setIsLoading(false);
    }
  }, [fetchCategories, token]); // Reordered dependencies for consistency

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (token && !hasLoaded) {
        try {
          await loadCategories();
          if (isMounted) {
            setHasLoaded(true);
          }
        } catch (error) {
          console.error("Failed to load categories:", error);
          if (isMounted) {
            setError("Failed to load categories. Please refresh the page.");
          }
        }
      } else if (!token) {
        // Reset state when token is removed
        if (isMounted) {
          setHasLoaded(false);
          setCategories([]);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [token, hasLoaded, loadCategories]);


  const createCategory = async (name: string): Promise<Category | null> => {
    setIsLoading(true);
    setError(null);
    let toastId: string | number | undefined;

    try {
      const headers = getAuthHeaders();

      // Show loading toast
      toastId = toast.loading("Creating category...");

      const response: AxiosResponse<ApiResponse<Category>> = await axios.post(
        `${API_BASE_URL}/categories`,
        { name },
        {
          headers,
          withCredentials: true,
          validateStatus: (status) => status < 500, // Don't throw for 4xx errors
        }
      );

      if (response.status === 401) {
        throw new Error("Session expired. Please log in again.");
      }

      if (response.status >= 400) {
        throw new Error(response.data?.message || "Failed to create category");
      }

      // Update toast to success
      toast.success("Category created successfully", { id: toastId });
      await loadCategories();
      return response.data.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to create category. Please try again.";

      console.error("Error creating category:", err);

      // Update toast to show error
      if (toastId) {
        toast.error(errorMessage, { id: toastId });
      } else {
        toast.error(errorMessage);
      }

      setError(errorMessage);

      // If unauthorized, clear the invalid token
      if (
        errorMessage.includes("Unauthenticated") ||
        errorMessage.includes("Session expired") ||
        errorMessage.includes("No authentication token")
      ) {
        localStorage.removeItem("token");
      }

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCategory,
    fetchCategories,
    categories,
    isLoading,
    error,
  };
};
