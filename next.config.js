/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.unsplash.com', 'api.dicebear.com'],
    unoptimized: true,
  },
  output: 'standalone',
  experimental: {
    serverActions: true,
  }
};

module.exports = nextConfig;
