import React from "react";
import { Navbar } from "../../components/navbar/Navbar";
import LandingPage from "./components/LandingPage";
import Categories from "./components/categories";
import Footer from "../home/_components/Footer";
import Join from "./components/Join";

const page = () => {
  return (
    <div>
      <Navbar />
      <LandingPage />
      <Categories />
      <Join />
      <Footer />
    </div>
  );
};

export default page;
