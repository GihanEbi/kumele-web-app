"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CloseIcon, VerifyEmailIcon } from "../../../../public/svg-icons/icons";
import InputComponent from "@/components/InputComponent/InputComponent";
import Image from "next/image";
import {
  login,
  register,
  sendPasswordResetEmail,
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
import CheckBoxComponent from "@/components/CheckBoxComponent/CheckBoxComponent";
import ErrorModel from "../ErrorModel/ErrorModel";
import SuccessModel from "../SuccessModel/SuccessModel";

// props types
type ForgotPasswordModelProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ForgotPasswordModel: React.FC<ForgotPasswordModelProps> = ({
  isOpen,
  onClose,
}) => {
  // form data
  const [email, setEmail] = useState<string>("");
  // loading state
  const [loading, setLoading] = useState<boolean>(false);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) {
    return null;
  }

  // handle form submit
  const handleSubmit = async () => {
    if (loading) return;
    if (!email?.trim()) {
      setError("Email is required.");
      setShowErrorModel(true); // you can render a simple error modal/toast if desired
      setTimeout(() => setShowErrorModel(false), 3600);
      return;
    }
    setLoading(true);
    try {
      const payload = {
        email: email.trim(),
      };
      const json = await sendPasswordResetEmail(payload);
      //   resetEmail("");
      setEmail("");

      if (json?.success) {
        setShowSuccessModel(true);
        setTimeout(() => {
          setShowSuccessModel(false);
          onClose();
        }, 3600);
        return;
      }
      setError(json?.message);
      setShowErrorModel(true); // you can render a simple error modal/toast if desired
      setTimeout(() => setShowErrorModel(false), 3600);
      onClose();
      return;
    } catch (error: any) {
      setError("Sign in failed");
      setShowErrorModel(true); // you can render a simple error modal/toast if desired
      setTimeout(() => setShowErrorModel(false), 3600);
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

      <div
        className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-50 transition-opacity duration-300 ease-in-out"
        onClick={onClose}
      >
        <div
          className={`${
            showErrorModel || showSuccessModel
              ? "bg-k-background-secondary"
              : "bg-app-background-primary"
          } w-full max-w-md p-6 sm:p-8 rounded-t-4xl shadow-xl transform transition-transform duration-300 ease-out ${
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
                  placeholder="Enter E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex space-x-3 mb-8">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                  }}
                  className="flex-1 py-3 text-sm px-4 bg-app-button-primary text-app-text-tertiary rounded-lg font-plusJakartaSans"
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-3 text-sm px-4 bg-app-button-primary text-app-text-tertiary rounded-lg font-plusJakartaSans"
                  onClick={() => {
                    //router.push("/authentication/chooseInterests")

                    handleSubmit();
                  }}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ErrorModel
        isOpen={showErrorModel}
        onClose={() => {
          setShowErrorModel(false);
          setError("");
        }}
        errorMessage={error || ""}
      />
      <SuccessModel
        isOpen={showSuccessModel}
        onClose={() => {
          setShowSuccessModel(false);
        }}
        successMessage={"Password reset link sent successfully!"}
      />
    </div>
  );
};

export default ForgotPasswordModel;
