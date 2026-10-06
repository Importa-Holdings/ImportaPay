"use client";
import React, { useState, FormEvent } from "react";
import { Mail, Check } from "lucide-react";
import { useSubscribe } from "@/hooks/useSubscribe";
import { Toaster } from "sonner";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const { subscribe, isLoading, isSubscribed } = useSubscribe();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { success } = await subscribe(email);
    if (success) {
      setEmail("");
    }
  };

  return (
    <section className="bg-white px-4 pt-6 pb-16 font-satoshi sm:px-6 md:pt-10 md:pb-[112px]">
      <Toaster position="top-center" richColors />
      <div className="mx-auto max-w-[1112px] rounded-[24px] bg-[#F8F6FF] px-6 py-8 md:px-10 md:py-[42px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-[22px] font-black tracking-[-0.6px] text-[#17131A] md:text-[26px]">
              Subscribe to our newsletter
            </h3>
            <p className="mt-2 text-[14px] text-[#524E56]">
              Get the latest updates and news delivered to your inbox.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto lg:gap-6"
          >
            <label className="relative block w-full lg:w-[320px]">
              <span className="sr-only">Email address</span>
              <Mail
                size={16}
                className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#6B6870]"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-[46px] w-full rounded-full border border-[#EDE8F8] bg-white pr-4 pl-11 text-[14px] text-[#17131A] placeholder:text-[#A09CA6] focus:border-[#6A0DAD]/40 focus:ring-4 focus:ring-[#6A0DAD]/10 focus:outline-none disabled:opacity-60"
                disabled={isLoading || isSubscribed}
                required
              />
            </label>
            <button
              type="submit"
              disabled={isLoading || isSubscribed}
              className={`flex h-[46px] shrink-0 items-center justify-center gap-2 rounded-full px-7 text-[14px] font-bold text-white transition-colors disabled:cursor-not-allowed ${
                isSubscribed ? "bg-[#16A34A]" : "bg-[#6A0DAD] hover:bg-[#5C0DB8] disabled:opacity-70"
              }`}
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Subscribing...
                </>
              ) : isSubscribed ? (
                <>
                  <Check className="h-4 w-4" />
                  Subscribed!
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
        </div>
        {isSubscribed && (
          <p className="mt-4 text-[14px] font-medium text-[#16A34A]">
            Welcome aboard! Check your email for confirmation.
          </p>
        )}
      </div>
    </section>
  );
};

export default Subscribe;
