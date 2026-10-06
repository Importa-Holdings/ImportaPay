import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const corridors = [
  { from: "Nigeria", fromFlag: "ng", to: "United States", toFlag: "us", currency: "USD" },
  { from: "Ghana", fromFlag: "gh", to: "United Kingdom", toFlag: "gb", currency: "GBP" },
  { from: "Kenya", fromFlag: "ke", to: "China", toFlag: "cn", currency: "CNY" },
  { from: "South Africa", fromFlag: "za", to: "UAE", toFlag: "ae", currency: "AED" },
  { from: "Rwanda", fromFlag: "rw", to: "Europe", toFlag: "eu", currency: "EUR" },
];

const cardGlow =
  "border border-[#ECEAEE] shadow-[0_4px_16px_rgba(23,19,26,0.06)]";

const Flag = ({ code, label }: { code: string; label: string }) => (
  <Image
    src={`/image/flags/${code}.svg`}
    alt={label}
    width={36}
    height={24}
    className="h-[18px] w-[27px]"
  />
);

const PopularCorridors = () => (
  <section className="bg-white px-4 pt-14 pb-16 font-satoshi sm:px-6 md:pt-[56px] md:pb-[96px]">
    <div className="mx-auto flex max-w-[1160px] flex-col items-center">
      <h2 className="text-center text-[32px] font-black leading-[1.15] tracking-[-1.2px] text-[#17131A] md:text-[40px] md:tracking-[-1.6px]">
        Pay suppliers across{" "}
        <span className="text-[#6A0DAD]">190+ countries</span>
      </h2>
      <p className="mt-4 max-w-[500px] text-center text-[16px] leading-[26px] text-[#524E56] md:text-[18px] md:leading-[28px]">
        Reach your vendors across major global markets with transparent rates
        and clear payment visibility.
      </p>

      <div className="mt-10 grid w-full grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-y-8 md:mt-[56px] lg:grid-cols-[repeat(5,minmax(0,187fr))_minmax(0,168fr)] lg:gap-3">
        {corridors.map((corridor) => (
          <Link
            key={corridor.currency}
            href="/corridors"
            className={`flex min-h-[215px] flex-col items-center rounded-[16px] bg-white px-3 pt-[34px] pb-6 text-center transition-transform duration-300 hover:-translate-y-1 ${cardGlow}`}
          >
            <div className="flex items-center gap-2 text-[#17131A]">
              <Flag code={corridor.fromFlag} label={corridor.from} />
              <ArrowRight size={14} strokeWidth={2.25} />
              <Flag code={corridor.toFlag} label={corridor.to} />
            </div>
            <p className="mt-4 text-[15px] font-medium leading-[19px] text-[#17131A]">
              {corridor.from} →
              <br />
              {corridor.to}
            </p>
            <p className="mt-4 text-[22px] font-bold leading-none text-[#6A0DAD]">
              {corridor.currency}
            </p>
            <span className="mt-auto rounded-full bg-[#F3EEFF] px-3 py-1 text-[12px] leading-[17px] text-[#6A0DAD]">
              Popular corridor
            </span>
          </Link>
        ))}

        <Link
          href="/corridors"
          className={`group flex min-h-[215px] flex-col rounded-[16px] bg-gradient-to-b from-[#7A2EF6] to-[#5C0DB8] px-5 pt-[26px] pb-6 text-white transition-transform duration-300 hover:-translate-y-1 ${cardGlow}`}
        >
          <p className="text-[40px] font-black leading-none tracking-[-1px]">180+</p>
          <p className="mt-1 text-[18px] font-bold leading-[24px]">countries</p>
          <p className="mt-3 text-[13px] leading-[19px] text-white/80">
            Explore all supported destinations
          </p>
          <span className="mt-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#6A0DAD] transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight size={18} strokeWidth={2.25} />
          </span>
        </Link>
      </div>

      <Link
        href="/corridors"
        className="mt-10 flex items-center gap-2 text-[15px] font-bold text-[#6A0DAD] transition-colors hover:text-[#5C0DB8] md:mt-[52px]"
      >
        View all corridors
        <ArrowRight size={18} strokeWidth={2.25} />
      </Link>
    </div>
  </section>
);

export default PopularCorridors;
