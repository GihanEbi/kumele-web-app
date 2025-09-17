"use client";

import CheckMarkGif from "@/components/GifComponents/CheckMarkGif/CheckMarkGif";
import ErrorGif from "@/components/GifComponents/ErrorGif/ErrorGif";
import React from "react";

// props types
type SuccessModelProps = {
  isOpen: boolean;
  onClose: () => void;
  successMessage: string;
};

const SuccessModel = ({ isOpen, onClose, successMessage }: SuccessModelProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-1000 transition-opacity duration-300 ease-in-out"
      onClick={onClose}
    >
      <div
        className={`bg-app-background-model  w-full max-w-md p-6 sm:p-8 rounded-t-3xl shadow-xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        <div className="flex flex-col items-center mb-6">
          <div className="mb-4">
            <CheckMarkGif />
          </div>
          <p className="text-app-text-primary font-plusJakartaSans text-sm mb-10 text-center">
            {successMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModel;
