import { Globe2, Coins, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stats = [
  { icon: Globe2, label: "Live corridors", value: "14" },
  { icon: Coins, label: "Payout currencies", value: "15+" },
  { icon: Zap, label: "Fastest settlement", value: "Real-time" },
  { icon: ShieldCheck, label: "Coverage status", value: "All Live" },
];

const CorridorsHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-400 via-purple-800 to-[#2A0A47]">
      {/* Decorative glow orbs */}
      <div className="pointer-events-none absolute top-1/4 -left-24 h-96 w-96 rounded-full bg-purple-500/30 blur-[100px]" />
      <div className="pointer-events-none absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-fuchsia-400/20 blur-[110px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-40 pb-20 sm:pb-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-[#6A0DAD] shadow-lg shadow-purple-950/30">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            14 corridors &middot; All Live
          </span>

          <h1 className="font-sans text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight">
            Send &amp; receive payments
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-purple-200 to-fuchsia-200 bg-clip-text text-transparent">
              across our live corridors
            </span>
          </h1>

          <p className="text-base sm:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
            ImportaPay connects you to bank transfers, real-time rails and wire
            networks in Africa, the Americas, Asia, Europe and the Middle East
            &mdash; all through our licensed partners.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link href="https://merchant.importa.biz">
              <Button
                size="lg"
                className="bg-white text-[#2A0A47] hover:bg-white/90 transition-all duration-300 hover:scale-105 px-6 py-4 text-base font-semibold w-full sm:w-auto"
              >
                Get started
              </Button>
            </Link>
            <a href="#coverage">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/5 text-white border-white/30 hover:bg-white/15 backdrop-blur-sm transition-all duration-300 px-6 py-4 text-base font-semibold w-full sm:w-auto"
              >
                View coverage table
              </Button>
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-sm px-5 py-6 text-center transition-all duration-300 hover:bg-white/[0.12] hover:border-white/20 hover:-translate-y-1"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/10 mb-3 group-hover:bg-white/20 transition-colors">
                  <Icon className="h-5 w-5 text-purple-200" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs sm:text-sm text-white/60">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CorridorsHero;
