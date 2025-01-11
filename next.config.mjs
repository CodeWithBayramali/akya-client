/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'akyapi.bn.org.tr',
            pathname: '/**', // Tüm yolları kabul eder
          }
        ],
      },
};

export default nextConfig;
