"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/store/authStore";

export function useLogout() {
  const router = useRouter();
  const { logout: clearAuth, token } = useAuthStore();

  const logout = async () => {
    try {
      const headers: HeadersInit = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      // Add authorization header if token exists
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(
        "https://admin-api.pay.importa.biz/api/auth/logout",
        {
          method: "POST",
          headers,
          credentials: "include",
        }
      );

      if (response.ok) {
        // Clear auth state
        clearAuth();

        toast.success("Logged out successfully");
        router.push("/login");
        router.refresh();
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return { logout };
}
