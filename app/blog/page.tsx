import React from "react";
import HeroNavbar from "../home/_components/HeroNavbar";
import BlogContent from "./components/BlogContent";
import Subscribe from "./components/Subscribe";
import Footer from "../home/_components/Footer";
import ReadyToMove from "../home/_components/ReadyToMove";

const page = () => {
  return (
    <div>
      <HeroNavbar />
      <BlogContent />
      <Subscribe />
      <ReadyToMove
        title="Join Importapay Today!"
        description="Join Importapay today and see how simple international payments can be."
      />
      <Footer />
    </div>
  );
};

export default page;
