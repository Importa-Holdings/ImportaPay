"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar/Navbar";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div
      className="
        min-h-screen
        bg-cover
        bg-[500px]       /* default: center on mobile */
        md:bg-center        /* from md screens up: shift to left (or pick your preference) */
        relative
        overflow-hidden
      "
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
            <div className="flex flex-col sm:flex-row gap-4 md:pt-6 pt-35">
              <Button
                size="lg"
                className="bg-white text-black border-white/30 hover:bg-white/30 backdrop-blur-sm
                           transition-all duration-300 hover:scale-105
                           flex items-center gap-3 md:px-6 md:py-4 text-2xl md:text-lg p-10"
              >
                <Image
                  src="/image/Apple.png"
                  alt="Apple"
                  //
                  height="50"
                  width="50"
                  className="w-[25px] h-[25px]"
                />
                Download for iOS
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-black border-white/30 hover:bg-white/20 backdrop-blur-sm
                           transition-all duration-300 hover:scale-105
                           flex items-center gap-3 md:px-6 md:py-4 text-2xl md:text-lg p-10"
              >
                <Image
                  src="/image/PlayStore.png"
                  alt="playstore"
                  height="50"
                  width="50"
                  className="w-[25px] h-[25px]"
                />
                Download for Android
              </Button>
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
