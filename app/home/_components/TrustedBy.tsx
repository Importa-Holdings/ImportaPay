import Image from "next/image";

const partners = [
  { name: "Flexbudge", src: "/image/partners/flexbudge.png", width: 776, height: 194, className: "w-[150px] md:w-[191px]" },
  { name: "Monirates", src: "/image/partners/monirates.png", width: 748, height: 212, className: "w-[140px] md:w-[180px]" },
  { name: "Aella", src: "/image/partners/aella.png", width: 496, height: 184, className: "w-[92px] md:w-[117px]" },
  { name: "Blockradar", src: "/image/partners/blockradar.png", width: 828, height: 184, className: "w-[160px] md:w-[207px]" },
];

const TrustedBy = () => (
  <section className="bg-[#F9F9F9] px-4 py-10 font-satoshi sm:px-6 md:py-[30px]">
    <div className="mx-auto flex max-w-[1160px] flex-col items-center">
      <div className="flex items-center gap-3 md:gap-4">
        <span className="h-px w-8 bg-[#D0C4F0] md:w-[64px]" />
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.14em] text-[#6A0DAD] md:text-[12px]">
          Trusted by businesses that operate globally
        </p>
        <span className="h-px w-8 bg-[#D0C4F0] md:w-[64px]" />
      </div>

      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:mt-[30px] md:gap-x-[43px]">
        {partners.map((partner) => (
          <li key={partner.name}>
            <Image
              src={partner.src}
              alt={partner.name}
              width={partner.width}
              height={partner.height}
              className={`h-auto grayscale contrast-125 transition duration-300 hover:grayscale-0 hover:contrast-100 ${partner.className}`}
            />
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default TrustedBy;
