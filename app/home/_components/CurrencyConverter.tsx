import { useState, useEffect } from "react";
import { ArrowDownUp } from "lucide-react";

// Custom hook to fetch exchange rates
interface ExchangeRates {
  rate_dollar?: string;
  amount_in_naira?: string;
  markedup_amount_in_naira?: string;
  usdc_buy_rate?: string; // ← NEW: USDC to NGN rate
  message?: string;
  [key: string]: string | undefined;
}

const useExchangeRates = () => {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        // Existing USD → NGN rate
        const usdResponse = await fetch(
          "https://importa-pay-payments-x72y4.ondigitalocean.app/api/toronet/rate",
        );
        const usdData = await usdResponse.json();

        // New USDC → NGN rate
        const usdcResponse = await fetch(
          "https://importa-pay-payments-x72y4.ondigitalocean.app/api/usdc/get-exchangerate/USDC?chain=ARBITRUM&tokenAmount=5",
        );
        const usdcData = await usdcResponse.json();

        console.log("USD data:", usdData);
        console.log("USDC data:", usdcData);

        const combinedRates: ExchangeRates = {};

        if (usdData.success) {
          combinedRates.rate_dollar = usdData.response.rate_dollar;
          combinedRates.amount_in_naira = usdData.response.amount_in_naira;
          combinedRates.markedup_amount_in_naira =
            usdData.response.markedup_amount_in_naira;
        } else {
          setError(usdData.message || "Failed to fetch USD rate");
          return;
        }

        if (usdcData.message === "successfully fetched rate") {
          combinedRates.usdc_buy_rate = usdcData.response.buy.toString();
        } else {
          setError("Failed to fetch USDC rate");
          return;
        }

        setRates(combinedRates);
      } catch (err: unknown) {
        let errorMessage = "Failed to fetch exchange rates";

        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === "string") {
          errorMessage = err;
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  return { rates, loading, error };
};

const CurrencyConverter = () => {
  const { rates, loading, error } = useExchangeRates();
  const [topAmount, setTopAmount] = useState("0");
  const [bottomAmount, setBottomAmount] = useState("0");
  const [topCurrency, setTopCurrency] = useState("NGN");
  const [bottomCurrency, setBottomCurrency] = useState("USD");

  const currencies = [
    { code: "NGN", name: "Nigerian Naira", flag: "🇳🇬" },
    { code: "USD", name: "US Dollar", flag: "🇺🇸" },
    { code: "USDC", name: "USD Coin", flag: "usdc" }, // ← NEW: USDC added
  ];

  const convertCurrency = (
    amount: string,
    fromCurrency: string,
    toCurrency: string,
  ): string => {
    if (!rates || !amount || parseFloat(amount) === 0) return "0";

    const amountValue = parseFloat(amount);

    // USD to NGN
    if (fromCurrency === "USD" && toCurrency === "NGN") {
      const usdToNgnRate = parseFloat(
        rates.markedup_amount_in_naira || rates.amount_in_naira || "0",
      );
      const result = amountValue * usdToNgnRate;
      return result.toFixed(2);
    }

    // NGN to USD
    if (fromCurrency === "NGN" && toCurrency === "USD") {
      const ngnToUsdRate = parseFloat(
        rates.markedup_amount_in_naira || rates.amount_in_naira || "0",
      );
      if (ngnToUsdRate === 0) return "0";
      const result = amountValue / ngnToUsdRate;
      return result.toFixed(2);
    }

    // USDC to NGN
    if (fromCurrency === "USDC" && toCurrency === "NGN") {
      const usdcToNgnRate = parseFloat(rates.usdc_buy_rate || "0");
      const result = amountValue * usdcToNgnRate;
      return result.toFixed(2);
    }

    // NGN to USDC
    if (fromCurrency === "NGN" && toCurrency === "USDC") {
      const ngnToUsdcRate = parseFloat(rates.usdc_buy_rate || "0");
      if (ngnToUsdcRate === 0) return "0";
      const result = amountValue / ngnToUsdcRate;
      return result.toFixed(2);
    }

    // USD ↔ USDC (assume 1:1 since both are USD-pegged)
    if (
      (fromCurrency === "USD" && toCurrency === "USDC") ||
      (fromCurrency === "USDC" && toCurrency === "USD")
    ) {
      return amountValue.toFixed(2);
    }

    // Same currency
    return amount;
  };

  const handleTopAmountChange = (value: string) => {
    setTopAmount(value);
    if (rates) {
      const converted = convertCurrency(value, topCurrency, bottomCurrency);
      setBottomAmount(converted);
    }
  };

  const handleBottomAmountChange = (value: string) => {
    setBottomAmount(value);
    if (rates) {
      const converted = convertCurrency(value, bottomCurrency, topCurrency);
      setTopAmount(converted);
    }
  };

  const handleSwapCurrencies = () => {
    const currentTopCurrency = bottomCurrency;
    const currentBottomCurrency = topCurrency;
    const currentTopAmount = bottomAmount;
    const currentBottomAmount = topAmount;

    setTopCurrency(currentTopCurrency);
    setBottomCurrency(currentBottomCurrency);
    setTopAmount(currentTopAmount);
    setBottomAmount(currentBottomAmount);
  };

  const getFlag = (code: string) => {
    return currencies.find((c) => c.code === code)?.flag || "🏳️";
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-8">
        <div className="text-lg text-white/80">Loading rates...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center py-8">
        <div className="text-lg text-red-300">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Top Currency */}
      <div className="mb-3">
        <div className="flex items-center justify-between bg-white backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/20">
          <div className="flex-1 min-w-0 pr-3">
            <input
              type="text"
              value={topAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              onChange={(e) =>
                handleTopAmountChange(e.target.value.replace(/[^0-9.]/g, ""))
              }
              className="w-full text-2xl sm:text-3xl md:text-4xl font-bold bg-transparent outline-none text-black placeholder-white/40 truncate"
              placeholder="0"
            />
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl sm:text-3xl">{getFlag(topCurrency)}</span>
            <select
              value={topCurrency}
              onChange={(e) => {
                setTopCurrency(e.target.value);
                handleTopAmountChange(topAmount);
              }}
              className="text-base sm:text-lg font-semibold bg-white rounded-lg px-2 py-1 outline-none cursor-pointer text-black border border-white/20"
            >
              {currencies.map((curr) => (
                <option
                  key={curr.code}
                  value={curr.code}
                  className="bg-white text-black"
                >
                  {curr.code}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center my-3">
        <button
          onClick={handleSwapCurrencies}
          className="bg-white backdrop-blur-sm border-2 border-white/30 rounded-full p-3 hover:bg-white/30 transition-all shadow-lg hover:shadow-xl active:scale-95"
        >
          <ArrowDownUp className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Bottom Currency */}
      <div className="mb-4">
        <div className="flex items-center justify-between bg-white backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/20">
          <div className="flex-1 min-w-0 pr-3">
            <input
              type="text"
              value={bottomAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              onChange={(e) =>
                handleBottomAmountChange(e.target.value.replace(/[^0-9.]/g, ""))
              }
              className="w-full text-2xl sm:text-3xl md:text-4xl font-bold bg-transparent outline-none text-black placeholder-white/40 truncate"
              placeholder="0"
            />
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl sm:text-3xl">
              {getFlag(bottomCurrency)}
            </span>
            <select
              value={bottomCurrency}
              onChange={(e) => {
                setBottomCurrency(e.target.value);
                handleTopAmountChange(topAmount);
              }}
              className="text-base sm:text-lg font-semibold bg-white rounded-lg px-2 py-1 outline-none cursor-pointer text-black border border-white/20"
            >
              {currencies.map((curr) => (
                <option
                  key={curr.code}
                  value={curr.code}
                  className="bg-white text-black"
                >
                  {curr.code}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Exchange Rate Info */}
      {/* <div className="text-center text-white/70 text-xs sm:text-sm">
        <p>
          1 {topCurrency} = {convertCurrency("1", topCurrency, bottomCurrency)}{" "}
          {bottomCurrency}
        </p>
      </div> */}
    </div>
  );
};

export default CurrencyConverter;
