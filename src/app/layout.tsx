import type { Metadata } from "next";
import { Geist, Geist_Mono , Fredoka, Plus_Jakarta_Sans} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({ // Geist Mono supports 400 and 700 weights
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700'], // Available weights for Plus Jakarta Sans
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});
const fredoka = Fredoka({
  weight: ['400', '500', '600', '700'], // 'Fredoka One' only supports 400
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fredoka',
})

export const metadata: Metadata = {
  title: "Kumele",
  description: "Let your hobbies define your character",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
