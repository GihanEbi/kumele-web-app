// import { Html, Head, Main, NextScript } from 'next/document';

// export default function Document() {
//   return (
//     <Html lang="en">
//       <Head>
//         {/* PWA primary meta tags */}
//         <meta name="theme-color" content="#000000" />
//         <link rel="manifest" href="/manifest.json" />

//         {/* Apple-specific PWA settings */}
//         <meta name="apple-mobile-web-app-capable" content="yes" />
//         <meta name="apple-mobile-web-app-status-bar-style" content="default" />
//         <meta name="apple-mobile-web-app-title" content="Your App Name" />
//         <link rel="apple-touch-icon" href="/icons/icon-192.png" />
//       </Head>
//       <body>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   );
// }

// pages/_document.tsx

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Standard PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />

        {/* iOS-specific tags */}
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="NextPWA" />

        {/* (Optional) Add splash screens for iOS --> See next step */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
