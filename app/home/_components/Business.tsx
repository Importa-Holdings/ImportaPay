"use client";
import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import CurrencyConverter from "./CurrencyConverter";

const Business = () => {
  return (
    <section id="benefits" className=" ml-3 mr-3">
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className=" mx-auto md:text-left text-center">
          <h2 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl leading-tight">
            What Makes Importapay <br /> Right for Your Business
          </h2>
          <p className="font-sans text-[#5B575D] mt-2 text-sm sm:text-base">
            We’ve removed the hassle so you can focus on growing your business.
          </p>
        </div>
        {/* Feature Card */}
        <div className="mt-8 mx-[-1rem] sm:mx-6 lg:mx-8">
          <div className="bg-gradient-to-br from-[#EBEBEB] via-[#EBEBEB]/70 via-50% to-[#BA90D9]/80 rounded-3xl overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 p-6 lg:p-12 ">
              {/* Text */}
              <div className="max-w-md text-center lg:text-left">
                <h3 className="text-[18px] md:text-2xl font-bold text-gray-900 mb-3">
                  Bank account made for your trade
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Get a bank account the moment you sign up to receive payments
                  from your customers—and pay your vendors abroad directly using
                  naira.
                </p>
              </div>

              {/* Image */}
              <div className="flex justify-center items-center">
                <Image
                  src="/image/Group10.png"
                  alt="Illustration of amount"
                  width={450}
                  height={450}
                  className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[30px] md:flex-row justify-center items-center">
        {/* Send Money Card */}
        <Card
          className="
      bg-[#F0E7F7] rounded-3xl shadow-lg
      w-full md:w-[600px]      /* full width on mobile, 600px at md+ */
      h-auto md:h-[500px]      /* auto height on mobile, 500px at md+ */
      pt-[10px]
      flex flex-col justify-center items-center
    "
        >
          <CardContent className="p-0">
            <div className="space-y-6">
              {/* Image with gradient overlay */}
              <div className="relative flex justify-center items-center">
                <Image
                  src="/image/trans.png"
                  alt="Illustration of amount"
                  width={350}
                  height={350}
                  className="w-[350px] h-[300px]"
                />
                {/* Overlay: transparent white → full #F0E7F7 */}
                <div
                  className="
              absolute inset-0
              bg-gradient-to-b
              from-white/10
              via-white/2
              via-75%
              to-[#F0E7F7]
            "
                />
              </div>

              <div className="px-12 pb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Send money fast. Save more
                </h3>
                <p className="text-gray-600">
                  Transfers are processed quickly through our trusted payment
                  partners keeping your costs low and your business moving.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pay Vendors Card */}
        <Card
          className="
      bg-gradient-to-br from-purple-600 to-purple-800
      p-8 rounded-3xl shadow-lg text-white
      w-full md:w-[600px]      /* full width on mobile, 600px at md+ */
      h-auto md:h-[500px]      /* auto height on mobile, 500px at md+ */
      pt-[10px]
      flex flex-col justify-center items-center
    "
        >
          <CardContent className="p-0">
            <div className="flex flex-col gap-3.5">
              <div className="relative mt-12 flex justify-center items-center">
                <CurrencyConverter />
              </div>
              <div className="mt-[70px]">
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
    </section>
  );
};

export default Business;
