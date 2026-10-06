import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CorridorsHero = () => (
  <section className="bg-[#F8F6FF] px-4 pt-[120px] pb-20 font-satoshi sm:px-6 md:pt-[170px] lg:pt-[210px] lg:pb-[150px]">
    <div className="mx-auto flex max-w-[1160px] flex-col items-center text-center">
      <h1 className="max-w-[820px] text-[38px] font-black leading-[1.15] tracking-[-1.4px] text-[#17131A] sm:text-[48px] md:text-[56px] md:leading-[72px] md:tracking-[-2.2px]">
        Global payment corridors for{" "}
        <span className="text-[#6A0DAD]">your business</span>
      </h1>
      <p className="mt-6 max-w-[630px] text-[16px] leading-[26px] text-[#524E56] md:mt-8 md:text-[18px] md:leading-[28px]">
        See supported markets, payout currencies, payment rails, and estimated
        settlement times across Africa and global destinations.
      </p>

      <div className="mt-8 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row md:mt-[52px]">
        <Link
          href="https://merchant.importa.biz"
          className="flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#6A0DAD] px-7 text-[17px] font-bold text-white transition-colors hover:bg-[#5C0DB8] sm:w-auto"
        >
          Get started
          <ArrowRight size={19} strokeWidth={2.25} />
        </Link>
        <a
          href="#coverage"
          className="flex h-[54px] w-full items-center justify-center rounded-full bg-white px-7 text-[17px] font-bold text-[#17131A] shadow-[0_8px_24px_rgba(106,13,173,0.08)] transition-shadow hover:shadow-[0_10px_28px_rgba(106,13,173,0.16)] sm:w-auto"
        >
          View coverage table
        </a>
      </div>
    </div>
  </section>
);

export default CorridorsHero;
