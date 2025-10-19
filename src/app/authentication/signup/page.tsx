"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  EyeIcon,
  GoogleIcon,
  MailIcon,
  PasswordIcon,
  UserIcon,
} from "../../../../public/svg-icons/icons";
import InputComponent from "@/components/InputComponent/InputComponent";
import RadioButtonGroupComponent from "@/components/RadioButtonGroupComponent/RadioButtonGroupComponent";
import { authConstants } from "@/constants/auth-constants";
import SelectComponent from "@/components/SelectComponent/SelectComponent";
import CheckBoxComponent from "@/components/CheckBoxComponent/CheckBoxComponent";
import {
  google_sign_up,
  register,
  send_otp_for_verification,
} from "@/routes/signup_and_signin";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import EmailVerificationModel from "@/components/Models/EmailVerificationModel/EmailVerificationModel";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import DropDown from "@/components/DropDown/DropDown";
import {
  getPartnershipToken,
  saveNewPartnershipUser,
} from "@/utils/partnershipUtils";
import GoogleSigninOtherModel from "@/components/Models/googleSigninOtherModel/GoogleSigninOtherModel";
import { saveToken } from "@/utils/authUtils";
import ErrorModel from "@/components/Models/ErrorModel/ErrorModel";
import SuccessModel from "@/components/Models/SuccessModel/SuccessModel";

type FormErrors = Record<string, string>;

const languages = [
  {
    id: "English",
    label: "English",
  },
  {
    id: "French",
    label: "French",
  },
  {
    id: "Spanish",
    label: "Spanish",
  },
  {
    id: "Chinese",
    label: "Chinese",
  },
  {
    id: "Arabic",
    label: "Arabic",
  },
];
const Signup = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("english");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const isPartnerShipAccount = getPartnershipToken();
  const [showGoogleVerificationModel, setShowGoogleVerificationModel] =
    useState(false);

  // ------------ from for user details -----------
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm_password: "",
    fullName: "",
    gender: "",
    language: "",
    // date_of_,birth: "",
    referralCode: "",
    aboveLegalAge: false,
    termsAndConditionsAccepted: false,
    subscribedToNewsletter: false,
    beta_code: "",
  });
  // form errors
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // set separate birthday component value together
  const [birthDay, setBirthday] = useState({
    DD: "",
    MM: "",
    YYYY: "",
  });
  // state for store data of i am not robot
  const [isRobot, setIsRobot] = useState(false);
  // --------- form errors for user group details ----------
  // --------- show email verification model ----------
  const [showEmailVerificationModel, setShowEmailVerificationModel] =
    useState(false);

  // --------- state for loading spinner ---------
  const [loading, setLoading] = useState(false);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // -------- handleChange for input fields ---------
  const handleInputChange = (
    value: string | Boolean | string[],
    name: string
  ) => {
    setFormErrors((prev) => {
      const updatedErrors = { ...prev };
      delete updatedErrors[name];
      return updatedErrors;
    });
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // check form data is not empty and valid
  const validateForm = () => {
    const errors: FormErrors = {};
    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email.trim())
    ) {
      errors.email = "Invalid email address";
    }
    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    // Confirm password validation
    if (!form.confirm_password) {
      errors.confirm_password = "Confirm password is required";
    } else if (form.confirm_password !== form.password) {
      errors.confirm_password = "Passwords do not match";
    }
    // Full name validation
    if (!form.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    // Gender validation
    if (!form.gender) {
      errors.gender = "Gender is required";
    }
    // Language validation
    if (!form.language) {
      errors.language = "Language is required";
    }
    // beta code validation
    if (!form.beta_code) {
      errors.beta_code = "Beta code is required";
    }

    // date of birth validation
    if (!birthDay.DD || !birthDay.MM || !birthDay.YYYY) {
      errors.dateOfBirth = "Complete date of birth is required";
    }
    setFormErrors(errors);
    console.log(errors);

    return Object.keys(errors).length === 0;
  };

  // states for year dropdown
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  // state from month dropdown
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  // state from day dropdown
  const [isDayDropdownOpen, setIsDayDropdownOpen] = useState(false);

  const googleLoginRef = useRef<HTMLInputElement>(null);

  // Handle send OTP for email verification
  const handleSubmit = async () => {
    if (loading) return;
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // check if user is robot
    if (!isRobot) {
      setError("Please verify that you are not a robot.");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      setLoading(false);
      return;
    }

    // check if terms and conditions accepted
    if (!form.termsAndConditionsAccepted) {
      setError("You must accept the Terms & Conditions to proceed.");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      setLoading(false);
      return;
    }

    // check legal age
    if (!form.aboveLegalAge) {
      setError("You must be above legal age to proceed.");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      setLoading(false);
      return;
    }

    try {
      const email = form.email;
      if (!email) {
        throw new Error("Email is required");
      }
      const data = await send_otp_for_verification(email);
      if (data.success) {
        setShowEmailVerificationModel(true);
      } else {
        console.log(data?.message || "Failed to send OTP. Please try again.");
        setError(data?.message || "Failed to send OTP. Please try again.");
        setShowErrorModel(true);
        setTimeout(() => setShowErrorModel(false), 3600);
        return;
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Could not connect to the server. Please try again.");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignInSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    // The 'credential' field contains the ID Token.
    const idToken = credentialResponse.credential;

    if (!idToken) {
      setError("Google sign-in failed: No ID token received.");
      return;
    }

    try {
      const data = await google_sign_up({ token: idToken });
      if (data.success) {
        saveToken(data.data.token);
        setLoading(false);

        setShowGoogleVerificationModel(true);
      } else {
        setError(data?.message);
        setShowErrorModel(true); // you can render a simple error modal/toast if desired
        setTimeout(() => setShowErrorModel(false), 3600);
        return;
      }
    } catch (err) {
      console.error("API call failed:", err);
      setError("Could not connect to the server. Please try again.");
    }
  };

  const handleGoogleSignInError = () => {
    console.error("Google Sign-In failed.");
    setError("Google Sign-In failed. Please try again.");
  };

  // LANGUAGE SELECTION

  const handleTabClick = (tabId: string) => {
    setFormErrors((prev) => {
      const updatedErrors = { ...prev };
      delete updatedErrors.language;
      return updatedErrors;
    });
    setActiveTab(tabId);
    handleInputChange(tabId, "language");
    scrollToTab(tabId);
  }; // Mobile-like drag scrolling handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (tabsContainerRef.current?.offsetLeft || 0));
    setScrollLeft(tabsContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !tabsContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (tabsContainerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll speed multiplier
    tabsContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (tabsContainerRef.current?.offsetLeft || 0));
    setScrollLeft(tabsContainerRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !tabsContainerRef.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - (tabsContainerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    tabsContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const scrollToTab = (tabId: string) => {
    const tabElement = document.getElementById(`tab-${tabId}`);
    if (tabElement && tabsContainerRef.current) {
      const container = tabsContainerRef.current;
      const containerWidth = container.offsetWidth;
      const tabLeft = tabElement.offsetLeft;
      const tabWidth = tabElement.offsetWidth;

      const scrollPosition = tabLeft - (containerWidth - tabWidth) / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const handleGoogleIconClick = () => {
    if (googleLoginRef.current) {
      const googleButton =
        googleLoginRef.current.querySelector('div[role="button"]');
      if (googleButton instanceof HTMLElement) {
        googleButton.click();
      }
    }
  };

  return (
    <div className="">
      {/* Loading spinner */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}
      {/* Header Section */}
      <div className="relative h-[200px]">
        {" "}
        {/* Container for the header, same height as before */}
        {/* Background Image */}
        <img
          src="/bg-imgs/auth/signup-bg.png" // Assumes background.png is in your /public folder
          alt="Header background design"
          className="absolute inset-0 w-full h-full object-cover"
          // Consider other object-fit values if needed:
          // - object-fill: Stretches image to fit, may distort aspect ratio.
          // - object-contain: Ensures entire image is visible, may result in letterboxing.
          // object-cover is often a good default for background images.
        />
        {/* Logo Image */}
        {/* This div helps in positioning your logo.
      Adjust 'top-4', 'left-6', and the image className (e.g., 'h-12')
      to match your logo.png and how it should appear on background.png.
      The initial 'top-4 left-6' attempts to replicate the padding from the previous CSS logo.
  */}
        <div className="absolute top-4 left-3 z-10">
          {" "}
          {/* z-10 ensures logo is above the background image */}
          <Image
            className="p-2"
            alt="logo"
            src="/images/logo.png"
            width={100}
            height={100}
          />
        </div>
        {/* Sign up Text & Google Icon */}
        {/* This is positioned at the bottom of the 200px header area.
      Ensure the part of your background.png where this text appears
      has sufficient contrast for the 'text-black'.
  */}
        <div className="absolute bottom-1 left-5 flex items-center space-x-2 z-10">
          {" "}
          {/* z-10 ensures text is above background */}
          <h1 className="text-xl font-bold text-app-text-black font-plusJakartaSans">
            {isPartnerShipAccount === "yes" ? (
              <>
                Advertisers & Bloggers <br />
                Sign Up
              </>
            ) : (
              "Sign up"
            )}
          </h1>
          {/* <div onClick={() => setShowGoogleVerificationModel(true)}>
            <GoogleIcon />
          </div> */}
          <div>
            <div onClick={handleGoogleIconClick} style={{ cursor: "pointer" }}>
              <GoogleIcon />
            </div>
            <div ref={googleLoginRef} style={{ display: "none" }}>
              <GoogleLogin
                onSuccess={handleGoogleSignInSuccess}
                onError={handleGoogleSignInError}
                theme="outline"
                size="large"
              />
            </div>
          </div>
        </div>
      </div>

      {/* form area */}
      <div
        className={`${
          showEmailVerificationModel ||
          isYearDropdownOpen ||
          isMonthDropdownOpen ||
          isDayDropdownOpen
            ? "bg-k-background-secondary"
            : "bg-k-background-primary"
        } px-8 py-6 relative z-10`}
      >
        <div className="mb-6">
          <p className="text-xs font-plusJakartaSans text-app-text-primary mb-5">
            Language choice:
          </p>
          <div
            className={`${
              formErrors.language
                ? "border-1 border-red-500 pt-2 px-2 rounded-2xl"
                : ""
            } mb-6 sm:mb-8 relative w-full`}
          >
            <div
              ref={tabsContainerRef}
              className="flex gap-5 space-x-2 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-0 sm:px-0 no-scrollbar"
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                cursor: isDragging ? "grabbing" : "grab",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {languages.map((tab, index) => (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => handleTabClick(tab.id)}
                  className={`py-2 px-5 rounded-md text-sm  whitespace-nowrap flex-shrink-0 transition-colors duration-150
                  ${
                    activeTab === tab.id
                      ? "bg-app-button-yellow text-app-text-black font-medium"
                      : "bg-app-input-primary text-app-text-secondary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* form */}
        <div
          className={`${
            formErrors.fullName ? "border-2 border-red-500 rounded-md" : ""
          } space-y-4 mb-5`}
        >
          <div className="relative">
            <InputComponent
              icon={<UserIcon className="text-app-icon" />}
              placeholder="Enter name"
              value={form.fullName}
              onChange={(e) => {
                handleInputChange(e.target.value, "fullName");
              }}
              className="bg-k-primary-color"
            />
          </div>
        </div>
        <div
          className={`${
            formErrors.email ? "border-2 border-red-500 rounded-md" : ""
          } space-y-4 mb-5`}
        >
          <div className="relative">
            <InputComponent
              icon={<MailIcon className="text-app-icon" />}
              placeholder="Enter email"
              value={form.email}
              onChange={(e) => {
                handleInputChange(e.target.value, "email");
              }}
            />
          </div>
        </div>
        <div
          className={`${
            formErrors.gender ? "border-2 border-red-500 rounded-md p-2" : ""
          } pt-1`}
        >
          <RadioButtonGroupComponent
            name="Gender"
            options={authConstants.gender}
            value={form.gender}
            onChange={(value) => {
              handleInputChange(value, "gender");
            }}
          />
        </div>
        <div
          className={`${
            formErrors.dateOfBirth
              ? "mt-2 border-2 border-red-500 rounded-md p-2"
              : ""
          } pt-5`}
        >
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
                console.log("month is", value);
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
        {/* enter password */}
        <div
          className={`${
            formErrors.password ? "border-2 border-red-500 rounded-md" : ""
          } relative mt-5`}
        >
          <InputComponent
            icon={<PasswordIcon className="text-app-icon" />}
            placeholder="Enter Password"
            onChange={(e) => {
              handleInputChange(e.target.value, "password");
            }}
            value={form.password}
            type={passwordVisible ? "text" : "password"}
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {passwordVisible ? (
              <EyeIcon className="text-app-icon" />
            ) : (
              <EyeIcon className="text-app-icon" />
            )}
          </button>
        </div>
        {/* confirm password */}
        <div
          className={`${
            formErrors.confirm_password
              ? "border-2 border-red-500 rounded-md"
              : ""
          } relative mt-5`}
        >
          <InputComponent
            icon={<PasswordIcon />}
            placeholder="Confirm Password"
            onChange={(e) => {
              handleInputChange(e.target.value, "confirm_password");
            }}
            value={form.confirm_password}
            type={confirmPasswordVisible ? "text" : "password"}
          />
          <button
            type="button"
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {passwordVisible ? (
              <EyeIcon className="text-app-icon" />
            ) : (
              <EyeIcon className="text-app-icon" />
            )}
          </button>
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
              onChange={(e) => {
                handleInputChange(e.target.value, "referralCode");
              }}
              value={form.referralCode}
            />
          </div>
          <div
            className={`${
              formErrors.beta_code
                ? "border-2 border-red-500 rounded-md p-2"
                : ""
            } mt-5`}
          >
            <p className="text-sm font-plusJakartaSans text-app-text-primary mb-1">
              Beta code{" "}
              {/* <span className="font-plusJakartaSans text-app-text-primary">
              (Optional)
            </span> */}
            </p>
            <InputComponent
              placeholder="e.g. DF3R435"
              onChange={(e) => {
                handleInputChange(e.target.value, "beta_code");
              }}
              value={form.beta_code}
            />
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
              handleInputChange(e.target.checked, "termsAndConditionsAccepted");
            }}
            value={form.termsAndConditionsAccepted}
          />
          <div className="flex items-center">
            <CheckBoxComponent
              label="I am not a robot"
              onChange={(e) => {
                console.log(e.target.checked);
                setIsRobot(e.target.checked);
              }}
              value={isRobot}
            />
            <Image
              src="/bg-imgs/auth/robot-img.png"
              alt="robot icon"
              width={38}
              height={38}
              className="ml-2"
            />
          </div>
        </div>
        {/* footer signup button */}
        <div className="pt-4">
          <button
            className="w-full bg-app-button-primary text-app-text-tertiary py-3.5 rounded-lg font-plusJakartaSans text-md"
            onClick={() => handleSubmit()}
          >
            Sign up
          </button>
        </div>
        <div className="flex flex-row items-center justify-center mt-6">
          <p className="text-center text-sm text-app-text-primary font-plusJakartaSans">
            Already have an account?{" "}
          </p>
          <p
            onClick={() => router.push("/authentication/signin")}
            className="font-plusJakartaSans text-xs underline text-app-text-primary"
          >
            Sign in
          </p>
        </div>
        <div className="h-16"></div> {/* Spacer for bottom scroll */}
      </div>

      {/* Email Verification Model */}
      {showEmailVerificationModel && (
        <EmailVerificationModel
          onClose={() => setShowEmailVerificationModel(false)}
          isOpen={showEmailVerificationModel}
          formData={{
            ...form,
            dateOfBirth: `${birthDay.YYYY}-${birthDay.MM}-${birthDay.DD}`,
          }}
          //email={form.email}
          //password={form.password} // Pass password if needed for verification"
        />
      )}

      {/* google Verification Model */}
      {showGoogleVerificationModel && (
        <GoogleSigninOtherModel
          onClose={() => setShowGoogleVerificationModel(false)}
          isOpen={showGoogleVerificationModel}
          //email={form.email}
          //password={form.password} // Pass password if needed for verification"
        />
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
        successMessage={successMessage || "Registration successfully!"}
      />
    </div>
  );
};

export default Signup;
