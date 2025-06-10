"use client";

import React, { useState } from "react";
import {
  BackToPageIcon,
  CreditCardIcon,
  CryptoIcon,
  MastercardIcon,
  TwoTicketsIcon,
} from "../../../public/svg-icons/icons";
import CheckMarkGif from "../GifComponents/CheckMarkGif/CheckMarkGif";
import { useTheme } from "next-themes";

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
  onPayWithWalletClick: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onAddNewCardClick,
  onPayWithWalletClick
}) => {
  const [isPaymentSuccess, setIsPaymentSuccess]= useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  if (!isOpen) {
    return null;
  };

  const handlePaymentSuccess = () => {
    setIsPaymentSuccess(true);
    setTimeout(() => {
      setIsPaymentSuccess(false);
    }, 5000);
  };

  return (
    <div className={`mx-auto fixed inset-0 z-2000 flex flex-col ${
        isPaymentSuccess && isDark
          ? "bg-neutral-900"
          : isPaymentSuccess && !isDark
          ? "bg-gray-200"
          : "bg-app-background-primary"
      }   font-sans`}>
      <div className="flex-grow p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="">
            <BackToPageIcon className="w-6 h-6" />
          </button>
          <h2 className="text-heading text-app-blog-card-heading">Payment</h2>
        </div>

        {/* Amount */}
        <div className="mt-8">
          <p className="text-app-blog-card-heading text-body">Amount to pay</p>
          <p className="text-app-text-blue text-heading mt-1">$23.07</p>
        </div>

        {/* Discount Code */}
        <div className="mt-6 flex flex-row sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter Discount code"
            className="flex-grow bg-app-search-bar-background  rounded-lg px-4 py-3 text-white placeholder-app-search-bar-text placeholder:text-body focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-app-background-card-secondary text-app-button-text-color text-body px-8 py-2 rounded-lg">
            Apply
          </button>
        </div>

        {/* Details List */}
        <div className="mt-6 space-y-0">
          {/* Saved Card */}
          <div className="flex justify-between items-center p-4 bg-app-background-primary border border-app-range-slider-track-active">
            <div className="flex items-center gap-4">
              <div className="w-5 h-5 border-2 border-app-radio-button-color rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-app-radio-button-color rounded-full"></div>
              </div>

              <div>
                <p className="text-app-blog-card-author-text text-body tracking-wider">
                  •••• •••• •••• 4634
                </p>
                <p className="text-xs text-app-blog-card-author-text mt-1">Expires 12-08-23</p>
              </div>
            </div>
            <MastercardIcon />
          </div>

          {/* Line Item 1 */}
          <div className="flex justify-between items-center p-4 bg-app-background-primary border border-app-range-slider-track-active">
            <div className="flex items-center gap-4">
              <div className="w-7 h-7 border border-gray-600 rounded-md flex items-center justify-center">
                -
              </div>
              <TwoTicketsIcon className="" />
              <p className="text-app-blog-card-author-text text-body">6-20</p>
            </div>
            <p className="text-app-blog-card-author-text text-body">10 USD</p>
          </div>

          {/* Line Item 2 */}
          <div className="flex justify-between items-center p-4 bg-app-background-primary border border-app-range-slider-track-active ">
            <div className="flex items-center gap-4">
              <div className="w-7 h-7 border border-gray-600 rounded-md flex items-center justify-center">
                -
              </div>
              <div>
                <p className="text-app-blog-card-author-text text-body">Pre event advert</p>
                <p className="text-app-blog-card-author-text text-caption mt-1">
                  7 days pre advertising
                </p>
              </div>
            </div>
            <p className=" text-app-blog-card-author-text text-body">13.7 USD</p>
          </div>

          {/* Pay With */}
          <div onClick={onPayWithWalletClick} className="flex justify-between items-center p-4 border-t border border-app-range-slider-track-active">
            <p className="text-app-blog-card-author-text text-body">Pay with</p>
            <div className="flex items-center gap-3">
              <CryptoIcon className="" />
              <CreditCardIcon className="" />
            </div>
          </div>
        </div>

        {/* Add new card button */}
        <div className="mt-6">
          <button onClick={onAddNewCardClick}  className="w-full bg-app-background-card-secondary text-app-button-text-color text-body py-3 rounded-lg flex items-center justify-center gap-2">
            <PlusIcon className="w-5 h-5" />
            Add new card
          </button>
        </div>
        <div className="mt-6">
          <button onClick={handlePaymentSuccess} className="w-full bg-app-background-card-secondary text-app-button-text-color text-body py-3 rounded-lg flex items-center justify-center gap-2">
            <PlusIcon className="w-5 h-5" />
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
            className={`bg-app-background-primary w-full max-w-md p-6 sm:p-8 rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <CheckMarkGif className="text-white" />
              </div>
              <p className="text-app-text-primary font-plusJakartaSans text-sm mb-6 text-center">
                Payment Successful
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
