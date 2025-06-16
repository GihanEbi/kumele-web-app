"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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

const navItems = [
  {
    label: "Home",
    icon: <HomeIcon className="text-app-icon" />,
    page: <Home />,
    url: "/user/home",
  },
  {
    label: "Blog",
    icon: <BlogHomeIcon className="text-app-icon" />,
    page: <Blog />,
    url: "/user/blog",
  },
  {
    label: "Shop",
    icon: <ShopIcon className="text-app-icon" />,
    page: <Shop />,
    url: "/user/shop",
  },
  {
    label: "More",
    icon: <MoreIcon className="text-app-icon" />,
    page: <More />,
    url: "",
  },
  {
    label: "Profile",
    icon: <ProfileIcon className="text-app-icon" />,
    page: <Profile />,
    url: "/user/profile",
  },
];

const BottomNavBar = () => {
  const router = useRouter();
  // set active page
  const [activePageIndex, setActivePageIndex] = React.useState(0);
  // --------- show more option model ----------
  const [showMoreOptionModel, setShowMoreOptionModel] = useState(false);
  return (
    <div className="">
      <div
        className={`h-tab-bar px-4 py-2 bg-app-background-bottom-navbar flex justify-around items-center shadow-tab-bar pb-safe-bottom z-[1000]`}
      >
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              if (item.label === "More") {
                setShowMoreOptionModel(true);
              } else {
                setActivePageIndex(index);
                router.push(item.url);
                setShowMoreOptionModel(false);
              }
            }}
          >
            <div className={`flex flex-col items-center text-app-text-primary`}>
              <div
                className={`rounded-4xl p-2 text-app-text-primary ${
                  activePageIndex === index ? "bg-app-button-blue" : ""
                }`}
              >
                {item.icon}
              </div>
              <div className="text-app-text-primary text-xs">{item.label}</div>
            </div>
          </div>
        ))}
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
