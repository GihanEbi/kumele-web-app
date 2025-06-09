"use client";

import Head from "next/head";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import {
  BackArrow,
  PasswordIcon,
  RightArrowIcon,
} from "../../../../../../public/svg-icons/icons";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import InputComponent from "@/components/InputComponent/InputComponent";

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
      <div className="min-h-screen bg-app-background-primary flex flex-col items-center pt-6 font-sans">
        <div className="w-full max-w-md px-4">
          {/* Header */}
          <header className="flex items-center mb-10">
            <button
              aria-label="Go back"
              onClick={() => window.history.back()} // Simple back navigation
              className="p-2 -ml-2 mr-2" // Added padding for easier click and negative margin to align
            >
              <BackArrow className="text-app-icon" />
            </button>
            <h1 className="text-2xl font-bold text-app-text-primary font-plusJakartaSans">
              Change passwords
            </h1>
          </header>
          <div>
            <div className="space-y-4 mb-5">
              <p className="text-sm font-plusJakartaSans text-app-text-primary mb-2">
                Current password
              </p>
              <div className="relative">
                <InputComponent
                  placeholder="Enter current password"
                  className="bg-k-primary-color"
                />
              </div>
            </div>
            <div className="space-y-4 mb-5">
              <p className="text-sm font-plusJakartaSans text-app-text-primary mb-2">
                New password
              </p>
              <div className="relative">
                <InputComponent
                  placeholder="Enter new password"
                  className="bg-k-primary-color"
                />
              </div>
            </div>
            <div className="space-y-4 mb-5">
              <p className="text-sm font-plusJakartaSans text-app-text-primary mb-2">
                Confirm new password
              </p>
              <div className="relative">
                <InputComponent
                  placeholder="Enter confirm new password"
                  className="bg-k-primary-color"
                />
              </div>
            </div>
          </div>
          {/* footer signup button */}
          <div className="pt-50">
            <button
              className="w-full bg-app-button-primary text-app-text-tertiary py-3.5 rounded-lg font-plusJakartaSans text-md"
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
