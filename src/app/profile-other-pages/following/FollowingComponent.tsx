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
import SuccessModel from "@/components/Models/SuccessModel/SuccessModel";
import ErrorModel from "@/components/Models/ErrorModel/ErrorModel";
import { getFollowers, getFollowing } from "@/routes/following_follower";


type followers = {
  id: string;
  username: string;
  followedAt: string;
  profilePicture: string;
};

const FollowingComponent = () => {
  // state for loading state
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState<boolean>(false);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [followerListData, setFollowerListData] = useState<followers[]>([]);
  const [followingListData, setFollowingListData] = useState<followers[]>([]);
  //State to track the active tab
  const [activeTab, setActiveTab] = useState<"Followers" | "Following">(
    "Followers"
  );
  // const source = searchParams.get("source");
  const [source, setSource] = useState<string | null>(null);
  // const source = searchParams?.get("source") ?? "";
  useEffect(() => {
    if (searchParams) {
      setSource(searchParams.get("source"));
    }
  }, [searchParams]);

  useEffect(() => {
    if (source) {
      setActiveTab("Followers");
    } else {
      setActiveTab("Following");
    }
    getFollowingList();
    getFollowerList();
  }, [source]);

  // function to get following list
  const getFollowingList = async () => {
    try {
      setLoading(true);
      const data = await getFollowing();
      if (data.success) {
        setFollowingListData(data.data.following);
      }
    } catch (error) {
      console.error("Error fetching following list:", error);
      setError("Error fetching following list");
      setShowErrorModel(true);
      setTimeout(() => {
        setShowErrorModel(false);
        setError("");
      }, 3600);
    } finally {
      setLoading(false);
    }
  };

  // function to get follower list
  const getFollowerList = async () => {
    try {
      setLoading(true);
      const data = await getFollowers();
      if (data.success) {
        setFollowerListData(data.data.followers);
      }
    } catch (error) {
      console.error("Error fetching follower list:", error);
      setError("Error fetching follower list");
      setShowErrorModel(true);
      setTimeout(() => {
        setShowErrorModel(false);
        setError("");
      }, 3600);
    } finally {
      setLoading(false);
    }
  };

  // styles for active and inactive tabs to keep the JSX clean
  const activeTabStyles =
    "bg-app-background-primary shadow text-app-blog-card-author-text";
  const inactiveTabStyles = "bg-transparent text-app-search-bar-text";
  return (
    <div>
      {/* Loading spinner */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}
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
              <div className="rounded-full bg-app-input-yellow text-app-text-black py-[2px] px-2 absolute top-[1px] right-[1px]">
                <p className="text-[10.52px]">{followerListData.length}</p>
              </div>
              {/* <div className="rounded-full bg-app-input-yellow text-app-text-black py-1 px-2 absolute top-[1px] right-[1px]">
                <p className="text-[7.52px]">8</p>
              </div> */}
            </div>

            <div
              className={` text-center flex w-full relative gap-2 py-3 px-4 rounded-lg font-plusJakartaSans-500 font-medium text-[14px] transition-all duration-300 ${
                activeTab === "Following" ? activeTabStyles : inactiveTabStyles
              }`}
            >
              <button onClick={() => setActiveTab("Following")}>
                Following
              </button>
              <div className="rounded-full bg-app-input-yellow text-app-text-black py-[2px] px-2 absolute top-[1px] right-[1px]">
                <p className="text-[10.52px]">{followingListData.length}</p>
              </div>
              {/* <div className="rounded-full bg-app-input-yellow text-app-text-black py-1 px-2 absolute top-[1px] right-[1px]">
                <p className="text-[7.52px]">8</p>
              </div> */}
            </div>
          </div>
          {activeTab === "Followers" && (
            <div className="mt-[25px]">
              {followerListData.map((follower, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 mb-[24px]"
                >
                  <Image
                    src={follower.profilePicture}
                    alt={follower.username}
                    width={44}
                    height={44}
                    className="rounded-full"
                  />
                  <span className="text-[16px] text-app-text-primary font-plusJakartaSans-400">
                    {follower.username}
                  </span>
                </div>
              ))}
            </div>
          )}
          {activeTab === "Following" && (
            <div className="mt-[25px]">
              {followingListData.map((follower, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 mb-[24px]"
                >
                  <Image
                    src={follower.profilePicture}
                    alt={follower.username}
                    width={44}
                    height={44}
                    className="rounded-full"
                  />
                  <span className="text-[16px] text-app-text-primary font-plusJakartaSans-400">
                    {follower.username}
                  </span>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
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

export default FollowingComponent;
