import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Fredoka,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { AppProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  // Geist Mono supports 400 and 700 weights
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"], // Available weights for Plus Jakarta Sans
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});
const fredoka = Fredoka({
  weight: ["400", "500", "600", "700"], // 'Fredoka One' only supports 400
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "Kumele",
  description: "Let your hobbies define your character",
  icons: {
    // Standard favicon
    icon: '/images/logo.png',
    // Apple touch icon
    apple: '/icons/apple-touch-icon.png',
  },
  manifest: "/manifest.json", // Link to the manifest file
  // Apple-specific meta tags
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AwesomePWA",
    // startUpImage: [], // You can add startup images for different devices
  },
};
// export const metadata: Metadata = {
//   title: "My Awesome Next.js PWA",
//   description: "A standalone PWA that works on iOS",
//   manifest: "/manifest.json", // Link to the manifest file
//   // Apple-specific meta tags
//   appleWebApp: {
//     capable: true,
//     statusBarStyle: "default",
//     title: "AwesomePWA",
//     // startUpImage: [], // You can add startup images for different devices
//   },
// };
// Define viewport settings
export const viewport: Viewport = {
  themeColor: "#000000", // Match the theme-color in manifest.json
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
        {/*
          This is the icon that will be used for the "Add to Home Screen" button
          and the app icon on the home screen.
        */}
        <link
          rel="apple-touch-icon"
          href="/icons/apple-touch-icon.png"
        />
      </head>
      <body
        className={`${fredoka.variable} ${plusJakartaSans.variable} antialiased`}
        // className={fredoka.className }
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>{children}</AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
