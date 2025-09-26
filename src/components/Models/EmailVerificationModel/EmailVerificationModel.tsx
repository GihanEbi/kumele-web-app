"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { VerifyEmailIcon } from "../../../../public/svg-icons/icons";
import InputComponent from "@/components/InputComponent/InputComponent";
import Image from "next/image";
import {
  login,
  register,
  verification_email,
} from "@/routes/signup_and_signin";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { saveToken } from "@/utils/authUtils";
import CheckMarkGif from "@/components/GifComponents/CheckMarkGif/CheckMarkGif";
import ErrorGif from "@/components/GifComponents/ErrorGif/ErrorGif";
import {
  getPartnershipToken,
  removeNewPartnershipUser,
  saveNewPartnershipUser,
} from "@/utils/partnershipUtils";
import SuccessModel from "../SuccessModel/SuccessModel";
import ErrorModel from "../ErrorModel/ErrorModel";

interface FormData {
  email: string;
  password: string;
  confirm_password: string;
  language: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  referralCode: string;
  aboveLegalAge: boolean;
  termsAndConditionsAccepted: boolean;
  subscribedToNewsletter: boolean;
  beta_code: string;
}

// props types
type EmailVerificationModelProps = {
  isOpen: boolean;
  onClose: () => void;
  //email: string; // email prop if needed for verification
  //password: string; // optional password prop if needed for login
  formData: FormData;
};

const EmailVerificationModel: React.FC<EmailVerificationModelProps> = ({
  isOpen,
  onClose,
  //email,
  //password,
  formData,
}) => {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [showVerificationFailed, setShowVerificationFailed] =
    useState<boolean>(false);

  //   loading state
  const [loading, setLoading] = useState(false);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // state for open
  const [modelOpen, setModelOpen] = useState<boolean>(isOpen);
  const isPartnerShipAccount = getPartnershipToken();

  useEffect(() => {
    if (isOpen) {
      // Reset the verification code when the modal opens
      setVerificationCode("");
    }
    removeNewPartnershipUser(); // Clear the new partnership user token when the modal opens
  }, [isOpen]);

  const closeHandler = () => {
    setIsVerified(false);
    setShowVerificationFailed(true);
    // set 2 seconds timeout
    setTimeout(() => {
      setModelOpen(true);
      setIsVerified(false);
      setShowVerificationFailed(false);
    }, 2000);
  };

  const userLogin = async () => {
    try {
      const dataObj = {
        email: formData.email,
        password: formData.password,
      };
      if (dataObj.password) {
        const data = await login(dataObj);
        if (data.success && data.data.token) {
          saveToken(data.data.token);
        } else {
          setError("Login failed after registration: " + data.message);
          setShowErrorModel(true);
          setTimeout(() => setShowErrorModel(false), 3600);
        }
      }
    } catch (error) {
      setError("An unexpected error occurred during login.");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
    }
  };

  const userRegister = async () => {
    try {
      const { confirm_password, ...formDataWithoutConfirm } = formData;
      const registrationResponse = await register(formDataWithoutConfirm);
      return registrationResponse;
    } catch (error) {
      setError("An unexpected error occurred during registration.");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return { success: false, message: "An unexpected error occurred." };
    }
  };

  const handle_otp_verification = async () => {
    if (loading || !verificationCode.trim()) return;

    setLoading(true);
    setShowVerificationFailed(false);

    try {
      const otpData = {
        email: formData.email,
        otp: verificationCode.trim(),
      };

      const otpResponse = await verification_email(otpData);

      if (otpResponse.success) {
        const registerResponse = await userRegister();

        if (registerResponse.success) {
          await userLogin();
          setIsVerified(true);
          setModelOpen(false);

          setTimeout(() => {
            if (isPartnerShipAccount === "yes") {
              saveNewPartnershipUser("yes");
              router.push("/user/partnership-home");
            } else {
              router.push("/authentication/chooseInterests");
            }
          }, 1000);
        } else {
          setError("Registration failed: " + registerResponse.message);
          setShowErrorModel(true);
          setTimeout(() => setShowErrorModel(false), 3600);
        }
      } else {
        setError("OTP verification failed: " + otpResponse.message);
        setShowErrorModel(true);
        setTimeout(() => setShowErrorModel(false), 3600);
      }
    } catch (error) {
      setError("An unexpected error occurred during verification.");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
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
            className={`bg-app-background-primary w-full max-w-md p-6 sm:p-8 rounded-t-3xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            <div className="flex flex-col items-center mb-6">
              <div className="mb-4">
                <CheckMarkGif />
              </div>
              <p className="text-app-text-primary font-plusJakartaSans text-sm mb-6 text-center">
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
            className={`bg-app-background-primary  w-full max-w-md p-6 sm:p-8 rounded-t-3xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            <div className="flex flex-col items-center mb-6">
              <div className="mb-4">
                <ErrorGif />
              </div>
              <p className="text-app-text-primary font-plusJakartaSans text-sm mb-10 text-center">
                Verification code is wrong
              </p>
            </div>
          </div>
        </div>
      )}

      {/* verification */}
      {modelOpen && !isVerified && !showVerificationFailed && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-50 transition-opacity duration-300 ease-in-out"
          onClick={onClose}
        >
          <div
            className={`bg-app-background-primary w-full max-w-md p-6 sm:p-8 rounded-t-4xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <VerifyEmailIcon
                  className="text-app-icon"
                  width={80}
                  height={80}
                />
              </div>
              <h2 className="text-md font-bold font-plusJakartaSans text-app-text-primary mb-4 text-center">
                Verify E-mail
              </h2>
              {/* <p className="text-gray-600 text-sm mb-6 text-center">
                Please enter the verification code sent to your e-mail.
              </p> */}

              <div className="w-full">
                <div className="mb-6">
                  <InputComponent
                    placeholder="Enter E-mail verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </div>
                <div className="flex space-x-3 mb-8">
                  <button
                    type="button"
                    onClick={() => {
                      // onClose();
                      closeHandler();
                    }}
                    className="flex-1 py-3 text-sm px-4 bg-app-button-primary text-app-text-tertiary rounded-lg font-plusJakartaSans"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 py-3 text-sm px-4 bg-app-button-primary text-app-text-tertiary rounded-lg font-plusJakartaSans"
                    onClick={() => {
                      //router.push("/authentication/chooseInterests")

                      handle_otp_verification();
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
      <SuccessModel
        isOpen={showSuccessModel}
        onClose={() => {
          setShowSuccessModel(false);
          setSuccess("");
        }}
        successMessage={success || ""}
      />
      <ErrorModel
        isOpen={showErrorModel}
        onClose={() => {
          setShowErrorModel(false);
          setError("");
        }}
        errorMessage={error || ""}
      />
    </div>
  );
};

export default EmailVerificationModel;
