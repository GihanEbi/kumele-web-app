"use client";

import Head from "next/head";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import {
  BackArrow,
  PasswordIcon,
  RightArrowIcon,
} from "../../../../public/svg-icons/icons";
import SwitchComponent from "@/components/SwitchComponent/SwitchComponent";
import { sound_Notifications } from "@/routes/profile";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import AuthenticatorModel from "@/components/Models/AuthenticatorModel/AuthenticatorModel";
import CustomToggle from "@/components/TogglrButtonComponent/TogglrButton";

const Security = () => {
  //   loading state
  const [loading, setLoading] = useState(false);
  // --------- show authenticator model ----------
  const [showAuthenticatorModel, setShowAuthenticatorModel] = useState(false);
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
        <div className="w-full max-w-md px-4 mt-[64px]">
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
              Security
            </h1>
          </header>
          <div className="">
            <div className="space-y-1 py-4 border-2 border-app-border-primary rounded-lg">
              <div className="border-b-[2px] px-4 border-app-border-primary pb-4">
                <div
                  onClick={() => {
                    router.push("/profile-other-pages/changePassword");
                  }}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center space-x-3">
                    <PasswordIcon className="text-app-icon" />
                    <span className="text-[16px] text-app-text-profile-tabs font-plusJakartaSans-400">
                      Change Password
                    </span>
                  </div>
                  <div>
                    <RightArrowIcon
                      className="text-app-icon"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
              <div
                className="flex justify-between px-4 items-center pb-2 pt-2"
                onClick={() => {
                  setShowAuthenticatorModel(true);
                }}
              >
                <div className="flex items-center space-x-3">
                  <PasswordIcon className="text-app-icon" />
                  <span
                    id="email-notifications-label"
                    className="text-[16px] text-app-text-profile-tabs font-plusJakartaSans-400"
                  >
                    Two factor authentication
                  </span>
                </div>

                <CustomToggle
                  id="two-factor-authentication"
                  aria-label="Enable Two Factor Authentication"
                  checked={false}
                  onCheckedChange={() => {}}
                  singleChecked={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Verification Model */}
      {showAuthenticatorModel && (
        <AuthenticatorModel
          onClose={() => setShowAuthenticatorModel(false)}
          isOpen={showAuthenticatorModel}
        />
      )}
    </div>
  );
};

export default Security;
