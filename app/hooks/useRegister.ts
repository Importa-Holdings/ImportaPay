"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const register = async (data: RegisterData) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://admin-api.pay.importa.biz/api/auth/register",
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
        toast.success("Registration successful! Redirecting to dashboard...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
        return { success: true };
      }

      throw new Error("Registration failed");
    } catch (error: unknown) {
      console.error("Registration error:", error);
      let errorMessage = "An error occurred during registration";
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
}
