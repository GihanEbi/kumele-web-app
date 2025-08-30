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
}

// props types
type EmailVerificationModelProps = {
  isOpen: boolean;
  onClose: Function;
  //email: string; // email prop if needed for verification
  //password: string; // optional password prop if needed for login
  //   formData: FormData;
};

const GoogleSigninOtherModel: React.FC<EmailVerificationModelProps> = ({
  isOpen,
  onClose,
  //email,
  //password,
  //   formData,
}) => {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [showVerificationFailed, setShowVerificationFailed] =
    useState<boolean>(false);

  // --------- state for loading spinner ---------
  const [loading, setLoading] = useState(false);
  // state for open
  const [modelOpen, setModelOpen] = useState<boolean>(isOpen);
  const isPartnerShipAccount = getPartnershipToken();

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <div
        className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-50 transition-opacity duration-300 ease-in-out"
        //   onClick={onClose}
      >
        <div
          className={`bg-app-background-model w-full max-w-md p-6 sm:p-8 rounded-t-4xl shadow-xl transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
          }`}
          onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
        >
          {/* Top section: Icon, Title, Close Button */}
          <div className="flex items-start justify-between mb-4">
            <div className="pt-1">
              {" "}
              {/* <NotificationIcon
                className="text-app-icon"
                width={28}
                height={28}
              /> */}
              {/* To align bell better with multi-line title */}
            </div>
            <button
              onClick={() => {
                onClose(false);
              }}
              aria-label="Close notification prompt"
              className="p-1 -m-1 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <CloseIcon className="text-app-icon" width={24} height={24} />
            </button>
          </div>
          <div>
            {/* referral code */}
            <div className="flex justify-between items-center gap-5">
              <div className="pt-5">
                <p className="text-sm font-plusJakartaSans text-app-text-primary mb-1">
                  Referral code{" "}
                  {/* <span className="font-plusJakartaSans text-app-text-primary">
              (Optional)
            </span> */}
                </p>
                <InputComponent placeholder="e.g. DF3R435" />
              </div>
              <div className="pt-5">
                <p className="text-sm font-plusJakartaSans text-app-text-primary mb-1">
                  Beta code{" "}
                  {/* <span className="font-plusJakartaSans text-app-text-primary">
              (Optional)
            </span> */}
                </p>
                <InputComponent placeholder="e.g. DF3R435" />
              </div>
            </div>
            {/* check boxes */}
            <div className="space-y-3 pt-5">
              <CheckBoxComponent
                label="I am a legal adult (18/21+)"
                onChange={(e) => {}}
                value={false}
              />
              <CheckBoxComponent
                label="Subscribe to newsletter"
                onChange={(e) => {}}
                value={false}
              />
              <CheckBoxComponent
                label="By creating an account you agree to Terms & Conditions"
                onChange={(e) => {}}
                value={false}
              />
            </div>
          </div>

          <div className="space-y-3 mb-4 mt-4">
            <button
              onClick={() => {
                onClose(true), console.log("Notification permission: true");
              }}
              className="w-full text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
            >
              Complete Google Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleSigninOtherModel;
