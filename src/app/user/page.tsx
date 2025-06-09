"use client";

import React, { useState } from "react";
import {
  BlogHomeIcon,
  HomeIcon,
  MoreIcon,
  ProfileIcon,
  ShopIcon,
} from "../../../public/svg-icons/icons";
import Blog from "./blog/page";
import Home from "./home/page";
import Shop from "./shop/page";
import More from "./more/page";
import Profile from "./profile/page";
import MoreOptionModel from "@/components/Models/MoreOptionModel/MoreOptionModel";

const navItems = [
  {
    label: "Home",
    icon: <HomeIcon className="text-app-icon" />,
    page: <Home />,
  },
  {
    label: "Blog",
    icon: <BlogHomeIcon className="text-app-icon" />,
    page: <Blog />,
  },
  {
    label: "Shop",
    icon: <ShopIcon className="text-app-icon" />,
    page: <Shop />,
  },
  {
    label: "More",
    icon: <MoreIcon className="text-app-icon" />,
    page: <More />,
  },
  {
    label: "Profile",
    icon: <ProfileIcon className="text-app-icon" />,
    page: <Profile />,
  },
];

const page = () => {
  // set active page
  const [activePageIndex, setActivePageIndex] = React.useState(0);
  // --------- show more option model ----------
  const [showMoreOptionModel, setShowMoreOptionModel] = useState(false);
  return (
    <div className="bg-red-100 ">
      <div
        className={`fixed p-2 bottom-0 left-0 right-0 h-tab-bar ${
          activePageIndex !== 0
            ? "bg-app-background-secondary"
            : "bg-app-background-primary"
        } flex justify-around items-center shadow-tab-bar pb-safe-bottom z-[1000]`}
      >
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              if (item.label === "More") {
                setShowMoreOptionModel(true);
              } else {
                setActivePageIndex(index);
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
      <div className="pb-30">{navItems[activePageIndex].page}</div>
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

export default page;
