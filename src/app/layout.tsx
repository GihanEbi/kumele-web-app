import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Fredoka,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; // <-- Import your new client-side providers

// --- All your font definitions remain here ---
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});
const fredoka = Fredoka({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fredoka",
});

// --- Your metadata and viewport exports remain here ---
export const metadata: Metadata = {
  title: "Kumele",
  description: "Let your hobbies define your character",
  icons: {
    icon: "/images/logo.png",
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AwesomePWA",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

// --- Your RootLayout is now a clean Server Component ---
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body
        className={`${fredoka.variable} ${plusJakartaSans.variable} antialiased`}
      >
        {/*
          Wrap the children with the 'Providers' component.
          This creates a "client boundary" where all client-side logic lives.
        */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}