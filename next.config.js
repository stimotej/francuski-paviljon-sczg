/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.sczg.unizg.hr",
      },
    ],
  },
};

module.exports = nextConfig;
