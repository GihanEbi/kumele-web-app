"use client";

import React from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Using next/image for optimized images, though for GIFs, <img> is also fine.
import { BackArrow } from "../../../../public/svg-icons/icons";
import MedalGif from "@/components/GifComponents/MedalGif/MedalGif";

// Mock data for the medal icon GIF
const MOCK_MEDAL_ICON_SRC = "/common-gifs/badge.gif";

interface MedalInfo {
  id: string;
  title: string;
  description: string;
  iconSrc: string;
}

const medalData: MedalInfo[] = [
  {
    id: "bronze",
    title: "Bronze Status",
    description:
      "User created a minimum of 2 events or user attended a minimum of 2 events without fail in the last 30 days. The user gets 2% discount of 1 in-app purchase of choice.",
    iconSrc: MOCK_MEDAL_ICON_SRC,
  },
  {
    id: "silver",
    title: "Silver Status",
    description:
      "User created a minimum of 3 events or user attended a minimum of 3 events without fail in the last 30 days. The user gets 4% discount of 1 in-app purchase of choice.",
    iconSrc: MOCK_MEDAL_ICON_SRC,
  },
  {
    id: "gold",
    title: "Gold Status",
    description:
      "User created a minimum of 4 events or user attended a minimum of 4 events without fail in the last 30 days. The user gets 8% discount of 1 in-app purchase of choice.",
    iconSrc: MOCK_MEDAL_ICON_SRC,
  },
];

interface MedalCardProps {
  medal: MedalInfo;
}

const EarnMedals = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Earn Medals</title>
      </Head>
      <div className="min-h-screen bg-app-background-primary ">
        <div className="max-w-md mx-auto p-4 sm:p-6 mt-4">
          {/* Header */}
          <header className="pt-[64px] flex fixed top-0 left-0 right-0 pl-6 pb-4 items-center w-full bg-app-background-primary z-10">
            <button
              onClick={() => router.back()} // Simple back navigation
              className="text-gray-700 hover:text-gray-900 mr-3"
              aria-label="Go back"
            >
              <BackArrow className="text-app-icon" width={24} height={24} />
            </button>
            <h1 className="text-[23px] font-bold font-plusJakartaSans-700 text-app-text-primary ml-[24px]">
              Earn Medals
            </h1>
          </header>

          {/* Medal List */}
          <main className="space-y-8 mt-[90px]">
            {medalData.map((medal) => (
              <MedalCard key={medal.id} medal={medal} />
            ))}
          </main>
          <div className="space-y-3 px-4 mt-18">
            <button
              onClick={() => {
                // navigate to home page or next step
                router.push("/user/home"); // Adjust the path as needed
              }}
              className="w-full text-sm mt-5 bg-app-button-primary text-app-text-tertiary py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const MedalCard: React.FC<MedalCardProps> = ({ medal }) => {
  return (
    <div className="ml-5 items-start space-x-4 mb-[47px]">
      <div className="flex-shrink-0 mt-1">
        <MedalGif width={28.52} height={28.52} />
      </div>
      <div className="mt-2">
        <h2 className="text-[19px] font-bold font-plusJakartaSans-700 text-app-text-primary">
          {medal.title}
        </h2>
        <p className="text-[15px] font-plusJakartaSans-400 text-app-text-secondary mt-1 leading-relaxed">
          {medal.description}
        </p>
      </div>
    </div>
  );
};

export default EarnMedals;
