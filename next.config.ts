import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'moviesapi.ir',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.dummyjson.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '/**',
      },
      
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;


