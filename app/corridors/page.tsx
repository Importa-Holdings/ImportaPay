import type { Metadata } from "next";
import { Navbar } from "@/components/navbar/Navbar";
import Footer from "../home/_components/Footer";
import CorridorsHero from "./_components/CorridorsHero";
import CorridorsTable from "./_components/CorridorsTable";
import CrossBoder from "../home/_components/crossBoder";

export const metadata: Metadata = {
  title: "Corridors | ImportaPay",
  description:
    "See every country and payment rail ImportaPay supports, along with payout currencies, cut-off times and settlement speed.",
};

export default function CorridorsPage() {
  return (
    <div>
      <Navbar />
      <CorridorsHero />
      <CrossBoder />
      <CorridorsTable />
      <Footer />
    </div>
  );
}
