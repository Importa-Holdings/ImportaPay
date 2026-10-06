"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

type Corridor = {
  flag: string;
  country: string;
  rail: string;
  currency: string;
  recipient: string;
  cutOff: string[];
  processingDays: string[];
  settlement: string[];
};

const countryFlags: Record<string, string> = {
  "190+ countries": "/image/flags/global.svg",
  Brazil: "/image/flags/br.svg",
  China: "/image/flags/cn.svg",
  Colombia: "/image/flags/co.svg",
  "European Union": "/image/flags/eu.svg",
  "Hong Kong": "/image/flags/hk.svg",
  Mexico: "/image/flags/mx.svg",
  Nigeria: "/image/flags/ng.svg",
  Philippines: "/image/flags/ph.svg",
  Singapore: "/image/flags/sg.svg",
  "United Arab Emirates": "/image/flags/ae.svg",
  "United States": "/image/flags/us.svg",
};

const corridors: Corridor[] = [
  {
    flag: "🌍",
    country: "190+ countries",
    rail: "WIRE",
    currency: "USD",
    recipient: "Personal / Business",
    cutOff: ["07:30 GMT"],
    processingDays: ["Mon-Fri"],
    settlement: ["T+0"],
  },
  {
    flag: "🇧🇷",
    country: "Brazil",
    rail: "PIX",
    currency: "BRL",
    recipient: "Personal / Business",
    cutOff: ["N/A"],
    processingDays: ["Everyday"],
    settlement: ["Real-time"],
  },
  {
    flag: "🇨🇳",
    country: "China",
    rail: "WIRE",
    currency: "CNY",
    recipient: "Personal / Business",
    cutOff: ["15:00 GMT"],
    processingDays: ["Mon-Fri"],
    settlement: ["T+0"],
  },
  {
    flag: "🇨🇴",
    country: "Colombia",
    rail: "BANK_TRANSFER",
    currency: "COP",
    recipient: "Personal / Business",
    cutOff: ["18:00 GMT"],
    processingDays: ["Mon-Fri"],
    settlement: ["T+0"],
  },
  {
    flag: "🇪🇺",
    country: "European Union",
    rail: "SEPA / SEPA Instant",
    currency: "EUR",
    recipient: "Personal / Business",
    cutOff: ["N/A (Instant <100k)", "12:00 GMT (SEPA >100k)"],
    processingDays: ["Everyday", "Mon-Fri"],
    settlement: ["Real-time (<100k)", "T+0 (>100k)"],
  },
  {
    flag: "🇭🇰",
    country: "Hong Kong",
    rail: "CHATS",
    currency: "HKD",
    recipient: "Personal / Business",
    cutOff: ["08:00 GMT"],
    processingDays: ["Mon-Fri"],
    settlement: ["T+0"],
  },
  {
    flag: "🇭🇰",
    country: "Hong Kong",
    rail: "WIRE",
    currency: "HKD",
    recipient: "Personal / Business",
    cutOff: ["15:00 GMT"],
    processingDays: ["Mon-Fri"],
    settlement: ["T+0"],
  },
  {
    flag: "🇲🇽",
    country: "Mexico",
    rail: "SPEI",
    currency: "MXN",
    recipient: "Personal / Business",
    cutOff: ["N/A"],
    processingDays: ["Everyday"],
    settlement: ["Real-time"],
  },
  {
    flag: "🇳🇬",
    country: "Nigeria",
    rail: "BANK_TRANSFER",
    currency: "NGN",
    recipient: "Personal / Business",
    cutOff: ["N/A"],
    processingDays: ["Everyday"],
    settlement: ["Real-time"],
  },
  {
    flag: "🇵🇭",
    country: "Philippines",
    rail: "INSTAPAY",
    currency: "PHP",
    recipient: "Personal / Business",
    cutOff: ["N/A"],
    processingDays: ["Everyday"],
    settlement: ["Real-time"],
  },
  {
    flag: "🇵🇭",
    country: "Philippines",
    rail: "PESONET",
    currency: "PHP",
    recipient: "Personal / Business",
    cutOff: ["06:30 GMT"],
    processingDays: ["Mon-Fri"],
    settlement: ["T+0"],
  },
  {
    flag: "🇸🇬",
    country: "Singapore",
    rail: "BANK_TRANSFER (FAST)",
    currency: "SGD",
    recipient: "Personal / Business",
    cutOff: ["N/A"],
    processingDays: ["Everyday"],
    settlement: ["Real-time"],
  },
  {
    flag: "🇦🇪",
    country: "United Arab Emirates",
    rail: "BANK_TRANSFER (IPP / FTS)",
    currency: "AED",
    recipient: "Personal / Business",
    cutOff: ["N/A (<50k AED)", "16:45 GMT (>50k AED)"],
    processingDays: ["Everyday", "Mon-Fri"],
    settlement: ["T+0"],
  },
  {
    flag: "🇺🇸",
    country: "United States",
    rail: "FEDWIRE",
    currency: "USD",
    recipient: "Personal / Business",
    cutOff: ["21:00 GMT"],
    processingDays: ["Mon-Fri"],
    settlement: ["Real-time"],
  },
];

const filters = [
  { label: "All", match: () => true },
  { label: "Real-time", match: (c: Corridor) => c.settlement.some((s) => s.startsWith("Real-time")) },
  { label: "Same day (T+0)", match: (c: Corridor) => c.settlement.some((s) => s.startsWith("T+0")) },
];

const headers = [
  "Country",
  "Payment rail",
  "Currency",
  "Recipient",
  "Cut-off time",
  "Processing days",
  "Settlement",
  "Status",
];

const Lines = ({ lines }: { lines: string[] }) => (
  <>
    {lines.map((line) => (
      <div key={line} className="whitespace-nowrap">
        {line}
      </div>
    ))}
  </>
);

const CorridorsTable = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const filter = filters.find((f) => f.label === activeFilter) ?? filters[0];
    const term = query.trim().toLowerCase();
    return corridors.filter(
      (c) =>
        filter.match(c) &&
        (!term ||
          c.country.toLowerCase().includes(term) ||
          c.currency.toLowerCase().includes(term) ||
          c.rail.toLowerCase().includes(term))
    );
  }, [activeFilter, query]);

  return (
    <section
      id="coverage"
      className="scroll-mt-24 bg-white px-4 py-16 font-satoshi sm:px-6 md:py-[100px]"
    >
      <div className="mx-auto max-w-[1160px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-[34px] font-black tracking-[-1.2px] text-[#17131A] md:text-[44px] md:tracking-[-1.75px]">
              Country coverage
            </h2>
            <p className="mt-2 text-[15px] text-[#524E56] md:text-[16px]">
              Explore supported corridors, payout rails, currencies, and
              settlement timelines.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="-mx-4 flex gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
              {filters.map((filter) => (
                <button
                  key={filter.label}
                  onClick={() => setActiveFilter(filter.label)}
                  className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-[14px] font-medium whitespace-nowrap transition-colors ${
                    activeFilter === filter.label
                      ? "bg-[#17131A] text-white"
                      : "text-[#524E56] hover:text-[#17131A]"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <label className="relative block sm:w-[240px]">
              <span className="sr-only">Search country or currency</span>
              <Search
                size={16}
                strokeWidth={2.25}
                className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#6B6870]"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country or currency"
                className="h-[44px] w-full rounded-full border border-[#EDE8F8] bg-white pr-4 pl-10 text-[13px] text-[#17131A] placeholder:text-[#A09CA6] focus:border-[#6A0DAD]/40 focus:ring-4 focus:ring-[#6A0DAD]/10 focus:outline-none"
              />
            </label>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[20px] border border-[#EDE8F8] md:mt-10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-left">
              <thead>
                <tr className="bg-[#F8F6FF]">
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="px-5 py-4 text-[13px] font-bold whitespace-nowrap text-[#17131A] first:pl-6 last:pr-6"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[13px] text-[#524E56]">
                {rows.map((corridor) => (
                  <tr
                    key={`${corridor.country}-${corridor.rail}`}
                    className="border-t border-[#F1EEF5] transition-colors hover:bg-[#FBFAFE]"
                  >
                    <td className="py-4 pr-5 pl-6">
                      <div className="flex items-center gap-3">
                        <Image
                          src={countryFlags[corridor.country]}
                          alt=""
                          width={36}
                          height={24}
                          className="h-[14px] w-[20px] shrink-0 rounded-[2px] object-cover"
                        />
                        <span className="text-[14px] font-bold whitespace-nowrap text-[#17131A]">
                          {corridor.country}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-medium whitespace-nowrap text-[#2C2833]">{corridor.rail}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-[#F3EEFF] px-2.5 py-1 text-[12px] font-medium text-[#6A0DAD]">
                        {corridor.currency}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">{corridor.recipient}</td>
                    <td className="px-5 py-4">
                      <Lines lines={corridor.cutOff} />
                    </td>
                    <td className="px-5 py-4">
                      <Lines lines={corridor.processingDays} />
                    </td>
                    <td className="px-5 py-4 font-medium text-[#17131A]">
                      <Lines lines={corridor.settlement} />
                    </td>
                    <td className="py-4 pr-6 pl-5">
                      <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#16A34A]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                        Live
                      </span>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr className="border-t border-[#F1EEF5]">
                    <td colSpan={headers.length} className="px-6 py-12 text-center text-[14px] text-[#86828D]">
                      No corridors match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-[12px] leading-[19px] text-[#86828D]">
          Cut-off times in GMT · T+0 same business day · BFI = Beneficiary
          Financial Institution · OFI = Originating Financial Institution ·
          Thresholds shown in the payout currency. Settlement times may vary
          with the beneficiary bank.
        </p>
        <p className="mt-3 text-[12px] text-[#86828D]">
          Questions about coverage?{" "}
          <a href="mailto:hello@importa.biz" className="font-bold text-[#6A0DAD] hover:underline">
            hello@importa.biz
          </a>
        </p>
      </div>
    </section>
  );
};

export default CorridorsTable;
