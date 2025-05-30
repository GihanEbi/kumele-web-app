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
import { login } from "@/routes/signup_and_signin";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { saveToken } from "@/utils/authUtils";

const Signin = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

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
    if (!form.email || !form.password) {
      setLoading(false);
      return;
    }

    try {
      const data = await login(form);
      if (data.success) {
        saveToken(data.data.user_token);
        setLoading(false);
        // --------- show success model ---------
        setShowSuccessModel(true);
        setTimeout(() => {
          setShowSuccessModel(false);
        }, 1000); // Hide after 2 seconds
        router.push("/user");
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
          <h1 className="text-3xl font-bold text-black">Sign up</h1>
          <GoogleIcon />
        </div>
      </div>

      {/* form area */}
      <div className="bg-white px-6 py-6 relative z-10">
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
            icon={<PasswordIcon />}
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
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {passwordVisible ? <EyeIcon /> : <EyeIcon />}
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
          <p className="text-blue-600 text-xs font-bold">Forgot password?</p>
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
            className="w-full bg-black text-white py-3.5 rounded-lg font-semibold text-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 transition duration-150 ease-in-out"
            onClick={() => handleSubmit()}
            disabled={loading} // Disable button if loading
          >
            Sign in
          </button>
        </div>
        <div className="flex flex-row items-center justify-center mt-6">
          <p className="text-center text-sm text-gray-500">Not a member? </p>
          <p
            onClick={() => router.push("/authentication/signup")}
            className="font-semibold text-xs underline text-black hover:underline"
          >
            Sign up
          </p>
        </div>
        {/* sign in with passkey */}
        <div className="flex items-center md:my-8 mt-3">
          <div className="flex-grow border-t border-gray-900"></div>
          <p className="px-4 text-gray-900 md:text-lg text-sm">
            Or sign in with Passkey
          </p>
          <div className="flex-grow border-t border-gray-900"></div>
        </div>
        {/* Passkey Lock GIF */}
        <div className="my-4 md:my-8">
          <img
            src="/bg-imgs/auth/passkey.gif" // Assumes lock.gif is in the /public folder
            alt="Passkey Lock Icon"
            className="w-11 h-11 mx-auto" // 44px by 44px, centered
          />
        </div>{" "}
        {/* Recommendation Text */}
        <p className="text-xs text-blue-600 text-center">
          We recommend Passkey if your device supports it for better security
          and a pleasant user experience.
        </p>
      </div>
      {/* if login successful */}
      {showSuccessModel && (
        <div className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-50 transition-opacity duration-300 ease-in-out">
          <div
            className={`bg-white w-full max-w-md p-6 sm:p-8 rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-out `}
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
    </div>
  );
};

export default Signin;
