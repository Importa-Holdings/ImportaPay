// home/_components/CrossBorder.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CurrencyConverter from "./CurrencyConverter";

const CrossBorder = () => {
  return (
    <div className="bg-white flex flex-col justify-center items-center mt-14 p-0 md:p-6">
      {/* Pay Vendors Card */}
      <Card
        className="
      relative overflow-hidden border-0
      bg-gradient-to-br from-purple-500 via-purple-700 to-[#380a5e]
      px-6 py-10 sm:p-10 lg:px-14 lg:py-16 rounded-3xl shadow-2xl shadow-purple-950/30 text-white
      w-full max-w-[1180px] md:w-[92vw] xl:w-[1180px]
      h-auto md:min-h-[620px] lg:min-h-[580px]
      flex flex-col justify-center items-center
    "
      >
        {/* Decorative glow orbs */}
        <div className="pointer-events-none absolute -top-20 -left-16 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-purple-300/20 blur-[110px]" />

        <CardContent className="relative w-full p-0">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex justify-center px-2 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
              <CurrencyConverter />
            </div>

            <div className="mt-10 md:mt-0 text-center md:text-left space-y-5">
              <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
                Pay vendors abroad at great FX rates
              </h3>
              <p className="text-white/70 leading-relaxed max-w-md mx-auto md:mx-0">
                We help you pay your vendors abroad using naira, with some of
                the best FX rates around, via our licensed partners.
              </p>
              <div className="pt-2">
                <Link href="https://merchant.importa.biz">
                  <Button
                    size="lg"
                    className="bg-white text-[#380a5e] hover:bg-white/90 transition-all duration-300 hover:scale-105 px-6 py-4 text-base font-semibold"
                  >
                    Get started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrossBorder;
