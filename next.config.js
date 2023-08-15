/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")("./i18n.ts");

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
}


module.exports = withNextIntl(nextConfig);