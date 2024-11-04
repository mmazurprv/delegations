/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/dashboard/db",
        destination: "https://local.drizzle.studio",
      },
    ];
  },
};

export default nextConfig;
