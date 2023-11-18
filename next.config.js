/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
  },
};

module.exports = nextConfig;
