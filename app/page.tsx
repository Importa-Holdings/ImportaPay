import LandingPage from "./home/_components/LandingPage";
import TrustedBy from "./home/_components/TrustedBy";
import PopularCorridors from "./home/_components/PopularCorridors";
import WhyImportapay from "./home/_components/WhyImportapay";
import BuiltForBusinesses from "./home/_components/BuiltForBusinesses";
import ReadyToMove from "./home/_components/ReadyToMove";
import RateTicker from "./home/_components/RateTicker";
import ImageModal from "./home/_components/ImageModal";
import Business from "./home/_components/Business";
import Safe from "./home/_components/Safe";
import FAQSection from "./home/_components/FAQSection";
import ContentSection from "./home/_components/ContentSection";
import Footer from "./home/_components/Footer";
import CoreOfferings from "./home/_components/CoreOfferings";

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
