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
import { register } from "@/routes/signup_and_signin";
import EmailVerificationModel from "@/components/Models/EmailVerificationModel/EmailVerificationModel";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

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

  // ------------ from for user details -----------
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    gender: "",
    date_of_birth: "",
    referrer_code: "",
    above_legal_age: false,
    terms_and_conditions: false,
    subscribe_to_newsletter: false,
  });

  // set separate birthday component value together
  const [birthDay, setBirthday] = useState({
    DD: "",
    MM: "",
    YYYY: "",
  });
  // state for store data of i am not robot
  const [isRobot, setIsRobot] = useState(false);
  // --------- form errors for user group details ----------
  const [formErrors, setFormErrors] = useState<any>({});
  // --------- show email verification model ----------
  const [showEmailVerificationModel, setShowEmailVerificationModel] =
    useState(false);

  // --------- state for loading spinner ---------
  const [loading, setLoading] = useState(false);

  // -------- handleChange for input fields ---------
  const handleInputChange = (value: string | Boolean, name: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // -------- handleSubmit for form submission ---------
  const handleSubmit = async () => {
    // -------- check full form validation
    // -------- prevent multiple submission
    if (loading) return;
    setLoading(true);
    // backend form data
    let correctBirthday = birthDay.YYYY + "-" + birthDay.MM + "-" + birthDay.DD;
    const dataObj = {
      email: form.email,
      password: form.password,
      confirm_password: form.confirm_password,
      name: form.name,
      gender: form.gender,
      date_of_birth: correctBirthday,
      above_legal_age: form.above_legal_age,
      terms_and_conditions: form.terms_and_conditions,
      subscribe_to_newsletter: form.subscribe_to_newsletter,
    };

    try {
      // const data = await register(dataObj);
      setShowEmailVerificationModel(true);
      // if (data.success) {
      //   console.log(data);
      //   // router.push("/user");
      // } else {
      //   console.log(data);
      // }
    } catch (error) {
      console.log(error);
    } finally {
      // --------- set loading to false ---------
      setLoading(false);
    }
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
        <div className="absolute top-4 left-18 z-10">
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
            Sign up
          </h1>
          <GoogleIcon />
        </div>
      </div>

      {/* form area */}
      <div
        className={`${
          showEmailVerificationModel
            ? "bg-k-background-secondary"
            : "bg-k-background-primary"
        } px-6 py-6 relative z-10`}
      >
        <div className="mb-6">
          <p className="text-xs font-plusJakartaSans text-app-text-primary mb-5">
            Language choice:
          </p>
          <div className="mb-6 sm:mb-8 relative">
            <div
              ref={tabsContainerRef}
              className="flex space-x-3 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-0 sm:px-0 no-scrollbar"
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
              icon={<UserIcon className="text-app-icon" />}
              placeholder="Enter name"
              value={form.name}
              onChange={(e) => {
                handleInputChange(e.target.value, "name");
              }}
              className="bg-k-primary-color"
            />
          </div>
        </div>
        <div className="space-y-4  mb-5">
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
          <div className="flex space-x-2">
            <SelectComponent
              handleChange={(e) => {
                setBirthday((prev) => ({ ...prev, DD: e.target.value }));
              }}
              items={authConstants.dayList}
              placeholder="DD"
            />
            <SelectComponent
              handleChange={(e) => {
                setBirthday((prev) => ({ ...prev, MM: e.target.value }));
              }}
              items={authConstants.monthList}
              placeholder="MM"
            />
            <SelectComponent
              handleChange={(e) => {
                setBirthday((prev) => ({ ...prev, YYYY: e.target.value }));
              }}
              items={authConstants.yearList}
              placeholder="YYYY"
            />
          </div>
        </div>
        {/* enter password */}
        <div className="relative mt-5">
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
        <div className="relative mt-5">
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
        <div className="pt-5">
          <p className="text-sm font-plusJakartaSans text-app-text-primary mb-1">
            Referral code{" "}
            <span className="font-plusJakartaSans text-app-text-primary">
              (Optional)
            </span>
          </p>
          <InputComponent
            placeholder="e.g. DF3R435"
            onChange={(e) => {
              handleInputChange(e.target.value, "referrer_code");
            }}
            value={form.referrer_code}
          />
        </div>
        {/* check boxes */}
        <div className="space-y-3 pt-5">
          <CheckBoxComponent
            label="I am a legal adult (18/21+)"
            onChange={(e) => {
              handleInputChange(e.target.checked, "above_legal_age");
            }}
            value={form.above_legal_age}
          />
          <CheckBoxComponent
            label="Subscribe to newsletter"
            onChange={(e) => {
              handleInputChange(e.target.checked, "subscribe_to_newsletter");
            }}
            value={form.subscribe_to_newsletter}
          />
          <CheckBoxComponent
            label="By creating an account you agree to Terms & Conditions"
            onChange={(e) => {
              handleInputChange(e.target.checked, "terms_and_conditions");
            }}
            value={form.terms_and_conditions}
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
          email={form.email}
        />
      )}
    </div>
  );
};

export default Signup;
