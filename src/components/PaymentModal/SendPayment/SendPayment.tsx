"use client";

import React, { useState } from "react";
import { Confetti2Icon } from "../../../../public/svg-icons/icons";

interface SendPaymentModalProps {
  isOpen: boolean;
  onClose: () => void; // For the cancel button
  onPayWithWalletClick: () => void;
}

export const SendPaymentModal: React.FC<SendPaymentModalProps> = ({
  isOpen,
  onClose,
  onPayWithWalletClick,
}) => {
  const [copiedItem, setCopiedItem] = useState<"amount" | "address" | null>(
    null
  );

  const BTC_AMOUNT = "0.00079 BTC";
  const BTC_ADDRESS = "0x2d...3b1c";

  const handleCopy = (text: string, identifier: "amount" | "address") => {
    navigator.clipboard.writeText(text);
    setCopiedItem(identifier);
    setTimeout(() => {
      setCopiedItem(null);
    }, 2000);
  };

  if (!isOpen) {
    return null;
  }

  return (
    // This outer div now takes up the full screen with a white background
    <div className="fixed inset-0 z-[2000] flex flex-col font-sans bg-app-background-primary">
      {/* Main content container with padding and max-width */}
      <div className="flex-grow w-full max-w-sm mx-auto p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Confetti2Icon className="w-7 h-7" />
          <h1 className="text-app-blog-card-heading text-2xl">Event Ads</h1>
        </div>

        {/* Title & Description */}
        <div className="w-full">
          <h2 className="text-app-blog-card-heading text-xl">Send payment</h2>
          <p className="text-base app-blog-card-author-text mt-2">
            To make a payment, send BTC to the address below
          </p>
        </div>

        {/* Details Box */}
        <div className="border border-app-range-slider-track-active  mt-8 w-full">
          {/* Amount Row */}
          <div className="flex justify-between items-center p-4">
            <span className="text-app-blog-card-author-text">Amount</span>
            <div className="flex items-center gap-3">
              <span className="text-app-blog-card-author-text font-semibold">
                {BTC_AMOUNT}
              </span>
              <button
                onClick={() => handleCopy(BTC_AMOUNT, "amount")}
                className="text-app-text-blue font-semibold text-sm w-16 text-left"
              >
                {copiedItem === "amount" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
          <hr className="border-app-range-slider-track-active" />
          {/* Address Row */}
          <div className="flex justify-between items-center p-4">
            <span className="text-app-blog-card-author-text">BTC Address</span>
            <div className="flex items-center gap-3">
              <span className="text-app-blog-card-author-text font-semibold">
                {BTC_ADDRESS}
              </span>
              <button
                onClick={() => handleCopy(BTC_ADDRESS, "address")}
                className="text-app-text-blue font-semibold text-sm w-16 text-left"
              >
                {copiedItem === "address" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        {/* This spacer pushes the buttons to the bottom */}
        {/* <div className="flex-grow"></div> */}

        {/* "Or" Divider */}
        <div className="my-6 flex items-center gap-x-4">
          <div className="h-px flex-1 bg-app-range-slider-track-active"></div>
          <span className="text-app-blog-card-author-text">Or</span>
          <div className="h-px flex-1 bg-app-range-slider-track-active"></div>
        </div>

        {/* Buttons at the bottom */}
        <div className="w-full space-y-3">
          <button
            onClick={onPayWithWalletClick}
            className="w-full bg-app-button-primary text-app-button-text-color text-body py-4 rounded-lg"
          >
            Pay with wallet
          </button>
          <button
            onClick={onClose}
            className="w-full text-app-blog-unselected-tabs-text text-body py-4 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
