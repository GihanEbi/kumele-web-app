import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { CardTitle } from "@/components/ui/card";
import { Card, CardHeader } from "@mui/material";
import React, { useState } from "react";
import { CloseIcon } from "../../../../public/svg-icons/icons";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InputComponent from "@/components/InputComponent/InputComponent";
import CheckBoxComponent from "@/components/CheckBoxComponent/CheckBoxComponent";
import { verifyOtp } from "@/routes/profile";

// props types
type AuthenticatorModelProps = {
  isOpen: boolean;
  qrCode: string;
  onClose: () => void;
};

const AuthenticatorModel: React.FC<AuthenticatorModelProps> = ({
  qrCode,
  isOpen,
  onClose,
}) => {
  // --------- state for loading spinner ---------
  const [loading, setLoading] = useState(false);
  // ?state for OTP
  const [otp, setOtp] = useState("");

  if (!isOpen) {
    return null; // Don't render anything if the modal is not open
  }

  const handleSubmitTwoFactor = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const data = await verifyOtp({ otp });
      if (data.success) {
        onClose();
      } else {
        console.log(data.message || "Failed to verify OTP.");
      }
    } catch (error) {
      console.error("Error updating about me:", error);
    } finally {
      setLoading(false);
    }
  };

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
            className={`bg-app-background-model w-full max-w-md p-6 sm:p-8 rounded-t-4xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            {/* Top section: Icon, Title, Close Button */}
            <div className="flex items-center justify-between mb-4">
              <div></div>
              <h1 className="text-[19px] font-plusJakartaSans-700 text-center font-bold text-app-text-primary">
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
            <div className="flex flex-col px-2">
              {/* Step 1 */}
              <div className="">
                <p className="text-[16px] font-plusJakartaSans-400 text-app-text-primary">
                  1. Open an authenticator app on your mobile device
                </p>
                <p className="text-[13px] font-plusJakartaSans-400 text-app-text-primary mt-[12px]">
                  If you don't have one, download and install one of the
                  recommended apps:
                </p>
                <div className="flex justify-between mt-[2px]">
                  <div className="flex flex-col items-center">
                    <Image
                      src="/images/google-auth.png"
                      alt="Google Authenticator"
                      width={69}
                      height={69}
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
                      width={69}
                      height={69}
                    />
                    <span className="text-xs font-plusJakartaSans text-app-text-primary text-center">
                      Authy
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Image
                      src="/images/newDue1.png"
                      alt="Duo"
                      width={69}
                      height={69}
                    />
                    <span className="text-xs font-plusJakartaSans text-app-text-primary text-center">
                      Duo
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Image
                      src="/images/microsoft-auth.png"
                      alt="Microsoft Authenticator"
                      width={69}
                      height={69}
                    />
                    <span className="text-xs font-plusJakartaSans text-app-text-primary text-center">
                      Microsoft
                      <br /> Authenticator
                    </span>
                  </div>
                </div>
                {/* Step 2 */}
                <div className=" text-center mt-[12px]">
                  <p className="text-left text-[16px] font-plusJakartaSans-400 text-app-text-primary ">
                    2. Scan this barcode with your{" "}
                    <strong className="font-bold text-sm font-plusJakartaSans text-app-text-primary ">
                      authenticator app
                    </strong>
                  </p>
                  <div className="inline-block mt-[8px] bg-white pt-2 rounded-lg">
                    {qrCode !== "" && (
                      <Image
                        src={qrCode}
                        alt="QR Code"
                        width={109}
                        height={109}
                        className="object-contain"
                      />
                    )}
                  </div>
                  <div>
                    <Button
                      variant="link"
                      className="text-[13px] font-plusJakartaSans-400 text-app-text-primary "
                    >
                      Can't scan? Use text code instead
                    </Button>
                  </div>
                </div>{" "}
                {/* Step 3 */}
                <div className="">
                  <p className="text-[16px] mt-[12px] font-plusJakartaSans-400 text-app-text-primary">
                    3. Enter the six-digit code from the{" "}
                    <strong className="font-bold text-sm font-plusJakartaSans text-app-text-primary">
                      authenticator app
                    </strong>
                  </p>
                  <div className="mt-[12px]">
                    <InputComponent
                      placeholder="Enter Verification Code Here"
                      className="text-base "
                      onChange={(e) => setOtp(e.target.value)}
                      value={otp}
                    />
                  </div>
                  <div className="flex items-center mt-[14px] space-x-2">
                    <CheckBoxComponent
                      label="Trust this device"
                      onChange={() => {}}
                      value={false}
                    />
                  </div>
                </div>
                <div>
                  <button
                    className="w-full mt-[15px] mb-[10px] text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
                    onClick={() => {
                      handleSubmitTwoFactor();
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
