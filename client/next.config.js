/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'app-thecarinsiwa-api.onrender.com', pathname: '/uploads/**' },
      { protocol: 'http', hostname: 'localhost', pathname: '/uploads/**' },
    ],
  },
};

module.exports = nextConfig;
