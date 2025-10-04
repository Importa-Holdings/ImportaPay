import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server Actions are enabled by default in Next.js 15+
  experimental: {
    // No need to explicitly enable serverActions as it's enabled by default
  },
  images: {
    domains: [
      "unsplash.com",
      "images.unsplash.com",
      "admin-api.pay.importa.biz",
    ],
    // OR, for more granular control, you can use remotePatterns:
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "images.unsplash.com",
    //     port: "",
    //     pathname: "/**",
    //   },
    // ],
  },
};

export default nextConfig;
