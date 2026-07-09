import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@hutanotrack/shared', '@hutanotrack/ui'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
