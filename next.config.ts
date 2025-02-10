import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'styles.redditmedia.com',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'icons.veryicon.com',
        port: '',
        search: '',
      },
    ],
  },
};

export default nextConfig;
