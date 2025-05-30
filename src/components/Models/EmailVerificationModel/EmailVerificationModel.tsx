"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { VerifyEmailIcon } from "../../../../public/svg-icons/icons";
import InputComponent from "@/components/InputComponent/InputComponent";
import Image from "next/image";
import { verification_email } from "@/routes/signup_and_signin";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { saveToken } from "@/utils/authUtils";

// props types
type EmailVerificationModelProps = {
  isOpen: boolean;
  onClose: () => void;
  email: string; // email prop if needed for verification
};

const EmailVerificationModel: React.FC<EmailVerificationModelProps> = ({
  isOpen,
  onClose,
  email,
}) => {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [showVerificationFailed, setShowVerificationFailed] =
    useState<boolean>(false);

  // --------- state for loading spinner ---------
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset the verification code when the modal opens
      setVerificationCode("");
    }
  }, [isOpen]);

  const handleVerify = async () => {
    // Prevent multiple clicks while loading
    if (loading) return;
    setLoading(true);
    // Check if verification code is not empty
    if (verificationCode.trim() !== "") {
      const dataObj = {
        email: email,
        code: verificationCode.trim(),
      };
      try {
        const data = await verification_email(dataObj);
        if (data.success) {
          setIsVerified(true);
          setShowVerificationFailed(false);
          console.log(data.data.user_token);
          saveToken(data.data.user_token);
          router.push("/authentication/chooseInterests");
        } else {
          setIsVerified(false);
          setShowVerificationFailed(true);
          console.log(data);
        }
      } catch (error) {
        console.error("Error during verification:", error);
      } finally {
        setLoading(false); // Stop loading spinner after verification attempt
      }
    } else {
      alert("Please enter a verification code.");
    }
  };

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
      {/* verification complete */}
      {isVerified && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-50 transition-opacity duration-300 ease-in-out"
          onClick={onClose}
        >
          <div
            className={`bg-white w-full max-w-md p-6 sm:p-8 rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <Image
                  src="/common-gifs/email-verification-succsess.gif"
                  alt="Success"
                  width={100}
                  height={100}
                />
              </div>
              <p className="text-gray-600 text-sm mb-6 text-center">
                Verification successful
              </p>
            </div>
          </div>
        </div>
      )}

      {/* verification failed */}
      {!isVerified && showVerificationFailed && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-50 transition-opacity duration-300 ease-in-out"
          onClick={onClose}
        >
          <div
            className={`bg-white w-full max-w-md p-6 sm:p-8 rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <Image
                  src="/common-gifs/verification-wrong.gif"
                  alt="Success"
                  width={100}
                  height={100}
                />
              </div>
              <p className="text-gray-600 text-sm mb-6 text-center">
                Verification code is wrong
              </p>
            </div>
          </div>
        </div>
      )}

      {/* verification */}
      {isOpen && !isVerified && !showVerificationFailed && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-50 transition-opacity duration-300 ease-in-out"
          onClick={onClose}
        >
          <div
            className={`bg-white w-full max-w-md p-6 sm:p-8 rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <VerifyEmailIcon />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                Verify E-mail
              </h2>
              <p className="text-gray-600 text-sm mb-6 text-center">
                Please enter the verification code sent to your e-mail.
              </p>

              <div className="w-full">
                <div className="mb-6">
                  <InputComponent
                    placeholder="Enter E-mail verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-1 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 py-3 px-4 bg-black text-white rounded-lg hover:bg-gray-800 font-medium transition-colors"
                    onClick={() => {
                      handleVerify();
                    }}
                  >
                    Ok
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

export default EmailVerificationModel;
