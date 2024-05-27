/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        domain: 'lemonsqueezy.imgix.net',
      },
    ],
  },
};

module.exports = nextConfig;
