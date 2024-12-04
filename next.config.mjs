/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    ppr: "incremental",
    runtime: "nodejs",
  },
  middleware: {
    ignoredRoutes: ["/favicon.ico", "/_next/*"],
  },
  images: {
    domains: ["images.unsplash.com"],
  },
  typescript: {
    // Ignore TypeScript errors during the build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
