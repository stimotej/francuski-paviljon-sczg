/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/demo",
  assetPrefix: "/demo/",
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
