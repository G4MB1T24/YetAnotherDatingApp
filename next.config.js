/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    runtime: 'nodejs',//'experimental-edge', //  (default) | 'experimental-edge'
    appDir: true
  }
}

module.exports = nextConfig
