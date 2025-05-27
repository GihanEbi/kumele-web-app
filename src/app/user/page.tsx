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
  { href: "/home", label: "Home", icon: <HomeIcon />, page: <Home /> },
  {
    href: "/blog",
    label: "Blog",
    icon: <BlogHomeIcon />,
    page: <Blog />,
  },
  {
    href: "/shop",
    label: "Shop",
    icon: <ShopIcon />,
    page: <Shop />,
  },
  {
    href: "/more",
    label: "More",
    icon: <MoreIcon />,
    page: <More />,
  },
  {
    href: "/profile",
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
      <div className="fixed p-2 bottom-0 left-0 right-0 h-tab-bar bg-white flex justify-around items-center border-t border-gray-200 shadow-tab-bar pb-safe-bottom z-[1000]">
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setActivePageIndex(index);
            }}
          >
            <div className="flex flex-col items-center">
              {item.icon}
              <div className="text-black">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div>{navItems[activePageIndex].page}</div>
    </div>
  );
};

export default page;
