"use client";
import React, { useState } from "react";
import { Mail, Check } from "lucide-react";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubscribed(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3000);
  };

  return (
    <div className="mb-10">
      <div className="bg-[#6A0DAD] flex items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto text-center">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/5 rounded-full blur-xl animate-pulse delay-500"></div>
          </div>

          {/* Main content */}
          <div className="relative z-10">
            <div className="mb-8 transform transition-all duration-1000 hover:scale-105">
              <h1 className="text-lg md:text-2xl font-bold text-white mb-4 ">
                Never miss an update!
              </h1>
              <p className="text-purple-100/90 text-sm md:text-sm max-w-lg mx-auto leading-relaxed">
                Be the first to know about new features, partnerships,
                <br />
                and insights shaping the future of finance
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-12 py-4 bg-white/10  border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading || isSubscribed}
                className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 min-w-[120px] ${
                  isSubscribed
                    ? "bg-green-500 text-white"
                    : "bg-white text-purple-700 hover:bg-purple-50 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
                } ${isLoading ? "opacity-80" : ""}`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-purple-700/30 border-t-purple-700 rounded-full animate-spin"></div>
                  </div>
                ) : isSubscribed ? (
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" />
                    <span>Subscribed!</span>
                  </div>
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>

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
