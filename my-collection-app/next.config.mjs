/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    unoptimized: true,
  },
  serverRuntimeConfig: {
    // Increase the body size limit to 10MB (or any size you need)
    bodyParser: {
      sizeLimit: '10mb',
    },
    serverActions: {
      bodySizeLimit: '10mb' // Set desired value here
    },
  },
};

export default nextConfig;
