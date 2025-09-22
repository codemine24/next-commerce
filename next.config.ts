import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "axtzmsclrnqrlpkoeash.storage.supabase.co",
      },
      {
        protocol: "https",
        hostname: "pkyityryfjyqgfyslppv.storage.supabase.co",
      }
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
};

export default nextConfig;
