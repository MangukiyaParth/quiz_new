import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // output: 'standalone', // Optional: uncomment if you're doing custom deployment (not needed with next-on-pages)
};

export default nextConfig;
