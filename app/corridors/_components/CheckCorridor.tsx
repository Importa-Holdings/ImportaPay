import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CurrencyConverter from "../../home/_components/CurrencyConverter";

const CheckCorridor = () => (
  <section className="bg-gradient-to-b from-white to-[#F7F5FD] px-4 py-16 font-satoshi sm:px-6 md:py-[100px]">
    <div className="mx-auto grid max-w-[1160px] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-20">
      <div className="text-center lg:text-left">
        <h2 className="text-[34px] font-black leading-[1.12] tracking-[-1.2px] text-[#17131A] md:text-[48px] md:tracking-[-1.9px]">
          Check a corridor in <span className="text-[#6A0DAD]">seconds</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[460px] text-[16px] leading-[26px] text-[#524E56] md:text-[18px] md:leading-[28px] lg:mx-0">
          Select where you&apos;re sending from, where your recipient gets
          paid, and the payout currency to preview estimated settlement
          details.
        </p>
        <Link
          href="https://merchant.importa.biz"
          className="mt-8 inline-flex h-[50px] items-center gap-2 rounded-full bg-[#6A0DAD] px-7 text-[16px] font-bold text-white transition-colors hover:bg-[#5C0DB8]"
        >
          Get started
          <ArrowRight size={18} strokeWidth={2.25} />
        </Link>
      </div>

      <CurrencyConverter />
    </div>
  </section>
);

export default CheckCorridor;
