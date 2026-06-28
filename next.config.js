/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Explicitly use root app/ directory (not src/)
  // This ensures enterprise-site-v2 structure is used
};
module.exports = nextConfig;
