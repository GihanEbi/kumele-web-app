import React, { use, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

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
const settingsGroup1 = [
  { icon: <SoundIcon />, text: "Notifications" },
  { icon: <PaymentIcon />, text: "Payments & Subscriptions" },
  { icon: <SecurityIcon />, text: "Security" },
];

const settingsGroup2 = [
  { icon: <ContactIcon />, text: "Contact" },
  { icon: <GuidelinesIcon />, text: "Guidelines" },
  { icon: <ReferIcon />, text: "Refer a Friend" },
  { icon: <TermsAndConditionsIcon />, text: "Terms and Conditions" },
  { icon: <NightModeIcon />, text: "Night Mode" },
  { icon: <DeleteAccountIcon />, text: "Delete Account" },
  { icon: <SignOutIcon />, text: "Sign Out" },
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

  useEffect(() => {
    fetchUserData();
  }, []);

  // Simulate fetching user data
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const data = await fetch_profile();
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
      <div className="min-h-screen bg-white text-gray-900 dark:text-gray-100 p-4 sm:p-6 font-sans">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        </header>

        {/* Profile Card */}
        <div className="bg-gray-200 p-5 rounded-xl shadow-lg mb-8 relative">
          <button
            aria-label="Edit profile"
            className="absolute top-0 right-0 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <EditIcon />
          </button>
          <div className="flex items-start space-x-4 mb-5">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24">
              {userData?.picture_url ? (
                <Image
                  src={userData.picture_url}
                  alt={userData.display_name}
                  width={96}
                  height={96}
                  className="rounded-full object-cover border-4 border-pink-300 dark:border-pink-500"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-black text-3xl">
                    {userData?.display_name[0]}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1 mt-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {userData?.display_name}
              </h2>
              <button className="mt-1 text-xs bg-blue-800 text-white font-semibold py-1 px-3 rounded-md transition duration-150">
                Edit hobbies
              </button>
            </div>
            <div className="w-16 h-16 sm:w-20 sm:h-20">
              <Image
                src={userData?.qr_code_url || ""}
                alt="QR Code"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>

          <p className="text-sm text-gray-800 mb-2">
            {userData?.bio || "No bio available."}
          </p>
          <div className="flex justify-around border-t border-white pt-4 text-center">
            <div>
              <p className="text-xs text-gray-800">Following</p>
              <p className="text-lg font-bold text-blue-800">
                {userData?.following_count || 0}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-800">Followers</p>
              <p className="text-lg font-bold text-blue-800">
                {userData?.followers_count || 0}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-800">Gold status</p>
              <p className="text-lg font-bold text-blue-800">
                {userData?.gold_status || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Settings</h3>{" "}
          {/* Settings Group 1 */}
          <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden mb-6">
            {settingsGroup1.map((item, index) => (
              <button
                key={item.text}
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-150 ${
                  index !== settingsGroup1.length - 1
                    ? "border-b border-white"
                    : ""
                }`}
                onClick={() => {
                  if (item.text === "Notifications") {
                    router.push(`/user/profile/notifications?sound_notifications=${userData?.sound_notifications}&email_notifications=${userData?.email_notifications}`);
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span className="text-sm font-medium text-gray-700">
                    {item.text}
                  </span>
                </div>
                <RightArrowIcon />
              </button>
            ))}
          </div>
          {/* Settings Group 2 & Other items */}
          <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden">
            {settingsGroup2.map((item, index) => (
              <button
                key={item.text}
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-150 ${
                  index !== settingsGroup2.length - 1
                    ? "border-b border-white"
                    : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span className="text-sm font-medium text-gray-800">
                    {item.text}
                  </span>
                </div>
                <RightArrowIcon />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
