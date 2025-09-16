"use client";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import ErrorModel from "../../Models/ErrorModel/ErrorModel";
import SuccessModel from "../../Models/SuccessModel/SuccessModel";

type Props = {
  amount: string;
};

const CheckoutModel = ({ amount }: Props) => {
  // stripe and elements hooks are used to interact with the Stripe API
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    // Do nothing if Stripe.js has not loaded yet.
    if (!stripe || !elements) {
      return;
    }

    try {
      setIsLoading(true);
      // Trigger form validation and wallet collection
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // This is the URL the user will be redirected to after payment.
          // You can create a dedicated page for this.
          return_url: `${window.location.origin}/user/shop/payment-success`,
        },
      });

      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For example, this could be a card error.
      if (error.type === "card_error" || error.type === "validation_error") {
        setError(error.message || "An unexpected error occurred.");
        setShowErrorModel(true);
        setTimeout(() => setShowErrorModel(false), 3600);
        return;
      } else {
        setError("An unexpected error occurred.");
        setShowErrorModel(true);
        setTimeout(() => setShowErrorModel(false), 3600);
        return;
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col max-h-[80vh]">
      <div className="flex-grow overflow-y-auto no-scrollbar">
        {/* Amount */}
        <div className="mt-8">
          <p className="text-app-blog-card-heading font-plusJakartaSans font-normal text-[16px]">
            Amount to pay
          </p>
          <p className="text-app-text-blue font-plusJakartaSans font-bold text-[23px] mt-1">
            ${amount}
          </p>
        </div>

        {/* Discount Code */}
        <div className="mt-6 flex sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter Discount code"
            className="flex-grow bg-app-search-bar-background  rounded-lg px-2 py-3 text-white placeholder-app-search-bar-text placeholder:font-plusJakartaSans placeholder:font-normal placeholder:text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-app-background-card-secondary text-app-button-text-color font-plusJakartaSans font-normal text-[15px] px-8 py-2 rounded-lg">
            Apply
          </button>
        </div>
        <PaymentElement id="payment-element" />
        <div className="pt-4 mt-[24px]">
          <button
            className="w-full text-[16px] mb-[12px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
            onClick={() => {
              handleSubmit();
            }}
            disabled={isLoading || !stripe || !elements}
          >
            Pay now
          </button>
        </div>
        <SuccessModel
          isOpen={showSuccessModel}
          onClose={() => {
            setShowSuccessModel(false);
            setSuccess("");
          }}
          successMessage={success || ""}
        />
        <ErrorModel
          isOpen={showErrorModel}
          onClose={() => {
            setShowErrorModel(false);
            setError("");
          }}
          errorMessage={error || ""}
        />
      </div>
    </div>
  );
};

export default CheckoutModel;
