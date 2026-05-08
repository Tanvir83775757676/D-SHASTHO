import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: { unoptimized: true }, // safe for Cloudflare Pages too
}

export default nextConfig
