import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: true,
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
