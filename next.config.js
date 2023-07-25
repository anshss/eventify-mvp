/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    'crypto': 'empty'
}
};

module.exports = nextConfig;
