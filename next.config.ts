// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'static.vecteezy.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'flagcdn.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'placehold.co',
//       },
//       {
//         protocol: 'https',
//         hostname: 'lh3.googleusercontent.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'upload.wikimedia.org',
//       },
//       {
//         protocol: 'https',
//         hostname: 'apim.fmcg-exchange.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'minio.fmcg-exchange.com',
//       },
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//         port: '9100',
//       }
//     ],
//     dangerouslyAllowSVG: true,
//     contentDispositionType: 'attachment',
//     qualities: [75, 90],
//   },
//   reactCompiler: true,
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "static.vecteezy.com", pathname: "/**" },
      { protocol: "https", hostname: "flagcdn.com", pathname: "/**" },
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      { protocol: "https", hostname: "upload.wikimedia.org", pathname: "/**" },
      {
        protocol: "https",
        hostname: "apim.fmcg-exchange.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "minio.fmcg-exchange.com",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    contentDispositionType: "attachment",
    qualities: [75, 90],
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
  },
  reactCompiler: true,
  staticPageGenerationTimeout: 180,
};

export default nextConfig;
