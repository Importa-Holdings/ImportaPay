"use client";
import React, { useState, FormEvent } from "react";
import { Mail, Check } from "lucide-react";
import { useSubscribe } from "@/hooks/useSubscribe";
import { Toaster } from "sonner";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const { subscribe, isLoading, isSubscribed } = useSubscribe();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { success } = await subscribe(email);
    if (success) {
      setEmail("");
    }
  };

  return (
    <div className="mb-10">
      <Toaster position="top-center" richColors />
      <div className="bg-[#6A0DAD] flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-2xl mx-auto">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/5 rounded-full blur-xl animate-pulse delay-500"></div>
          </div>

          {/* Main content */}
          <div className="relative z-10">
            <form onSubmit={handleSubmit} className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2 text-center sm:text-left">
                Subscribe to our newsletter
              </h3>
              <p className="text-white/80 mb-6 text-center sm:text-left">
                Get the latest updates and news delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                    disabled={isLoading || isSubscribed}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || isSubscribed}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isSubscribed
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-[#6A0DAD] hover:bg-white/90 hover:scale-[1.02] active:scale-95'
                  } flex items-center justify-center gap-2 min-w-[150px] disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-t-transparent border-[#6A0DAD] rounded-full animate-spin"></span>
                      Subscribing...
                    </>
                  ) : isSubscribed ? (
                    <>
                      <Check className="w-5 h-5" />
                      Subscribed!
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
            </form>
            {/* Success message */}
            {isSubscribed && (
              <div className="mt-4 text-green-300 font-medium animate-fade-in">
                🎉 Welcome aboard! Check your email for confirmation.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
