import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */images: {
    domains: ["testdomain.goodwish.com.np"],
  },
};

export default nextConfig;
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
