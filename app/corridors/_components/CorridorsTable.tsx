"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

type Corridor = {
  country: string;
  rail: string[];
  currency: string;
  recipient: string;
  remitter: string;
  cutOff: string[];
  processingDays: string[];
  settlement: string[];
  // Marks the status with † and links to the footnote under the table
  caveat?: boolean;
};

// Source: ImportaPay Country Coverage List, updated 28 September 2026.
const COVERAGE_UPDATED = "28 September 2026";

const countryFlags: Record<string, string> = {
  "190+ countries": "/image/flags/global.svg",
  Australia: "/image/flags/au.svg",
  Brazil: "/image/flags/br.svg",
  Canada: "/image/flags/ca.svg",
  China: "/image/flags/cn.svg",
  Colombia: "/image/flags/co.svg",
  "European Union": "/image/flags/eu.svg",
  "Hong Kong": "/image/flags/hk.svg",
  India: "/image/flags/in.svg",
  Japan: "/image/flags/jp.svg",
  Mexico: "/image/flags/mx.svg",
  Nigeria: "/image/flags/ng.svg",
  Philippines: "/image/flags/ph.svg",
  Singapore: "/image/flags/sg.svg",
  "United Arab Emirates": "/image/flags/ae.svg",
  "United Kingdom": "/image/flags/gb.svg",
  "United States": "/image/flags/us.svg",
  Vietnam: "/image/flags/vn.svg",
};

const PB = "Personal / Business";
const ORIGINATOR = "Originator Name";
const BFI_PROVIDER = "BFI or BFI payment provider name";
const OFI = "OFI Name";

const corridors: Corridor[] = [
  {
    country: "190+ countries",
    rail: ["WIRE"],
    currency: "USD",
    recipient: PB,
    remitter: ORIGINATOR,
    cutOff: ["07:30 GMT"],
    processingDays: ["Mon-Fri"],
    settlement: ["T+0"],
  },
  {
    country: "Australia",
    rail: ["NPP / BECS"],
    currency: "AUD",
    recipient: PB,
    remitter: ORIGINATOR,
    cutOff: ["N/A (<1m AUD)", "09:00 GMT (>1m AUD)"],
    processingDays: ["Everyday", "Mon-Fri"],
    settlement: ["Real-time (<100k AUD)", "T+0 (>100k AUD)"],
  },
  {
    country: "Brazil",
    rail: ["PIX"],
    currency: "BRL",
    recipient: PB,
    remitter: BFI_PROVIDER,
    cutOff: ["N/A"],
    processingDays: ["Everyday"],
    settlement: ["Real-time"],
  },
  {
    country: "Canada",
    rail: ["BANK_TRANSFER (ACSS)"],
    currency: "CAD",
    recipient: PB,
    remitter: ORIGINATOR,
    cutOff: ["22:00 GMT"],
    processingDays: ["Mon-Fri"],
    settlement: ["T+1"],
  },
  {
    country: "China",
    rail: ["WIRE"],
    currency: "CNY",
    recipient: PB,
    remitter: BFI_PROVIDER,
    cutOff: ["15:00 GMT"],
    processingDays: ["Mon-Fri"],
    settlement: ["T+0"],
  },
  {
    country: "Colombia",
    rail: ["BANK_TRANSFER"],
    currency: "COP",
    recipient: PB,
    remitter: BFI_PROVIDER,
    cutOff: ["18:00 GMT"],
    processingDays: ["Mon-Fri"],
    settlement: ["T+0"],
  },
  {
    country: "European Union",
    rail: ["SEPA / SEPA Instant"],
    currency: "EUR",
    recipient: PB,
    remitter: ORIGINATOR,
    cutOff: ["N/A (Instant <100k)", "12:00 GMT (SEPA >100k)"],
    processingDays: ["Everyday", "Mon-Fri"],
    settlement: ["Real-time (<100k)", "T+0 (>100k)"],
  },
  {
    country: "Hong Kong",
    rail: ["CHATS"],
    currency: "HKD",
    recipient: PB,
    remitter: ORIGINATOR,
    cutOff: ["08:00 GMT"],
    processingDays: ["Mon-Fri"],
    settlement: ["T+0"],
  },
  {
    country: "Hong Kong",
    rail: ["WIRE"],
    currency: "HKD",
    recipient: PB,
    remitter: ORIGINATOR,
    cutOff: ["15:00 GMT"],
    processingDays: ["Mon-Fri"],
    settlement: ["T+0"],
  },
  {
    country: "India",
    rail: ["IMPS / RTGS / NEFT"],
    currency: "INR",
    recipient: PB,
    remitter: "Originator Name (NEFT)",
    cutOff: ["N/A (IMPS, <500k INR)", "RTGS / NEFT (to confirm)"],
    processingDays: ["Everyday", "Mon-Fri"],
    settlement: ["Real-time (IMPS)", "T+0 (NEFT)"],
    caveat: true,
  },
  {
    country: "Japan",
    rail: ["ZENGIN"],
    currency: "JPY",
    recipient: PB,
    remitter: ORIGINATOR,
    cutOff: ["06:00 GMT"],
    processingDays: ["Mon-Fri"],
    settlement: ["T+0"],
  },
  {
    country: "Mexico",
    rail: ["SPEI"],
    currency: "MXN",
    recipient: PB,
    remitter: BFI_PROVIDER,
    cutOff: ["N/A"],
    processingDays: ["Everyday"],
    settlement: ["Real-time"],
  },
  {
    country: "Nigeria",
    rail: ["BANK_TRANSFER"],
    currency: "NGN",
    recipient: PB,
    remitter: BFI_PROVIDER,
    cutOff: ["N/A"],
    processingDays: ["Everyday"],
    settlement: ["Real-time"],
  },
  {
    country: "Philippines",
    rail: ["INSTAPAY / GCASH"],
    currency: "PHP",
    recipient: PB,
    remitter: ORIGINATOR,
    cutOff: ["N/A"],
    processingDays: ["Everyday"],
    settlement: ["Real-time"],
  },
  {
    country: "Philippines",
    rail: ["PESONET"],
    currency: "PHP",
    recipient: PB,
    remitter: ORIGINATOR,
    cutOff: ["06:30 GMT"],
    processingDays: ["Mon-Fri"],
    settlement: ["T+0"],
  },
  {
    country: "Singapore",
    rail: ["BANK_TRANSFER (FAST)", "MEPS (RTGS)"],
    currency: "SGD",
    recipient: PB,
    remitter: ORIGINATOR,
    cutOff: ["N/A"],
    processingDays: ["Everyday"],
    settlement: ["Real-time"],
  },
  {
    country: "United Arab Emirates",
    rail: ["BANK_TRANSFER (IPP / FTS)"],
    currency: "AED",
    recipient: PB,
    remitter: OFI,
    cutOff: ["N/A (<50k AED)", "16:45 GMT (>50k AED)"],
    processingDays: ["Everyday", "Mon-Fri"],
    settlement: ["T+0"],
  },
  {
    country: "United Kingdom",
    rail: ["FPS / CHAPS"],
    currency: "GBP",
    recipient: PB,
    remitter: "BFI Name",
    cutOff: ["N/A (FPS)", "15:30 GMT (CHAPS)"],
    processingDays: ["Everyday", "Mon-Fri"],
    settlement: ["Real-time (FPS, <1m GBP)", "T+0 (CHAPS, >1m GBP)"],
  },
  {
    country: "United States",
    rail: ["FEDWIRE"],
    currency: "USD",
    recipient: PB,
    remitter: OFI,
    cutOff: ["21:00 GMT"],
    processingDays: ["Mon-Fri"],
    settlement: ["Real-time"],
  },
  {
    country: "Vietnam",
    rail: ["NAPAS / CITAD"],
    currency: "VND",
    recipient: PB,
    remitter: BFI_PROVIDER,
    cutOff: ["09:00 GMT"],
    processingDays: ["Everyday", "Mon-Fri"],
    settlement: ["<1 hour (NAPAS, <499m VND)", "T+1 (CITAD, >499m VND)"],
  },
];

const filters = [
  { label: "All", match: () => true },
  {
    label: "Real-time",
    match: (c: Corridor) => c.settlement.some((s) => s.startsWith("Real-time")),
  },
  {
    label: "Same day (T+0)",
    match: (c: Corridor) => c.settlement.some((s) => s.startsWith("T+0")),
  },
];

const headers = [
  "Country",
  "Payment rail",
  "Currency",
  "Recipient",
  "Remitter name",
  "Cut-off time",
  "Processing days",
  "Settlement",
  "Status",
];

const Lines = ({ lines }: { lines: string[] }) => (
  <>
    {lines.map((line) => {
      const split = line.indexOf(" (");
      const main = split === -1 ? line : line.slice(0, split);
      const detail = split === -1 ? null : line.slice(split + 1);
      return (
        <div key={line}>
          <span className="whitespace-nowrap">{main}</span>
          {detail && (
            <>
              {" "}
              <span className="text-[11px] font-normal whitespace-nowrap text-[#86828D]">
                {detail}
              </span>
            </>
          )}
        </div>
      );
    })}
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
          c.rail.join(" ").toLowerCase().includes(term)),
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
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#F3EEFF] px-3 py-1 text-[12px] font-bold text-[#6A0DAD]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
              {corridors.length} corridors · All Live · Updated{" "}
              {COVERAGE_UPDATED}
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
            <table className="w-full min-w-[1100px] border-collapse text-left">
              <thead>
                <tr className="bg-[#F8F6FF]">
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="px-3 py-4 text-[13px] leading-[17px] font-bold text-[#17131A] first:pl-6 last:pr-6"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[13px] text-[#524E56]">
                {rows.map((corridor) => (
                  <tr
                    key={`${corridor.country}-${corridor.rail.join()}`}
                    className="border-t border-[#F1EEF5] transition-colors hover:bg-[#FBFAFE]"
                  >
                    <td className="py-4 pr-4 pl-6">
                      <div className="flex items-center gap-3">
                        <Image
                          src={countryFlags[corridor.country]}
                          alt=""
                          width={36}
                          height={24}
                          className="h-[14px] w-[20px] shrink-0 rounded-[2px] object-cover ring-1 ring-[#17131A]/10"
                        />
                        <span className="text-[14px] leading-[18px] font-bold text-[#17131A]">
                          {corridor.country}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4 font-medium text-[#2C2833]">
                      <Lines lines={corridor.rail} />
                    </td>
                    <td className="px-3 py-4">
                      <span className="rounded-full bg-[#F3EEFF] px-2.5 py-1 text-[12px] font-medium text-[#6A0DAD]">
                        {corridor.currency}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      {corridor.recipient}
                    </td>
                    <td className="min-w-[160px] px-3 py-4 leading-[18px]">
                      {corridor.remitter}
                    </td>
                    <td className="px-3 py-4">
                      <Lines lines={corridor.cutOff} />
                    </td>
                    <td className="px-3 py-4">
                      <Lines lines={corridor.processingDays} />
                    </td>
                    <td className="px-3 py-4 font-medium text-[#17131A]">
                      <Lines lines={corridor.settlement} />
                    </td>
                    <td className="py-4 pr-6 pl-4">
                      <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#16A34A]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                        Live
                        {corridor.caveat && (
                          <a
                            href="#coverage-note"
                            aria-label="See note"
                            className="text-[#6A0DAD]"
                          >
                            †
                          </a>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr className="border-t border-[#F1EEF5]">
                    <td
                      colSpan={headers.length}
                      className="px-6 py-12 text-center text-[14px] text-[#86828D]"
                    >
                      No corridors match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p
          id="coverage-note"
          className="mt-6 text-[12px] leading-[19px] text-[#86828D]"
        >
          <span className="font-bold text-[#6A0DAD]">† India</span> is live but
          we recommend a penny test before the first live payout; RTGS and NEFT
          cut-off times are being confirmed.
        </p>
        <p className="mt-2 text-[12px] leading-[19px] text-[#86828D]">
          Cut-off times in GMT · T+0 same business day · BFI = Beneficiary
          Financial Institution · OFI = Originating Financial Institution ·
          Thresholds shown in the payout currency. Settlement times may vary
          with the beneficiary bank.
        </p>
        <p className="mt-3 text-[12px] text-[#86828D]">
          Questions about coverage?{" "}
          <a
            href="mailto:importapay@importa.biz"
            className="font-bold text-[#6A0DAD] hover:underline"
          >
            importapay@importa.biz
          </a>{" "}
          ·{" "}
          <a
            href="https://pay.importa.biz"
            className="font-bold text-[#6A0DAD] hover:underline"
          >
            pay.importa.biz
          </a>
        </p>
      </div>
    </section>
  );
};

export default CorridorsTable;
