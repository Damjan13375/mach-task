/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NASA_API_KEY: process.env.NASA_API_KEY,
    API_URL: process.env.API_URL
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      }
    ],
  },
};

export default nextConfig;
