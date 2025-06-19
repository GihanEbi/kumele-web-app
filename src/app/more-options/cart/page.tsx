"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

// --- Import all MODAL components ---
import { AddCardModal } from "@/components/PaymentModal/AddNewCard/AddNewCard";
import { SendPaymentModal } from "@/components/PaymentModal/SendPayment/SendPayment";
import { CoinbasePaymentModal } from "@/components/PaymentModal/CoinBasePaymentModal/CoinBasePaymentModal";
import { PaymentCompleteModal } from "@/components/PaymentModal/PaymentCompleteModal/PaymentCompleteModal";

import {
  BackToPageIcon,
  CreditCardIcon,
  CryptoIcon,
  MastercardIcon,
  TwoTicketsIcon,
} from "../../../../public/svg-icons/icons";
import CheckMarkGif from "@/components/GifComponents/CheckMarkGif/CheckMarkGif";

// --- Inlined PlusIcon from your original component ---
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

const PaymentPage = () => {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // --- STATE MANAGEMENT for the POP-UP MODALS & OVERLAYS ---
  const [isAddCardModalOpen, setAddCardModalOpen] = useState(false);
  const [isSendPaymentOpen, setSendPaymentOpen] = useState(false);
  const [isCoinbaseOpen, setCoinbaseOpen] = useState(false);
  const [isThankYouOpen, setThankYouOpen] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  // --- EVENT HANDLERS ---
  const handlePaymentSuccess = () => {
    setIsPaymentSuccess(true);
    setTimeout(() => {
      setIsPaymentSuccess(false); // Hide the GIF overlay
      //setThankYouOpen(true); // Open the final "Payment Complete" modal
    }, 5000); // Wait for 3 seconds
  };

  return (
    // Main page container. This is NOT a modal.
    <div className="min-h-screen bg-app-background-primary font-sans">
      <div className={`mx-auto max-w-2xl ${
        isPaymentSuccess && isDark
          ? "bg-neutral-900"
          : isPaymentSuccess && !isDark
          ? "bg-gray-200"
          : "bg-app-background-primary"
      } `}>
        <div className="flex-grow p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center gap-4">
            <button onClick={() => router.push("/user/home")} className="">
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

          {/* Discount Code */}
          <div className="mt-6 flex flex-row sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter Discount code"
              className="flex-grow bg-app-search-bar-background rounded-lg px-4 py-3 text-white placeholder-app-search-bar-text placeholder:font-plusJakartaSans placeholder:font-normal placeholder:text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-app-background-card-secondary text-app-button-text-color font-plusJakartaSans font-normal text-[15px] px-8 py-2 rounded-lg">
              Apply
            </button>
          </div>

          {/* Details List */}
          <div className="mt-6 space-y-0">
            <div className="flex justify-between items-center p-4 bg-app-background-primary border border-app-range-slider-track-active">
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 border-2 border-app-radio-button-color rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-app-radio-button-color rounded-full"></div>
                </div>
                <div>
                  <p className="text-app-blog-card-author-text font-plusJakartaSans font-normal text-[16px] tracking-wider">
                    •••• •••• •••• 4634
                  </p>
                  <p className="font-plusJakartaSans font-normal text-[13px] text-app-blog-card-author-text mt-1">
                    Expires 12-08-23
                  </p>
                </div>
              </div>
              <MastercardIcon />
            </div>

            <div className="flex justify-between items-center p-4 bg-app-background-primary border border-app-range-slider-track-active">
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
            </div>

            <div className="flex justify-between items-center p-4 bg-app-background-primary border border-app-range-slider-track-active ">
              <div className="flex items-center gap-4">
                <div className="w-7 h-7 border border-gray-600 rounded-md flex items-center justify-center">
                  -
                </div>
                <div>
                  <p className="text-app-blog-card-author-text font-plusJakartaSans font-normal text-[16px]">
                    Pre event advert
                  </p>
                  <p className="text-app-blog-card-author-text font-plusJakartaSans font-normal text-[13px] mt-1">
                    7 days pre advertising
                  </p>
                </div>
              </div>
              <p className=" text-app-blog-card-author-text font-plusJakartaSans font-normal text-[16px]">
                13.7 USD
              </p>
            </div>

            <div
              onClick={() => setSendPaymentOpen(true)}
              className="flex justify-between items-center p-4 border-t border border-app-range-slider-track-active cursor-pointer"
            >
              <p className="text-app-blog-card-author-text font-plusJakartaSans font-normal text-[16px]">
                Pay with
              </p>
              <div className="flex items-center gap-3">
                <CryptoIcon className="" />
                <CreditCardIcon className="" />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setAddCardModalOpen(true)}
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
      </div>

      <AddCardModal
        isOpen={isAddCardModalOpen}
        onClose={() => setAddCardModalOpen(false)}
      />

      <SendPaymentModal
        isOpen={isSendPaymentOpen}
        onClose={() => setSendPaymentOpen(false)}
        onPayWithWalletClick={() => {
          setSendPaymentOpen(false);
          setCoinbaseOpen(true);
        }}
      />

      <CoinbasePaymentModal
        isOpen={isCoinbaseOpen}
        onClose={() => {
          setCoinbaseOpen(false);
          setSendPaymentOpen(true);
        }}
        onPayWithCoinbaseClick={() => {
          setCoinbaseOpen(false);
          setThankYouOpen(true);
          //handlePaymentSuccess(); //  show the GIF then the final modal
        }}
      />

      <PaymentCompleteModal
        isOpen={isThankYouOpen}
        onClose={() => setThankYouOpen(false)}
      />

      {isPaymentSuccess && (
        <div className="fixed inset-0 z-[50] bg-opacity-70 flex items-end justify-center">
          <div
            className={`bg-app-background-primary p-8 pt-6 rounded-t-2xl shadow-xl flex flex-col items-center w-full max-w-md transform transition-transform duration-300 ease-out ${
              isPaymentSuccess ? "translate-y-0" : "translate-y-full"
            }`}
          >
             <div className="flex flex-col items-center">
            <div className="mb-4">
              <CheckMarkGif className="bg-white" />
            </div>
            <p className="text-app-text-primary font-plusJakartaSans text-base text-center">
              Payment Successful
            </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
