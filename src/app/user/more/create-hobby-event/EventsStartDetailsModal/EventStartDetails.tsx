"use client";

import React, { useEffect } from "react";
import {
  CloseIcon,
  SpeakerIcon,
} from "../../../../../../public/svg-icons/icons";
import HotChocolateGif from "@/components/GifComponents/HotChocolateGif/HotChocolateGif";

const StartTimePriceTiers = [
  { line1: "Event starts in", line2: "48 hrs.", price: "$6.00" },
  { line1: "Event starts in", line2: "7 days", price: "$6.00" },
];

interface EventsTimeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventsTimeDetailsModal: React.FC<EventsTimeDetailsModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Effect to lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-zinc-800 p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
          aria-label="Close"
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        <div className="flex justify-center">
          <HotChocolateGif width={75} height={75} className="dark:bg-white" />
        </div>

        <h2 className="mt-4 text-center text-app-button-model-text-color font-plusJakartaSans font-bold text-[19px]">
          Advert
        </h2>

        <div className="mt-6 space-y-4">
          {StartTimePriceTiers.map((tier, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SpeakerIcon className="h-8 w-8 flex-shrink-0" />

                <div>
                  <p className="font-plusJakartaSans text-[18px] font-bold text-app-button-model-text-color">
                    {tier.line1}
                  </p>
                  <p className="font-plusJakartaSans text-[18px] font-bold text-app-button-model-text-color">
                    {tier.line2}
                  </p>
                </div>
              </div>

              <p className="font-plusJakartaSans text-[19px] font-bold text-app-button-model-text-color">
                {tier.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsTimeDetailsModal;
