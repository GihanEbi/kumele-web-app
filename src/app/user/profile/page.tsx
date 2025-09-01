"use client";
import React, { use, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useTheme } from "next-themes";

const imgUrl = "http://localhost:5001";

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
import { fetch_profile, getAllUserData } from "@/routes/profile";
import { useRouter } from "next/navigation";
import SwitchComponent from "@/components/SwitchComponent/SwitchComponent";
import ContactModel from "@/components/Models/ContactModel/ContactModel";
import ReferralModel from "@/components/Models/ReferralModel/ReferralModel";
import DeleteAccountModel from "@/components/Models/DeleteAccountModel/DeleteAccountModel";
import SignoutModel from "@/components/Models/SignoutModel/SignoutModel";
import CustomToggle from "@/components/TogglrButtonComponent/TogglrButton";
import { paddings } from "@/constants/layout-constants";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/context/AppContext";
import { getPartnershipToken } from "@/utils/partnershipUtils";
const settingsGroup1 = [
  {
    icon: <SoundIcon className="text-app-icon" width={28} height={28} />,
    text: "Notifications",
    link: "/profile-other-pages/notifications",
  },
  {
    icon: <PaymentIcon className="text-app-icon" width={28} height={28} />,
    text: "Payments & Subscriptions",
    link: "/profile-other-pages/payment",
  },
  {
    icon: <SecurityIcon className="text-app-icon" width={28} height={28} />,
    text: "Security",
    link: "/profile-other-pages/security",
  },
];

const settingsGroup2 = [
  {
    icon: <ContactIcon className="text-app-icon" width={28} height={28} />,
    type: "model",
    text: "Contact",
  },
  {
    icon: <GuidelinesIcon className="text-app-icon" width={28} height={28} />,
    text: "Guidelines",
    link: "/profile-other-pages/guidelines",
  },
  {
    icon: <ReferIcon className="text-app-icon" width={28} height={28} />,
    text: "Refer a Friend",
  },
  {
    icon: (
      <TermsAndConditionsIcon
        className="text-app-icon"
        width={28}
        height={28}
      />
    ),
    text: "Terms and Conditions",
    link: "/user/profile/terms-conditions",
  },
  {
    icon: <NightModeIcon className="text-app-icon" width={28} height={28} />,
    text: "Night Mode",
    type: "model",
  },
  {
    icon: (
      <DeleteAccountIcon className="text-app-icon" width={28} height={28} />
    ),
    text: "Delete Account",
    type: "model",
  },
  {
    icon: <SignOutIcon className="text-app-icon" width={28} height={28} />,
    text: "Sign Out",
    type: "model",
  },
];

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

const Profile = () => {
  // routing
  const router = useRouter();
  // state for store the fetched user data
  const [userData, setUserData] = useState<profileData | null>(null);

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

  // use the appContext to get the more option state
  const { moreOption, setIsBottomNavBarFixed } = useAppContext();

  const isPartnershipUser = getPartnershipToken();

  // state for profile picture
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    setIsBottomNavBarFixed(true);
    if (!isPartnershipUser) {
      fetchUserData();
    }
  }, []);

  // Simulate fetching user data
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const data = await getAllUserData();

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
        className={`min-h-screen ${
          showContactModel ||
          showReferralModel ||
          showDeleteAccountModel ||
          moreOption ||
          showSignOutModel
            ? "bg-k-background-secondary"
            : "bg-k-background-primary"
        } p-[16px] sm:p-6 mb-30`}
      >
        <header className={`mb-4 pt-[36px]`}>
          <h1 className="text-[23px] font-bold text-app-text-primary font-plusJakartaSans-700">
            Profile
          </h1>
        </header>

        {/* Profile Card */}
        <div className="bg-app-background-card rounded-xl mb-4 relative">
          <div className="pt-5 pl-5 pr-5">
            <button
              aria-label="Edit profile"
              className="absolute top-[-5px] right-[-5px]"
              onClick={() => {
                router.push("/profile-other-pages/edit-profile");
              }}
            >
              <EditIcon className="text-app-icon " width={24} height={24} />
            </button>

            {isPartnershipUser === "yes" && (
              <div className="flex gap-5  pb-4">
                {/* <div className="relative w-[76px] h-[76px] sm:w-24 sm:h-24"> */}
                {/* <img src={"/images/spotify.png"} alt="spotify" width={63} height={63} /> */}
                {/* <Image
                  src={`${imgUrl}/${userData?.profilepicture.replace(
                    /\\/g,
                    "/"
                  )}`}
                  alt="spotify"
                  width={93}
                  height={63}
                  className="rounded-full"
                /> */}
                {/* </div> */}
                <div className="flex flex-col">
                  <p className="text-app-text-primary font-plusJakartaSans font-bold text-[19px]">
                    Spotify
                  </p>
                  <p className="text-app-text-profile-tabs font-plusJakartaSans font-normal text-[14px]">
                    Listening is everything. Millions of songs and podcasts. No
                    credit card needed. GET SPOTIFY FREE.
                  </p>
                </div>
              </div>
            )}

            {isPartnershipUser === "no" && (
              <>
                <div className="flex items-start space-x-6 mb-[6px]">
                  <div className="relative w-[76px] h-[76px] sm:w-24 sm:h-24">
                    {userData && userData.profilepicture && (
                      <Image
                        src={`${imgUrl}/${userData.profilepicture.replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt="Alkesh Kumar"
                        width={76}
                        height={76}
                        className="rounded-full object-cover"
                      />
                    )}
                  </div>
                  <div className="mt-1">
                    <h2 className="font-plusJakartaSans font-bold text-[19px] text-app-text-primary">
                      {userData?.username ? userData.username : "User NAme"}
                    </h2>
                    <button
                      style={{ backgroundColor: "#004DFF" }}
                      className="font-plusJakartaSans font-medium text-[9.95px] text-app-text-white py-1 px-3 rounded-r-sm mt-[6px]"
                      onClick={() => {
                        router.push("/profile-other-pages/edit-interest");
                      }}
                    >
                      Edit hobbies
                    </button>
                  </div>
                  <div className="w-[50px] h-[50px] sm:w-20 sm:h-20">
                    {userData?.qr_code_url && (
                      <Image
                        src={userData.qr_code_url}
                        alt="QR Code"
                        width={50}
                        height={50}
                        className="object-contain"
                      />
                    )}
                  </div>
                </div>

                <div className="mt-6 overflow-y-auto max-h-32 pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <p className="text-app-text-profile-text font-plusJakartaSans font-normal text-[14px] mb-2">
                    {userData?.about_me
                      ? userData.about_me
                      : "This is the about me section. You can write a brief description about yourself here."}
                  </p>
                </div>
                <div className="-mx-6 mt-4">
                  <div className="border-b border-app-border-profile"></div>
                </div>
              </>
            )}
          </div>
          {isPartnershipUser === "no" && (
            <div className="grid grid-cols-3 gap-4">
              <div
                className="flex flex-col items-center p-2 border-r-1 border-app-border-profile"
                onClick={() =>
                  router.push(`/profile-other-pages/following?source=${true}`)
                }
              >
                <p className="text-app-text-primary font-plusJakartaSans font-normal text-[12px]">
                  Following
                </p>
                <p className="text-[18px] font-bold text-app-text-blue font-plusJakartaSans-700">
                  {8}
                </p>
              </div>
              <div
                className="flex flex-col items-center p-2 border-r-1 border-app-border-profile"
                onClick={() =>
                  router.push(
                    `/profile-other-pages/following?isFollowing=${false}`
                  )
                }
              >
                <p className="text-app-text-primary font-plusJakartaSans font-normal text-[12px]">
                  Followers
                </p>
                <p className="text-[18px] font-bold text-app-text-blue font-plusJakartaSans-700">
                  {23}
                </p>
              </div>
              <div className="flex flex-col items-center p-2">
                <p className="text-app-text-primary font-plusJakartaSans font-normal text-[12px]">
                  Gold status
                </p>
                <p className="text-[18px] font-bold text-app-text-blue font-plusJakartaSans-700">
                  {23}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="mb-[22px]">
          <h3 className="font-plusJakartaSans font-bold text-[19px] mb-[22px] text-app-text-primary">
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
                  <span className="text-app-text-profile-tabs font-plusJakartaSans font-normal text-[16px]">
                    {item.text}
                  </span>
                </div>
                <RightArrowIcon
                  className="text-app-icon"
                  width={20}
                  height={20}
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
                    router.push("/profile-other-pages/guidelines");
                  } else if (item.text === "Terms and Conditions") {
                    router.push("/profile-other-pages/terms-conditions");
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span className="text-[16px] text-app-text-profile-tabs font-plusJakartaSans-400">
                    {item.text}
                  </span>
                </div>
                {item.text !== "Night Mode" ? (
                  <RightArrowIcon
                    className="text-app-icon"
                    width={20}
                    height={20}
                  />
                ) : (
                  <CustomToggle
                    checked={theme === "dark" ? true : false}
                    onCheckedChange={() => {
                      setTheme(theme === "dark" ? "light" : "dark");
                    }}
                    aria-label="Enable or disable email notifications"
                    singleChecked={true}
                  />

                  // <SwitchComponent
                  //   required
                  //   disabled={false}
                  //   value={
                  //     theme === "dark" || systemTheme === "dark" ? true : false
                  //   }
                  //   // onChange={handleSoundNotificationChange}
                  //   onclick={() => {
                  //     setTheme(theme === "dark" ? "light" : "dark");
                  //   }}
                  // />
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
