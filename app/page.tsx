import LandingPage from "./home/_components/LandingPage";
import TrustedBy from "./home/_components/TrustedBy";
import PopularCorridors from "./home/_components/PopularCorridors";
import WhyImportapay from "./home/_components/WhyImportapay";
import BuiltForBusinesses from "./home/_components/BuiltForBusinesses";
import ReadyToMove from "./home/_components/ReadyToMove";
import Footer from "./home/_components/Footer";

export default function Home() {
  return (
    <div>
      <LandingPage />
      <TrustedBy />
      <PopularCorridors />
      <WhyImportapay />
      <BuiltForBusinesses />
      <ReadyToMove />

      <Footer />
    </div>
  );
}
