import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.178.73'],
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.cosmos.so" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
}

export default nextConfig
