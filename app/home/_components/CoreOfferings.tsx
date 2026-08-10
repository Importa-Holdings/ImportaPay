import {
  ArrowUpRight,
  Check,
  Code2,
  Globe2,
  Layers3,
  Radio,
  WalletCards,
} from "lucide-react";
import Image from "next/image";

const walletCurrencies = [
  { code: "NGN", flag: "/image/flags/ng.svg" },
  { code: "USD", flag: "/image/flags/us.svg" },
];

const settlementCurrencies = [
  { code: "NGN", flag: "/image/flags/ng.svg" },
  { code: "USD", flag: "/image/flags/us.svg" },
  { code: "EUR", flag: "/image/flags/eu.svg" },
  { code: "GBP", flag: "/image/flags/gb.svg" },
  { code: "AED", flag: "/image/flags/ae.svg" },
  { code: "CNY", flag: "/image/flags/cn.svg" },
  { code: "BRL", flag: "/image/flags/br.svg" },
];

const transactions = [
  {
    company: "ImpoortaPay",
    currency: "USD",
    flag: "/image/flags/us.svg",
    amount: "+$8,900",
    state: "Settled",
  },
  {
    company: "ImportaPay",
    currency: "NGN",
    flag: "/image/flags/ng.svg",
    amount: "+₦4.2m",
    state: "Settled",
  },
];

function Eyebrow({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${dark ? "text-white/55" : "text-slate-500"}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-purple-300" : "bg-purple-600"}`}
      />
      {children}
    </span>
  );
}

function IconTile({
  children,
  inverse = false,
}: {
  children: React.ReactNode;
  inverse?: boolean;
}) {
  return (
    <span
      className={`grid h-11 w-11 place-items-center rounded-2xl ${inverse ? "bg-white/10 text-white" : "bg-[#380a5e] text-white"}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

export default function CoreOfferings() {
  return (
    <section className="mx-auto w-full max-w-[1252px] py-20 sm:py-28">
      <div className="overflow-hidden rounded-[2rem] bg-[#380a5e] px-5 py-6 text-white shadow-2xl shadow-purple-950/20 sm:rounded-[2.5rem] sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            Built for global business
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Money infrastructure,
              <span className="block bg-gradient-to-r from-purple-200 via-fuchsia-300 to-purple-100 bg-clip-text text-transparent">
                without the friction.
              </span>
            </h2>
          </div>
          <p className="max-w-lg text-base leading-7 text-slate-300 lg:justify-self-end lg:text-lg">
            One connected platform to hold funds, move stablecoins, settle
            globally, and receive customer payments through a simple API.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
          <article className="group relative min-h-[390px] overflow-hidden rounded-[1.75rem] bg-stone-50 p-6 text-slate-950 sm:p-8 lg:col-span-7">
            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-start justify-between gap-6">
                <div>
                  Multi-currency
                  <h3 className="mt-3 text-3xl font-semibold tracking-tight">
                    Fiat Wallet
                  </h3>
                </div>
                <IconTile>
                  <WalletCards className="h-5 w-5" />
                </IconTile>
              </div>
              <p className="mt-4 max-w-md leading-7 text-slate-600">
                Collect, hold, and pay out in NGN and USD from one business
                wallet.
              </p>
              <div className="mt-8 flex gap-2">
                {walletCurrencies.map((currency) => (
                  <span
                    key={currency.code}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold"
                  >
                    <Image
                      src={currency.flag}
                      alt=""
                      width={20}
                      height={14}
                      className="h-3.5 w-5 rounded-sm object-cover"
                    />
                    {currency.code}
                  </span>
                ))}
              </div>
              <div className="mt-auto translate-y-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/5 motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out group-hover:translate-y-0">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.company}
                    className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-slate-100 px-2 py-3 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-purple-50 text-xs font-bold text-purple-700">
                        {transaction.company.charAt(0)}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">
                          {transaction.company}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                          <Image
                            src={transaction.flag}
                            alt=""
                            width={16}
                            height={11}
                            className="h-[11px] w-4 rounded-[2px] object-cover"
                          />
                          {transaction.currency} {transaction.state}
                        </p>
                      </div>
                    </div>
                    <p className="font-mono text-sm font-semibold tabular-nums">
                      {transaction.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-purple-200/60 blur-3xl"
              aria-hidden="true"
            />
          </article>

          <article className="group relative min-h-[390px] overflow-hidden rounded-[1.75rem] bg-purple-700 p-6 sm:p-8 lg:col-span-5">
            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-start justify-between gap-6">
                <div>
                  Always on
                  <h3 className="mt-3 text-3xl font-semibold tracking-tight">
                    Stablecoin Rails
                  </h3>
                </div>
                <IconTile inverse>
                  <Layers3 className="h-5 w-5" />
                </IconTile>
              </div>
              <p className="mt-4 max-w-sm leading-7 text-purple-100">
                Move between fiat and USDC with fast, transparent on-ramp and
                off-ramp settlement.
              </p>
              <div
                className="relative mt-auto flex items-center justify-center py-8"
                aria-hidden="true"
              >
                <span className="absolute h-52 w-52 rounded-full border border-white/10 motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-105" />
                <span className="absolute h-36 w-36 rounded-full border border-white/20" />
                <span className="grid h-20 w-20 place-items-center rounded-full bg-white shadow-2xl shadow-purple-950/30">
                  <Image
                    src="/image/flags/usdc.svg"
                    alt="USDC"
                    width={48}
                    height={48}
                    className="h-12 w-12"
                  />
                </span>
                <span className="absolute left-4 top-1/2 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-2 text-xs font-semibold text-purple-800 shadow-lg">
                  <Image
                    src="/image/flags/ng.svg"
                    alt=""
                    width={20}
                    height={14}
                    className="h-3.5 w-5 rounded-sm object-cover"
                  />
                  <Image
                    src="/image/flags/us.svg"
                    alt=""
                    width={20}
                    height={14}
                    className="h-3.5 w-5 rounded-sm object-cover"
                  />
                </span>
                <ArrowUpRight className="absolute right-5 top-1/3 h-5 w-5 text-purple-200" />
              </div>
            </div>
          </article>

          <article className="group relative min-h-[390px] overflow-hidden rounded-[1.75rem] bg-purple-500 p-6 sm:p-8 lg:col-span-5">
            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-start justify-between gap-6">
                <div>
                  100+ currencies
                  <h3 className="mt-3 text-3xl font-semibold tracking-tight">
                    Global Settlement
                  </h3>
                </div>
                <IconTile inverse>
                  <Globe2 className="h-5 w-5" />
                </IconTile>
              </div>
              <p className="mt-4 max-w-sm leading-7 text-purple-50">
                Settle local currencies into USD with faster delivery and
                competitive FX rates.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-y-2">
                {settlementCurrencies.map((currency) => (
                  <span
                    key={currency.code}
                    className="-mr-2 grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-purple-500 bg-white shadow-md sm:h-10 sm:w-10"
                  >
                    <Image
                      src={currency.flag}
                      alt={currency.code}
                      width={24}
                      height={17}
                      className="h-[17px] w-6 rounded-sm object-cover"
                    />
                  </span>
                ))}
                <span className="-mr-2 grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-purple-500 bg-white shadow-md sm:h-10 sm:w-10">
                  <Image
                    src="/image/flags/usdc.svg"
                    alt="USDC"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-purple-500 bg-purple-800 text-[10px] font-bold text-white shadow-md sm:h-10 sm:w-10">
                  +94
                </span>
                <span className="ml-4 text-xs font-semibold text-white/75">
                  Connected settlement rails
                </span>
              </div>
              <div className="mt-auto grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                    Speed
                  </p>
                  <p className="mt-2 font-mono text-3xl font-semibold tabular-nums">
                    T+0
                  </p>
                </div>
                <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                    Coverage
                  </p>
                  <p className="mt-2 font-mono text-3xl font-semibold tabular-nums">
                    100+
                  </p>
                </div>
              </div>
              <Radio
                className="absolute -bottom-8 -right-8 h-40 w-40 text-white/10 motion-safe:transition-transform motion-safe:duration-300 group-hover:-rotate-6"
                aria-hidden="true"
              />
            </div>
          </article>

          <article className="group relative min-h-[390px] overflow-hidden rounded-[1.75rem] bg-purple-950 p-6 ring-1 ring-inset ring-white/10 sm:p-8 lg:col-span-7">
            <div className="relative z-10 grid h-full gap-8 sm:grid-cols-[0.9fr_1.1fr] sm:items-center">
              <div>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    Developer ready
                    <h3 className="mt-3 text-3xl font-semibold tracking-tight">
                      API for Business
                    </h3>
                  </div>
                  <IconTile inverse>
                    <Code2 className="h-5 w-5" />
                  </IconTile>
                </div>
                <p className="mt-4 leading-7 text-slate-300">
                  Receive customer payments securely with real-time tracking and
                  clean reconciliation.
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-emerald-300">
                  <Check className="h-4 w-4" />
                  Built for quick integration
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-xs shadow-2xl shadow-black/20 motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out group-hover:-translate-y-1">
                <div className="mb-5 flex gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-purple-400" />
                  <span className="h-2 w-2 rounded-full bg-amber-300" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </div>
                <p>
                  <span className="text-purple-300">POST</span>{" "}
                  <span className="text-slate-300">/v1/payments</span>
                </p>
                <div className="mt-3 space-y-1 text-slate-400">
                  <p>{"{"}</p>
                  <p className="pl-4">
                    <span className="text-sky-300">amount</span>:{" "}
                    <span className="text-amber-200">250000</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-sky-300">currency</span>:{" "}
                    <span className="text-emerald-300">&quot;NGN&quot;</span>
                  </p>
                  <p>{"}"}</p>
                </div>
                <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  201 Payment created
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
