import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
const Join = () => {
  return (
    <section
      className="
        rounded-3xl
        mx-3 sm:mx-20 md:mx-20
        px-4 sm:px-4 md:px-0
        h-auto min-h-[500px]
        bg-gradient-to-br from-purple-600 via-purple-700 to-[#BA90D9]
        relative overflow-hidden
        flex items-center justify-center
      "
    >
      <div
        className="
          flex flex-col
          items-center
          justify-center
          w-full max-w-4xl
          px-4 py-12 sm:px-6 lg:px-8
          text-center
        "
      >
        <div className="space-y-6 w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Join Importapay Today!
          </h2>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
            Join Importapay today and see how simple international payments can
            be.
          </p>

          {/* Download Buttons */}
          <div className="flex flex-col items-center sm:flex-row justify-center gap-4 md:pt-6 pt-35">
            <Link href="https://merchant.importa.biz">
              <Button
                size="lg"
                className="bg-white text-black border-white/30 hover:bg-white/30 backdrop-blur-sm
                           transition-all duration-300 hover:scale-105
                           flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg"
              >
                Get started
              </Button>
            </Link>
            <Link href="https://calendly.com/dgsoetan/30min">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-black border-white/30 hover:bg-white/20 backdrop-blur-sm
                           transition-all duration-300 hover:scale-105
                           flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg"
              >
                Speak to Sales
                <ArrowRight size={20} className="text-black" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;
