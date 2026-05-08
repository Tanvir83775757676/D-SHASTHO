import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  // Turbopack is stable in Next.js 15 (via --turbopack in dev)
  experimental: {},
}

export default nextConfig
// cache-bust: 1778234127
