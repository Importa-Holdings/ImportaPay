import type { Metadata } from "next";
import HeroNavbar from "../home/_components/HeroNavbar";
import Footer from "../home/_components/Footer";
import ReadyToMove from "../home/_components/ReadyToMove";
import CorridorsHero from "./_components/CorridorsHero";
import CheckCorridor from "./_components/CheckCorridor";
import CorridorsTable from "./_components/CorridorsTable";

export const metadata: Metadata = {
  title: "Corridors | ImportaPay",
  description:
    "See every country and payment rail ImportaPay supports, along with payout currencies, cut-off times and settlement speed.",
};

export default function CorridorsPage() {
  return (
    <div>
      <HeroNavbar />
      <CorridorsHero />
      <CheckCorridor />
      <CorridorsTable />
      <ReadyToMove
        title="Start sending across live global corridors"
        description="Manage cross-border payments with clearer rates, reliable settlement, and access to live corridors from one platform."
      />
      <Footer />
    </div>
  );
}
