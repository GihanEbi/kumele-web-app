"use client";

import React, { useEffect } from "react";
import {
  TwoTicketsIcon,
  CloseIcon,
} from "../../../../../../public/svg-icons/icons";
import HotChocolateGif from "@/components/GifComponents/HotChocolateGif/HotChocolateGif";

// --- Data for the price tiers ---
const priceTiers = [
  { range: "0-5 guests", price: "Free" },
  { range: "21-40 guests", price: "$10.61" },
  { range: "41-60 guests", price: "$14.15" },
  { range: "61-80 guests", price: "$17.69" },
  {
    range: "81-150 guests",
    price: "$21.23",
    subtext: "(max guest Invite 150)",
  },
];

// --- Main Modal Component ---

interface GuestPricesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GuestPricesModal: React.FC<GuestPricesModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Effect to lock body scroll when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup function to reset scroll on component unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    // Backdrop: a semi-transparent overlay that covers the entire screen
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-8"
      onClick={onClose}
    >
      {/* Modal Card: stopPropagation prevents clicks inside from closing the modal */}
      <div
        className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-zinc-800 p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
          aria-label="Close"
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        {/* Top Icon */}
        <div className="flex justify-center">
          {/* <MugIcon className="h-12 w-12 text-black dark:text-white" /> */}
          <HotChocolateGif width={76} height={76} className="dark:bg-white" />
        </div>

        {/* Title */}
        <h2 className="mt-4 text-center text-app-button-model-text-color font-plusJakartaSans font-bold text-[19px]">
          Guest Prices
        </h2>

        {/* Price Tiers List */}
        <div className="mt-6 space-y-4">
          {priceTiers.map((tier, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <TwoTicketsIcon className="h-8 w-8 flex-shrink-0 " />
                <div>
                  <p className="text-app-button-model-text-color font-plusJakartaSans font-bold text-[18.06px]">
                    {tier.range}
                  </p>
                  {tier.subtext && (
                    <p className="text-app-button-model-text-color font-plusJakartaSans font-semibold text-[11.41px]">
                      {tier.subtext}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-app-button-model-text-color font-plusJakartaSans font-bold text-[19px]">
                {tier.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuestPricesModal;
