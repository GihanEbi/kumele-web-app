"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CloseIcon, VerifyEmailIcon } from "../../../../public/svg-icons/icons";
import InputComponent from "@/components/InputComponent/InputComponent";
import Image from "next/image";
import {
  google_sign_up_complete,
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
import RadioButtonGroupComponent from "@/components/RadioButtonGroupComponent/RadioButtonGroupComponent";
import { authConstants } from "@/constants/auth-constants";
import DropDown from "@/components/DropDown/DropDown";
import ErrorModel from "../ErrorModel/ErrorModel";
import SuccessModel from "../SuccessModel/SuccessModel";

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

  // states for year dropdown
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  // state from month dropdown
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  // state from day dropdown
  const [isDayDropdownOpen, setIsDayDropdownOpen] = useState(false);

  // ------------ from for user details -----------
  const [form, setForm] = useState({
    gender: "",
    dateOfBirth: "",
    referralCode: "",
    aboveLegalAge: false,
    termsAndConditionsAccepted: false,
    subscribedToNewsletter: false,
  });

  // set separate birthday component value together
  const [birthDay, setBirthday] = useState({
    DD: "",
    MM: "",
    YYYY: "",
  });
  // state for store data of i am not robot
  const [isRobot, setIsRobot] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  if (!isOpen) {
    return null;
  }

  // -------- handleChange for input fields ---------
  const handleInputChange = (value: string | Boolean, name: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle send OTP for email verification
  const handleSubmit = async () => {
    form.dateOfBirth = `${birthDay.YYYY}-${birthDay.MM}-${birthDay.DD}`;
    console.log("form data is", form);

    // onClose(true), console.log("Notification permission: true")

    if (loading) return;
    setLoading(true);

    try {
      const data = await google_sign_up_complete(form);
      if (data.success) {
        setShowSuccessModel(true);
        setTimeout(() => {
          setShowSuccessModel(false);
          const isPartner = getPartnershipToken(); // "yes" | "no" | null
          if (isPartner === "yes") {
            saveNewPartnershipUser("no");
            router.push("/user/partnership-home");
          } else {
            router.push("/authentication/chooseInterests");
          }
        }, 800);
      } else {
        setError(data?.message);
        setShowErrorModel(true); // you can render a simple error modal/toast if desired
        setTimeout(() => setShowErrorModel(false), 3600);
        return;
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

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
            <div className="pt-1">
              <RadioButtonGroupComponent
                name="Gender"
                options={authConstants.gender}
                value={form.gender}
                onChange={(value) => {
                  handleInputChange(value, "gender");
                }}
              />
            </div>
            <div className="pt-5">
              <p className="text-sm font-plusJakartaSans text-app-text-primary mb-2">
                Date of Birth
              </p>
              <div className="flex space-x-2 w-full justify-between">
                <DropDown
                  dataArray={authConstants.dayList}
                  isOpen={(value: boolean) => {
                    setIsDayDropdownOpen(value);
                  }}
                  placeHolder="DD"
                  itemSelected={birthDay.DD}
                  onChange={(value: string) => {
                    setBirthday((prev) => ({ ...prev, DD: value }));
                  }}
                />
                <DropDown
                  dataArray={authConstants.monthList}
                  isOpen={(value: boolean) => {
                    setIsMonthDropdownOpen(value);
                  }}
                  placeHolder="MM"
                  itemSelected={birthDay.MM}
                  onChange={(value: string) => {
                    setBirthday((prev) => ({ ...prev, MM: value }));
                  }}
                />
                <DropDown
                  dataArray={authConstants.yearList}
                  isOpen={(value: boolean) => {
                    setIsYearDropdownOpen(value);
                  }}
                  placeHolder="YYYY"
                  itemSelected={birthDay.YYYY}
                  onChange={(value: string) => {
                    setBirthday((prev) => ({ ...prev, YYYY: value }));
                  }}
                />
              </div>
            </div>
            {/* referral code */}
            <div className="flex justify-between items-center gap-5">
              <div className="pt-5">
                <p className="text-sm font-plusJakartaSans text-app-text-primary mb-1">
                  Referral code{" "}
                  {/* <span className="font-plusJakartaSans text-app-text-primary">
              (Optional)
            </span> */}
                </p>
                <InputComponent
                  placeholder="e.g. DF3R435"
                  value={form.referralCode}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "referralCode")
                  }
                />
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
                onChange={(e) => {
                  handleInputChange(e.target.checked, "aboveLegalAge");
                }}
                value={form.aboveLegalAge}
              />
              <CheckBoxComponent
                label="Subscribe to newsletter"
                onChange={(e) => {
                  handleInputChange(e.target.checked, "subscribedToNewsletter");
                }}
                value={form.subscribedToNewsletter}
              />
              <CheckBoxComponent
                label="By creating an account you agree to Terms & Conditions"
                onChange={(e) => {
                  handleInputChange(
                    e.target.checked,
                    "termsAndConditionsAccepted"
                  );
                }}
                value={form.termsAndConditionsAccepted}
              />
            </div>
          </div>

          <div className="space-y-3 mb-4 mt-4">
            <button
              onClick={() => {
                handleSubmit();
              }}
              className="w-full text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
            >
              Complete Google Signup
            </button>
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
        successMessage={successMessage || "Registration successfully!"}
      />
    </div>
  );
};

export default GoogleSigninOtherModel;
