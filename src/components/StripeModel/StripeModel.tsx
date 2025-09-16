"use client";
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { create_payment_intent } from "@/routes/stripe_payments";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useTheme } from "next-themes";
import CheckoutModel from "./CheckoutModel/CheckoutModel";
import SuccessModel from "@/components/Models/SuccessModel/SuccessModel";
import ErrorModel from "@/components/Models/ErrorModel/ErrorModel";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type ContactModelProps = {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
};

const StripeModel = ({ isOpen, onClose, amount }: ContactModelProps) => {
  const { theme } = useTheme();
  const [clientSecret, setClientSecret] = useState("");
  
  // States for models
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- THE FIX IS HERE ---
  // 1. Move useEffect to the top level with all other hooks.
  useEffect(() => {
    // 2. Add the condition *inside* the hook.
    // Only fetch the client secret if the modal is open and we have a valid amount.
    if (isOpen && parseFloat(amount) > 0) {
      const createPaymentIntent = async () => {
        try {
          const data = await create_payment_intent(amount);
          if (data.success) {
            setClientSecret(data.clientSecret);
          } else {
            setError(data.message || "Failed to initialize payment.");
            setShowErrorModel(true);
          }
        } catch (err) {
          setError("Could not connect to payment service.");
          setShowErrorModel(true);
        }
      };

      createPaymentIntent();
    } else if (!isOpen) {
      // Optional: Reset clientSecret when modal closes to ensure a fresh one is fetched next time.
      setClientSecret("");
    }
  }, [isOpen, amount]); // 3. The dependency array correctly triggers the effect.


  // 4. The conditional return is now *after* all hooks have been called.
  if (!isOpen) {
    return null;
  }
  
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: theme === "dark" ? "night" : "stripe",
    },
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-50 transition-opacity duration-300 ease-in-out"
        onClick={onClose}
      >
        <div
          className={`bg-app-background-primary w-full max-w-md p-6 sm:p-8 rounded-t-4xl shadow-xl transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* We show a loader while waiting for the clientSecret */}
          {clientSecret ? (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutModel amount={amount} />
            </Elements>
          ) : (
            <div className="flex items-center justify-center h-40">
              <LoadingComponent />
            </div>
          )}
        </div>
      </div>
      
      <SuccessModel
        isOpen={showSuccessModel}
        onClose={() => setShowSuccessModel(false)}
        successMessage={success || ""}
      />
      <ErrorModel
        isOpen={showErrorModel}
        onClose={() => setShowErrorModel(false)}
        errorMessage={error || ""}
      />
    </div>
  );
};

export default StripeModel;