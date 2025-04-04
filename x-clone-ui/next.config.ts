import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  remotePatterns: [
    {
      protocol: "https",
      hostname: "ik.imagekit.io",
      port: "",
    },
  ],
};

export default nextConfig;
