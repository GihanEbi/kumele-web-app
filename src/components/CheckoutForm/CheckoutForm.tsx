import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";

const CheckoutForm = () => {
  // stripe and elements hooks are used to interact with the Stripe API
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Do nothing if Stripe.js has not loaded yet.
    if (!stripe || !elements) {
      return;
    }

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
      setMessage(error.message || "An unexpected error occurred.");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* The PaymentElement renders a dynamic form for cards, wallets, etc. */}
      <PaymentElement id="payment-element" />

      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? "Processing..." : "Pay now"}
        </span>
      </button>

      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;