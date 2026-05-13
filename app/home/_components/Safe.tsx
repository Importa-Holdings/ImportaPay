"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  initial: { x: 500, opacity: 0 },
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.6, times: [0, 0.2, 0.4, 0.6, 0.8, 1] },
  },
  exit: { x: -500, opacity: 0, transition: { duration: 0.5 } },
};

const bankingPartners = [
  {
    name: "Blockradar",
    logo: "/image/blockradar-icon.svg",
  },
  {
    name: "Monirate",
    logo: "/image/monirate.jpg",
  },
  {
    name: "FlexBudge",
    logo: "/image/flexbudge.jpg",
  },
  {
    name: "Aella",
    logo: "/image/aella.png",
  },
];

const Safe = () => {
  const [showFirst, setShowFirst] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst((prev) => !prev);
    }, 5000); // change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-40 relative flex items-center justify-center h-[400px] sm:h-[400px] md:h-[80vh] overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-[500px] md:bg-center"
        style={{
          backgroundImage: "url('/image/fan.png')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#6A0DAD]/80"></div>

      <AnimatePresence mode="wait">
        {showFirst ? (
          <motion.div
            key="first"
            className="absolute z-10 flex flex-col items-center justify-center text-center px-4 w-full"
            initial="initial"
            animate={["center", "shake"]}
            exit="exit"
            variants={variants}
          >
            <h1 className="font-sans font-bold text-3xl sm:text-4xl md:text-[50px] text-white leading-tight">
              Trusted by industry leaders
            </h1>
            <div className="mt-8 grid w-full max-w-4xl grid-cols-2 gap-3 px-2 sm:grid-cols-4 sm:gap-4">
              {bankingPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="flex min-h-32 flex-col items-center justify-center rounded-xl bg-white/95 p-4 text-[#2B123D] shadow-md"
                >
                  <div className="relative h-14 w-full">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      fill
                      sizes="(max-width: 640px) 45vw, 180px"
                      className="object-contain"
                    />
                  </div>
                  <p className="mt-3 text-sm font-semibold sm:text-base">
                    {partner.name}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="second"
            className="absolute z-10 flex flex-col items-center justify-center text-center px-4 w-full"
            initial="initial"
            animate={["center", "shake"]}
            exit="exit"
            variants={variants}
          >
            <h1 className="font-sans font-bold text-3xl sm:text-4xl md:text-[50px] text-white leading-tight">
              We Are NDPR Compliant
            </h1>
            <a
              href="https://services.ndpc.gov.ng/portal/?page=verify-c&d=dn39403902337&id=25454&sn=86891aa802bb9955d519b9f020878f99&t=dp_registration&tp=nwp_eosic"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:scale-105 hover:shadow-2xl inline-block"
            >
              <Image
                src="/image/bacode.png"
                alt="Apple"
                width={300}
                height={300}
              />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Safe;
