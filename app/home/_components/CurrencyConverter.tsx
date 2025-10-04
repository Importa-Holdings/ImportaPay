import { useState, useEffect } from "react";
import { ArrowDownUp } from "lucide-react";

// Custom hook to fetch exchange rates
const useExchangeRates = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://importa-pay-payments.onrender.com/api/toronet/rate"
        );
        const data = await response.json();

        if (data.success) {
          setRates(data.response);
        } else {
          setError(data.message);
        }
      } catch (err: any) {
        setError(err.message);
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
  const [topAmount, setTopAmount] = useState("1500000");
  const [bottomAmount, setBottomAmount] = useState("975.41");
  const [topCurrency, setTopCurrency] = useState("NGN");
  const [bottomCurrency, setBottomCurrency] = useState("USD");

  const currencies = [
    { code: "NGN", name: "Nigerian Naira", flag: "🇳🇬", rateKey: "rate_naira" },
    { code: "USD", name: "US Dollar", flag: "🇺🇸", rateKey: "rate_dollar" },
    { code: "EUR", name: "Euro", flag: "🇪🇺", rateKey: "rate_euro" },
    { code: "GBP", name: "British Pound", flag: "🇬🇧", rateKey: "rate_pound" },
    { code: "EGP", name: "Egyptian Pound", flag: "🇪🇬", rateKey: "rate_egp" },
    { code: "KES", name: "Kenyan Shilling", flag: "🇰🇪", rateKey: "rate_ksh" },
    {
      code: "ZAR",
      name: "South African Rand",
      flag: "🇿🇦",
      rateKey: "rate_zar",
    },
    { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳", rateKey: "rate_rmb" },
    { code: "JPY", name: "Japanese Yen", flag: "🇯🇵", rateKey: "rate_jpy" },
    { code: "AED", name: "UAE Dirham", flag: "🇦🇪", rateKey: "rate_aed" },
  ];

  const convertCurrency = (
    amount: string,
    fromCurrency: string,
    toCurrency: string
  ): string => {
    if (!rates || !amount) return "0";

    const fromRate = parseFloat(
      rates[
        currencies.find((c) => c.code === fromCurrency)?.rateKey as string
      ] || 1
    );
    const toRate = parseFloat(
      rates[currencies.find((c) => c.code === toCurrency)?.rateKey as string] ||
        1
    );

    const usdAmount = parseFloat(amount) * fromRate;
    const result = usdAmount / toRate;

    return result.toFixed(2);
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
    setTopCurrency(bottomCurrency);
    setBottomCurrency(topCurrency);
    setTopAmount(bottomAmount);
    setBottomAmount(topAmount);
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
