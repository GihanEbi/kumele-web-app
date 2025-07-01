"use client";

import React, { useEffect } from "react";
import Head from "next/head";
import { useState } from "react";
import { BackArrow } from "../../../../public/svg-icons/icons";
import TabComponent from "@/components/TabComponent/TabComponent";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { paddings } from "@/constants/layout-constants";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const followerList = [
  {
    name: "Charlie Brown",
    img: "/followers/1.png",
  },
  {
    name: "Lucy van Pelt",
    img: "/followers/2.png",
  },
  {
    name: "Linus van Pelt",
    img: "/followers/3.png",
  },
  {
    name: "Franklin",
    img: "/followers/6.png",
  },
  {
    name: "Marcie",
    img: "/followers/7.png",
  },
  {
    name: "Peppermint Patty",
    img: "/followers/8.png",
  },
  {
    name: "Franklin",
    img: "/followers/9.png",
  },
  {
    name: "Marcie",
    img: "/followers/10.png",
  },
];
const followingList = [
  {
    name: "Franklin",
    img: "/followers/9.png",
  },
  {
    name: "Peppermint Patty",
    img: "/followers/8.png",
  },
  {
    name: "Franklin",
    img: "/followers/6.png",
  },
  {
    name: "Marcie",
    img: "/followers/10.png",
  },
  {
    name: "Linus van Pelt",
    img: "/followers/3.png",
  },
  {
    name: "Snoopy",
    img: "/followers/4.png",
  },
  {
    name: "Peppermint Patty",
    img: "/followers/5.png",
  },
  {
    name: "Marcie",
    img: "/followers/7.png",
  },
];

const FollowingComponent = () => {
  // state for loading state
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState<boolean>(false);
  //State to track the active tab
  const [activeTab, setActiveTab] = useState<"Followers" | "Following">(
    "Followers"
  );
  const source = searchParams.get("source");

  useEffect(() => {
    if (source) {
      setActiveTab("Followers");
    } else {
      setActiveTab("Following");
    }
  }, [source]);

  // styles for active and inactive tabs to keep the JSX clean
  const activeTabStyles =
    "bg-app-background-primary shadow text-app-blog-card-author-text";
  const inactiveTabStyles = "bg-transparent text-app-search-bar-text";
  return (
    <div>
      <div className="px-6 min-h-screen bg-app-background-primary flex flex-col pt-6">
        <div className={`w-full max-w-md ${paddings.topMargin}`}>
          <header className="">
            <button
              aria-label="Go back"
              onClick={() => window.history.back()} // Simple back navigation
              className="mr-2" // Added padding for easier click and negative margin to align
            >
              <BackArrow className="text-app-icon" />
            </button>
          </header>
        </div>
        <main className="mt-[12px]">
          {/* <TabComponent tabs={tabsData} /> */}
          <div className="bg-app-range-slider-track-active p-1 gap-1 rounded-lg flex justify-between items-center mt-2">
            {/* Subscriptions Button */}
            <div
              className={`text-center relative py-3 px-5 w-full rounded-lg font-plusJakartaSans-500 font-medium text-[14px] transition-all duration-300 ${
                activeTab === "Followers" ? activeTabStyles : inactiveTabStyles
              }`}
            >
              <button onClick={() => setActiveTab("Followers")}>
                Followers
              </button>
              <div className="rounded-full bg-app-input-yellow text-app-text-black py-1 px-2 absolute top-[1px] right-[1px]">
                <p className="text-[7.52px]">8</p>
              </div>
            </div>

            <div
              className={` text-center flex w-full relative gap-2 py-3 px-4 rounded-lg font-plusJakartaSans-500 font-medium text-[14px] transition-all duration-300 ${
                activeTab === "Following" ? activeTabStyles : inactiveTabStyles
              }`}
            >
              <button onClick={() => setActiveTab("Following")}>
                Following
              </button>
              <div className="rounded-full bg-app-input-yellow text-app-text-black py-1 px-2 absolute top-[1px] right-[1px]">
                <p className="text-[7.52px]">8</p>
              </div>
            </div>
          </div>
          {activeTab === "Followers" && (
            <div className="mt-[25px]">
              {followerList.map((follower, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 mb-[24px]"
                >
                  <Image
                    src={follower.img}
                    alt={follower.name}
                    width={44}
                    height={44}
                    className="rounded-full"
                  />
                  <span className="text-[16px] text-app-text-primary font-plusJakartaSans-400">
                    {follower.name}
                  </span>
                </div>
              ))}
            </div>
          )}
          {activeTab === "Following" && (
            <div className="mt-[25px]">
              {followingList.map((follower, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 mb-[24px]"
                >
                  <Image
                    src={follower.img}
                    alt={follower.name}
                    width={44}
                    height={44}
                    className="rounded-full"
                  />
                  <span className="text-[16px] text-app-text-primary font-plusJakartaSans-400">
                    {follower.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FollowingComponent;
