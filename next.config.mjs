/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true, // ❌ TypeScript hatalarını build sırasında engelle
    },
    eslint: {
        ignoreDuringBuilds: true, // ❌ ESLint hatalarını build sırasında engelle
    },
    images: {
        //remotePatterns: [
        //    {
        //        protocol: "http",
        //        hostname: "localhost",
        //    },
        //],
        remotePatterns: [
          {
            protocol: "https",
            hostname: "akyabutik.com",
            pathname: '/minio/**',
          },
        ],
      },
};

export default nextConfig;
