"use client";
import React, { use, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useTheme } from "next-themes";

import {
  ContactIcon,
  DeleteAccountIcon,
  EditIcon,
  GuidelinesIcon,
  NightModeIcon,
  PaymentIcon,
  ReferIcon,
  RightArrowIcon,
  SecurityIcon,
  SignOutIcon,
  SoundIcon,
  TermsAndConditionsIcon,
} from "../../../../public/svg-icons/icons";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { fetch_profile } from "@/routes/profile";
import { useRouter } from "next/navigation";
import SwitchComponent from "@/components/SwitchComponent/SwitchComponent";
import ContactModel from "@/components/Models/ContactModel/ContactModel";
import ReferralModel from "@/components/Models/ReferralModel/ReferralModel";
import DeleteAccountModel from "@/components/Models/DeleteAccountModel/DeleteAccountModel";
import SignoutModel from "@/components/Models/SignoutModel/SignoutModel";
const settingsGroup1 = [
  {
    icon: <SoundIcon className="text-app-icon" />,
    text: "Notifications",
    link: "/profile-other-pages/notifications",
  },
  {
    icon: <PaymentIcon className="text-app-icon" />,
    text: "Payments & Subscriptions",
    link: "/profile-other-pages/payment",
  },
  {
    icon: <SecurityIcon className="text-app-icon" />,
    text: "Security",
    link: "/user/profile/security",
  },
];

const settingsGroup2 = [
  {
    icon: <ContactIcon className="text-app-icon" />,
    type: "model",
    text: "Contact",
  },
  {
    icon: <GuidelinesIcon className="text-app-icon" />,
    text: "Guidelines",
    link: "/user/profile/guidelines",
  },
  { icon: <ReferIcon className="text-app-icon" />, text: "Refer a Friend" },
  {
    icon: <TermsAndConditionsIcon className="text-app-icon" />,
    text: "Terms and Conditions",
    link: "/user/profile/terms-conditions",
  },
  {
    icon: <NightModeIcon className="text-app-icon" />,
    text: "Night Mode",
    type: "model",
  },
  {
    icon: <DeleteAccountIcon className="text-app-icon" />,
    text: "Delete Account",
    type: "model",
  },
  {
    icon: <SignOutIcon className="text-app-icon" />,
    text: "Sign Out",
    type: "model",
  },
];

// ---------- interface ----------
interface fetch_profile {
  display_name: string;
  bio: string;
  picture_url: string;
  qr_code_url: string;
  followers_count: number;
  following_count: number;
  gold_status: number;
  sound_notifications: boolean;
  email_notifications: boolean;
  theme_mode: string; // "light" or "dark"
}

const Profile = () => {
  // routing
  const router = useRouter();
  // state for store the fetched user data
  const [userData, setUserData] = useState<fetch_profile | null>(null);

  // state for loading state
  const [loading, setLoading] = useState<boolean>(false);
  // --------- show contact model ----------
  const [showContactModel, setShowContactModel] = useState(false);
  // --------- show referral model ----------
  const [showReferralModel, setShowReferralModel] = useState(false);
  // --------- show delete account model ----------
  const [showDeleteAccountModel, setShowDeleteAccountModel] = useState(false);
  // --------- show sign out model ----------
  const [showSignOutModel, setShowSignOutModel] = useState(false);

  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    fetchUserData();
  }, []);

  // Simulate fetching user data
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const data = await fetch_profile();
      const tempData = {
        picture_url: "/avatar-img/profile-pic.png",
      };
      if (data.success) {
        setUserData(data.data);
      } else {
        console.error("Failed to fetch user data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Loading spinner */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}
      <Head>
        <title>Profile Page</title>
      </Head>
      <div
        className={`min-h-screen mt-2 ${
          showContactModel ||
          showReferralModel ||
          showDeleteAccountModel ||
          showSignOutModel
            ? "bg-k-background-secondary"
            : "bg-k-background-primary"
        } p-4 sm:p-6`}
      >
        <header className="mb-4">
          <h1 className="text-xl font-bold text-app-text-primary font-plusJakartaSans">
            Profile
          </h1>
        </header>

        {/* Profile Card */}
        <div className="bg-app-background-card p-5 rounded-xl mb-4 relative">
          <button
            aria-label="Edit profile"
            className="absolute top-[-5px] right-[-5px]"
            onClick={() => {
              router.push("/user/profile/edit-profile");
            }}
          >
            <EditIcon className="text-app-icon " width={20} height={20} />
          </button>
          <div className="flex items-start space-x-6 mb-5">
            <div className="relative w-16 h-16 sm:w-24 sm:h-24">
              <Image
                src={"/avatar-img/profile-pic.png"}
                alt="Alkesh Kumar"
                width={96}
                height={96}
                className="rounded-full object-cover"
              />
              {/* {userData?.picture_url ? (
                <Image
                  src={"/avatar-img/profile-pic.png"}
                  alt={userData.display_name}
                  width={96}
                  height={96}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-app-input-primary font-plusJakartaSans rounded-full flex items-center justify-center">
                  <span className="text-app-text-primary font-plusJakartaSans text-3xl">
                    {userData?.display_name[0] ? userData.display_name[0] : "A"}
                  </span>
                </div>
              )} */}
            </div>
            <div className="mt-1">
              <h2 className="text-lg font-semibold font-plusJakartaSans text-app-text-primary">
                {userData?.display_name
                  ? userData.display_name
                  : "Alkesh Kumar"}
              </h2>
              <button
                className="text-[8px] font-plusJakartaSans bg-app-text-blue text-app-text-primary py-1 px-3 rounded-r-sm"
                onClick={() => {
                  router.push("/user/profile/edit-interest");
                }}
              >
                Edit hobbies
              </button>
            </div>
            <div className="w-12 h-12 sm:w-20 sm:h-20">
              <Image
                src={userData?.qr_code_url || "/images/QR-code.png"}
                alt="QR Code"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>

          <p className="text-[11px] text-app-text-profile-text font-plusJakartaSans mb-2">
            I am a software engineer by day, and a vanlife enthusiast by heart.{" "}
            <br />
            <br />
            With a passion for both technology and the great outdoors, Monika
            thrives on the open road, where she merges her love for coding with
            her deep connection to nature.
          </p>
          <div className="flex justify-around border-t border-app-border-profile pt-2 text-center">
            <div className="">
              <p className="text-[10px] text-app-text-primary font-plusJakartaSans">Following</p>
              <p className="text-lg font-bold text-app-text-blue font-plusJakartaSans">
                {userData?.following_count || 8}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-app-text-primary font-plusJakartaSans">
                Followers
              </p>
              <p className="text-lg font-bold text-app-text-blue font-plusJakartaSans">
                {userData?.followers_count || 23}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-app-text-primary font-plusJakartaSans">
                Gold status
              </p>
              <p className="text-lg font-bold text-app-text-blue font-plusJakartaSans">
                {userData?.gold_status || 23}
              </p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-3 text-app-text-primary font-plusJakartaSans">
            Settings
          </h3>{" "}
          {/* Settings Group 1 */}
          <div className="bg-app-input-primary rounded-lg overflow-hidden mb-6">
            {settingsGroup1.map((item, index) => (
              <button
                key={item.text}
                className={`w-full flex items-center justify-between p-4 ${
                  index !== settingsGroup1.length - 1
                    ? "border-b border-app-border-profile"
                    : ""
                }`}
                onClick={() => {
                  if (item.link) {
                    router.push(item.link);
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span className="text-sm text-app-text-profile-tabs font-plusJakartaSans">
                    {item.text}
                  </span>
                </div>
                <RightArrowIcon
                  className="text-app-icon"
                  width={18}
                  height={18}
                />
              </button>
            ))}
          </div>
          {/* Settings Group 2 & Other items */}
          <div className="bg-app-input-primary rounded-lg overflow-hidden">
            {settingsGroup2.map((item, index) => (
              <button
                key={item.text}
                className={`w-full flex items-center justify-between p-4 ${
                  index !== settingsGroup2.length - 1
                    ? "border-b border-app-border-profile"
                    : ""
                }`}
                onClick={() => {
                  // Handle special cases for certain items
                  if (item.text === "Delete Account") {
                    setShowDeleteAccountModel(true);
                  } else if (item.text === "Refer a Friend") {
                    setShowReferralModel(true);
                  } else if (item.text === "Contact") {
                    setShowContactModel(true);
                  } else if (item.text === "Sign Out") {
                    setShowSignOutModel(true);
                  } else if (item.text === "night Mode") {
                    // Handle night mode logic here
                    console.log("Night Mode clicked");
                  } else if (item.text === "Guidelines") {
                    router.push("/user/profile/guidelines");
                  } else if (item.text === "Terms and Conditions") {
                    router.push("/user/profile/terms-conditions");
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span className="text-sm text-app-text-profile-tabs font-plusJakartaSans">
                    {item.text}
                  </span>
                </div>
                {item.text !== "Night Mode" ? (
                <RightArrowIcon
                  className="text-app-icon"
                  width={18}
                  height={18}
                />
                ) : (
                  <SwitchComponent
                    required
                    disabled={false}
                    value={
                      theme === "dark" || systemTheme === "dark" ? true : false
                    }
                    // onChange={handleSoundNotificationChange}
                    onclick={() => {
                      setTheme(theme === "dark" ? "light" : "dark");
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        {/* Contact Model */}
        <ContactModel
          isOpen={showContactModel}
          onClose={() => {
            setShowContactModel(false);
          }}
        />
        {/* referral Model */}
        <ReferralModel
          isOpen={showReferralModel}
          onClose={() => {
            setShowReferralModel(false);
          }}
        />
        {/* delete account Model */}
        <DeleteAccountModel
          isOpen={showDeleteAccountModel}
          onClose={() => {
            setShowDeleteAccountModel(false);
          }}
        />
        {/* Sign Out Model */}
        <SignoutModel
          isOpen={showSignOutModel}
          onClose={() => {
            setShowSignOutModel(false);
          }}
        />
      </div>
    </>
  );
};

export default Profile;
