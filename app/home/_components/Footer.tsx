import { Linkedin, X } from "lucide-react";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="gap-8 mb-12">
          {/* Logo and Brand */}
          <div className="flex md:justify-start">
            <div className="flex-shrink-0">
              <Image
                src="/image/logo2.png"
                alt="logo"
                height="50"
                width="140"
                className="w-[140px] h-[30px]"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-left md:text-left mt-10">
            <div className="space-y-4 flex-row md:flex  gap-10">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Contact number
                </h3>
                <div className="space-y-1 flex-row md:flex gap-1 md:gap-7">
                  <p className="text-gray-600">+2347087780540</p>
                  <p className="text-gray-600">+447446125288</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Email
                </h3>
                <p className="text-gray-600">Hello@importa.biz</p>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex md:justify-end mt-5">
            <div className="flex space-x-4">
              <a
                href="https://chat.whatsapp.com/CSO9cnQqbCU5wuED9a2iU1?mode=r_t"
                className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.567-.01-.197 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.51 3.488" />
                </svg>
              </a>
              <a
                href="https://x.com/importapay_ng?s=21&t=v9j8Pe2NAq4Us2JVlOBNsw"
                className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors duration-200"
                aria-label="X (Twitter)"
              >
                <X size={20} />
              </a>
              <a
                href="https://www.linkedin.com/showcase/champbank/"
                className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-600 text-sm">
                (c) {new Date().getFullYear()} Importa Holdings Company LTD (
                Company Number 16317892 ). All right reserved.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6">
              <a
                href="https://importapay.gitbook.io/importapay-t-and-c/global-aml-policy"
                className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
              >
                AML policy
              </a>
              <a
                href="https://importapay.gitbook.io/importapay-t-and-c/privacy-policy"
                className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
              >
                Privacy policy
              </a>
              <a
                href="https://importapay.gitbook.io/importapay-t-and-c/"
                className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
              >
                Terms of use
              </a>
            </div>
          </div>

          {/* Banking Information */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm max-w-4xl mx-auto leading-relaxed">
              Importapay® is not a bank. Our banking services is provided by{" "}
              <span className="font-semibold">9 payment service Bank</span>,
              licensed by the Central Bank of Nigeria. All deposits are insured
              by the Nigerian Deposit Insurance Corporation ( NDIC ).
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
