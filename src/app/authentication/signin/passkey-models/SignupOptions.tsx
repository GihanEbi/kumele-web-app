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
import CheckMarkGif from "@/components/GifComponents/CheckMarkGif/CheckMarkGif";

// props types
type passkeyModelProps = {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
};
const SignupOptions: React.FC<passkeyModelProps> = ({
  isOpen,
  onClose,
  onContinue,
}) => {
  // state for thumbId
  const [thumbId, setThumbId] = useState(false);
  //   state for verify passkey
  const [verifyPasskey, setVerifyPasskey] = useState(false);
  if (!isOpen) {
    return null; // Don't render anything if the modal is not open
  }
  return (
    <div>
      {verifyPasskey ? (
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
                {/* <Image
                  src="/common-gifs/email-verification-succsess.gif"
                  alt="Success"
                  width={100}
                  height={100}
                /> */}
                <CheckMarkGif />
              </div>
              <p className="text-app-text-primary font-plusJakartaSans text-sm mb-6 text-center">
                Passkey Created
              </p>
            </div>
          </div>
        </div>
      ) : (
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
                    className="p-1 -m-1 text-gray-500 hover:text-gray-700 transition-colors justify-self-end"
                  >
                    <CloseIcon className="text-app-icon" />
                  </button>
                </div>

                <p className="text-sm px-12 text-center text-app-text-primary font-plusJakartaSans">
                  Sign-up using either Face ID or Touch ID
                </p>

                {thumbId ? (
                  <div className="flex item-center justify-center mt-8">
                    <div className="flex flex-col items-center ">
                      <FaceIdIcon className="text-app-icon w-18 h-18" />
                      <p className="text-sm text-center text-app-text-primary font-plusJakartaSans">
                        Face ID
                      </p>
                    </div>
                  </div>
                ) : (
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
                )}
                <div className="mt-6">
                  <button
                    className="w-full bg-app-button-primary text-app-text-tertiary py-3.5 rounded-lg font-plusJakartaSans text-md"
                    onClick={() => {
                      if (thumbId) {
                        setVerifyPasskey(true);
                        setTimeout(() => {
                          onContinue();
                        }, 2000); // Simulate a delay for verification
                      } else {
                        setThumbId(true);
                      }
                    }}
                  >
                    Create Passkey
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SignupOptions;
