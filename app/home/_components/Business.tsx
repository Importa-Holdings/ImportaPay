"use client";
import React from "react";
import Image from "next/image";

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
                  src="/image/Alla.png"
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
    </section>
  );
};

export default Business;
