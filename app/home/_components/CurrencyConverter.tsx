import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Calculator, ChevronDown } from "lucide-react";

const API_BASE_URL = "https://importa-pay-payments-x72y4.ondigitalocean.app";
const CORRIDORS_URL = `${API_BASE_URL}/api/public/quote/corridors`;
const QUOTE_URL = `${API_BASE_URL}/api/public/quote/preview`;

type CurrencyOption = {
  code: string;
  name: string;
  countryCode: string;
  countryName: string;
  symbol?: string;
  minAmount?: number;
  maxAmount?: number;
};

type QuoteResult = {
  totalAmountToPay: string;
  fee: string;
  rate: string;
};

type CorridorCurrency = {
  currencyCode: string;
  currencySymbol?: string;
  destinationAmount?: {
    min?: number;
    max?: number;
  };
};

type CorridorCountry = {
  countryCode: string;
  countryName: string;
  currencies?: CorridorCurrency[];
};

const fallbackReceiverCurrencies: CurrencyOption[] = [
  {
    code: "USD",
    name: "US Dollar",
    countryCode: "US",
    countryName: "United States",
    symbol: "$",
    minAmount: 5000,
  },
];

const sendingCurrencies = [
  { code: "NGN", name: "Nigerian Naira", flag: "/image/flags/ng.svg" },
  { code: "USDC", name: "USD Coin", flag: "/image/flags/usdc.svg" },
];

const receiverFlags: Record<string, string> = {
  USD: "/image/flags/us.svg",
};

const getSendingFlag = (code: string) =>
  sendingCurrencies.find((currency) => currency.code === code)?.flag ??
  "/image/flags/ng.svg";

const formatNgn = (amount?: number) => {
  if (typeof amount !== "number") return "-";

  return `NGN ${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatRate = (rate?: number, destinationCurrency = "USD") => {
  if (typeof rate !== "number") return "-";

  return `1 ${destinationCurrency} = NGN ${rate.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState("NGN");
  const [receiverCurrency, setReceiverCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [receiverCurrencies, setReceiverCurrencies] = useState<CurrencyOption[]>(
    fallbackReceiverCurrencies,
  );
  const [loadingCorridors, setLoadingCorridors] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<QuoteResult | null>(null);

  const selectedReceiverCurrency = useMemo(
    () =>
      receiverCurrencies.find((currency) => currency.code === receiverCurrency) ??
      receiverCurrencies[0],
    [receiverCurrencies, receiverCurrency],
  );

  const loadCorridors = useCallback(async () => {
    setLoadingCorridors(true);

    try {
      const response = await fetch(CORRIDORS_URL);
      const data = await response.json();
      const countries = data?.response?.countries;

      if (!Array.isArray(countries)) return;

      const currencies = countries.flatMap((country: CorridorCountry) =>
        (country.currencies ?? []).map((currency) => ({
          code: currency.currencyCode,
          name: currency.currencyCode,
          countryCode: country.countryCode,
          countryName: country.countryName,
          symbol: currency.currencySymbol,
          minAmount: currency.destinationAmount?.min,
          maxAmount: currency.destinationAmount?.max,
        })),
      );

      if (currencies.length > 0) {
        setReceiverCurrencies(currencies);
        setReceiverCurrency(currencies[0].code);
      }
    } catch {
      setReceiverCurrencies(fallbackReceiverCurrencies);
    } finally {
      setLoadingCorridors(false);
    }
  }, []);

  useEffect(() => {
    void loadCorridors();
  }, [loadCorridors]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setResult(null);

    const destinationAmount = Number(amount);
    const minimumAmount = selectedReceiverCurrency?.minAmount ?? 5000;

    if (!destinationAmount || destinationAmount <= 0) {
      setError("Enter the amount the receiver should get.");
      return;
    }

    if (destinationAmount < minimumAmount) {
      setError(
        `Minimum amount is ${minimumAmount.toLocaleString()} ${receiverCurrency}.`,
      );
      return;
    }

    if (fromCurrency !== "NGN") {
      setError("Quote preview is currently available for NGN-funded payments.");
      return;
    }

    setSubmitting(true);

    try {
      const searchParams = new URLSearchParams({
        destinationCountry: selectedReceiverCurrency.countryCode,
        destinationCurrency: selectedReceiverCurrency.code,
        destinationAmount: String(destinationAmount),
      });
      const response = await fetch(`${QUOTE_URL}?${searchParams.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || data?.message || "Quote unavailable");
      }

      const quote = data?.response;
      setResult({
        totalAmountToPay: formatNgn(quote?.totalAmountToPay?.amountNgn),
        fee: formatNgn(quote?.fee?.amountNgn),
        rate: formatRate(
          quote?.rate?.ngnPerDestinationUnit,
          quote?.destinationCurrency,
        ),
      });
    } catch (quoteError) {
      setError(
        quoteError instanceof Error
          ? quoteError.message
          : "Unable to calculate this quote. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const getReceiverFlag = (code: string) => receiverFlags[code] || "/image/flags/usdc.svg";

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] bg-white/10 border border-white/15 backdrop-blur-sm p-4 sm:p-5 shadow-xl shadow-purple-950/20"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="from-currency"
              className="px-1 text-xs font-semibold uppercase tracking-wide text-white/70"
            >
              Currency you are sending from
            </label>
            <div className="relative flex min-h-14 items-center gap-3 rounded-2xl bg-white px-4 text-black">
              <Image src={getSendingFlag(fromCurrency)} alt="" width={24} height={18} className="h-[18px] w-6 rounded-sm object-cover" />
              <select
                id="from-currency"
                value={fromCurrency}
                onChange={(event) => setFromCurrency(event.target.value)}
                className="min-h-11 flex-1 appearance-none bg-transparent text-base font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#6A0DAD]"
              >
                {sendingCurrencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="receiver-currency"
              className="px-1 text-xs font-semibold uppercase tracking-wide text-white/70"
            >
              Receiver currency
            </label>
            <div className="relative flex min-h-14 items-center gap-3 rounded-2xl bg-white px-4 text-black">
              <Image src={getReceiverFlag(receiverCurrency)} alt="" width={24} height={18} className="h-[18px] w-6 rounded-sm object-cover" />
              <select
                id="receiver-currency"
                value={receiverCurrency}
                onChange={(event) => {
                  setReceiverCurrency(event.target.value);
                  setResult(null);
                  setError(null);
                }}
                disabled={loadingCorridors}
                className="min-h-11 flex-1 appearance-none bg-transparent text-base font-semibold outline-none disabled:cursor-not-allowed disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-[#6A0DAD]"
              >
                {receiverCurrencies.map((currency) => (
                  <option key={`${currency.countryCode}-${currency.code}`} value={currency.code}>
                    {currency.code}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="receiver-amount"
              className="px-1 text-xs font-semibold uppercase tracking-wide text-white/70"
            >
              Amount
            </label>
            <div className="rounded-2xl bg-white p-4 sm:p-5">
              <input
                id="receiver-amount"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                onChange={(event) => {
                  setAmount(event.target.value.replace(/[^0-9.]/g, ""));
                  setResult(null);
                  setError(null);
                }}
                aria-invalid={error ? "true" : undefined}
                aria-describedby={error ? "quote-error" : undefined}
                className="w-full bg-transparent text-3xl font-bold text-black placeholder:text-black/30 outline-none focus-visible:ring-2 focus-visible:ring-[#6A0DAD] sm:text-4xl"
                placeholder="0"
              />
            </div>
          </div>

          {error ? (
            <p id="quote-error" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting || loadingCorridors}
            aria-busy={submitting}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#380a5e] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#6A0DAD]"
          >
            <Calculator className="h-4 w-4" aria-hidden="true" />
            {submitting ? "Calculating..." : "Calculate"}
          </button>
        </div>
      </form>

      <div className="mt-4 rounded-[1.5rem] border border-white/15 bg-white/10 p-4 text-sm text-white/85">
        {result ? (
          <dl className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-white/60">Total amount to pay</dt>
              <dd className="font-semibold text-white">{result.totalAmountToPay}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-white/60">Fee</dt>
              <dd className="font-semibold text-white">{result.fee}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-white/60">Rate</dt>
              <dd className="font-semibold text-white">{result.rate}</dd>
            </div>
          </dl>
        ) : (
          <p className="text-center text-white/65">Enter an amount and calculate to preview the quote.</p>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;





