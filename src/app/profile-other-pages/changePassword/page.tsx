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

const ChangePasswordPage = () => {
  //   loading state
  const [loading, setLoading] = useState(false);
  // routing
  const router = useRouter();
  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
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
              onClick={() => {}}
            >
              Update password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
