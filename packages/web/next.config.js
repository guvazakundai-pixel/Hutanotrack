/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
  },
  reactStrictMode: true,
  transpilePackages: ['@hutanotrack/shared'],
};

module.exports = nextConfig;
