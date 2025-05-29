"use client";
import React, { useState } from "react";
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
import { config } from "@/config";
import { register } from "@/routes/signup_and_signin";
import EmailVerificationModel from "@/components/Models/EmailVerificationModel/EmailVerificationModel";

// ---------- types --------------
type registrationForm = {
  email: string;
  password: string;
  confirm_password: string;
  name: string;
  gender: string;
  date_of_birth: string;
  referrer_code: string;
  above_legal_age: Boolean;
  terms_and_conditions: Boolean;
  subscribe_to_newsletter: Boolean;
};

const Signup = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

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
      const data = await register(dataObj);
      if (data.success) {
        console.log(data);
        setShowEmailVerificationModel(true);
        // router.push("/user");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // --------- set loading to false ---------
      setLoading(false);
    }
  };

  return (
    <div className="">
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
          <h1 className="text-3xl font-bold text-black">Sign up</h1>
          <GoogleIcon />
        </div>
      </div>

      {/* form area */}
      <div
        className={`${
          showEmailVerificationModel ? "bg-gray-300" : "bg-white"
        } px-6 py-6 relative z-10`}
      >
        <div className="mb-6">
          <p className="text-xs text-gray-500 mb-2">Language choice:</p>
          <div className="flex space-x-2">
            <button className="flex-1 py-2.5 px-3 bg-yellow-400 text-black text-sm font-medium rounded-md shadow-sm">
              English
            </button>
            <button className="flex-1 py-2.5 px-3 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300">
              French
            </button>
            <button className="flex-1 py-2.5 px-3 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300">
              Spanish
            </button>
          </div>
        </div>
        {/* form */}
        <div className="space-y-4 mb-5">
          <div className="relative">
            <InputComponent
              icon={<UserIcon />}
              placeholder="Enter name"
              value={form.name}
              onChange={(e) => {
                handleInputChange(e.target.value, "name");
              }}
            />
          </div>
        </div>
        <div className="space-y-4  mb-5">
          <div className="relative">
            <InputComponent
              icon={<MailIcon />}
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
          <p className="text-sm font-medium text-gray-800 mb-2">
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
            icon={<PasswordIcon />}
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
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {passwordVisible ? <EyeIcon /> : <EyeIcon />}
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
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {passwordVisible ? <EyeIcon /> : <EyeIcon />}
          </button>
        </div>
        {/* referral code */}
        <div className="pt-5">
          <p className="text-sm font-medium text-gray-800 mb-1">
            Referral code <span className="text-gray-500">(Optional)</span>
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
        <div className="space-y-3 pt-2">
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

          {/* <label className="flex items-start space-x-2.5 cursor-pointer">
                {" "}
                <input
                  type="checkbox"
                  id="terms"
                  className="form-checkbox h-4 w-4 mt-0.5 flex-shrink-0 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition duration-150 ease-in-out"
                />
                <span className="text-sm text-gray-700">
                  By creating an account you agree
                  <br /> to{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms & Conditions
                  </a>
                </span>
              </label> */}
        </div>
        {/* footer signup button */}
        <div className="pt-4">
          <button
            className="w-full bg-black text-white py-3.5 rounded-lg font-semibold text-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 transition duration-150 ease-in-out"
            onClick={() => handleSubmit()}
          >
            Sign up
          </button>
        </div>
        <div className="flex flex-row items-center justify-center mt-6">
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
          </p>
          <p
            onClick={() => router.push("/authentication/signin")}
            className="font-semibold text-xs underline text-black hover:underline"
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
