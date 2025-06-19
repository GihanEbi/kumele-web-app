"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CloseIcon,
  FaceIdIcon,
  ThumbIcon,
} from "../../../../../public/svg-icons/icons";

// props types
type passkeyModelProps = {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;

};

const SignInPasskey: React.FC<passkeyModelProps> = ({ isOpen, onClose, onContinue }) => {
  if (!isOpen) {
    return null; // Don't render anything if the modal is not open
  }
  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-1000 transition-opacity duration-300 ease-in-out"
          onClick={onClose}
        >
          <div
            className={`bg-app-background-model w-full max-w-md p-6 sm:p-8 rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            {/* Top section: Icon, Title, Close Button */}
            <div className="grid grid-cols-3 items-center mb-4">
              <h1 className="text-lg text-center text-app-text-primary font-plusJakartaSans">
                Sign-in
              </h1>
              <h1 className="text-lg text-center font-bold text-app-text-primary font-plusJakartaSans">
                Passkey
              </h1>
              <button
                onClick={() => {
                  onClose();
                }}
                aria-label="Close notification prompt"
                className="p-1 -m-1 text-gray-500 hover:text-gray-700 transition-colors justify-self-end"
              >
                <CloseIcon className="text-app-icon" />
              </button>
            </div>

            <p className="text-sm px-12 text-center text-app-text-primary font-plusJakartaSans">
              Do you want to sign-in to "Kumele.com" with your saved passkey?
            </p>

            <div className="flex gap-12 item-center justify-center mt-8">
              <div className="flex flex-col items-center ">
                <FaceIdIcon className="text-app-icon" />
                <p className="text-sm text-center text-app-text-primary font-plusJakartaSans">
                  Face ID
                </p>
              </div>
              <div className="flex flex-col items-center ">
                <ThumbIcon className="text-app-icon" />
                <p className="text-sm text-center text-app-text-primary font-plusJakartaSans">
                  Thumb ID
                </p>
              </div>
            </div>
            <div className="mt-6">
              <button
                className="w-full bg-app-button-primary text-app-text-tertiary py-3.5 rounded-lg font-plusJakartaSans text-md"
                onClick={() => {onContinue()}}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInPasskey;
