// home/_components/BusinessSection.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";

export const BusinessSection: React.FC = () => {
  const [open, setOpen] = useState<"first" | "second">("first");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      },
      { threshold: 0.5 }
    );
    if (videoRef.current) obs.observe(videoRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-11 mt-10 items-center">
      {/* Accordion / Text */}
      <div className="w-full md:w-[320px] mt-10 pl-5 md:pl-2 pr-3 space-y-4">
        {/* First section */}
        <div
          onClick={() => setOpen("first")}
          className={`
            cursor-pointer pl-3 border-l-1
            ${open === "first" ? "border-[#6A0DAD]" : "border-transparent"}
            transition-colors
          `}
        >
          <div className="font-sans font-bold text-lg">
            Receive payments from your customers
          </div>
          {open === "first" && (
            <p className="font-sans text-[12px] text-gray-600 mt-1">
              No matter your trade, we’ve made it simple for you to receive
              payments from your customers, anywhere
            </p>
          )}
        </div>

        {/* Second section */}
        <div
          onClick={() => setOpen("second")}
          className={`
            cursor-pointer pl-2 pr-2 border-l-1
            ${open === "second" ? "border-[#6A0DAD]" : "border-transparent"}
            transition-colors
          `}
        >
          <div className="font-sans font-bold text-lg">
            Pay your vendors abroad in Naira
          </div>
          {open === "second" && (
            <p className="font-sans text-[12px] text-gray-600 mt-1">
              Skip the stress of sourcing dollars. Now you can pay your
              suppliers abroad directly in naira
            </p>
          )}
        </div>
      </div>

      {/* Video column */}
      <div className="order-1 md:order-2 w-full md:w-auto flex justify-center items-center">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#6A0DAD] p-4 self-center">
          {/* force a 300×500 container so half = 250px */}
          <div className="relative w-[220px] h-[450px]">
            <video
              ref={videoRef}
              className="w-full rounded-3xl border-8 h-full object-cover border-[#6A0DAD]"
              muted
              loop
              playsInline
            >
              <source
                src="https://res.cloudinary.com/detr9iyys/video/upload/v1752491836/0707_cpikgg.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* bottom‑half gradient: 250px tall */}
            <div
              className="
    absolute bottom-0 left-0 w-full
    h-1/2               /* overlay spans half the video height */
    bg-gradient-to-t
    from-purple-900    /* 100% purple at the very bottom */
    via-white/100      /* solid white starting partway up */
    via-50%            /* hold that white until 70% of the overlay */
    to-white/0         /* then fade to transparent at the top of the overlay */
    pointer-events-none
  "
            />
          </div>
        </div>
      </div>
    </div>
  );
};
