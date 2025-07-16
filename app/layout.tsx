
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ImportaPay – AI-Powered Retail Banking",
  description:
    "An AI-powered retail banking platform built for local collection and international settlement for African retailers.",
  keywords: ["retail banking", "AI banking", "African retailers", "ImportaPay"],
  openGraph: {
    title: "ImportaPay – AI-Powered Retail Banking",
    description:
      "An AI-powered retail banking platform built for local collection and international settlement for African retailers.",
    url: "https://pay.importa.biz",
    siteName: "ImportaPay",
    images: [
      {
        url: "https://pay.importa.biz/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ImportaPay Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ImportaPay – AI-Powered Retail Banking",
    description:
      "An AI-powered retail banking platform built for local collection and international settlement for African retailers.",
    images: ["https://pay.importa.biz/og-image.jpg"],
  },
  metadataBase: new URL("https://pay.importa.biz"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
