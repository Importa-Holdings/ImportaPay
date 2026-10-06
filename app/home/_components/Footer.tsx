import Image from "next/image";

const socials = [
  {
    label: "WhatsApp",
    href: "https://chat.whatsapp.com/CSO9cnQqbCU5wuED9a2iU1?mode=r_t",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.567-.01-.197 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.51 3.488" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/importapay_ng?s=21&t=v9j8Pe2NAq4Us2JVlOBNsw",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/showcase/champbank/",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
      </svg>
    ),
  },
];

const legalLinks = [
  {
    label: "AML policy",
    href: "https://importapay.gitbook.io/importapay-t-and-c/global-aml-policy",
  },
  {
    label: "Privacy policy",
    href: "https://importapay.gitbook.io/importapay-t-and-c/privacy-policy",
  },
  {
    label: "Terms of use",
    href: "https://importapay.gitbook.io/importapay-t-and-c/",
  },
];

const columns = [
  {
    title: "Contact number",
    lines: ["+2347087780540", "+447446125288"],
    gap: true,
  },
  { title: "Email", lines: ["Hello@importa.biz"] },
  {
    title: "Nigeria",
    lines: [
      "Shop B88C Up, Alaba",
      "International Market",
      "Ojo LGA, Lagos",
      "Nigeria",
    ],
  },
  {
    title: "United Kingdom",
    lines: ["82A James Carter Road", "Mildenhall", "United Kingdom IP28 7DE"],
  },
];

const Footer = () => (
  <footer className="bg-[#321844] px-4 pt-16 pb-10 font-satoshi text-white sm:px-6 md:pt-[100px]">
    <div className="mx-auto max-w-[1200px]">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[250px_repeat(4,203px)_1fr] lg:gap-0">
        <div className="sm:col-span-2 lg:col-span-1">
          <Image
            src="/image/logo.png"
            alt="Importapay"
            width={631}
            height={128}
            className="h-auto w-[162px]"
          />
          <div className="mt-6 flex gap-[10px] md:mt-[24px]">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6A0DAD] text-white transition-colors hover:bg-[#7A2EF6]"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title} className="lg:pr-6">
            <h3 className="text-[13.5px] font-bold leading-[20px]">
              {column.title}
            </h3>
            <div
              className={`mt-[22px] text-[13px] leading-[23.4px] text-[#F0EDF2] ${
                column.gap ? "space-y-[4.7px]" : ""
              }`}
            >
              {column.lines.map((line) =>
                line.includes("@") ? (
                  <a
                    key={line}
                    href={`mailto:${line}`}
                    className="block hover:text-white"
                  >
                    {line}
                  </a>
                ) : line.startsWith("+") ? (
                  <a
                    key={line}
                    href={`tel:${line}`}
                    className="block hover:text-white"
                  >
                    {line}
                  </a>
                ) : (
                  <p key={line}>{line}</p>
                ),
              )}
            </div>
          </div>
        ))}

        <ul className="flex flex-col gap-[8px] text-[13.5px] leading-[20px] sm:col-span-2 lg:col-span-1 lg:items-end">
          {legalLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#D9C2F5]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 border-t border-white md:mx-[45px] md:mt-[63px]">
        <div className="space-y-5 py-8 text-center text-[11px] leading-[17px] text-white/90 md:space-y-[20px] md:pt-[38px] md:pb-[42px] md:text-[10px] md:leading-[14px]">
          <p>
            ImportaPay is a product of Importa Holdings Company LTD, and Importa
            General Merchant Limited, collectively referred to as
            &quot;Importa&quot;. ImportaPay is not a bank, but a financial
            technology platform.
          </p>
          <p>
            Banking and financial services offered on ImportaPay are provided by
            one or more financial and banking partners across every jurisdiction
            where we provide our services.
          </p>
        </div>
      </div>

      <div className="border-t border-white pt-6 md:mx-[45px] md:pt-[30px]">
        <div className="flex flex-col items-center gap-3 text-center text-[12px] leading-[18px] md:flex-row md:flex-wrap md:justify-center md:gap-x-[52px]">
          <p>
            © {new Date().getFullYear()} Importa Holdings Company LTD ( Company
            Number 16317892 ). All rights reserved.
          </p>
          <p>Backed by Olorire VC</p>
          <p>
            Canada MSB registration number{" "}
            <span className="font-bold">N300001311</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
