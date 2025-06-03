"use client";

import React from "react";
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

const navItems = [
  { label: "Home", icon: <HomeIcon />, page: <Home /> },
  {
    label: "Blog",
    icon: <BlogHomeIcon />,
    page: <Blog />,
  },
  {
    label: "Shop",
    icon: <ShopIcon />,
    page: <Shop />,
  },
  {
    label: "More",
    icon: <MoreIcon />,
    page: <More />,
  },
  {
    label: "Profile",
    icon: <ProfileIcon />,
    page: <Profile />,
  },
];

const page = () => {
  // set active page
  const [activePageIndex, setActivePageIndex] = React.useState(0);
  return (
    <div className=" bg-white">
      <div className="fixed p-2 bottom-0 left-0 right-0 h-tab-bar bg-gray-100 flex justify-around items-center border-t border-gray-200 shadow-tab-bar pb-safe-bottom z-[1000]">
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setActivePageIndex(index);
            }}
          >
            <div
              className={`flex flex-col items-center text-white`}
            >
              <div
                className={`rounded-4xl p-2 text-white ${
                  activePageIndex === index ? "bg-blue-500 color" : ""
                }`}
              >
                {item.icon}
              </div>
              <div className="text-black">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="pb-20">{navItems[activePageIndex].page}</div>
    </div>
  );
};

export default page;
