import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChartNoAxesColumn,
  Check,
  ChevronDown,
  Code,
  Globe,
  MoveHorizontal,
} from "lucide-react";
import type { ReactNode } from "react";

const Flag = ({ code, className = "" }: { code: string; className?: string }) => (
  <Image
    src={`/image/flags/${code}.svg`}
    alt=""
    width={36}
    height={24}
    className={`h-[11px] w-[16px] shrink-0 ${className}`}
  />
);

const FeatureCard = ({
  icon,
  iconBg,
  title,
  description,
  extra,
  children,
}: {
  icon: ReactNode;
  iconBg: string;
  title: ReactNode;
  description: string;
  extra?: ReactNode;
  children: ReactNode;
}) => (
  <article className="grid gap-6 rounded-[28px] border border-[#EDE8F8] bg-white p-5 shadow-[0_8px_30px_rgba(106,13,173,0.05)] sm:grid-cols-[minmax(0,1fr)_310px] sm:p-6">
    <div>
      <span
        className={`flex h-[44px] w-[44px] items-center justify-center rounded-[12px] text-[#6A0DAD] ${iconBg}`}
      >
        {icon}
      </span>
      <h3 className="mt-5 text-[24px] font-bold leading-[29px] tracking-[-0.6px] text-[#17131A] sm:mt-[38px] sm:text-[23px] sm:leading-[28px]">
        {title}
      </h3>
      <p className="mt-2 text-[14px] leading-[21px] text-[#524E56]">
        {description}
      </p>
      {extra}
    </div>
    {children}
  </article>
);

const panel = "rounded-[16px] border border-[#EDE8F8] bg-white";

const corridors = [
  { from: "ng", to: "us", country: "United States", currency: "USD" },
  { from: "gh", to: "gb", country: "United Kingdom", currency: "GBP" },
  { from: "ke", to: "cn", country: "China", currency: "CNY" },
  { from: "za", to: "ae", country: "UAE", currency: "AED" },
];

const ActiveCorridors = () => (
  <div className={`flex flex-col lg:min-h-[409px] ${panel}`}>
    <div className="flex items-center justify-between border-b border-[#F5F0FD] px-4 py-3">
      <p className="text-[14px] font-bold text-[#17131A]">Active corridors</p>
      <Link href="/corridors" className="text-[13px] font-medium text-[#6A0DAD]">
        View all
      </Link>
    </div>
    <ul className="px-4">
      {corridors.map((corridor) => (
        <li
          key={corridor.currency}
          className="flex items-center gap-2 border-b border-[#F5F0FD] py-[11px] last:border-b-0"
        >
          <Flag code={corridor.from} />
          <ArrowRight size={12} strokeWidth={2.5} className="text-[#6A0DAD]" />
          <Flag code={corridor.to} />
          <span className="ml-1 text-[13px] text-[#17131A]">{corridor.country}</span>
          <span className="ml-auto rounded-full bg-[#F3EEFF] px-2.5 py-0.5 text-[11px] font-medium text-[#6A0DAD]">
            {corridor.currency}
          </span>
        </li>
      ))}
    </ul>
    <div className="m-3 mt-6 flex items-center gap-3 rounded-[12px] border border-[#EDE8F8] bg-[#F8F5FF] px-3 py-3 lg:mt-auto">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EDE3FC] text-[#6A0DAD]">
        <Globe size={13} />
      </span>
      <p className="text-[12px] leading-[15px] text-[#17131A]">
        One platform.
        <br />
        Multiple corridors.
      </p>
      <p className="ml-auto text-right leading-none">
        <span className="block text-[21px] font-black tracking-[-0.5px] text-[#6A0DAD]">
          180+
        </span>
        <span className="text-[10px] text-[#86828D]">countries</span>
      </p>
    </div>
  </div>
);

const Chip = ({ flag, label, className = "" }: { flag: string; label: string; className?: string }) => (
  <span
    className={`flex items-center gap-1.5 rounded-[8px] px-2 py-1.5 text-[12px] text-[#17131A] ${className}`}
  >
    <Flag code={flag} className="h-[9px] w-[13px]" />
    {label}
    <ChevronDown size={12} className="text-[#524E56]" />
  </span>
);

const ReviewPayment = () => (
  <div className={`flex flex-col lg:min-h-[409px] ${panel}`}>
    <div className="flex items-center justify-between border-b border-[#F5F0FD] px-4 py-3">
      <p className="text-[14px] font-bold text-[#17131A]">Review payment</p>
      <span className="text-[13px] font-medium text-[#6A0DAD]">Edit</span>
    </div>
    <dl className="space-y-3 px-4 pt-3 text-[12px] text-[#86828D]">
      <div className="flex items-center justify-between gap-2">
        <dt>You send</dt>
        <dd className="flex items-center gap-2">
          <span className="text-[16px] font-medium text-[#17131A]">10,000.00</span>
          <Chip flag="ke" label="KES" className="bg-[#F5F5F5]" />
        </dd>
      </div>
      <div className="flex items-center justify-between gap-2">
        <dt>Destination</dt>
        <dd>
          <Chip flag="us" label="United States" className="bg-[#F5F5F5]" />
        </dd>
      </div>
      <div className="flex items-center justify-between gap-2">
        <dt>Exchange rate</dt>
        <dd className="text-[12px] text-[#17131A]">1 KES = 0.0725 USD</dd>
      </div>
      <div className="flex items-center justify-between gap-2">
        <dt>Fees</dt>
        <dd className="text-[12px] font-bold text-[#17131A]">$15.00</dd>
      </div>
    </dl>
    <div className="m-3 mt-6 rounded-[12px] border border-[#E5D4F8] bg-[#F8F4FF] px-3 py-3 lg:mt-auto">
      <p className="text-[11px] font-medium text-[#6A0DAD]">Recipient receives</p>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-[24px] font-black tracking-[-0.8px] text-[#17131A]">725.00</p>
        <Chip flag="us" label="USD" className="border border-[#E5D4F8] bg-white" />
      </div>
    </div>
  </div>
);

const steps = [
  { label: "Payment created", time: "May 20, 2026 · 10:24 AM", state: "done" },
  { label: "Compliance review", time: "May 20, 2026 · 10:32 AM", state: "done" },
  { label: "Processing payment", time: "May 20, 2026 · 10:45 AM", state: "done" },
  { label: "Payment in transit", time: "May 20, 2026 · 10:50 AM", state: "current" },
  { label: "Settled", time: "Estimated May 20, 2026", state: "pending" },
];

const PaymentTimeline = () => (
  <div className={`px-4 py-4 ${panel}`}>
    <div className="flex items-start justify-between gap-2">
      <p className="text-[14px] font-bold text-[#17131A]">Payment to Global Tech Ltd.</p>
      <span className="shrink-0 rounded-full bg-[#F3EEFF] px-2 py-0.5 text-[10px] font-medium text-[#6A0DAD]">
        IMP-78452
      </span>
    </div>
    <p className="mt-1 text-[11px] leading-[16px] text-[#86828D]">
      Kenya → United States • $725.00 • May 20, 2026
    </p>
    <ol className="mt-3">
      {steps.map((step, i) => (
        <li key={step.label} className="relative flex gap-3 pb-[10px] last:pb-0">
          {i < steps.length - 1 && (
            <span className="absolute top-[18px] left-[8.5px] h-[calc(100%-18px)] w-px bg-[#6A0DAD]" />
          )}
          {step.state === "pending" ? (
            <span className="relative mt-px h-[18px] w-[18px] shrink-0 rounded-full border-2 border-[#D0C4F0] bg-white" />
          ) : (
            <span className="relative mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#6A0DAD] text-white">
              <Check size={11} strokeWidth={3} />
            </span>
          )}
          <div>
            <p
              className={`text-[13px] leading-[18px] ${
                step.state === "current"
                  ? "text-[#6A0DAD]"
                  : step.state === "pending"
                    ? "text-[#9C8FB0]"
                    : "text-[#17131A]"
              }`}
            >
              {step.label}
            </p>
            <p className="text-[10px] leading-[14px] text-[#A9A3B0]">{step.time}</p>
          </div>
        </li>
      ))}
    </ol>
    <span className="mt-4 flex items-center gap-1.5 text-[13px] font-medium text-[#6A0DAD]">
      View payment details
      <ArrowRight size={14} strokeWidth={2.25} />
    </span>
  </div>
);

const requestLines = [
  "{",
  '  "source_market": "KE",',
  '  "destination_country": "US",',
  '  "amount": "10000.00",',
  '  "currency": "USD",',
  '  "recipient_id": "rec_123",',
  '  "reference": "INV-001"',
];

const CodeSample = () => (
  <div className="overflow-hidden rounded-[16px] bg-[#13111A] font-[family-name:var(--font-geist-mono)] text-[10.5px] leading-[17px] text-[#C4B8E0]">
    <div className="flex items-center gap-3 border-b border-[#2A2830] px-4 py-2.5 font-satoshi">
      <span className="rounded-[4px] bg-[#6A0DAD] px-2 py-0.5 text-[11px] font-bold text-white">
        POST
      </span>
      <span className="text-[12px] text-white/80">/v1/payments</span>
    </div>
    <pre className="overflow-x-auto px-4 py-3">
      {requestLines.map((line, i) => (
        <div key={i} className="flex">
          <span className="w-5 shrink-0 text-[#45434D] select-none">{i + 1}</span>
          <span>{line}</span>
        </div>
      ))}
      <div className="flex">
        <span className="w-5 shrink-0" />
        <span>{"}"}</span>
      </div>
    </pre>
    <div className="border-t border-[#2A2830] px-4 py-3">
      <div className="flex items-center gap-3 font-satoshi">
        <span className="rounded-[4px] bg-[#16A34A] px-2 py-0.5 text-[11px] font-bold text-white">
          200
        </span>
        <span className="text-[12px] text-white/80">Payment created</span>
      </div>
      <pre className="mt-2">
        {`{\n  "id": "pay_12345",\n  "status": "created"\n}`}
      </pre>
    </div>
  </div>
);

const apiFeatures = ["RESTful API", "Real-time webhooks", "Enterprise-grade security"];

const WhyImportapay = () => (
  <section className="bg-gradient-to-b from-white via-[#F7F5FE] to-[#F4F0FC] px-4 pt-16 pb-16 font-satoshi sm:px-6 md:pt-[80px] md:pb-[80px]">
    <div className="mx-auto max-w-[1160px]">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-3 md:gap-4">
          <span className="h-px w-8 bg-[#6A0DAD]" />
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#6A0DAD] md:text-[12px]">
            Why Importapay
          </p>
          <span className="h-px w-8 bg-[#6A0DAD]" />
        </div>
        <h2 className="mt-5 max-w-[1000px] text-[32px] font-black leading-[1.12] tracking-[-1.2px] text-[#17131A] md:mt-6 md:text-[46px] md:tracking-[-1.85px]">
          Everything you need to pay{" "}
          <span className="text-[#6A0DAD]">globally</span>, effortlessly
        </h2>
        <p className="mt-4 max-w-[440px] text-[16px] leading-[26px] text-[#524E56] md:text-[18px] md:leading-[28px]">
          Fund in Naira, review rates, track payments, and integrate payouts
          from one business platform.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:mt-[64px] lg:grid-cols-2">
        <FeatureCard
          icon={<Globe size={22} />}
          iconBg="bg-[#F3EEFF]"
          title={
            <>
              Multi-corridor
              <br className="hidden sm:block" /> support
            </>
          }
          description="Access payment routes from African markets to destinations around the world without managing separate providers or fragmented workflows."
        >
          <ActiveCorridors />
        </FeatureCard>

        <FeatureCard
          icon={<MoveHorizontal size={22} />}
          iconBg="bg-[#EDFDF5]"
          title="Transparent rates"
          description="See the rate, fees, and final recipient amount before confirming a payment."
        >
          <ReviewPayment />
        </FeatureCard>

        <FeatureCard
          icon={<ChartNoAxesColumn size={20} />}
          iconBg="bg-[#EFF6FF]"
          title={
            <>
              Track every
              <br className="hidden sm:block" /> payment
            </>
          }
          description="Follow each transaction from initiation to settlement with clear, real-time payment visibility."
        >
          <PaymentTimeline />
        </FeatureCard>

        <FeatureCard
          icon={<Code size={20} />}
          iconBg="bg-[#F0FDF4]"
          title="API for Business"
          description="Integrate cross-border payments directly into your product, operations, or internal workflow with our APIs and webhooks."
          extra={
            <ul className="mt-5 space-y-3">
              {apiFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-[14px] text-[#2C2833]">
                  <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-[#6A0DAD] text-white">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          }
        >
          <CodeSample />
        </FeatureCard>
      </div>
    </div>
  </section>
);

export default WhyImportapay;
