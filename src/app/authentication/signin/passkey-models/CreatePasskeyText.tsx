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
const CreatePasskeyText: React.FC<passkeyModelProps> = ({
  isOpen,
  onClose,
  onContinue,
}) => {
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
            className={`bg-app-background-model w-full max-w-md p-6 sm:p-8 rounded-t-4xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            {/* Top section: Icon, Title, Close Button */}
            <div className="flex justify-between mb-[25px]">
              <div></div>
              <h1 className="text-[19px] text-center font-bold text-app-text-primary font-plusJakartaSans-700">
                Create a passkey for your <br />
                Kumele account
              </h1>
              <button
                onClick={() => {
                  onClose();
                }}
                aria-label="Close notification prompt"
                className="p-1 -m-1 text-gray-500"
              >
                <CloseIcon className="text-app-icon" width={24} height={24} />
              </button>
            </div>

            <p className="text-[16px] text-app-text-notifications-body font-plusJakartaSans-400 text-center mb-[30px] px-2">
              Passkeys are easy to set up and let you securely sign in to your
              <span className="font-semibold"> Kumele Account</span> using the
              security capabilities of your devices like Touch ID and Face ID.
              Passkeys are way more secure and are easier to use than all
              current 2-factor authentication methods.
            </p>

            <div className="mt-8 px-2 mb-[35px]">
              <button
                className="w-full text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
                onClick={() => {
                  onContinue();
                }}
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

export default CreatePasskeyText;
