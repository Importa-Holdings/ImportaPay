'use client';

import Script from 'next/script';

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ImportaPay",
    url: "https://pay.importa.biz",
    logo: "https://pay.importa.biz/logo.png",
    description:
      "An AI-powered retail banking platform built for local collection and international settlement for African retailers.",
  };

  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
