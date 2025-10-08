import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const ContentSection = () => {
  return (
    <section
      className="
        rounded-3xl
        mx-3 sm:mx-20 md:mx-20
        px-4 sm:px-4 md:px-0
        h-auto md:h-[500px]
        bg-gradient-to-br from-purple-600 via-purple-700 to-[#BA90D9]
        relative overflow-hidden
      "
    >
      <div
        className="
          flex flex-col md:flex-row
          items-start md:items-center
          h-full
        "
      >
        {/* Left side - Content */}
        <div
          className="
            flex-1
            ml-4 sm:ml-30 md:ml-30
            mr-4 sm:mr-10 md:mr-10
            space-y-5
            mt-6
            text-center md:text-left
          "
        >
          <h2 className="text-2xl lg:text-4xl font-bold text-white">
            Make Your First 5 <br /> Transactions For Free
          </h2>
          <p className="md:text-xl text-sm text-white/80 leading-relaxed max-w-lg mx-auto md:mx-0">
            Join thousands of businesses who trust us to handle their
            international payments seamlessly and securely.
          </p>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center md:justify-start">
            <Link href="https://apps.apple.com/app/id6752268757">
              <Button
                size="lg"
                className="
                bg-white text-black border-white/30 hover:bg-white/30 backdrop-blur-sm
                transition-all duration-300 hover:scale-105
                flex items-center gap-3 px-6 py-4 text-lg
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
            </Link>
            <Link href="https://play.google.com/store/apps/details?id=com.importapay">
              <Button
                size="lg"
                variant="outline"
                className="
                bg-white text-black border-white/30 hover:bg-white/20 backdrop-blur-sm
                transition-all duration-300 hover:scale-105
                flex items-center gap-3 px-6 py-4 text-lg
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
            </Link>
          </div>
        </div>

        {/* Right side - Enlarged Phone Image */}
        <div
          className="
            flex-1
            mt-8 md:mt-[200px]
            flex justify-center
          "
        >
          <Image
            src="/image/iPhone16.png"
            alt="Phone mockup"
            width={600}
            height={1200}
            className="
              object-contain
              w-full max-w-[300px] sm:max-w-[600px]
              h-auto sm:h-[1200px]
            "
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
