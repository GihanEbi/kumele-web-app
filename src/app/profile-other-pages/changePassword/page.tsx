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

interface FormData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword?: string;
}

const ChangePasswordPage = () => {
  //   loading state
  const [loading, setLoading] = useState(false);
  // form submission
  const [formData, setFormData] = useState<FormData>({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  // routing
  const router = useRouter();

  // -------- handleChange for input fields ---------
  const handleChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // -------- handleSubmit for form submission ---------
  const handleSubmit = async () => {
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
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      };
      let data = await changePassword(dataObj);

      if (data.success) {
        console.log("Password changed successfully");
        // reset form
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        // show success model
        setShowSuccessModel(true);
      } else {
        console.log(data.message);
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
      <div
        className={`${
          showSuccessModel || showErrorModel
            ? "bg-k-background-secondary"
            : "bg-k-background-primary"
        } relative z-10`}
      >
        <div className="min-h-screen bg-app-background-primary flex flex-col items-center">
          <div className={`w-full max-w-md px-6 ${paddings.topMargin}`}>
            {/* Header */}
            <header className="flex items-center mb-5">
              <button
                aria-label="Go back"
                onClick={() => window.history.back()} // Simple back navigation
                className="mt-5 mr-2" // Added padding for easier click and negative margin to align
              >
                <BackArrow className="text-app-icon" />
              </button>
              <h1 className="mt-5 ml-5 text-[23px] font-semibold text-app-text-primary font-plusJakartaSans-700">
                Change passwords
              </h1>
            </header>
            <div>
              <div className="mb-[25px]">
                <p className="text-[16px] font-plusJakartaSans-400 text-app-text-primary mb-2">
                  Current password
                </p>
                <div className="relative">
                  <InputComponent
                    onChange={(e) =>
                      handleChange(e.target.value, "oldPassword")
                    }
                    value={formData.oldPassword}
                    placeholder="Enter current password"
                    className="bg-k-primary-color"
                  />
                </div>
              </div>
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
    </div>
  );
};

export default ChangePasswordPage;
