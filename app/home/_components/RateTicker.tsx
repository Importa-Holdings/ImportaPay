"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const API_BASE_URL = "https://importa-pay-payments-x72y4.ondigitalocean.app";
const QUOTE_URL = `${API_BASE_URL}/api/public/quote/preview`;
const QUOTE_AMOUNT = 5000; // API-enforced minimum destination amount

const CACHE_KEY = "importapay_rate_ticker_v1";
const CACHE_TTL_MS = 10 * 60 * 1000; // avoid refetching more than once per 10 minutes

type TickerCurrency = {
  code: string;
  country: string;
  flag: string;
  fallbackRate: number;
};

const tickerCurrencies: TickerCurrency[] = [
  { code: "USD", country: "US", flag: "/image/flags/us.svg", fallbackRate: 1540.25 },
  { code: "EUR", country: "DE", flag: "/image/flags/eu.svg", fallbackRate: 1680.1 },
  { code: "GBP", country: "GB", flag: "/image/flags/gb.svg", fallbackRate: 1940.5 },
  { code: "AED", country: "AE", flag: "/image/flags/ae.svg", fallbackRate: 380.9 },
  { code: "CNY", country: "CN", flag: "/image/flags/cn.svg", fallbackRate: 214.1 },
  { code: "BRL", country: "BR", flag: "/image/flags/br.svg", fallbackRate: 274.96 },
];

type RatesByCode = Record<string, number>;

const fallbackRates: RatesByCode = Object.fromEntries(
  tickerCurrencies.map((currency) => [currency.code, currency.fallbackRate]),
);

const formatRate = (value: number) =>
  value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const readCache = (): RatesByCode | null => {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as { timestamp: number; rates: RatesByCode };
    if (Date.now() - parsed.timestamp > CACHE_TTL_MS) return null;

    return parsed.rates;
  } catch {
    return null;
  }
};

const writeCache = (rates: RatesByCode) => {
  try {
    window.localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), rates }),
    );
  } catch {
    // storage unavailable (private mode, quota, etc.) - safe to skip caching
  }
};

const fetchRate = async (currency: TickerCurrency): Promise<number | null> => {
  try {
    const searchParams = new URLSearchParams({
      destinationCountry: currency.country,
      destinationCurrency: currency.code,
      destinationAmount: String(QUOTE_AMOUNT),
    });
    const response = await fetch(`${QUOTE_URL}?${searchParams.toString()}`);
    if (!response.ok) return null;

    const data = await response.json();
    const rate = data?.response?.rate?.ngnPerDestinationUnit;

    return typeof rate === "number" ? rate : null;
  } catch {
    return null;
  }
};

// Requests are sent one at a time with a short gap so the ticker never bursts
// several quote calls at once against the pricing API.
const fetchAllRates = async (): Promise<RatesByCode> => {
  const rates: RatesByCode = {};

  for (const currency of tickerCurrencies) {
    const rate = await fetchRate(currency);
    if (rate !== null) rates[currency.code] = rate;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  return rates;
};

function RateCard({ code, flag, rate }: { code: string; flag: string; rate: number }) {
  return (
    <div className="flex shrink-0 items-center gap-3 border-r border-slate-200/70 px-6 py-5 sm:px-8">
      <Image
        src={flag}
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 shrink-0 rounded-full object-cover shadow-sm"
      />
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-purple-400">
          {code}/NGN
        </p>
        <p className="mt-0.5 font-mono text-lg font-bold tabular-nums text-slate-900 sm:text-xl">
          {formatRate(rate)}
        </p>
      </div>
    </div>
  );
}

export default function RateTicker() {
  const [rates, setRates] = useState<RatesByCode>(fallbackRates);

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setRates((current) => ({ ...current, ...cached }));
      return;
    }

    let cancelled = false;

    void (async () => {
      const fetched = await fetchAllRates();
      if (cancelled || Object.keys(fetched).length === 0) return;

      writeCache(fetched);
      setRates((current) => ({ ...current, ...fetched }));
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="mx-auto w-full max-w-[1252px] px-4 py-6 sm:px-6 lg:px-8">
      <div className="group relative overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-white via-purple-50/60 to-white shadow-sm ring-1 ring-slate-200/70">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-20" />

        <div className="flex w-max animate-rate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
          {[0, 1].map((loop) => (
            <div key={loop} className="flex" aria-hidden={loop === 1}>
              {tickerCurrencies.map((currency) => (
                <RateCard
                  key={`${loop}-${currency.code}`}
                  code={currency.code}
                  flag={currency.flag}
                  rate={rates[currency.code] ?? currency.fallbackRate}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
