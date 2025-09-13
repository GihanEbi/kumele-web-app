"use client";

import Head from "next/head";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import {
  BackArrow,
  PasswordIcon,
  RightArrowIcon,
} from "../../../../public/svg-icons/icons";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import InputComponent from "@/components/InputComponent/InputComponent";
import { paddings } from "@/constants/layout-constants";
import { changePassword } from "@/routes/profileSecurity";
import CheckMarkGif from "@/components/GifComponents/CheckMarkGif/CheckMarkGif";
import { resetPassword } from "@/routes/signup_and_signin";
import ErrorModel from "@/components/Models/ErrorModel/ErrorModel";
import SuccessModel from "@/components/Models/SuccessModel/SuccessModel";
import { useSearchParams } from "next/navigation";

interface FormData {
  newPassword: string;
  confirmNewPassword?: string;
}

const ChangePasswordPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [resetPasswordToken, setResetPasswordToken] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (searchParams) {
      setResetPasswordToken(searchParams.get("reset_password_token"));
    }
  }, [searchParams]);
  //   loading state
  const [loading, setLoading] = useState(false);
  // form submission
  const [formData, setFormData] = useState<FormData>({
    newPassword: "",
    confirmNewPassword: "",
  });

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // -------- handleChange for input fields ---------
  const handleChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // -------- handleSubmit for form submission ---------
  const handleSubmit = async () => {
    if (!resetPasswordToken) return; 
    // check if new password is match to confirm new password
    if (formData.newPassword !== formData.confirmNewPassword) {
      console.log("Passwords do not match");
      return;
    }
    // -------- prevent multiple submission
    if (loading) return;
    try {
      setLoading(true);
      const dataObj = {
        newPassword: formData.newPassword,
        reset_password_token: resetPasswordToken,
      };
      let data = await resetPassword(dataObj);

      if (data.success) {
        // reset form
        setFormData({
          newPassword: "",
          confirmNewPassword: "",
        });
        // show success model
        setShowSuccessModel(true);
        setTimeout(() => {
          setShowSuccessModel(false);
          router.push("/authentication/signin");
        }, 3600); // Hide after 2 seconds
      } else {
        setError(data?.message);
        setShowErrorModel(true); // you can render a simple error modal/toast if desired
        setTimeout(() => setShowErrorModel(false), 3600);
      }
    } catch (error) {
      console.error("Error creating user group:", error);
    } finally {
      // --------- set loading to false ---------
      setLoading(false);
    }
  };
  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <div>
        <div
          className={`${
            showSuccessModel
              ? "bg-k-background-secondary"
              : "bg-k-background-primary"
          } relative z-10 min-h-screen flex flex-col items-center`}
        >
          <div className={`w-full max-w-md px-6 ${paddings.topMargin}`}>
            {/* Header */}
            <header className="flex items-center mb-5">
              <h1 className="mt-5 text-[23px] font-semibold text-app-text-primary font-plusJakartaSans-700">
                Change passwords
              </h1>
            </header>
            <div>
              <div className="mb-[25px]">
                <p className="text-[16px] font-plusJakartaSans-400 text-app-text-primary mb-2">
                  New password
                </p>
                <div className="relative">
                  <InputComponent
                    onChange={(e) =>
                      handleChange(e.target.value, "newPassword")
                    }
                    value={formData.newPassword}
                    placeholder="Enter new password"
                    className="bg-k-primary-color"
                  />
                </div>
              </div>
              <div className="mb-[25px]">
                <p className="text-[16px] font-plusJakartaSans-400 text-app-text-primary mb-2">
                  Confirm new password
                </p>
                <div className="relative">
                  <InputComponent
                    onChange={(e) =>
                      handleChange(e.target.value, "confirmNewPassword")
                    }
                    value={formData.confirmNewPassword}
                    placeholder="Re-enter new password"
                    className="bg-k-primary-color"
                  />
                </div>
              </div>
            </div>
            {/* footer signup button */}
            <div className="fixed bottom-[40px] left-1/2 transform -translate-x-1/2 w-full px-6">
              <button
                className="w-full text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Update password
              </button>
            </div>
          </div>
        </div>
        {/* if password change successful */}
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
                  Your password has been changed successfully!
                </p>
              </div>
            </div>
          </div>
        )}
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
        successMessage={"Password reset successfully!"}
      />
    </div>
  );
};

export default ChangePasswordPage;
