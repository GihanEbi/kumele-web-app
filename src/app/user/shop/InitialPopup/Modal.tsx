"use client";

import HotChocolateGif from "@/components/GifComponents/HotChocolateGif/HotChocolateGif";
import React from "react";

interface SubscriptionExpirationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionExpirationModal: React.FC<
  SubscriptionExpirationModalProps
> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-8
                 transition-opacity duration-300 ease-in-out
                 ${isOpen ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm text-center rounded-3xl bg-white dark:bg-zinc-900 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          <HotChocolateGif width={75} height={75} />

          <h2 className="mt-6 text-app-button-model-text-color font-plusJakartaSans font-bold text-[19px]">
            Subscription Expiration
          </h2>

          <p className="mt-3 leading-relaxed text-app-button-model-text-color font-plusJakartaSans font-normal text-[16px]">
            Your Yearly Gold subscription will be expiring within one month and
            will be updated automatically. If you want to update or cancel your
            subscription, do it before the charge.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionExpirationModal;
