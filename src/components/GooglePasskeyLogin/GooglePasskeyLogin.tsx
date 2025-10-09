"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    google?: any;
  }
}

export default function GooglePasskeyLogin({ onSuccess }: { onSuccess: (token: string) => void }) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: (response: any) => {
            onSuccess(response.credential);
          },
          itp_support: true, // Enables Passkey and TouchID options
          auto_select: true, // If user previously signed in, auto select account
        });

        // Render the Google Sign-in button
        if (divRef.current) {
          window.google.accounts.id.renderButton(divRef.current, {
            theme: "outline",
            size: "large",
            type: "standard",
            shape: "rectangular",
            text: "signin_with",
          });
        }
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [onSuccess]);

  return <div ref={divRef}></div>;
}
