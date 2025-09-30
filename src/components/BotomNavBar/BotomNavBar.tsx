"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  AdvertiseIcon,
  BlogHomeIcon,
  HomeIcon,
  MoreIcon,
  PartnershipBlogIcon,
  ProfileIcon,
  ShopIcon,
} from "../../../public/svg-icons/icons";
import Blog from "@/app/user/blog/page";
import Home from "@/app/user/home/page";
import Shop from "@/app/user/shop/page";
import More from "@/app/user/more/page";
import Profile from "@/app/user/profile/page";
import MoreOptionModel from "@/components/Models/MoreOptionModel/MoreOptionModel";
import { useAppContext } from "@/context/AppContext";
import { getPartnershipToken } from "@/utils/partnershipUtils";
import { getUnreadNotificationCount } from "@/routes/notifications";
import SuccessModel from "../Models/SuccessModel/SuccessModel";
import ErrorModel from "../Models/ErrorModel/ErrorModel";

const BottomNavBar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme, setTheme, systemTheme } = useTheme();
  const [selectedColor, setSelectedColor] = useState("");
  // set active page
  const [activePageIndex, setActivePageIndex] = React.useState(0);
  // --------- show more option model ----------
  const [showMoreOptionModel, setShowMoreOptionModel] = useState(false);

  // use the appContext to get the more option state
  const { moreOption, setMoreOption } = useAppContext();

  const isPartnershipUser = getPartnershipToken();

  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

  useEffect(() => {
    if (theme === "light") {
      setSelectedColor("text-black");
    } else if (theme === "dark") {
      setSelectedColor("text-white");
    }
    fetchUnreadNotificationCount();
  }, [activePageIndex]);

  const fetchUnreadNotificationCount = async () => {
    try {
      setLoading(true);
      const data = await getUnreadNotificationCount();
      if (data.success) {
        setUnreadNotificationCount(data.data);
      }
    } catch (error) {
      console.error("Error fetching unread notification count:", error);
      setError("Error fetching unread notification count");
      setShowErrorModel(true);
      setTimeout(() => {
        setShowErrorModel(false);
        setError("");
      }, 3600);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-y-auto max-h-screen no-scrollbar">
      <div
        className={`h-tab-bar pb-3 px-4 bg-app-background-bottom-navbar flex justify-around items-center shadow-tab-bar pb-safe-bottom z-[1000]`}
      >
        <div
          onClick={() => {
            setActivePageIndex(0);
            if (isPartnershipUser === "yes") {
              // If the user is a partnership user, do something
              router.push("/user/partnership-home");
            } else {
              router.push("/user/home");
            }
          }}
          className={`flex flex-col items-center text-app-text-primary ${
            activePageIndex === 0
              ? "border-t-3 border-app-text-blue pt-2"
              : "pt-2"
          }`}
        >
          {/* <div
            className={`rounded-4xl p-2 text-app-text-primary ${
              activePageIndex === 0 ? "bg-app-button-blue" : ""
            }`}
          > */}
          {activePageIndex === 0 ? (
            <HomeIcon
              className={`text-app-new-blue`}
              width={30}
              height={30}
            />
          ) : (
            <HomeIcon width={30} height={30} />
          )}
          {/* </div> */}
          <div className="text-app-text-primary text-center text-[14px] font-plusJakartaSans-700">
            Home
          </div>
        </div>

        {isPartnershipUser === "yes" && (
          <div
            onClick={() => {
              setActivePageIndex(5);
              router.push("/user/advertise");
            }}
            className={`flex flex-col items-center text-app-text-primary ${
              activePageIndex === 5
                ? "border-t-3 border-app-text-blue pt-2"
                : "pt-2"
            }`}
          >
            {/* <div
            className={`rounded-4xl p-2 text-app-text-primary ${
              activePageIndex === 0 ? "bg-app-button-blue" : ""
            }`}
          > */}
            {activePageIndex === 5 ? (
              <AdvertiseIcon
                className={`text-app-new-blue`}
                width={38}
                height={38}
              />
            ) : (
              <AdvertiseIcon width={38} height={38} className="mt-[-1px]" />
            )}
            {/* </div> */}
            <div className="text-app-text-primary text-center text-[14px] font-plusJakartaSans-700">
              Advertise
            </div>
          </div>
        )}

        {isPartnershipUser === "yes" && (
          <div
            onClick={() => {
              setActivePageIndex(6);
              router.push("/user/partnership-blog");
            }}
            className={`flex flex-col items-center text-app-text-primary ${
              activePageIndex === 6
                ? "border-t-3 border-app-text-blue pt-2"
                : "pt-2"
            }`}
          >
            {/* <div
            className={`rounded-4xl p-2 text-app-text-primary ${
              activePageIndex === 0 ? "bg-app-button-blue" : ""
            }`}
          > */}
            {activePageIndex === 6 ? (
              <PartnershipBlogIcon
                className={`text-app-new-blue`}
                width={30}
                height={30}
              />
            ) : (
              <PartnershipBlogIcon width={30} height={30} />
            )}
            {/* </div> */}
            <div className="text-app-text-primary text-center text-[14px] font-plusJakartaSans-700">
              Blog
            </div>
          </div>
        )}

        {isPartnershipUser === "no" && (
          <div
            onClick={() => {
              setActivePageIndex(1);
              router.push("/user/blog");
            }}
            className={`flex flex-col items-center text-app-text-primary ${
              activePageIndex === 1
                ? "border-t-3 border-app-text-blue pt-2"
                : "pt-2"
            }`}
          >
            {/* <div
            className={`rounded-4xl p-2 text-app-text-primary ${
              activePageIndex === 1 ? "bg-app-button-blue" : ""
            }`}
          > */}
            {activePageIndex === 1 ? (
              <BlogHomeIcon
                className={`text-app-new-blue`}
                width={30}
                height={30}
              />
            ) : (
              <BlogHomeIcon width={30} height={30} />
            )}
            {/* </div> */}
            <div className="text-app-text-primary text-center text-[14px] font-plusJakartaSans-700">
              Blog
            </div>
          </div>
        )}

        {isPartnershipUser === "no" && (
          <div
            onClick={() => {
              setActivePageIndex(2);
              router.push("/user/shop");
            }}
            className={`flex flex-col items-center text-app-text-primary ${
              activePageIndex === 2
                ? "border-t-3 border-app-text-blue pt-2"
                : "pt-2"
            }`}
          >
            {/* <div
            className={`rounded-4xl p-2 text-app-text-primary ${
              activePageIndex === 2 ? "bg-app-button-blue" : ""
            }`}
          > */}
            {activePageIndex === 2 ? (
              <ShopIcon
                className={`text-app-new-blue`}
                // className={`${theme === "light" ? "text-white" : "text-black"}`}
                width={30}
                height={30}
              />
            ) : (
              <ShopIcon width={30} height={30} />
            )}
            {/* </div> */}
            <div className="text-app-text-primary text-center text-[14px] font-plusJakartaSans-700">
              Shop
            </div>
          </div>
        )}

        {isPartnershipUser === "no" && (
          <div
            onClick={() => {
              setActivePageIndex(3);

              setShowMoreOptionModel(true);
              setMoreOption(true);
            }}
            className={`flex flex-col items-center text-app-text-primary ${
              activePageIndex === 3
                ? "border-t-3 border-app-text-blue pt-2"
                : "pt-2"
            }`}
          >
            {/* <div
            className={`rounded-4xl p-2 text-app-text-primary ${
              activePageIndex === 3 ? "bg-app-button-blue" : ""
            }`}
          > */}
            {activePageIndex === 3 ? (
              <MoreIcon
                className={`text-app-new-blue`}
                // className={`${theme === "light" ? "text-white" : "text-black"}`}
                width={30}
                height={30}
              />
            ) : (
              <MoreIcon width={30} height={30} />
            )}
            {/* </div> */}
            <div className="text-app-text-primary text-center text-[14px] font-plusJakartaSans-700">
              More
            </div>
          </div>
        )}

        <div
          onClick={() => {
            setActivePageIndex(4);
            router.push("/user/profile");
          }}
          className={`flex flex-col items-center text-app-text-primary ${
            activePageIndex === 4
              ? "border-t-3 border-app-text-blue pt-2"
              : "pt-2"
          }`}
        >
          {/* <div
            className={`rounded-4xl p-2 text-app-text-primary ${
              activePageIndex === 4 ? "bg-app-button-blue" : ""
            }`}
          > */}
          {activePageIndex === 4 ? (
            <ProfileIcon
              className={`text-app-new-blue`}
              // className={`${theme === "light" ? "text-white" : "text-black"}`}
              width={30}
              height={30}
            />
          ) : (
            <ProfileIcon width={30} height={30} />
          )}
          {/* </div> */}
          <div className="text-app-text-primary text-center text-[14px] font-plusJakartaSans-700">
            Profile
          </div>
        </div>
      </div>
      {/* <div className="pb-30">{navItems[activePageIndex].page}</div> */}
      {/* More Option Model */}
      <MoreOptionModel
        isOpen={showMoreOptionModel}
        onClose={() => {
          setShowMoreOptionModel(false);
          setMoreOption(false);
        }}
        notificationCount={unreadNotificationCount}
      />
      <SuccessModel
        isOpen={showSuccessModel}
        onClose={() => {
          setShowSuccessModel(false);
          setSuccess("");
        }}
        successMessage={success || ""}
      />
      <ErrorModel
        isOpen={showErrorModel}
        onClose={() => {
          setShowErrorModel(false);
          setError("");
        }}
        errorMessage={error || ""}
      />
    </div>
  );
};

export default BottomNavBar;
