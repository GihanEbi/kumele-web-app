"use client"; // This is a client component

import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
// You can also import your custom theme options if you have one
// import themeOptions from './theme'; // Example

// A basic theme can be defined here, or imported
const defaultTheme = createTheme({
  palette: {
    mode: "light", // or 'dark'
    // Add your custom theme options here
    // primary: { main: '#1976d2' },
    // secondary: { main: '#dc004e' },
  },
  // You can also customize typography, components, etc.
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={defaultTheme}>
        {/* CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
