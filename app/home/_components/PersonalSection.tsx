// home/_components/PersonalSection.tsx
"use client";

import React, { useRef, useEffect } from "react";
export const PersonalSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      },
      { threshold: 0.5 }
    );
    if (videoRef.current) obs.observe(videoRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-11 mt-10 items-center md:items-center">
      {/* Text column */}
      <div className="ml-[50px] pr-2.5 mr-3 pl-3 border-l-1 border-[#6A0DAD] w-full md:w-[320px] mt-8 md:mt-[80px] order-2">
        <div className="mb-[15px] font-sans font-bold text-lg">
          For everyday money moves
        </div>
        <p className="font-sans text-[12px] text-gray-600">
          Receive money from anyone. Pay bills and send money to loved ones
        </p>
      </div>
      {/* Video column (same as above) */}
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
                src="https://res.cloudinary.com/detr9iyys/video/upload/v1752491619/personnal_i8tw6n.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* bottom‑half gradient */}
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
