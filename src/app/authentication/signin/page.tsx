"use client";
import React, { useEffect, useRef, useState } from "react";
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
import { login } from "@/routes/signup_and_signin";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { saveToken } from "@/utils/authUtils";
import SignInPasskey from "./passkey-models/SignInPasskey";
import SigninPasskeyFaceId from "./passkey-models/SigninPasskeyFaceId";
import CreatePasskeyText from "./passkey-models/CreatePasskeyText";
import CreatePasskey from "./passkey-models/CreatePasskey";
import SignupOptions from "./passkey-models/SignupOptions";
import { sign } from "crypto";

const languages = [
  {
    id: "english",
    label: "English",
  },
  {
    id: "french",
    label: "French",
  },
  {
    id: "spanish",
    label: "Spanish",
  },
  {
    id: "chinese",
    label: "Chinese",
  },
  {
    id: "arabic",
    label: "Arabic",
  },
];

const Signin = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("english");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // ---------- form for login details -----------
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);

  // --------- state for loading spinner ---------
  const [loading, setLoading] = useState(false);

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

  // -------- handleChange for input fields ---------
  const handleInputChange = (value: string | Boolean, name: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // 2 seconds time out
    const timeout = setTimeout(() => {
      setShowPasskeyModel(true);
    }, 2000); // Hide after 2 seconds
  }, []);

  // -------- handleSubmit for form submission ---------
  const handleSubmit = async () => {
        router.push("/user");
    // -------- check full form validation
    // -------- prevent multiple submission
    // if (loading) return;
    // setLoading(true);
    // if (!form.email || !form.password) {
    //   setLoading(false);
    //   return;
    // }

    // try {
    //   const data = await login(form);
    //   if (data.success) {
    //     saveToken(data.data.user_token);
    //     setLoading(false);
    //     // --------- show success model ---------
    //     setShowSuccessModel(true);
    //     setTimeout(() => {
    //       setShowSuccessModel(false);
    //     }, 1000); // Hide after 2 seconds
    //     router.push("/user");
    //   } else {
    //     console.log(data);
    //   }
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   // --------- set loading to false ---------
    //   setLoading(false);
    // }
  };

  // LANGUAGE SELECTION

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
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

  return (
    <div>
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
        <div className="absolute top-4 left-6 z-10">
          {" "}
          {/* z-10 ensures logo is above the background image */}
          <Image
            className="p-2"
            alt="logo"
            src="/images/logo.png"
            width={63}
            height={50}
          />
        </div>
        {/* Sign up Text & Google Icon */}
        {/* This is positioned at the bottom of the 200px header area.
        Ensure the part of your background.png where this text appears
        has sufficient contrast for the 'text-black'.
    */}
        <div className="absolute bottom-4 left-6 flex items-center space-x-2 z-10">
          {" "}
          {/* z-10 ensures text is above background */}
          <h1 className="text-xl font-bold text-app-text-black font-plusJakartaSans">
            Sign in
          </h1>
          <GoogleIcon />
        </div>
      </div>

      {/* form area */}
      <div
        className={`${
          showPasskeyModel ||
          faceIdModel ||
          createPasskeyModel ||
          createPasskey ||
          signinOption
            ? "bg-k-background-secondary"
            : "bg-k-background-primary"
        } px-6 py-6 relative z-10`}
      >
        <div className="mb-6">
          <p className="text-xs font-plusJakartaSans text-app-text-primary mb-5">
            Language choice:
          </p>
          <div className="mb-6 sm:mb-8 relative w-full">
            <div
              ref={tabsContainerRef}
              className="flex gap-5 space-x-3 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-0 sm:px-0 no-scrollbar"
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
                  className={`py-2 px-5 rounded-md text-sm font-medium whitespace-nowrap flex-shrink-0 transition-colors duration-150
                  ${
                    activeTab === tab.id
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* form */}
        <div className="space-y-4 mb-5">
          <div className="relative">
            <InputComponent
              icon={<UserIcon />}
              placeholder="Enter email | Nick name"
              value={form.email}
              onChange={(e) => {
                handleInputChange(e.target.value, "email");
              }}
            />
          </div>
        </div>
        {/* enter password */}
        <div className="relative mt-5">
          <InputComponent
            icon={<PasswordIcon className="text-app-icon" />}
            placeholder="Password"
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
        {/* checkboxes */}
        <div className="flex justify-between mt-5">
          <div>
            <CheckBoxComponent
              label="Remember me"
              onChange={(e) => setRememberMe(e.target.checked)}
              value={rememberMe}
            />
          </div>
          <p className="font-plusJakartaSans text-app-text-blue">
            Forgot password?
          </p>
        </div>
        <div className="flex items-center mt-3">
          <CheckBoxComponent
            label="I am not a robot"
            onChange={(e) => setNotRobot(e.target.checked)}
            value={notRobot}
          />
          <Image
            src="/bg-imgs/auth/robot-img.png"
            alt="robot icon"
            width={38}
            height={38}
            className="ml-2"
          />
        </div>
        <div className="pt-4">
          <button
            className="w-full bg-app-button-primary text-app-text-tertiary py-3.5 rounded-lg font-plusJakartaSans text-md"
            onClick={() => handleSubmit()}
            disabled={loading} // Disable button if loading
          >
            Sign in
          </button>
        </div>
        <div className="flex items-center mt-6">
          <p className="text-sm text-app-text-primary font-plusJakartaSans">
            Not a member?{" "}
          </p>
          <p
            onClick={() => router.push("/authentication/signup")}
            className="font-plusJakartaSans text-xs underline text-app-text-primary font-bold"
          >
            Sign up
          </p>
        </div>
        {/* sign in with passkey */}
        <div className="flex items-center md:my-8 mt-3">
          <div className="flex-grow border-t border-app-text-primary"></div>
          <p className="px-4 text-app-text-primary font-plusJakartaSans md:text-lg text-sm">
            Or sign in with Passkey
          </p>
          <div className="flex-grow border-t border-app-text-primary"></div>
        </div>
        {/* Passkey Lock GIF */}
        <div
          className="my-4 md:my-8"
          onClick={
            () => {
              setCreatePasskeyModel(true);
            } // Open Passkey model on click
          }
        >
          <img
            src="/bg-imgs/auth/passkey.gif" // Assumes lock.gif is in the /public folder
            alt="Passkey Lock Icon"
            className="w-11 h-11 mx-auto" // 44px by 44px, centered
          />
        </div>{" "}
        {/* Recommendation Text */}
        <p className="text-xs text-app-text-blue font-plusJakartaSans text-center">
          We recommend Passkey if your device supports it for better security
          and a pleasant user experience.
        </p>
      </div>
      {/* if login successful */}
      {showSuccessModel && (
        <div className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-50 transition-opacity duration-300 ease-in-out">
          <div
            className={`bg-app-background-primary w-full max-w-md p-6 sm:p-8 rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-out `}
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
                Login successful
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Sign Out Model */}
      <SignInPasskey
        isOpen={showPasskeyModel}
        onClose={() => {
          setShowPasskeyModel(false);
        }}
        onContinue={() => {
          setShowPasskeyModel(false);
          setFaceIdModel(true);
        }}
      />
      {/* Face ID Model */}
      <SigninPasskeyFaceId
        isOpen={faceIdModel}
        onClose={() => {
          setFaceIdModel(false);
        }}
      />
      {/* Create Passkey Model */}
      <CreatePasskeyText
        isOpen={createPasskeyModel}
        onClose={() => {
          setCreatePasskeyModel(false);
        }}
        onContinue={() => {
          setCreatePasskeyModel(false);
          setCreatePasskey(true);
        }}
      />

      {/* Create Passkey */}
      <CreatePasskey
        isOpen={createPasskey}
        onClose={() => {
          setCreatePasskey(false);
        }}
        onContinue={() => {
          setCreatePasskey(false);
          setSigninOption(true);
        }}
      />

      {/* Create Passkey */}
      <SignupOptions
        isOpen={signinOption}
        onClose={() => {
          setSigninOption(false);
        }}
        onContinue={() => {
          router.push("/user");
          setSigninOption(false);
        }}
      />
    </div>
  );
};

export default Signin;
