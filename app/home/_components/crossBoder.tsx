// home/_components/CrossBorder.tsx
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import CurrencyConverter from "./CurrencyConverter";

const CrossBorder = () => {
  return (
    <div className="bg-white flex flex-col justify-center items-center mt-14 p-0 md:p-6">
      {/* Pay Vendors Card */}
      <Card
        className="
      bg-gradient-to-br from-purple-600 to-purple-800
      p-8 rounded-3xl shadow-lg text-white
      w-full max-w-[1180px] md:w-[92vw] xl:w-[1180px]
      h-auto md:h-[500px]      /* auto height on mobile, 500px at md+ */
      pt-[10px]
      flex flex-col justify-center items-center
    "
      >
        <CardContent className="w-full p-0">
          <div className="flex flex-col gap-3.5">
            <div className="relative mt-12 flex justify-center items-center">
              <CurrencyConverter />
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-4">
                Pay vendors abroad at great FX rates
              </h3>
              <p className="text-white/80">
                We help you pay your vendors abroad using naira, with some of
                the best FX rates around, via our licensed partners.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrossBorder;
