"use client";

import ErrorGif from "@/components/GifComponents/ErrorGif/ErrorGif";
import React from "react";

// props types
type ErrorModelProps = {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
};

const ErrorModel = ({ isOpen, onClose, errorMessage }: ErrorModelProps) => {
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
            <ErrorGif />
          </div>
          <p className="text-app-text-primary font-plusJakartaSans text-sm mb-10 text-center">
            {errorMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorModel;
