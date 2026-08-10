import Image from "next/image";

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

const currencyFlags: Record<string, string> = {
  USD: "/image/flags/us.svg",
  BRL: "/image/flags/br.svg",
  CNY: "/image/flags/cn.svg",
  COP: "/image/flags/co.svg",
  EUR: "/image/flags/eu.svg",
  HKD: "/image/flags/hk.svg",
  MXN: "/image/flags/mx.svg",
  NGN: "/image/flags/ng.svg",
  PHP: "/image/flags/ph.svg",
  SGD: "/image/flags/sg.svg",
  AED: "/image/flags/ae.svg",
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

const CorridorsTable = () => {
  return (
    <section
      id="coverage"
      className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900">
              Country coverage
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#5B575D]">
              Supported payout corridors, rails and settlement terms.
            </p>
          </div>
          <span className="inline-flex w-fit items-center rounded-full bg-purple-100 text-[#6A0DAD] px-4 py-1.5 text-sm font-medium">
            14 corridors &middot; All Live
          </span>
        </div>

        <div className="rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left border-collapse">
              <thead>
                <tr className="bg-purple-50">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900">
                    Country
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900">
                    Payment Rail
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900">
                    Payout Currency
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900">
                    Recipient Type
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900">
                    Cut-Off Time
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900">
                    Processing Days
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900">
                    Settlement Time
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {corridors.map((corridor, index) => (
                  <tr
                    key={`${corridor.country}-${corridor.rail}`}
                    className={
                      index !== corridors.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100">
                          <Image src={countryFlags[corridor.country]} alt="" width={28} height={19} className="h-[19px] w-7 rounded-sm object-cover shadow-sm" />
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {corridor.country}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {corridor.rail}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="inline-flex items-center gap-2">
                        <Image src={currencyFlags[corridor.currency]} alt="" width={24} height={16} className="h-4 w-6 rounded-sm object-cover shadow-sm" />
                        {corridor.currency}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {corridor.recipient}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {corridor.cutOff.map((line) => (
                        <div key={line}>{line}</div>
                      ))}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {corridor.processingDays.map((line) => (
                        <div key={line}>{line}</div>
                      ))}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {corridor.settlement.map((line) => (
                        <div key={line}>{line}</div>
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold">
                        Live
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-xs sm:text-sm text-gray-500 leading-relaxed">
          Cut-off times in GMT &middot; T+0 same business day &middot; BFI =
          Beneficiary Financial Institution &middot; OFI = Originating
          Financial Institution &middot; Thresholds shown in the payout
          currency. Settlement times may vary with the beneficiary bank.
        </p>
        <p className="mt-3 text-xs sm:text-sm text-gray-500">
          Questions about coverage?{" "}
          <a
            href="mailto:importapay@importa.biz"
            className="text-[#6A0DAD] hover:underline"
          >
            importapay@importa.biz
          </a>
        </p>
      </div>
    </section>
  );
};

export default CorridorsTable;
