import Image from "next/image";

const audiences = [
  {
    title: "Importers & Distributors",
    description:
      "Pay overseas suppliers, manufacturers, and logistics partners across multiple global corridors.",
    image: "/image/business/importers.webp",
    alt: "Cargo ship and crane loading containers",
  },
  {
    title: "Procurement Teams",
    description:
      "Manage recurring supplier payments with clearer rates, transaction tracking, and centralised visibility.",
    image: "/image/business/procurement.webp",
    alt: "Purchase order with approved supplier, scheduled payment and delivery status",
  },
  {
    title: "Fintech Businesses",
    description:
      "Extend your payment capabilities across multiple corridors and markets through Importapay’s APIs and infrastructure.",
    image: "/image/business/fintech.webp",
    alt: "Payment API connecting banks, cards and wallets around the globe",
  },
  {
    title: "Agencies",
    description:
      "Pay contractors, vendors, and business partners across different countries and corridors.",
    image: "/image/business/agencies.webp",
    alt: "Signed contract linked to active design, marketing and development partners",
  },
];

const BuiltForBusinesses = () => (
  <section className="bg-white px-4 py-16 font-satoshi sm:px-6 md:pt-[76px] md:pb-[80px]">
    <div className="mx-auto max-w-[1160px]">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-[32px] font-black leading-[1.2] tracking-[-1.2px] text-[#17131A] md:text-[48px] md:leading-[54px] md:tracking-[-1.9px]">
          Built for businesses that
          <br />
          <span className="text-[#6A0DAD]">operate across borders</span>
        </h2>
        <p className="mt-4 max-w-[540px] text-[16px] leading-[26px] text-[#524E56] md:text-[17px] md:leading-[28px]">
          From sourcing inventory to paying global partners, Importapay helps
          teams manage cross-border payments with more visibility and control.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-[64px] lg:grid-cols-4">
        {audiences.map((audience) => (
          <article
            key={audience.title}
            className="overflow-hidden rounded-[20px] border border-[#EDE8F8] bg-white shadow-[0_8px_30px_rgba(106,13,173,0.05)]"
          >
            <div className="bg-gradient-to-b from-[#F0EBFE] to-[#E9E0FE]">
              <Image
                src={audience.image}
                alt={audience.alt}
                width={553}
                height={420}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 276px"
                className="h-auto w-full"
              />
            </div>
            <div className="px-5 pt-6 pb-6">
              <h3 className="text-[18px] font-black leading-[26px] tracking-[-0.3px] text-[#17131A]">
                {audience.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[21.6px] text-[#524E56]">
                {audience.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default BuiltForBusinesses;
