/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },
  transpilePackages: ["@/components/ui"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
