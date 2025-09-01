"use client";

import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import {
  BackArrow,
  EyeIcon,
  ProfileIcon,
} from "../../../../public/svg-icons/icons";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import InputComponent from "@/components/InputComponent/InputComponent";
import TextAreaComponent from "@/components/TextAreaComponent/TextAreaComponent";
import { paddings } from "@/constants/layout-constants";
import {
  createOrUpdateAbout,
  getAllUserData,
  updateProfilePicture,
} from "@/routes/profile";
import Image from "next/image";
import CheckMarkGif from "@/components/GifComponents/CheckMarkGif/CheckMarkGif";
import { useRouter } from "next/navigation";

const imgUrl = "http://localhost:5001";

// ---------- interface ----------
interface profileData {
  id: string;
  username: string;
  fullname: string;
  email: string;
  gender: string;
  language: string;
  dateofbirth: string;
  referralcode: string;
  abovelegalage: boolean;
  termsandconditionsaccepted: boolean;
  subscribedtonewsletter: boolean;
  profilepicture: string;
  about_me: string;
  to_tp_secret: string;
  is_2fa_enabled: boolean;
  my_referral_code: string;
  qr_code_url: string;
}

const page = () => {
  const router = useRouter();
  //   loading state
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userData, setUserData] = useState<profileData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // state for about me
  const [aboutMe, setAboutMe] = useState<string>("");
  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click(); // programmatically open file selector
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmitAboutMe = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const data = await createOrUpdateAbout({ about: aboutMe });
      if (data.success) {
        fetchUserData();
        setShowSuccessModel(true);
        setTimeout(() => {
          setShowSuccessModel(false);
        }, 1000); // Hide after 2 seconds
        router.push("/user/profile");
      } else {
        console.log(data.message || "Failed to update about me.");
        setShowSuccessModel(false);
      }
    } catch (error) {
      console.error("Error updating about me:", error);
    } finally {
      setLoading(false);
    }
  };

  // Simulate fetching user data
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const data = await getAllUserData();

      if (data.success) {
        setUserData(data.data);
        setAboutMe(data.data.about_me || "");
      } else {
        console.error("Failed to fetch user data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleFileUpload = async (file: any) => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      if (file) {
        let formData = new FormData();
        formData.append("destination", "profiles");
        formData.append("profilePicture", file);

        const data = await updateProfilePicture(formData);
        if (data.success) {
          // Handle successful profile picture update
          fetchUserData();
          console.log(data.message);
        } else {
          console.log(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
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
          showSuccessModel
            ? "bg-k-background-secondary"
            : "bg-k-background-primary"
        } min-h-screen flex flex-col pt-6 font-plusJakartaSans`}
      >
        <div className={`w-full max-w-md px-4 ${paddings.topMargin}`}>
          {/* Header */}
          <header className="sticky top-0 bg-app-background-primary z-10 flex items-center">
            <button
              aria-label="Go back"
              onClick={() => window.history.back()} // Simple back navigation
              className="mr-2" // Added padding for easier click and negative margin to align
            >
              <BackArrow className="text-app-icon" />
            </button>
            <h1 className="text-[23px] font-semibold text-app-text-primary font-plusJakartaSans-700">
              Edit Profile
            </h1>
          </header>
        </div>

        <div className="flex flex-col items-center group mt-10">
          <div
            onClick={handleClick}
            className={`${
              userData && userData.profilepicture ? "bg-app-input-yellow" : "bg-app-input-yellow"
            } rounded-full w-[80px] h-[80px] flex items-center justify-center mb-3 cursor-pointer hover:opacity-80`}
          >
            {userData && userData.profilepicture ? (
              <Image
                src={`${imgUrl}/${userData.profilepicture.replace(/\\/g, "/")}`}
                alt="Alkesh Kumar"
                width={76}
                height={76}
                className="rounded-full object-cover"
              />
            ) : (
              <ProfileIcon className="text-app-text-black w-12 h-12" />
            )}
          </div>
          <p className="text-[16px] font-plusJakartaSans-400 text-center text-app-text-primary">
            Username
          </p>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*,application/pdf"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />
        </div>

        <div className="mt-5 w-full items-center max-w-md px-5">
          <div className="mb-[25px]">
            <p className="text-[16px] font-plusJakartaSans-400 mb-2 text-app-text-primary">
              Current E-mail
            </p>
            <InputComponent placeholder="kumele@gmail.com" />
          </div>
          <div className="mb-[25px]">
            <p className="text-[16px] font-plusJakartaSans-400 mb-2 text-app-text-primary">
              New E-mail
            </p>
            <InputComponent placeholder="Enter your new E-mail" />
          </div>
          <div className="mb-[25px]">
            <p className="text-[16px] font-plusJakartaSans-400 mb-2 text-app-text-primary">
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
            <TextAreaComponent
              placeholder="Enter your bio(Max 500 characters"
              onChange={(e) => setAboutMe(e.target.value)}
              value={aboutMe}
            />
          </div>
        </div>
        <div className="space-y-3 mt-10 px-3 mb-10">
          <button
            onClick={() => {
              handleSubmitAboutMe();
            }}
            className="w-full text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
          >
            Update profile
          </button>
        </div>
      </div>
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
                Update Successfully
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
