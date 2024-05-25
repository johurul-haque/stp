/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/your-posts',
      },
    ];
  },
};

export default nextConfig;
