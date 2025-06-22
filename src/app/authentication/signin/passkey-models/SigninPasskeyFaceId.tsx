"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CloseIcon,
  FaceIdIcon,
  ThumbIcon,
} from "../../../../../public/svg-icons/icons";
import CheckMarkGif from "@/components/GifComponents/CheckMarkGif/CheckMarkGif";

// props types
type passkeyModelProps = {
  isOpen: boolean;
  onClose: () => void;
};
const SigninPasskeyFaceId: React.FC<passkeyModelProps> = ({
  isOpen,
  onClose,
}) => {
  const [isVerified, setIsVerified] = useState<boolean>(false);
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
            {isVerified ? (
              <div>
                <div className="grid grid-cols-3 items-center mb-4">
                  <h1 className="text-[19.76px] text-center text-app-text-primary font-plusJakartaSans-500">
                    Sign-in
                  </h1>
                  <div></div>
                  <div></div>
                </div>

                <div className="flex item-center justify-center mt-[60.5px]">
                  <div className="flex flex-col items-center">
                    <div className="mb-4">
                      <CheckMarkGif />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-3 items-center mb-4">
                  <h1 className="text-[19.76px] text-center text-app-text-primary font-plusJakartaSans-500">
                    Sign-in
                  </h1>
                  <h1 className="text-[19px] text-center font-bold text-app-text-primary font-plusJakartaSans-700">
                    Passkey
                  </h1>
                  <button
                    onClick={() => {
                      onClose();
                    }}
                    aria-label="Close notification prompt"
                    className="p-1 -m-1 text-gray-500 hover:text-gray-700 transition-colors justify-self-end"
                  >
                    <CloseIcon
                      className="text-app-icon"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>

                <div className="flex item-center justify-center mt-[88.5px]">
                  <div
                    className="flex flex-col items-center "
                    onClick={() => {
                      setIsVerified(true);
                      // timeout to route the home page
                      setTimeout(() => {
                        onClose();
                      }, 2000);
                    }}
                  >
                    <FaceIdIcon
                      className="text-app-icon"
                      width={80}
                      height={80}
                    />
                    <p className="text-[16px] text-center text-app-text-primary font-plusJakartaSans-400">
                      Face ID
                    </p>
                  </div>
                </div>
                <div className="mt-[102.5px] text-app-text-blue text-[15.14px] text-center font-plusJakartaSans cursor-pointer">
                  <p>Other Sign-In Options</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SigninPasskeyFaceId;
