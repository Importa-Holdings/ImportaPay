// home/_components/CrossBorder.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BusinessSection } from "./BusinessSection";
import { PersonalSection } from "./PersonalSection";

const CrossBorder = () => {
  const [selected, setSelected] = useState<"business" | "personal">("business");

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

      <div className="pt-12">
        <Button
          size="lg"
          variant="outline"
          className="bg-[#6A0DAD] text-white hover:bg-[#6A0DAD]/20 backdrop-blur-sm
                     transition-all duration-300 hover:scale-105
                     flex items-center text-[12px] gap-3 p-5"
        >
          Make your first transaction
        </Button>
      </div>
    </div>
  );
};

export default CrossBorder;
