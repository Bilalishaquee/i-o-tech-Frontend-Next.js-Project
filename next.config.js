/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' for Vercel deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
  },
};

module.exports = nextConfig;
