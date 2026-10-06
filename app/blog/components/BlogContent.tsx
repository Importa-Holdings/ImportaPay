"use client";

import { useState } from "react";
import LandingPage from "./LandingPage";
import Categories from "./categories";

// Shares the hero search box with the article list below it.
const BlogContent = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <LandingPage searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <Categories searchTerm={searchTerm} />
    </>
  );
};

export default BlogContent;
