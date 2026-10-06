import { ArrowRight, CalendarDays } from "lucide-react";
import Image from "next/image";
import HeroNavbar from "./HeroNavbar";
import HeroAnnotations from "./HeroAnnotations";
import Link from "next/link";

const LandingPage = () => {
  return (
    <section className="relative overflow-hidden bg-[#FBF8FE] font-satoshi">
      <Image
        src="/image/hero-bg.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover object-top select-none"
      />
      <HeroNavbar />

      <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col items-center px-4 pt-[104px] sm:px-6 md:pt-[140px] lg:pt-[179px]">
        <HeroAnnotations />

        <span className="rounded-full bg-white px-4 py-[6px] text-[14px] font-medium leading-[24px] text-[#161319] shadow-[0_4px_16px_rgba(95,38,166,0.08)] sm:text-[15px]">
          Built for businesses across Africa
        </span>

        <h1 className="mt-5 max-w-[1046px] text-center text-[40px] font-black leading-[1.0977] tracking-[-1.6px] text-[#161319] sm:text-[56px] sm:tracking-[-2.2px] md:text-[72px] md:tracking-[-2.9px] lg:mt-6 lg:text-[88px] lg:tracking-[-3.5px]">
          Everything you need to manage{" "}
          <span className="text-[#5F26A6]">global payments</span>
        </h1>

        <p className="mt-4 max-w-[972px] text-center text-[18px] font-normal leading-[28.8px] tracking-[0px] text-[#524E56] lg:mt-[17px]">
          Pay suppliers and business partners across 190+ countries with
          transparent rates and full payment visibility.
        </p>

        <div className="mt-8 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row lg:mt-[32px]">
          <Link
            href="https://merchant.importa.biz"
            className="flex h-[56px] w-full items-center justify-center gap-2 rounded-full bg-[#5F26A6] px-8 text-[17px] font-bold text-white shadow-[0_12px_28px_rgba(95,38,166,0.35)] transition-colors hover:bg-[#4E1C8C] sm:w-auto lg:h-[60px]"
          >
            Get started
            <ArrowRight size={20} strokeWidth={2.25} />
          </Link>
          <Link
            href="https://calendly.com/dgsoetan/30min"
            className="flex h-[56px] w-full items-center justify-center gap-3 rounded-full bg-white pl-[10px] pr-7 text-[17px] font-medium text-[#161319] shadow-[0_8px_24px_rgba(95,38,166,0.08)] transition-shadow hover:shadow-[0_10px_28px_rgba(95,38,166,0.16)] sm:w-auto lg:h-[60px]"
          >
            <span className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#5F26A6] text-white lg:h-[40px] lg:w-[40px]">
              <CalendarDays size={18} />
            </span>
            Book a call
          </Link>
        </div>

        {/* Cropped at the hero's bottom edge so the dashboard sinks into it, as in Figma */}
        <div className="relative mt-12 aspect-[960/250] w-full max-w-[960px] overflow-hidden rounded-t-[8px] shadow-[0_-12px_48px_rgba(95,38,166,0.14)] md:mt-20 md:aspect-[960/290] md:rounded-t-[14px] lg:mt-[130px] lg:aspect-[960/322]">
          <Image
            src="/image/hero-dashboard.webp"
            alt="Importapay dashboard overview"
            width={1934}
            height={718}
            priority
            sizes="(max-width: 1000px) 100vw, 960px"
            className="absolute inset-x-0 top-0 h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
