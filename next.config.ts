import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/shorten/:path*',
        destination: `${backendUrl}/shorten/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },

  reactStrictMode: true,

  env: {
    BACKEND_URL: backendUrl,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', 
      },
      {
        protocol: 'http',
        hostname: 'localhost', 
        port: '3000',
      },
    ],
  },

  webpack: (config) => {
    return config;
  },

  productionBrowserSourceMaps: true,

  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  experimental: {
    turbo: process.env.TURBO === 'true' ? {} : undefined,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;