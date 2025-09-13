"use client"; // This directive is ESSENTIAL. It marks this as a Client Component.

import { ThemeProvider } from "../components/theme-provider";
import { AppProvider } from "@/context/AppContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// All provider-related logic and configuration goes here.
const paypalOptions = {
  // Use camelCase 'clientId' as required by the React component's types.
  clientId: "Ado106hdA9ZAjYvRgXxXJcb2CMshQgcd8NWt6D0J6AOxTNPHj5XYUOCDG9fv8xlM1nOrp1mYEl3FrKMr"!,
  currency: "USD",
  intent: "capture",
  vault: true, // Enables the ability to save cards
};

export function Providers({ children }: { children: React.ReactNode }) {
  // It's good practice to handle env variable checks here.
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!googleClientId) {
    // This will stop the app from rendering if the key is missing.
    throw new Error("Google Client ID is not defined in environment variables.");
  }
  
  if (!paypalOptions.clientId) {
      throw new Error("PayPal Client ID is not defined in environment variables.");
  }

  // The nesting order of your providers is preserved exactly as you had it.
  return (
    <PayPalScriptProvider options={paypalOptions}>
      <GoogleOAuthProvider clientId={googleClientId}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>{children}</AppProvider>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </PayPalScriptProvider>
  );
}