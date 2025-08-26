"use client";

import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import type { OnApproveData } from "@paypal/paypal-js";
import { saveCard } from "@/routes/payments/route";

interface SecurePayPalFormProps {
  authToken: string;
  onSuccess: () => void;
  onError: (message: string) => void;
}

const SecurePayPalForm = ({
  authToken,
  onSuccess,
  onError,
}: SecurePayPalFormProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // We do not need the 'actions' parameter here, which was causing the first error.
  const handleOnApprove = async (data: OnApproveData): Promise<void> => {
    setIsProcessing(true);

    try {
      // Use 'billingToken' for PayPal vault flow.
      const billingToken = (data as any).billingToken;
      if (!billingToken) {
        throw new Error(
          "Billing token not received from PayPal. This indicates a problem with the vault flow."
        );
      }

      // The frontend sends the temporary 'billingToken' to the backend.
      await saveCard(billingToken);

      onSuccess();
    } catch (err: any) {
      console.error("Failed to save card:", err);
      onError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full">
      {isProcessing && (
        <div className="text-center text-app-text-secondary mb-4">
          Processing... Please wait.
        </div>
      )}
        <div className="mb-4">
            <p className="text-app-text-secondary mb-2">
            Please enter your card details securely via PayPal.
            </p>
        </div>

      <div className={!isProcessing ? "opacity-50 pointer-events-none" : ""}>
        <PayPalButtons
          createVaultSetupToken={() => Promise.resolve("")}
          fundingSource="card"
          onApprove={handleOnApprove}
          onError={(err) => {
            console.error("PayPal Vault Button Error:", err);
            onError("An error occurred with PayPal. Please try again.");
          }}
          style={{
            layout: "vertical",
            label: "pay",
            color: "black",
            shape: "rect",
            height: 55,
          }}
        />
      </div>
    </div>
  );
};

export default SecurePayPalForm;
