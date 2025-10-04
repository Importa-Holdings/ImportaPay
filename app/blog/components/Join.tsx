import { Button } from "@/components/ui/button";
import Image from "next/image";

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
          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
            <Button
              size="lg"
              className="
                bg-white text-black border-white/30 hover:bg-white/30 backdrop-blur-sm
                transition-all duration-300 hover:scale-105
                flex items-center gap-3 p-6 text-lg w-full sm:w-auto justify-center
              "
            >
              <Image
                src="/image/Apple.png"
                alt="Apple"
                width={25}
                height={25}
              />
              Download for iOS
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="
                bg-white text-black border-white/30 hover:bg-white/30 backdrop-blur-sm
                transition-all duration-300 hover:scale-105
                flex items-center gap-3 p-6 text-lg w-full sm:w-auto justify-center
              "
            >
              <Image
                src="/image/PlayStore.png"
                alt="Playstore"
                width={25}
                height={25}
              />
              Download for Android
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;
