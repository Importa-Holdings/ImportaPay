"use client";

import Subscribe from "./Subscribe";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl space-y-7">
              {/* Hero Section */}
              <h1 className="font-sans text-3xl sm:text-4xl md:text-6xl font-bold text-black leading-tight">
                Our blog
              </h1>
              <p className="font-sans text-lg md:text-xl text-black/80 max-w-2xl leading-relaxed">
                A closer look at our product journey, industry perspectives, and
                the partnerships helping us move finance forward
              </p>
            </div>
          </div>
        </div>

        {/* Subscribe Section - positioned at the bottom */}
        <div className="w-full">
          <Subscribe />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
