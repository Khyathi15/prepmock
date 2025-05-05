import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Avoid bundling server-only modules in client-side builds
      config.resolve.fallback = {
        ...config.resolve.fallback,
        child_process: false, // Exclude child_process from client-side builds
        fs: false, // Exclude file system module from client-side builds

        net: false,
        tls: false,
      };
    }
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
