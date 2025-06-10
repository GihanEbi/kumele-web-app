"use client";

import React from "react";
import { Confetti2Icon, LaunchIcon } from "../../../../public/svg-icons/icons";
import Image from "next/image";

const detailsData = [
  { label: "Status", value: "Completed", isLink: true },
  { label: "Order code", value: "Z93B7TWA" },
  { label: "Date & time", value: "Feb 2, 2024, 10:24 AM" },
  { label: "Exchange rate", value: "1 BTC 33.644 USD" },
];

interface PaymentCompleteModalProps {
  isOpen: boolean;
  onClose: () => void; // To close the modal and end the flow
}

export const PaymentCompleteModal: React.FC<PaymentCompleteModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[2000] flex flex-col font-sans bg-app-background-primary">
      <div className="w-full max-w-sm mx-auto p-6 flex flex-col flex-grow">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Confetti2Icon className="w-7 h-7" />
          <h1 className="text-app-blog-card-heading text-2xl">Event Ads</h1>
        </div>

        {/* Success Message Section */}
        <div className="flex flex-col items-center text-center mt-4">
          <Image src="/images/logo.png" alt="logo" width={60} height={60} />
          <h2 className="text-app-blog-card-heading text-xl">Thank You!</h2>
          <p className="text-app-blog-card-author-text">
            Your payment is complete.
          </p>
          <a
            href="#"
            className="text-blue-600 font-semibold mt-2 flex items-center gap-1"
          >
            <button onClick={onClose}>View payment</button>

            <LaunchIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Details Section */}
        <div className="mt-10 space-y-4">
          {detailsData.map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center text-sm"
            >
              <span className="text-app-blog-card-author-text">
                {item.label}
              </span>
              <span
                className={`font-semibold ${
                  item.isLink
                    ? "text-app-text-blue font-semibold"
                    : "text-app-blog-card-author-text"
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Total Section */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-start">
            <span className="font-bold">Total</span>
            <div className="text-right">
              <p className="font-bold">$16.29</p>
              <p className="text-app-blog-card-author-text">0.00048 BTC</p>
            </div>
          </div>
        </div>

        {/* Spacer to push button to the bottom */}
        <div className="flex-grow"></div>
      </div>
    </div>
  );
};
