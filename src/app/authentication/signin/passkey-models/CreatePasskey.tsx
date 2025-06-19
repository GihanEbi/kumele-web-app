"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CloseIcon,
  FaceIdIcon,
  ThumbIcon,
} from "../../../../../public/svg-icons/icons";
import InputComponent from "@/components/InputComponent/InputComponent";

// props types
type passkeyModelProps = {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
};
const CreatePasskey: React.FC<passkeyModelProps> = ({
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
            className={`bg-app-background-model w-full max-w-md p-6 sm:p-8 rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            {/* Top section: Icon, Title, Close Button */}
            <div className="flex justify-between mb-4">
              <div></div>
              <h1 className="text-lg text-center font-bold text-app-text-primary font-plusJakartaSans">
                Passkey
              </h1>
              <button
                onClick={() => {
                  onClose();
                }}
                aria-label="Close notification prompt"
                className="p-1 -m-1 text-gray-500"
              >
                <CloseIcon className="text-app-icon" />
              </button>
            </div>

            <p className="text-sm px-12 text-center text-app-text-primary font-plusJakartaSans">
              Signup using passkey
            </p>

            <div className="mt-5">
              <InputComponent placeholder="Enter email" />
            </div>
            <div className="mt-5">
              <InputComponent placeholder="Enter Password" />
            </div>
            <div className="mt-6">
              <button
                className="w-full bg-app-button-primary text-app-text-tertiary py-3.5 rounded-lg font-plusJakartaSans text-md"
                onClick={() => {
                  onContinue();
                }}
              >
                Create Passkey
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePasskey;
