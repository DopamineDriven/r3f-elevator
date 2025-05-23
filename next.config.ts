import type { NextConfig } from "next";

export default {
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false, tsconfigPath: "./tsconfig.json" },
  devIndicators: false,
  experimental: { optimizePackageImports: ["three"] },
  images: {
    loader: "default",
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,

    remotePatterns: [
      {
        hostname: "localhost",
        port: "3007",
        protocol: "http"
      },
      { hostname: "asrosscloud.com", protocol: "https" },
      {
        protocol: "https",
        hostname: "**.vercel-storage.com"
      },
      { hostname: "api.dicebear.com", protocol: "https" },
      { hostname: "images.unsplash.com", protocol: "https" },
      { hostname: "tailwindui.com", protocol: "https" },
      { hostname: "r3f-elevator.vercel.app", protocol: "https" },
      { hostname: "dev-r3f-elevator.vercel.app", protocol: "https" },
      { hostname: "asross.com", protocol: "https" },
      { hostname: "raw.githubusercontent.com", protocol: "https" },
      { hostname: "www.thefaderoominc.com", protocol: "https" },
      {
        hostname: "ypuktmwmnilhirdf.public.blob.vercel-storage.com",
        protocol: "https",
        port: ""
      }
    ]
  }
} satisfies NextConfig;
