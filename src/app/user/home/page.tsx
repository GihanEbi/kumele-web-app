"use client";
import React, { useState, useEffect } from "react";
import {
  BlogHomeIcon,
  SearchIcon,
  ShearIcon,
  StarIcon,
  UsersIcon,
} from "../../../../public/svg-icons/icons";
import HomePageGif from "@/components/GifComponents/HomePageGif/HomePageGif";
import { useRouter } from "next/navigation";
import ReferralModel from "@/components/Models/ReferralModel/ReferralModel";
import EventSwipeDeck from "@/components/HomeEventCard/EventSwipeDeck";

const Home = () => {
  const router = useRouter();
  const [showReferralModel, setShowReferralModel] = useState(false);

  const [isEventAvailable, setIsEventAvailable] = useState(true);
  //const [isRatePopOpen, setIsRatePopOpen] = useState(true);

  return (
    <>
      <div className="h-screen bg-app-background-secondary flex flex-col items-center text-center">
        {isEventAvailable ? (
          // Renders when events are available
          <div className="w-full h-full flex -mt-15">
            <EventSwipeDeck />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full pt-12 relative">
            <div className="absolute mt-[52px] top-5 left-5 bg-app-background-model rounded-full w-12 h-12 flex items-center justify-center shadow-search-icon">
              <SearchIcon className="text-app-icon" />
            </div>

            <HomePageGif />

            <h2 className="text-lg font-semibold font-plusJakartaSans text-app-text-primary mt-4 mb-6 max-w-[250px] leading-tight">
              No more matches currently, until then
            </h2>

            <div className="flex items-center gap-x-8 mb-10">
              <div
                className="text-gray-600 cursor-pointer"
                onClick={() => router.push("/more-options/create-hobby-event")}
              >
                <UsersIcon width={24} height={24} />
              </div>
              <div
                className="text-gray-600 cursor-pointer"
                onClick={() => router.push("/user/blog/1")}
              >
                <BlogHomeIcon className="text-app-icon" />
              </div>

              <div
                className="text-gray-600 cursor-pointer"
                onClick={() => setShowReferralModel(true)}
              >
                <ShearIcon className="text-app-icon" />
              </div>
            </div>
          </div>
        )}

        <ReferralModel
          isOpen={showReferralModel}
          onClose={() => {
            setShowReferralModel(false);
          }}
        />
      </div>
    </>
  );
};

export default Home;
