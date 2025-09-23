/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.unsplash.com', 'api.dicebear.com'],
    unoptimized: true,
  },
  swcMinify: true,
};

module.exports = nextConfig;
