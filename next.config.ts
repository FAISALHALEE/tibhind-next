import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  distDir: ".next",
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
