/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' for Vercel deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false, // Set to true if you have TypeScript errors during build
  },
  images: { 
    unoptimized: true,
  },
  // Ensure proper webpack configuration
  webpack: (config, { isServer }) => {
    // Fix for i18next in server-side rendering
    if (isServer) {
      config.externals = [...(config.externals || []), 'i18next-browser-languagedetector'];
    }
    return config;
  },
};

module.exports = nextConfig;
