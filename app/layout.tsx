import type { Metadata } from "next";
import { Geist, Geist_Mono, Shadows_Into_Light_Two } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi-local",
  display: "swap",
});

const handwriting = Shadows_Into_Light_Two({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hand-local",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ImportaPay",
  description: "Pay Your Vendors Abroad Using Only Naira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${satoshi.variable} ${handwriting.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
