"use client";

import Head from "next/head";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import {
  BackArrow,
  PasswordIcon,
  RightArrowIcon,
} from "../../../../../public/svg-icons/icons";
import SwitchComponent from "@/components/SwitchComponent/SwitchComponent";
import { sound_Notifications } from "@/routes/profile";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import AuthenticatorModel from "@/components/Models/AuthenticatorModel/AuthenticatorModel";

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
            <h1 className="text-3xl font-bold text-app-text-primary font-plusJakartaSans">
              Security
            </h1>
          </header>
          <div className="">
            <div className="space-y-1 p-4 border-2 border-app-border-primary rounded-lg">
              <div className="border-b-2 border-app-border-primary pb-4">
                <div
                  onClick={() => {
                    router.push("/user/profile/security/changePassword");
                  }}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center space-x-3">
                    <PasswordIcon className="text-app-icon" />
                    <span className="text-md font-medium text-app-text-primary font-plusJakartaSans">
                      Change Password
                    </span>
                  </div>
                  <div>
                    <RightArrowIcon className="text-app-icon" />
                  </div>
                </div>
              </div>
              <div
                className="flex justify-between items-center pb-2 pt-2"
                onClick={() => {
                  setShowAuthenticatorModel(true);
                  
                }}
              >
                <div className="flex items-center space-x-3">
                  <PasswordIcon className="text-app-icon" />
                  <span
                    id="email-notifications-label"
                    className="text-md text-app-text-primary font-plusJakartaSans"
                  >
                    Two factor authentication
                  </span>
                </div>

                <SwitchComponent
                  required
                  disabled={false}
                  // onChange={handleSoundNotificationChange}
                  onclick={() => {}}
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
