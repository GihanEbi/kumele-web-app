import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { CardTitle } from "@/components/ui/card";
import { Card, CardHeader } from "@mui/material";
import React, { useState } from "react";
import { CloseIcon } from "../../../../public/svg-icons/icons";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InputComponent from "@/components/InputComponent/InputComponent";
import CheckBoxComponent from "@/components/CheckBoxComponent/CheckBoxComponent";

// props types
type AuthenticatorModelProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AuthenticatorModel: React.FC<AuthenticatorModelProps> = ({
  isOpen,
  onClose,
}) => {
  // --------- state for loading spinner ---------
  const [loading, setLoading] = useState(false);

  if (!isOpen) {
    return null; // Don't render anything if the modal is not open
  }

  return (
    <div>
      {/* Loading spinner */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-50 transition-opacity duration-300 ease-in-out"
          onClick={onClose}
        >
          <div
            className={`bg-app-background-model w-full max-w-md p-6 sm:p-8 rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            {/* Top section: Icon, Title, Close Button */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-app-text-primary font-plusJakartaSans">
                Authenticator App Setup
              </h1>
              <button
                onClick={() => {
                  onClose();
                }}
                aria-label="Close notification prompt"
                className="p-1 -m-1 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <CloseIcon className="text-app-icon" />
              </button>
            </div>

            {/* body */}
            <div className="flex flex-col">
              {/* Step 1 */}
              <div className="space-y-3">
                <p className="text-sm font-plusJakartaSans text-app-text-primary">
                  1. Open an authenticator app on your mobile device
                </p>
                <p className="text-sm font-plusJakartaSans text-app-text-primary">
                  If you don't have one, download and install one of the
                  recommended apps:
                </p>
                <div className="flex pt-2 justify-between">
                  <div className="flex flex-col items-center">
                    <Image
                      src="/images/google-auth.png"
                      alt="Google Authenticator"
                      width={40}
                      height={40}
                    />
                    <span className="text-xs font-plusJakartaSans text-app-text-primary text-center">
                      Google
                      <br /> Authenticator
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Image
                      src="/images/authenticator.png"
                      alt="Authy"
                      width={40}
                      height={40}
                    />
                    <span className="text-xs font-plusJakartaSans text-app-text-primary text-center">
                      Authy
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Image
                      src="/images/duo.png"
                      alt="Duo"
                      width={80}
                      height={80}
                    />
                    <span className="text-xs font-plusJakartaSans text-app-text-primary text-center">
                      Duo
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Image
                      src="/images/microsoft-auth.png"
                      alt="Microsoft Authenticator"
                      width={40}
                      height={40}
                    />
                    <span className="text-xs font-plusJakartaSans text-app-text-primary text-center">
                      Microsoft
                      <br /> Authenticator
                    </span>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="space-y-3 text-center">
                  <p className="text-left text-sm font-plusJakartaSans text-app-text-primary ">
                    2. Scan this barcode with your{" "}
                    <strong className="font-bold text-sm font-plusJakartaSans text-app-text-primary ">
                      authenticator app
                    </strong>
                  </p>
                  <div className="inline-block bg-white p-2 rounded-lg">
                    <Image
                      src="/images/QR-code.png"
                      alt="Authenticator QR code"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-sm font-plusJakartaSans text-app-text-primary "
                    >
                      Can't scan? Use text code instead
                    </Button>
                  </div>
                </div>{" "}
                {/* Step 3 */}
                <div className="space-y-4">
                  <p className="text-sm font-plusJakartaSans text-app-text-primary">
                    3. Enter the six-digit code from the{" "}
                    <strong className="font-bold text-sm font-plusJakartaSans text-app-text-primary">
                      authenticator app
                    </strong>
                  </p>
                  <InputComponent
                    placeholder="Enter Verification Code Here"
                    className="text-base"
                  />
                  <div className="flex items-center space-x-2">
                    <CheckBoxComponent
                      label="Trust this device"
                      onChange={() => {}}
                      value={false}
                    />
                  </div>
                </div>
                <div>
                  <button
                    className="w-full py-3 px-4 bg-app-button-primary text-app-text-tertiary rounded-lg font-plusJakartaSans"
                    onClick={() => {
                        onClose();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthenticatorModel;
