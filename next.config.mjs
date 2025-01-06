/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            pathname: '/**', // Tüm yolları kabul eder
          }
        ],
      },
};

export default nextConfig;
