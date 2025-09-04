"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CloseIcon,
  FaceIdIcon,
  ThumbIcon,
} from "../../../../../public/svg-icons/icons";
import InputComponent from "@/components/InputComponent/InputComponent";
import {
  finishPasskeyRegistration,
  login,
  passkeyRegistration,
} from "@/routes/signup_and_signin";
import { saveToken } from "@/utils/authUtils";
import {
  startRegistration,
  startAuthentication,
} from "@simplewebauthn/browser";

// props types
type passkeyModelProps = {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
};
const CreatePasskey: React.FC<passkeyModelProps> = ({
  isOpen,
  onClose,
  onContinue,
}) => {
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
  const [error, setError] = useState<string | null>(null);
  if (!isOpen) {
    return null; // Don't render anything if the modal is not open
  }
  // -------- handleChange for input fields ---------
  const handleInputChange = (value: string | Boolean, name: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // handle form submit
  const handleSubmit = async () => {
    console.log("sasas");
    if (loading) return;
    if (!form.email?.trim() || !form.password) {
      setError("Email and password are required.");
      setShowErrorModel(true); // you can render a simple error modal/toast if desired
      setTimeout(() => setShowErrorModel(false), 3600);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email: form.email.trim(),
        password: form.password,
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
      const passkey = await passkeyRegistration();
      if (!passkey?.success) {
        setError(passkey?.message);
        setShowErrorModel(true); // you can render a simple error modal/toast if desired
        setTimeout(() => setShowErrorModel(false), 3600);
        return;
      }

      const attestationResponse = await startRegistration(passkey.data);
      console.log(attestationResponse);

      // Step 3: Send response to server for verification
      const verificationResponse = await finishPasskeyRegistration({
        attestationResponse: attestationResponse,
      });
      console.log(verificationResponse);

      // onContinue();
      // setShowSuccessModel(true);
      // setTimeout(() => {
      //   setShowSuccessModel(false);
      //   const isPartner = getPartnershipToken(); // "yes" | "no" | null
      //   if (isPartner === "yes") {
      //     saveNewPartnershipUser("no");
      //     router.push("/user/partnership-home");
      //   } else {
      //     router.push("/user/home");
      //   }
      // }, 800);
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
            className={`bg-app-background-model w-full max-w-md p-6 sm:p-8 rounded-t-4xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            {/* Top section: Icon, Title, Close Button */}
            <div className="flex justify-between mb-[40px]">
              <div></div>
              <h1 className="text-[19px] text-center font-bold text-app-text-primary font-plusJakartaSans-700">
                Passkey
              </h1>
              <button
                onClick={() => {
                  onClose();
                }}
                aria-label="Close notification prompt"
                className="p-1 -m-1 text-gray-500"
              >
                <CloseIcon className="text-app-icon" width={24} height={24} />
              </button>
            </div>

            <p className="text-[16px] px-15 text-app-text-notifications-body font-plusJakartaSans-400 text-center">
              Signup using passkey
            </p>

            <div className="mt-[25px]">
              <InputComponent
                placeholder="Enter email"
                onChange={(e: any) => {
                  handleInputChange(e.target.value, "email");
                }}
              />
            </div>
            <div className="mt-[16px]">
              <InputComponent
                placeholder="Enter Password"
                onChange={(e) => {
                  handleInputChange(e.target.value, "password");
                }}
              />
            </div>
            <div className="mt-[63px] px-2 mb-[48px]">
              <button
                className="w-full text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Create Passkey
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePasskey;
