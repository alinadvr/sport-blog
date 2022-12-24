/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  images: {
    domains: ["blog.myfitnesspal.com", "www.w3schools.com"],
  },
}
