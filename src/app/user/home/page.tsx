"use client";
import React, { useState } from "react";
import {
  BlogHomeIcon,
  EmoryIcon,
  SearchIcon,
  ShearIcon,
  UsersIcon,
} from "../../../../public/svg-icons/icons";
import Image from "next/image";
import HomePageGif from "@/components/GifComponents/HomePageGif/HomePageGif";
import { useRouter } from "next/navigation";
import ReferralModel from "@/components/Models/ReferralModel/ReferralModel";

const Home = () => {
  const router = useRouter();
  // --------- show referral model ----------
  const [showReferralModel, setShowReferralModel] = useState(false);

  return (
    <div className="h-screen bg-app-background-secondary flex flex-col items-center justify-center text-center">
      {" "}
      {/* 40px approx for main padding */}
      <div className="absolute mt-[52px] top-5 left-5 bg-app-background-model rounded-full w-12 h-12 flex items-center justify-center shadow-search-icon">
        <SearchIcon className="text-app-icon" />
      </div>
      <div className="">
        <HomePageGif />
        {/* <Image
          src={"/user/man-with-candy.gif"}
          alt="No matches illustration"
          width={200} // Adjust to your illustration's aspect ratio
          height={150} // Adjust
          className="max-w-[80%] h-auto" // Ensure responsiveness
          priority
        /> */}
      </div>
      <h2 className="text-lg font-semibold font-plusJakartaSans text-app-text-primary mb-6 max-w-[250px] leading-tight">
        No more matches currently, until then
      </h2>
      <div className="flex items-center gap-x-8 mb-10">
        {" "}
        {/* gap-x for horizontal spacing */}
        <div
          className="text-gray-600"
          onClick={() => router.push("/more-options/create-hobby-event")}
        >
          <UsersIcon width={24} height={24} />
        </div>
        <div
          className="text-gray-600"
          onClick={() => router.push("/user/blog/1")}
        >
          <BlogHomeIcon className="text-app-icon" />
        </div>
        <div className="text-gray-600">
          <ShearIcon
            className="text-app-icon"
            onClick={() => setShowReferralModel(true)}
          />
        </div>
      </div>
      {/* referral Model */}
      <ReferralModel
        isOpen={showReferralModel}
        onClose={() => {
          setShowReferralModel(false);
        }}
      />
    </div>
  );
};

export default Home;
