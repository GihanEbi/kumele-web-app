"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import Image from "next/image";
import {
  EyeIcon,
  GoogleIcon,
  MailIcon,
  PasswordIcon,
  UserIcon,
} from "../../../../public/svg-icons/icons";
import InputComponent from "@/components/InputComponent/InputComponent";
import CheckBoxComponent from "@/components/CheckBoxComponent/CheckBoxComponent";
import { google_sign_in, login } from "@/routes/signup_and_signin";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import {
  getUserNamePassword,
  saveToken,
  saveUserNamePassword,
} from "@/utils/authUtils";
import SignInPasskey from "./passkey-models/SignInPasskey";
import SigninPasskeyFaceId from "./passkey-models/SigninPasskeyFaceId";
import CreatePasskeyText from "./passkey-models/CreatePasskeyText";
import CreatePasskey from "./passkey-models/CreatePasskey";
import SignupOptions from "./passkey-models/SignupOptions";
import {
  getPartnershipToken,
  saveNewPartnershipUser,
} from "@/utils/partnershipUtils";
import CheckMarkGif from "@/components/GifComponents/CheckMarkGif/CheckMarkGif";
import PadLockGif from "@/components/GifComponents/PadLockGif/PadLockGif";
import ErrorModel from "@/components/Models/ErrorModel/ErrorModel";
import SuccessModel from "@/components/Models/SuccessModel/SuccessModel";
import ForgotPasswordModel from "@/components/Models/ForgotPasswordModel/ForgotPasswordModel";
import GooglePasskeyLogin from "@/components/GooglePasskeyLogin/GooglePasskeyLogin";



type FormErrors = Record<string, string>;

const Signin = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("english");
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const googleLoginRef = useRef<HTMLInputElement>(null);
  // ---------- form for login details -----------
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  // form errors
  const [formErrors, setFormErrors] = useState<FormErrors>({});

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
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [showForgotPasswordModel, setShowForgotPasswordModel] = useState(false);
  // -------- handleChange for input fields ---------
  const handleInputChange = (value: string | Boolean, name: string) => {
    if (name === "email") {
      // Clear email error when user starts typing
      setFormErrors((prev) => ({ ...prev, email: "" }));
    }
    if (name === "password") {
      // Clear password error when user starts typing
      setFormErrors((prev) => ({ ...prev, password: "" }));
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // const isPartnerShipAccount = getPartnershipToken();

  useEffect(() => {
    const userCredentials = getUserNamePassword();
    if (userCredentials) {
      setForm({
        email: userCredentials.username,
        password: userCredentials.password,
      });
      handleSubmit(userCredentials.username, userCredentials.password, true);
    } else {
      // 2 seconds time out
      const timeout = setTimeout(() => {
        setShowPasskeyModel(true);
      }, 2000); // Hide after 2 seconds
    }
  }, []);

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
      const data = await google_sign_in({ token: idToken });
      if (data.success) {
        saveToken(data.data.token);
        setLoading(false);
        // --------- show success model ---------
        setShowSuccessModel(true);
        setTimeout(() => {
          if (getPartnershipToken() === "yes") {
            saveNewPartnershipUser("no");
            // Redirect to partnership home page
            router.push("/user/partnership-home");
          } else {
            router.push("/user/home");
          }
        }, 1000);
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

  // check form data is not empty and valid
  const validateForm = (email: string, password: string) => {
    const errors: FormErrors = {};
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())) {
      errors.email = "Invalid email address";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // handle form submit
  const handleSubmit = async (
    email: string,
    password: string,
    robot: boolean
  ) => {
    // validate form
    if (!validateForm(email, password)) return;
    if (loading) return;
    if (!email?.trim() || !password) {
      setError("Email and password are required.");
      setShowErrorModel(true); // you can render a simple error modal/toast if desired
      setTimeout(() => setShowErrorModel(false), 3600);
      return;
    }

    // check not a robot
    if (!robot) {
      setError("Please confirm you are not a robot.");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return;
    }
    // if remember me is checked, save username and password to local storage
    if (rememberMe) {
      saveUserNamePassword({
        username: email.trim(),
        password: password,
      });
    }
    setLoading(true);
    try {
      const payload = {
        email: email.trim(),
        password: password,
      };
      const json = await login(payload);

      if (!json?.success) {
        setError(json?.message);
        setShowErrorModel(true); // you can render a simple error modal/toast if desired
        setTimeout(() => setShowErrorModel(false), 3600);
        return;
      }
      const token = json?.data?.token;
      if (!token) {
        throw new Error("No token returned from server");
      }

      saveToken(token);
      // --------- show success model ---------
      setSuccessMessage("Login successful");
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
    } catch (error: any) {
      setError("Sign in failed");
      setShowErrorModel(true); // you can render a simple error modal/toast if desired
      setTimeout(() => setShowErrorModel(false), 3600);
    } finally {
      setLoading(false);
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
    <div className="flex flex-col min-h-screen">
      {/* Loading spinner */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}

      {/* Header Section */}
      <div className="relative h-[200px] flex-shrink-0">
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
        <div className="absolute bottom-4 left-6 flex items-center space-x-2 z-10">
          {" "}
          <h1 className="text-xl font-bold text-app-text-black font-plusJakartaSans">
            Sign in
          </h1>
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
                use_fedcm_for_prompt={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* form area */}
      <div
        className={`${
          showPasskeyModel ||
          faceIdModel ||
          createPasskeyModel ||
          createPasskey ||
          showSuccessModel ||
          showErrorModel ||
          signinOption ||
          showForgotPasswordModel
            ? "bg-k-background-secondary"
            : "bg-k-background-primary"
        } px-8 py-6 relative z-10 flex-grow`}
      >
        {/* form */}
        <div className="space-y-4 mb-5 mt-6">
          <div className="relative">
            <InputComponent
              icon={<UserIcon />}
              required
              placeholder="Enter email | Nick name"
              value={form.email}
              onChange={(e) => {
                handleInputChange(e.target.value, "email");
              }}
              error={formErrors.email}
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
            required
            error={formErrors.password}
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
          <p
            className="text-xs font-semibold font-plusJakartaSans text-app-new-blue cursor-pointer"
            onClick={() => {
              setShowForgotPasswordModel(true);
            }}
          >
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
            className="w-full bg-app-button-primary text-app-text-tertiary py-3.5 rounded-lg font-plusJakartaSans text-sm"
            onClick={() =>
              handleSubmit(form.email.trim(), form.password, notRobot)
            }
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
          <PadLockGif className="w-11 h-11 mx-auto" />
          {/* <img
            src="/bg-imgs/auth/passkey.gif" // Assumes lock.gif is in the /public folder
            alt="Passkey Lock Icon"
            className="w-11 h-11 mx-auto" // 44px by 44px, centered
          /> */}
        </div>{" "}
        {/* Recommendation Text */}
        <p className="text-[10px] text-app-new-blue font-plusJakartaSans text-center ">
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
                <CheckMarkGif />
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
          router.push("/user/home");
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
          router.push("/user/home");
          setSigninOption(false);
        }}
      />
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
        successMessage={
          successMessage || "Password reset link sent successfully!"
        }
      />
      <ForgotPasswordModel
        isOpen={showForgotPasswordModel}
        onClose={() => {
          setShowForgotPasswordModel(false);
        }}
      />
    </div>
  );
};

export default Signin;
