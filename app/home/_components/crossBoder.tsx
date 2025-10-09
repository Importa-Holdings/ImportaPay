// home/_components/CrossBorder.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BusinessSection } from "./BusinessSection";
import { PersonalSection } from "./PersonalSection";
import { Apple, Smartphone } from "lucide-react";

const CrossBorder = () => {
  const [selected, setSelected] = useState<"business" | "personal">("business");
  const [isDownloadDropdownOpen, setIsDownloadDropdownOpen] = useState(false);

  return (
    <div className="bg-white flex flex-col justify-center items-center mt-14 p-0 md:p-6 md:mr-16">
      <div className="font-sans font-bold text-[25px] md:text-[40px] text-center">
        Cross Border Payments <br /> Without Any Blockers
      </div>
      <div className="p-2 font-sans text-[#5B575D] text-[13px] mt-2 text-center">
        Send and receive money across borders without stress, limits or hidden
        conditions.
      </div>

      {/* toggle buttons */}
      <div className="flex gap-8 mt-6">
        <div
          onClick={() => setSelected("business")}
          className={`
            cursor-pointer pb-1
            ${
              selected === "business"
                ? "border-b-2 border-[#6A0DAD]"
                : "border-b-2 border-transparent"
            }
            transition-all
          `}
        >
          Business account
        </div>
        <div
          onClick={() => setSelected("personal")}
          className={`
            cursor-pointer pb-1
            ${
              selected === "personal"
                ? "border-b-2 border-[#6A0DAD]"
                : "border-b-2 border-transparent"
            }
            transition-all
          `}
        >
          Personal account
        </div>
      </div>
      {/* dynamically render the right section */}
      {selected === "business" ? <BusinessSection /> : <PersonalSection />}
      <div className="pt-12 relative">
        <Button
          size="lg"
          variant="outline"
          onClick={() => setIsDownloadDropdownOpen(!isDownloadDropdownOpen)}
          className="bg-[#6A0DAD] text-white hover:bg-[#6A0DAD]/20 backdrop-blur-sm
                     transition-all duration-300 hover:scale-105
                     flex items-center text-[12px] gap-3 p-5 relative z-10"
        >
          Make your first transaction
        </Button>
        {isDownloadDropdownOpen && (
          <div className="absolute left-0 mt-2 w-full md:w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <a
                href="https://apps.apple.com/app/id6752268757"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-[#6A0DAD] hover:bg-gray-100"
                role="menuitem"
              >
                <Apple className="w-4 h-4 mr-2 text-gray-500" />
                Download for iOS
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.importapay"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-[#6A0DAD] hover:bg-gray-100"
                role="menuitem"
              >
                <Smartphone className="w-4 h-4 mr-2 text-gray-500" />
                Download for Android
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrossBorder;
