/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    COLLECTION_API_URL: process.env.COLLECTION_API_URL,
  },
};

export default nextConfig;
