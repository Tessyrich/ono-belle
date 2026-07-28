import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Product/category images served by the Ono Belle backend.
        protocol: "https",
        hostname: "projects.jadesdev.com.ng",
      },
    ],
  },
};

export default nextConfig;
