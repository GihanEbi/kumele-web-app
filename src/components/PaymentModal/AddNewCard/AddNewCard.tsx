// app/components/AddCardModal.tsx
"use client";

import CheckMarkGif from "@/components/GifComponents/CheckMarkGif/CheckMarkGif";
import InputComponent from "@/components/InputComponent/InputComponent";
import React, { useState } from "react";
import { BackToPageIcon, Eye2Icon } from "../../../../public/svg-icons/icons";
import { useTheme } from "next-themes";

// --- Icons for the Add Card Modal ---

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
);

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  if (!isOpen) {
    return null;
  }

  const inputStyles =
    "w-full mt-2 bg-app-input-primary border-transparent rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-app-text-secondary placeholder-gray-100";

  const handleAddCardSuccess = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  return (
    <div
      className={`fixed inset-0 z-2000 flex flex-col ${
        isSuccess && isDark
          ? "bg-neutral-900"
          : isSuccess && !isDark
          ? "bg-gray-200"
          : "bg-app-background-primary"
      }  font-sans`}
    >
      {/* Header */}
      <div className="p-4  border-gray-200">
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <button onClick={onClose} className="p-2 -ml-2">
            <BackToPageIcon className="w-6 h-6" />
          </button>
          <h2 className="text-heading text-app-blog-card-heading">Add Card</h2>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-grow p-6 space-y-6 overflow-y-auto">
        <div className="max-w-md mx-auto flex flex-col gap-6">
          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-body mb-3">
              Country
            </label>
            <div className="relative">
              <select
                id="country"
                className={`${inputStyles} appearance-none pr-10`}
              >
                <option>Albania</option>
                <option>United States</option>
                <option>Canada</option>
              </select>
              <ChevronDownIcon
                className="w-6 h-6 
                absolute right-4 top-1/2 -translate-y-1/2 mt-1"
              />
            </div>
          </div>

          {/* Cardholder's name */}
          <div>
            <label htmlFor="cardholder-name" className="block text-body mb-3">
              Cardholder's name
            </label>

            <InputComponent placeholder="cardholder-name" />
          </div>

          {/* Card number */}
          <div>
            <label htmlFor="card-number" className="block text-body mb-3">
              Card number
            </label>
            <div className="relative">
              <InputComponent placeholder="•••• •••• •••• 4234" />
              <Eye2Icon
                className="w-6 h-6 
                absolute right-4 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          {/* Expiry and CVC */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="expiry-date" className="block text-body mb-3">
                Expiry date
              </label>

              <InputComponent placeholder="MM-YY" />
            </div>
            <div className="flex-1">
              <label htmlFor="cvc" className="block text-body mb-3">
                CVC
              </label>

              <InputComponent placeholder="XXX" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="p-6  border-gray-200 mb-20">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleAddCardSuccess}
            className="w-full bg-app-background-card-secondary text-app-button-text-color text-body py-4 rounded-lg"
          >
            Add card
          </button>
        </div>
      </div>
      {isSuccess && (
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
                Card added successfully
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
