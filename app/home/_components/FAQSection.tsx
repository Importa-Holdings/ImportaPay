"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

const FAQSection = () => {
  const [openItem, setOpenItem] = useState<number | null>(0); // First item open by default

  const faqData = [
    {
      question: "Can I really pay a vendor abroad in naira?",
      answer:
        "Yes. You do not need a dollar account. Just initiate a cross-border transfer and we'll handle the conversion with the best FX rates.",
    },
    {
      question: "Do I get a bank account?",
      answer:
        "Yes! You get a dedicated bank account the moment you sign up. This allows you to receive payments from your customers and make international payments to your vendors directly using naira.",
    },
    {
      question: "Is Importapay secure?",
      answer:
        "Absolutely. We use bank-level security measures including 256-bit SSL encryption, two-factor authentication, and comply with all regulatory requirements. Your funds and data are completely secure with us.",
    },
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Answers To Questions You
            <br />
            Might Have
          </h2>
          <p className="text-lg text-gray-600">
            Find quick answers to common questions about our services and how we
            can help you.
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {item.question}
                </span>
                <div className="flex-shrink-0">
                  {openItem === index ? (
                    <Minus className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-600" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  openItem === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg text-gray-600 mb-6">Have more questions?</p>
          <a href="mailto:importapay@importa.biz">
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-purple-600 border-purple-200 hover:bg-purple-50 hover:border-purple-300 px-8 py-3 text-lg font-medium"
            >
              Contact support
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
