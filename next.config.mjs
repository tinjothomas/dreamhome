/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Add markdown handling
    config.module.rules.push({
      test: /\.md$/,
      type: "asset/source",
    });
    return config;
  },
};

export default nextConfig;
