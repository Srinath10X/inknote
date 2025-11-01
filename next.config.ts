import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL(
        "https://tailark.com/_next/image?url=%2Fmist%2Ftailark-2.png&w=3840&q=75",
      ),
    ],
  },
};

export default nextConfig;
