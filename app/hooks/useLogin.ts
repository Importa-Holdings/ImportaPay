"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/store/authStore";

interface LoginData {
  email: string;
  password: string;
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();

  const login = async (data: LoginData) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://admin-api.pay.importa.biz/api/auth/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            "X-CSRF-TOKEN": "",
          },
          withCredentials: true,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const { data } = response.data;
        const { user, access_token } = data;

        // Update auth state
        setUser(user);
        if (access_token) {
          setToken(access_token);
          // Store token in localStorage
          localStorage.setItem('token', access_token);
        }

        toast.success("Login successful! Redirecting to dashboard...");

        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);

        return { success: true };
      }

      throw new Error("Login failed");
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message || "Invalid email or password";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
}
