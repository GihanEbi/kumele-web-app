"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CloseIcon,
  FaceIdIcon,
  ThumbIcon,
} from "../../../../../public/svg-icons/icons";
import {
  finishSigninPasskey,
  startSigninPasskey,
} from "@/routes/signup_and_signin";
import { startAuthentication } from "@simplewebauthn/browser";
import { saveToken } from "@/utils/authUtils";
import {
  getPartnershipToken,
  saveNewPartnershipUser,
} from "@/utils/partnershipUtils";
import ErrorModel from "@/components/Models/ErrorModel/ErrorModel";
import SuccessModel from "@/components/Models/SuccessModel/SuccessModel";

// props types
type passkeyModelProps = {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
};

const SignInPasskey: React.FC<passkeyModelProps> = ({
  isOpen,
  onClose,
  onContinue,
}) => {
  const router = useRouter();
  // --------- state for loading spinner ---------
  const [loading, setLoading] = useState(false);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);

  // --------- state for checkbox value ---------
  const [rememberMe, setRememberMe] = useState(false);
  const [notRobot, setNotRobot] = useState(false);
  // --------- show passkey model ----------
  const [showPasskeyModel, setShowPasskeyModel] = useState(false);
  // --------- show face id model ----------
  const [faceIdModel, setFaceIdModel] = useState(false);
  // --------- state for create passkey model ----------
  const [createPasskeyModel, setCreatePasskeyModel] = useState(false);
  // create passkey
  const [createPasskey, setCreatePasskey] = useState(false);
  // state for signin option
  const [signinOption, setSigninOption] = useState(false);
  const [error, setError] = useState<string | null>(null);
  if (!isOpen) {
    return null; // Don't render anything if the modal is not open
  }

  // handle form submit
  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const passkey = await startSigninPasskey();

      if (!passkey?.success) {
        setError(passkey?.message);
        setShowErrorModel(true); // you can render a simple error modal/toast if desired
        setTimeout(() => setShowErrorModel(false), 3600);
        return;
      }
      // Step 2: Start browser authentication process
      const authenticationResponse = await startAuthentication(passkey.data);
      if (authenticationResponse) {
        const verificationResponse = await finishSigninPasskey({
          authenticationResponse: authenticationResponse,
        });

        if (!verificationResponse?.success) {
          setError(verificationResponse?.message);
          setShowErrorModel(true); // you can render a simple error modal/toast if desired
          setTimeout(() => setShowErrorModel(false), 3600);
          return;
        }

        const token = verificationResponse?.token;
        if (!token) {
          throw new Error("No token returned from server");
        }

        saveToken(token);
        setShowSuccessModel(true);
        setTimeout(() => {
          setShowSuccessModel(false);
          const isPartner = getPartnershipToken(); // "yes" | "no" | null
          if (isPartner === "yes") {
            saveNewPartnershipUser("no");
            router.push("/user/partnership-home");
          } else {
            router.push("/user/home");
          }
        }, 800);
      }
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
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-1000 transition-opacity duration-300 ease-in-out"
          onClick={onClose}
        >
          <div
            className={`${
              showErrorModel || showSuccessModel
                ? "bg-k-background-secondary"
                : "bg-app-background-model"
            } w-full max-w-md p-6 sm:p-8 rounded-t-4xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            {/* Top section: Icon, Title, Close Button */}
            <div className="flex justify-between items-center mb-6 px-2">
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
                <CloseIcon className="text-app-icon" width={24} height={24} />
              </button>
            </div>

            <p className="text-[16px] px-15 text-app-text-notifications-body font-plusJakartaSans-400 text-center">
              Do you want to sign-in to "Kumele.com" with your saved passkey?
            </p>

            <div className="flex gap-24 item-center justify-center mt-[51px]">
              <div className="flex flex-col items-center ">
                <FaceIdIcon className="text-app-icon" width={35} height={35} />
                <p className="text-[16px] text-center text-app-text-primary font-plusJakartaSans-400">
                  Face ID
                </p>
              </div>
              <div className="flex flex-col items-center ">
                <ThumbIcon className="text-app-icon" width={35} height={35} />
                <p className="text-[16px] text-center text-app-text-primary font-plusJakartaSans-400">
                  Thumb ID
                </p>
              </div>
            </div>
            <div className="mt-[51px] mb-[48px] px-2">
              <button
                className="w-full text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
                onClick={() => {
                  // onContinue();
                  handleSubmit();
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
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
        successMessage="Successfully sign in"
      />
    </div>
  );
};

export default SignInPasskey;
