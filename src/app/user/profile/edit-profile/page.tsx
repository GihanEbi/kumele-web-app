"use client";

import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import {
  BackArrow,
  EmoryIcon,
  EyeIcon,
  PasswordIcon,
  ProfileIcon,
  RightArrowIcon,
} from "../../../../../public/svg-icons/icons";
import SwitchComponent from "@/components/SwitchComponent/SwitchComponent";
import { sound_Notifications } from "@/routes/profile";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import InterestCard from "@/components/InterestCard/InterestCard";
import Image from "next/image";
import InputComponent from "@/components/InputComponent/InputComponent";
import TextAreaComponent from "@/components/TextAreaComponent/TextAreaComponent";
const page = () => {
  //   loading state
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <div className="min-h-screen bg-app-background-primary flex flex-col items-center pt-6 font-plusJakartaSans">
        <div className="w-full max-w-md px-4">
          {/* Header */}
          <header className="sticky top-0 bg-app-background-primary z-10 flex items-center">
            <button
              aria-label="Go back"
              onClick={() => window.history.back()} // Simple back navigation
              className="mr-2" // Added padding for easier click and negative margin to align
            >
              <BackArrow className="text-app-icon" />
            </button>
            <h1 className="text-xl font-bold text-app-text-primary font-plusJakartaSans">
              Edit Profile
            </h1>
          </header>
        </div>

        <div className="flex flex-col items-center group mt-10">
          <div className="bg-app-input-yellow rounded-full w-18 h-18 flex items-center justify-center mb-3">
            <ProfileIcon className="text-app-text-black w-12 h-12" />
          </div>
          <p className="text-sm font-plusJakartaSans text-center text-app-text-primary">
            Username
          </p>
        </div>

        <div className="mt-5 w-full max-w-md px-4">
          <div className="mb-2">
            <p className="text-sm font-plusJakartaSans mb-2 text-app-text-primary">
              Current E-mail
            </p>
            <InputComponent placeholder="kumele@gmail.com" />
          </div>
          <div className="mb-2">
            <p className="text-sm font-plusJakartaSans mb-2 text-app-text-primary">
              New E-mail
            </p>
            <InputComponent placeholder="Enter your new E-mail" />
          </div>
          <div className="mb-2">
            <p className="text-sm font-plusJakartaSans mb-2 text-app-text-primary">
              Password
            </p>
            <div className="relative mt-5">
              <InputComponent
                placeholder="************"
                type={passwordVisible ? "text" : "password"}
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
          </div>
          <div className="mb-2">
            <p className="text-sm font-plusJakartaSans mb-2 text-app-text-primary">
              About
            </p>
            <TextAreaComponent placeholder="Enter your bio(Max 500 characters" />
          </div>
        </div>
        <div className="space-y-3 w-full max-w-md px-4 mt-5">
          <button
            onClick={() => {}}
            className="w-full mt-5 bg-app-button-primary text-app-text-tertiary font-plusJakartaSans py-3 px-4 rounded-lg "
          >
            Update profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
