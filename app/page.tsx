import LandingPage from "./home/_components/LandingPage";
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
      <RateTicker />
      <CoreOfferings />
      <ImageModal />
      <Business />
      <Safe />
      <FAQSection />
      <ContentSection />
      <Footer />
    </div>
  );
}
