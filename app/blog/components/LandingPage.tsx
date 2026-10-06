"use client";

import { Search } from "lucide-react";

type LandingPageProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

const LandingPage = ({ searchTerm, onSearchChange }: LandingPageProps) => (
  <section className="bg-[#F8F6FF] px-4 pt-[120px] pb-16 font-satoshi sm:px-6 md:pt-[160px] lg:pt-[190px] lg:pb-[90px]">
    <div className="mx-auto flex max-w-[1160px] flex-col items-center text-center">
      <h1 className="text-[48px] font-black leading-[1.0977] tracking-[-1.9px] text-[#17131A] sm:text-[64px] sm:tracking-[-2.5px] lg:text-[88px] lg:tracking-[-3.5px]">
        Our <span className="text-[#6A0DAD]">blog</span>
      </h1>
      <p className="mt-6 max-w-[610px] text-[16px] leading-[28px] text-[#524E56] md:mt-[34px] md:text-[18px] md:leading-[33px]">
        A closer look at our product journey, industry perspectives, and the
        partnerships helping us move finance forward.
      </p>

      <label className="relative mt-8 block w-full max-w-[528px] md:mt-[46px]">
        <span className="sr-only">Search articles</span>
        <Search
          size={18}
          strokeWidth={2.25}
          className="pointer-events-none absolute top-1/2 left-6 -translate-y-1/2 text-[#6B6870]"
        />
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search articles"
          className="h-[56px] w-full rounded-full border border-[#EDE8F8] bg-white pr-6 pl-[54px] text-[16px] text-[#17131A] shadow-[0_4px_16px_rgba(106,13,173,0.06)] placeholder:text-[#A09CA6] focus:border-[#6A0DAD]/40 focus:ring-4 focus:ring-[#6A0DAD]/10 focus:outline-none md:h-[63px]"
        />
      </label>
    </div>
  </section>
);

export default LandingPage;
