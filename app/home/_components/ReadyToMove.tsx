import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

type ReadyToMoveProps = {
  title?: string;
  description?: string;
};

const ReadyToMove = ({
  title = "One platform for global business payments",
  description = "Manage cross-border payments across multiple corridors and reach your partners in 190+ countries from one place.",
}: ReadyToMoveProps) => (
  <section className="bg-[#43215C] px-4 py-16 font-satoshi sm:px-6 md:py-[78px]">
    <div className="mx-auto flex max-w-[1160px] flex-col items-center text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/70 md:text-[12px]">
        Ready to move globally?
      </p>

      <h2 className="mt-5 text-[34px] font-black leading-[1.1] tracking-[-1.2px] text-white md:mt-6 md:text-[48px] md:tracking-[-1.9px]">
        {title}
      </h2>

      <p className="mt-5 max-w-[430px] text-[15px] leading-[23px] text-white/70 md:mt-6 md:text-[16px]">
        {description}
      </p>

      <div className="mt-8 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row md:mt-[38px]">
        <Link
          href="https://merchant.importa.biz"
          className="flex h-[48px] w-full items-center justify-center gap-2 rounded-full bg-white px-7 text-[16px] font-bold text-[#6A0DAD] shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition-colors hover:bg-[#F3EEFF] sm:w-auto"
        >
          Get started
          <ArrowRight size={18} strokeWidth={2.25} />
        </Link>
        <Link
          href="https://calendly.com/dgsoetan/30min"
          className="flex h-[51px] w-full items-center justify-center gap-3 rounded-full border border-white/40 bg-[#43215C] pr-7 pl-[10px] text-[16px] font-bold text-white transition-colors hover:border-white/70 sm:w-auto"
        >
          <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-white/50">
            <CalendarDays size={15} />
          </span>
          Book a call
        </Link>
      </div>
    </div>
  </section>
);

export default ReadyToMove;
