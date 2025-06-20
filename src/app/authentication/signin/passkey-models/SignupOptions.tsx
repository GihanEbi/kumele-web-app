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
                className={`bg-app-background-model w-full max-w-md p-6 sm:p-8 rounded-t-4xl shadow-xl transform transition-transform duration-300 ease-out ${
                  isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
                }`}
                onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
              >
                {/* Top section: Icon, Title, Close Button */}
                <div className="flex justify-between mb-[40px]">
                  <div></div>
                  <h1 className="text-[19px] text-center font-bold text-app-text-primary font-plusJakartaSans-700">
                    Passkey
                  </h1>
                  <button
                    onClick={() => {
                      onClose();
                    }}
                    aria-label="Close notification prompt"
                    className="p-1 -m-1 text-gray-500"
                  >
                    <CloseIcon
                      className="text-app-icon"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>

                <p className="text-[16px] text-app-text-notifications-body font-plusJakartaSans-400 text-center">
                  Sign-up using either Face ID or Touch ID
                </p>

                {thumbId ? (
                  <div className="flex item-center justify-center mt-[38px]">
                    <div className="flex flex-col items-center ">
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
                ) : (
                  <div className="flex gap-18 item-center justify-center mt-[55px]">
                    <div className="flex flex-col items-center ">
                      <FaceIdIcon
                        className="text-app-icon"
                        width={35}
                        height={35}
                      />
                      <p className="text-[16px] text-center text-app-text-primary font-plusJakartaSans-400">
                        Face ID
                      </p>
                    </div>
                    <div className="flex flex-col items-center ">
                      <ThumbIcon
                        className="text-app-icon"
                        width={35}
                        height={35}
                      />
                      <p className="text-[16px] text-center text-app-text-primary font-plusJakartaSans-400">
                        Thumb ID
                      </p>
                    </div>
                  </div>
                )}
                <div className="mt-[67.5px] px-2 mb-[35px]">
                  <button
                    className="w-full text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
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
