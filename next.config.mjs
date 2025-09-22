// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */images: {
//     domains: ["testdomain.goodwish.com.np"],
//   },
// };

// export default nextConfig;
// next.config.ts

// import withPWA from "next-pwa";
// import pwaConfig from "./pwa.config";

// const nextConfig = {
//   domains: ["testdomain.goodwish.com.np"],
//   experimental: {
//     serverActions: true, // if using server actions
//   },
//   // add other next config options here
// };

// export default withPWA(pwaConfig)(nextConfig);

// "next-pwa": "^5.6.0",

// next.config.js

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   // ... any other aext.js config
// };

// const withPWA = require('next-pwa')({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === 'development',
//   // You can add more runtime caching strategies here.
//   // runtimeCaching: [ ... ],
// });

// module.exports = withPWA(nextConfig);

////////////////////////////////////////////////////////////
// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your regular Next.js config goes here
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5001", // allow your backend server
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        // port: "5001", // allow your backend server
        // pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "kumele-backend.duckdns.org",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
};

// Importing the PWA plugin
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public", // Destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // Disable PWA in development
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
});

export default withPWA(nextConfig);
