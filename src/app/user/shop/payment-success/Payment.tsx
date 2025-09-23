"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { config } from "@/config";
import { getToken } from "@/utils/authUtils";

// Define the possible states for our UI
type VerificationStatus = "verifying" | "success" | "failed";

const commonUrl = `${config.baseUrl}/stripe`;

const PaymentSuccessNewPage = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<VerificationStatus>("verifying");
  const [message, setMessage] = useState(
    "Verifying your payment, please wait..."
  );

  // useRef to prevent the verification API call from running multiple times
  const hasVerified = useRef(false);

  useEffect(() => {
    // Get the payment_intent ID from the URL
    const paymentIntentId = searchParams
      ? searchParams.get("payment_intent")
      : null;

    // Make sure we have the ID and haven't already verified
    if (paymentIntentId && !hasVerified.current) {
      hasVerified.current = true; // Mark as started

      const verifyPayment = async () => {
        try {
          // Call your backend to verify the payment
          const res = await fetch(`${commonUrl}/verify-payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `${getToken()}`,
            },
            body: JSON.stringify({ paymentIntentId }),
          });

          const data = await res.json();

          if (res.ok && data.success) {
            // Verification successful!
            setStatus("success");
            setMessage(
              "Thank you for your purchase! A confirmation has been sent to your email."
            );
          } else {
            // Verification failed
            setStatus("failed");
            setMessage(
              data.message ||
                "There was an issue verifying your payment. Please contact support."
            );
          }
        } catch (error) {
          console.error("Verification API call failed:", error);
          setStatus("failed");
          setMessage(
            "Could not connect to verify payment. Please check your connection or contact support."
          );
        }
      };

      verifyPayment();
    }
  }, [searchParams]);

  // Render different UI based on the verification status
  const renderContent = () => {
    switch (status) {
      case "verifying":
        return (
          <>
            <h1>Verifying Payment...</h1>
            <p>{message}</p>
            {/* You could add a spinner component here */}
          </>
        );
      case "success":
        return (
          <>
            <h1 style={{ color: "green" }}>Payment Successful!</h1>
            <p>{message}</p>
          </>
        );
      case "failed":
        return (
          <>
            <h1 style={{ color: "red" }}>Payment Verification Failed</h1>
            <p>{message}</p>
          </>
        );
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      {renderContent()}
    </div>
  );
};

export default PaymentSuccessNewPage;
