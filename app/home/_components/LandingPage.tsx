"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Navbar } from "@/components/navbar/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or wait for necessary assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loader for at least 2 seconds

    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <Image
            src="/video/transparirent.gif"
            alt="Loading..."
            width={500}
            height={500}
            className="mx-auto"
            priority
          />
          {/* <p className="mt-4 text-lg text-gray-600">Welcome...</p> */}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        min-h-screen
        bg-cover
        bg-[500px]       /* default: center on mobile */
        md:bg-center     /* from md screens up: shift to left (or pick your preference) */
        relative
        overflow-hidden
        ${
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }
      `}
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/detr9iyys/image/upload/v1752324671/landing-bg_yrmnq6.png')",
      }}
    >
      <Navbar />
      {/* Main Content */}
      <main className="relative z-10 pt-22 md:pt-35 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-7">
            {/* Hero Section */}
            <h1 className="font-sans text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight">
              Pay Your Vendors
              <br />
              Abroad Using Only
              <br />
              Naira
            </h1>

            <p className="font-sans text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed">
              You don&apos;t need to look for dollars. We&apos;ve made it easier
              for you to collect payments from your customers and pay your
              suppliers abroad directly using naira through our licensed
              partners.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col items-center sm:items-start sm:flex-row gap-4 md:pt-6 pt-35">
              <Link href="https://apps.apple.com/app/id6752268757">
                <Button
                  size="lg"
                  className="bg-white text-black border-white/30 hover:bg-white/30 backdrop-blur-sm
                           transition-all duration-300 hover:scale-105
                           flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg"
                >
                  <Image
                    src="/image/Apple.png"
                    alt="Apple"
                    height={50}
                    width={50}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                  Download for iOS
                </Button>
              </Link>
              <Link href="https://play.google.com/store/apps/details?id=com.importapay">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-black border-white/30 hover:bg-white/20 backdrop-blur-sm
                           transition-all duration-300 hover:scale-105
                           flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg"
                >
                  <Image
                    src="/image/PlayStore.png"
                    alt="playstore"
                    height={50}
                    width={50}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                  Download for Android
                </Button>
              </Link>
            </div>

            {/* Feature Highlight */}
            <div className="flex items-center gap-3 pt-4">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 border border-green-400/30">
                <Check size={14} className="text-green-400" />
              </div>
              <span className="text-white/90 md:text-lg text-[15px]">
                First 5 transactions are free for our early users
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
