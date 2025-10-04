"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Toaster } from "sonner";
import { Navbar } from "../../components/navbar/Navbar";
import { useLogin } from "../hooks/useLogin";

export default function LoginForm() {
  const { login, isLoading } = useLogin();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="w-full max-w-md">
            <div className="space-y-6">
              {/* Title */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Login</h2>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full ${
                    isLoading
                      ? "bg-purple-400"
                      : "bg-purple-600 hover:bg-purple-700"
                  } text-white font-medium py-3 px-4 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed`}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </div>
          </div>
        </form>
        {/* <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Register
          </a>
        </div> */}
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
}
