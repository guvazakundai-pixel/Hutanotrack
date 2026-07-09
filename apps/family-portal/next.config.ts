import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@hutanotrack/shared', '@hutanotrack/ui'],
};

export default nextConfig;
