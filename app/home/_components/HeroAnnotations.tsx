// Handwritten callouts with curly arrows that float around the hero heading.
// Positions are measured from the centre of a 1440px frame so they stay
// anchored to the heading on any desktop width.

const LoopArrow = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 72 56"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M2 22C10 8 28 4 36 14C43 23 35 33 28 27C21 21 34 9 47 16C57 21 62 33 62 47" />
    <path d="M55 41L62 49L68 40" />
  </svg>
);

const SquiggleArrow = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 80 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M6 4C1 16 5 30 15 28C24 26 25 13 34 16C43 19 41 33 51 31C60 29 67 22 75 17" />
    <path d="M65 13L76 16L71 26" />
  </svg>
);

const HeroAnnotations = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden font-hand text-[26px] leading-[38px] tracking-[2px] text-[#5F26A6] [-webkit-text-stroke:0.5px_#5F26A6] select-none xl:block"
  >
    {/* No dollar account required */}
    <div
      className="animate-hero-bounce absolute top-[166px] left-[calc(50%-611px)]"
      style={{ animationDelay: "0s" }}
    >
      <div className="-rotate-[8deg]">
        <p>No dollar</p>
        <p className="pl-[14px]">account</p>
        <p className="pl-[20px]">required</p>
      </div>
      <LoopArrow className="absolute top-[34px] left-[150px] h-[46px] w-[60px]" />
    </div>

    {/* 190+ Countries */}
    <div
      className="animate-hero-bounce absolute top-[166px] left-[calc(50%+428px)]"
      style={{ animationDelay: "0.8s" }}
    >
      <LoopArrow className="absolute top-[22px] left-0 h-[46px] w-[60px] -scale-x-100 rotate-[6deg]" />
      <div className="-rotate-[8deg] pl-[66px]">
        <p className="pl-[20px]">190+</p>
        <p>Countries</p>
      </div>
    </div>

    {/* Transparent rates */}
    <div
      className="animate-hero-bounce absolute top-[478px] left-[max(16px,calc(50%-685px))]"
      style={{ animationDelay: "1.6s" }}
    >
      <div className="-rotate-[8deg]">
        <p>Transparent</p>
        <p className="pl-[56px]">rates</p>
      </div>
      <SquiggleArrow className="absolute top-[36px] left-[140px] h-[34px] w-[66px]" />
    </div>
  </div>
);

export default HeroAnnotations;
