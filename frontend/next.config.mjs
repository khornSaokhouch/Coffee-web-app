/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: '**', // wildcard
        },
        {
          protocol: 'https',
          hostname: '**', // wildcard
        },
      ],
    },
  };
  
  export default nextConfig;
  