"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ImageCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Your data
  const businessTypes = [
    {
      title: "General Trade Importer",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      alt: "Warehouse with shelves and inventory",
    },
    {
      title: "Clothing Shop Owner",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      alt: "Clothing store with hanging clothes",
    },
    {
      title: "Phone & Accessories Seller",
      image:
        "https://images.unsplash.com/photo-1578345218746-50a229b3d0f8?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Electronics store with phones and accessories",
    },
    {
      title: "Beauty & Hair Products Seller",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      alt: "Beauty products and cosmetics display",
    },
    {
      title: "Electronics & Gadgets Retailer",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      alt: "Electronics circuit board and components",
    },
    {
      title: "Home & Office Furniture Dealer",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      alt: "Modern furniture and home decor",
    },
    {
      title: "Automotive Parts Supplier",
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      alt: "Car parts and automotive components",
    },
  ];

  // Scroll by container width
  const scrollByWidth = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "right" ? clientWidth : -clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header + arrows */}
        <div className="items-start mb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-[#060109] leading-tight mb-4">
              Importapay Is For
              <br />
              People Like You
            </h2>
          </div>
          <div className="flex justify-between gap-3">
            <p className="text-[15px] text-gray-600 ">
              Whether a small business or growing company, Importapay fits every
              need
            </p>
            <div className="flex flex-row gap-2 mt-7 md:mt-0">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 bg-white border-gray-200 hover:bg-gray-50"
                onClick={() => scrollByWidth("left")}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 bg-purple-600 border-purple-600 text-white hover:bg-purple-700"
                onClick={() => scrollByWidth("right")}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Continuous horizontal row */}
        <div
          ref={scrollRef}
          className="flex flex-nowrap gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
        >
          {businessTypes.map((biz, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0 w-[280px] h-[280px] rounded-2xl overflow-hidden snap-start cursor-pointer transform transition-transform duration-500 hover:scale-105"
            >
              <Image
                src={biz.image}
                alt={biz.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/50" />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <h3 className="text-white text-lg font-bold text-center leading-tight">
                  {biz.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
