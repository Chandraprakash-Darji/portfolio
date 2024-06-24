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
        hostname: 'lemonsqueezy.imgix.net',
      },
      {
        hostname: 'ik.imagekit.io',
      },
    ],
  },
  // redirects: async () => [
  //   {
  //     source: '/admin',
  //     destination: '/admin/blog',
  //     permanent: true,
  //   },
  // ],
};

module.exports = nextConfig;
