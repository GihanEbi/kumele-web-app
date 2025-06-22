"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  BlogHomeIcon,
  HomeIcon,
  MoreIcon,
  ProfileIcon,
  ShopIcon,
} from "../../../public/svg-icons/icons";
import Blog from "@/app/user/blog/page";
import Home from "@/app/user/home/page";
import Shop from "@/app/user/shop/page";
import More from "@/app/user/more/page";
import Profile from "@/app/user/profile/page";
import MoreOptionModel from "@/components/Models/MoreOptionModel/MoreOptionModel";

const BottomNavBar = () => {
  const router = useRouter();
  const { theme, setTheme, systemTheme } = useTheme();
  const [selectedColor, setSelectedColor] = useState("");
  // set active page
  const [activePageIndex, setActivePageIndex] = React.useState(0);
  // --------- show more option model ----------
  const [showMoreOptionModel, setShowMoreOptionModel] = useState(false);

  useEffect(() => {

    if (theme === "light") {
      setSelectedColor("text-black");
    } else if (theme === "dark") {
      setSelectedColor("text-white");
    }
  }, [activePageIndex]);

  return (
    <div className="">
      <div
        className={`h-tab-bar pb-6 pt-2 px-4 bg-app-background-bottom-navbar flex justify-around items-center shadow-tab-bar pb-safe-bottom z-[1000]`}
      >
        <div
          onClick={() => {
            setActivePageIndex(0);
            router.push("/user/home");
          }}
          className={`flex flex-col items-center text-app-text-primary`}
        >
          <div
            className={`rounded-4xl p-3 text-app-text-primary ${
              activePageIndex === 0 ? "bg-app-button-blue" : ""
            }`}
          >
            {activePageIndex === 0 ? (
              <HomeIcon
                className={`${theme === "light" ? "text-white" : "text-black"}`}
                width={40}
                height={40}
              />
            ) : (
              <HomeIcon width={40} height={40} />
            )}
          </div>
          <div className="text-app-text-primary text-center text-[14px] font-plusJakartaSans-700">
            Home
          </div>
        </div>
        <div
          onClick={() => {
            setActivePageIndex(1);
            router.push("/user/blog");
          }}
          className={`flex flex-col items-center text-app-text-primary`}
        >
          <div
            className={`rounded-4xl p-3 text-app-text-primary ${
              activePageIndex === 1 ? "bg-app-button-blue" : ""
            }`}
          >
            {activePageIndex === 1 ? (
              <BlogHomeIcon
                className={`${theme === "light" ? "text-white" : "text-black"}`}
                width={40}
                height={40}
              />
            ) : (
              <BlogHomeIcon width={40} height={40} />
            )}
          </div>
          <div className="text-app-text-primary text-center text-[14px] font-plusJakartaSans-700">
            Blog
          </div>
        </div>
        <div
          onClick={() => {
            setActivePageIndex(2);
            router.push("/user/shop");
          }}
          className={`flex flex-col items-center text-app-text-primary`}
        >
          <div
            className={`rounded-4xl p-3 text-app-text-primary ${
              activePageIndex === 2 ? "bg-app-button-blue" : ""
            }`}
          >
            {activePageIndex === 2 ? (
              <ShopIcon
                className={`${theme === "light" ? "text-white" : "text-black"}`}
                width={40}
                height={40}
              />
            ) : (
              <ShopIcon width={40} height={40} />
            )}
          </div>
          <div className="text-app-text-primary text-center text-[14px] font-plusJakartaSans-700">
            Shop
          </div>
        </div>
        <div
          onClick={() => {
            setActivePageIndex(3);
            setShowMoreOptionModel(true);
          }}
          className={`flex flex-col items-center text-app-text-primary`}
        >
          <div
            className={`rounded-4xl p-3 text-app-text-primary ${
              activePageIndex === 3 ? "bg-app-button-blue" : ""
            }`}
          >
            {activePageIndex === 3 ? (
              <MoreIcon
                className={`${theme === "light" ? "text-white" : "text-black"}`}
                width={40}
                height={40}
              />
            ) : (
              <MoreIcon width={40} height={40} />
            )}
          </div>
          <div className="text-app-text-primary text-center text-[14px] font-plusJakartaSans-700">
            More
          </div>
        </div>
        <div
          onClick={() => {
            setActivePageIndex(4);
            router.push("/user/profile");
          }}
          className={`flex flex-col items-center text-app-text-primary`}
        >
          <div
            className={`rounded-4xl p-3 text-app-text-primary ${
              activePageIndex === 4 ? "bg-app-button-blue" : ""
            }`}
          >
            {activePageIndex === 4 ? (
              <ProfileIcon
                className={`${theme === "light" ? "text-white" : "text-black"}`}
                width={40}
                height={40}
              />
            ) : (
              <ProfileIcon width={40} height={40} />
            )}
          </div>
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
        }}
      />
    </div>
  );
};

export default BottomNavBar;
