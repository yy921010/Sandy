import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["next-mdx-remote"],
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
