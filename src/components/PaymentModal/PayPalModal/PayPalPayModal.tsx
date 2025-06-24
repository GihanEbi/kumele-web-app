"use client";

import React, { useState } from "react";
import {
  BackToPageIcon,
  CreditCardIcon,
  CryptoIcon,
  MastercardIcon,
  TwoTicketsIcon,
} from "../../../../public/svg-icons/icons";
import CheckMarkGif from "../../GifComponents/CheckMarkGif/CheckMarkGif";
import { useTheme } from "next-themes";
import Image from "next/image";

// --- SVG Icons for the Payment Modal ---

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);

// --- The Modal Component ---
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNewCardClick: () => void;
}

export const PayPalPayModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onAddNewCardClick,
}) => {
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  if (!isOpen) {
    return null;
  }

  const handlePaymentSuccess = () => {
    setIsPaymentSuccess(true);
    setTimeout(() => {
      setIsPaymentSuccess(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-app-background-primary">
      <div
        className={` mx-auto fixed inset-0 z-2000 flex flex-col ${
          isPaymentSuccess && isDark
            ? "bg-neutral-900"
            : isPaymentSuccess && !isDark
            ? "bg-gray-200"
            : "bg-app-background-primary"
        }   `}
      >
        <div className="flex-grow p-6 overflow-y-auto">
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
              $23.07
            </p>
          </div>

          {/* Details List */}
          <div className="mt-6 space-y-0 mb-5">
            {/* Saved Card */}

            {/* Line Item 1 */}
            {/* <div className="flex justify-between items-center p-4 bg-app-background-primary border border-app-range-slider-track-active">
            <div className="flex items-center gap-4">
              <div className="w-7 h-7 border border-gray-600 rounded-md flex items-center justify-center">
                -
              </div>
              <TwoTicketsIcon className="" />
              <p className="text-app-blog-card-author-text font-plusJakartaSans font-normal text-[13px]">
                6-20
              </p>
            </div>
            <p className="text-app-blog-card-author-text font-plusJakartaSans font-normal text-[16px]">
              10 USD
            </p>
          </div> */}

            {/* Line Item 2 */}

            {/* Pay With */}
            <div className="flex justify-between items-center p-4 border-t border border-app-range-slider-track-active">
              <p className="text-app-blog-card-author-text font-plusJakartaSans font-normal text-[16px]">
                Pay with Paypal
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src={"/images/paypal.png"}
                  alt="paypal-image"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>

          {/* Add new card button */}
          <div className="mt-25">
            <button
              onClick={onAddNewCardClick}
              className="w-full bg-app-background-card-secondary text-app-button-text-color font-plusJakartaSans font-normal text-[16px] py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <PlusIcon className="w-5 h-5" />
              Add new card
            </button>
          </div>
          <div className="mt-6">
            <button
              onClick={handlePaymentSuccess}
              className="w-full bg-app-background-card-secondary text-app-button-text-color font-plusJakartaSans font-normal text-[16px] py-3 rounded-lg flex items-center justify-center gap-2"
            >
              Pay Now
            </button>
          </div>
        </div>

        {/* Pay Now Button (Sticky at the bottom) */}
        {isPaymentSuccess && (
          <div
            className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-50 transition-opacity duration-300 ease-in-out"
            onClick={onClose}
          >
            <div
              className={`bg-app-background-primary w-full max-w-md p-6 sm:p-8 rounded-t-4xl shadow-xl transform transition-transform duration-300 ease-out ${
                isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
              }`}
              onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
            >
              <div className="flex flex-col items-center">
                <div className="mb-4">
                  <CheckMarkGif />
                </div>
                <p className="text-app-text-primary font-plusJakartaSans text-sm mb-6 text-center">
                  Payment Successful
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
