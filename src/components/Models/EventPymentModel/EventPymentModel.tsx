"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  BackToPageIcon,
  CreditCardIcon,
  CryptoIcon,
  MastercardIcon,
  TwoTicketsIcon,
} from "../../../../public/svg-icons/icons";
import CheckMarkGif from "../../GifComponents/CheckMarkGif/CheckMarkGif";
import { useTheme } from "next-themes";
import SuccessModel from "@/components/Models/SuccessModel/SuccessModel";
import ErrorModel from "@/components/Models/ErrorModel/ErrorModel";
import { add_to_cart, get_user_cart, remove_from_cart } from "@/routes/cart";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

import PaymentPage from "@/app/user/more/cart/payment/payment";
import {
  FUNDING,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import type {
  OnApproveData,
  CreateOrderData,
  OnApproveActions,
  CreateOrderActions,
} from "@paypal/paypal-js";
import { config } from "@/config";
import { getToken } from "@/utils/authUtils";
import { add_to_purchase_history } from "@/routes/userPurchaseHistory";

const commonUrl = `${config.baseUrl}/payments`;

interface userCart {
  id: string;
  quantity: number;
  product_id: string;
  name: string;
  price: number;
  description: string;
}

// --- The Modal Component ---
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPayWithWalletClick?: () => void;
  amountToPay: number;
  cartData: userCart[];
  onEventCreate: Function;
}

interface SavedCard {
  id: number;
  paypal_token_id: string;
  card_brand: string;
  last4: string;
}

export const EventPaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onPayWithWalletClick,
  amountToPay,
  cartData,
  onEventCreate,
}) => {
  //   loading state
  const [loading, setLoading] = useState(false);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  if (!isOpen) {
    return null;
  }

  //   function to remove item from cart
  const removeCartProducts = async () => {
    setLoading(true);
    try {
      for (const item of cartData) {
        const data = await remove_from_cart(item.id);
        if (!data.success) {
          setError("Failed to remove item from cart");
          setShowErrorModel(true);
          setTimeout(() => setShowErrorModel(false), 3600);
          setShowErrorModel(false);
          return;
        }
        const updatePurchaseHistory = await add_to_purchase_history({
          product_id: item.product_id,
        });
        if (!updatePurchaseHistory.success) {
          setError("Failed to update purchase history");
          setShowErrorModel(true);
          setTimeout(() => setShowErrorModel(false), 3600);
          setShowErrorModel(false);
          return;
        }
      }
      onEventCreate();
      onClose();
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setError("Error removing item from cart");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      setShowErrorModel(false);
    } finally {
      setLoading(false);
    }
  };

  // Function to create a PayPal order via our backend
  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ) => {
    if (!amountToPay || amountToPay <= 0) {
      setError("Invalid amount to pay.");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      setShowErrorModel(false);
      return;
    }

    try {
      const response = await fetch(`${commonUrl}/orders/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${getToken()}`,
        },
        body: JSON.stringify({
          cartTotal: amountToPay,
          vault: saveCard, // Tell backend we want to save this card
        }),
      });
      const order = await response.json();
      if (order.orderID) {
        return order.orderID;
      } else {
        setError(order.message || "Failed to create order.");
        setShowErrorModel(true);
        setTimeout(() => setShowErrorModel(false), 3600);
        setShowErrorModel(false);
        return;
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while creating the order. Please try again.");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      setShowErrorModel(false);
      return;
    }
  };

  // Function to handle payment approval
  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    try {
      // 1. Capture the payment on the backend
      const captureResponse = await fetch(`${commonUrl}/orders/capture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${getToken()}`,
        },
        body: JSON.stringify({ orderID: data.orderID }),
      });
      const captureResult = await captureResponse.json();
      if (!captureResult.success) {
        setError("Payment capture failed.");
        setShowErrorModel(true);
        setTimeout(() => setShowErrorModel(false), 3600);
        setShowErrorModel(false);
        return;
      }
      removeCartProducts();
      setSuccess("Payment successful!");
      setShowSuccessModel(true);
      setTimeout(() => setShowSuccessModel(false), 3600);
      setShowSuccessModel(false);

      // 2. If user chose to save the card, and the payment source exists, save it
      //   const paymentSource = captureResult.data?.payment_source;
      //   if (saveCard && paymentSource?.card) {
      //     await saveCardToVault(paymentSource.card);
      //   }
    } catch (error) {
      console.error(error);
      setError(
        "An error occurred during payment approval. Please check your console."
      );
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      setShowErrorModel(false);
      return;
    }
  };

  // Function to save the card token to our database
  const saveCardToVault = async (cardDetails: any) => {
    console.log("Saving card to vault...");
    try {
      const response = await fetch(`${commonUrl}/payments/cards/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${getToken()}`,
        },
        body: JSON.stringify({
          paypal_token_id: cardDetails.attributes.vault.id, // This is the vaulted token
          card_brand: cardDetails.brand,
          last4: cardDetails.last_digits,
        }),
      });
      const result = await response.json();
      if (result.success) {
        console.log("Card saved successfully!");
        // Optionally, refresh the list of saved cards
        setSavedCards((prev) => [...prev, result.data]);
      } else {
        console.error("Failed to save card:", result.message);
      }
    } catch (error) {
      console.error("API error while saving card:", error);
    }
  };
  return (
    <div
      className={`pt-[64px] mx-auto fixed inset-0 z-2000 flex flex-col ${
        isPaymentSuccess && isDark
          ? "bg-neutral-900"
          : isPaymentSuccess && !isDark
          ? "bg-gray-200"
          : "bg-app-background-primary"
      }   font-sans`}
    >
      {/* Loading spinner */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}

      <div className="flex-grow p-6 overflow-y-auto ">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="">
            <BackToPageIcon className="w-6 h-6" />
          </button>
          <h2 className="font-plusJakartaSans font-bold text-[23px] text-app-blog-card-heading">
            Payment
          </h2>
        </div>

        {/* Amount */}
        <div className="mt-8">
          <p className="text-app-blog-card-heading font-plusJakartaSans font-normal text-[16px]">
            Amount to pay
          </p>
          <p className="text-app-text-blue font-plusJakartaSans font-bold text-[23px] mt-1">
            ${amountToPay.toFixed(2)}
          </p>
        </div>

        {/* Discount Code */}
        <div className="mt-6 flex sm:flex-row gap-1">
          <input
            type="text"
            placeholder="Enter Discount code"
            className="flex-grow bg-app-search-bar-background  rounded-lg px-2 py-3 text-white placeholder-app-search-bar-text placeholder:font-plusJakartaSans placeholder:font-normal placeholder:text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-app-background-card-secondary text-app-button-text-color font-plusJakartaSans font-normal text-[15px] px-8 py-2 rounded-lg">
            Apply
          </button>
        </div>

        {/* Details List */}
        <div className="mt-6 space-y-0">
          {cartData.length > 0 ? (
            cartData.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-4 bg-app-background-primary border border-app-range-slider-track-active"
              >
                <div className="flex items-center gap-4">
                  {/* <div className="w-7 h-7 border border-gray-600 rounded-md flex items-center justify-center">
                    -
                  </div> */}
                  <TwoTicketsIcon className="" />
                  <p className="text-app-blog-card-author-text font-plusJakartaSans font-normal text-[13px]">
                    {item.name}
                  </p>
                </div>
                <p className="text-app-blog-card-author-text font-plusJakartaSans font-normal text-[16px]">
                  {item.price} USD
                </p>
              </div>
            ))
          ) : (
            <p className="text-app-text-gray font-plusJakartaSans font-normal text-[15px]">
              No items in cart
            </p>
          )}
        </div>

        {/* Pay With */}
        <div
          onClick={onPayWithWalletClick}
          className="flex justify-between items-center p-4 border-t border border-app-range-slider-track-active"
        >
          <p className="text-app-blog-card-author-text font-plusJakartaSans font-normal text-[16px]">
            Pay with
          </p>
          <div className="flex items-center gap-3">
            <CryptoIcon className="" />
            <CreditCardIcon className="" />
          </div>
        </div>
        <div className="mt-6">
          {/* <button
            onClick={triggerPaypalButton}
            className="w-full bg-app-background-card-secondary text-app-button-text-color font-plusJakartaSans font-normal text-[16px] py-3 rounded-lg flex items-center justify-center gap-2"
          >
            Pay Now
          </button> */}

          {/* <PaymentPage amountToPay={amountToPay} /> */}

          <PayPalButtons
            fundingSource={FUNDING.PAYPAL}
            style={{ layout: "vertical" }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={(err) => {
              console.error("PayPal Button Error:", err);
              alert("An error occurred with the payment. Please try again.");
            }}
          />
        </div>
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
  );
};
