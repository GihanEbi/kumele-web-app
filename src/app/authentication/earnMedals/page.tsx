"use client";

import React from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Using next/image for optimized images, though for GIFs, <img> is also fine.
import { BackArrow } from "../../../../public/svg-icons/icons";

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
      <div className="min-h-screen bg-white text-gray-900">
        <div className="max-w-md mx-auto p-4 sm:p-6">
          {/* Header */}
          <header className="flex items-center mb-8">
            <button
              onClick={() => router.back()} // Simple back navigation
              className="text-gray-700 hover:text-gray-900 mr-3"
              aria-label="Go back"
            >
              <BackArrow />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Earn Medals</h1>
          </header>

          {/* Medal List */}
          <main className="space-y-10">
            {medalData.map((medal) => (
              <MedalCard key={medal.id} medal={medal} />
            ))}
          </main>
          <div className="space-y-3">
            <button
              onClick={() => {
                // navigate to home page or next step
                router.push("/user"); // Adjust the path as needed
              }}
              className="w-full mt-5 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
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
    <div className="ml-5 items-start space-x-4">
      <div className="flex-shrink-0 mt-1">
        {/* If using next/image for GIF. May need unoptimized={true} for some GIFs */}
        <Image
          src={medal.iconSrc}
          alt={`${medal.title} icon`}
          width={40} // Adjust size as needed
          height={40} // Adjust size as needed
          className="rounded-full object-contain" // object-contain if your GIF isn't perfectly square
          unoptimized={true} // GIFs are often better unoptimized with next/image
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{medal.title}</h2>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
          {medal.description}
        </p>
      </div>
    </div>
  );
};

export default EarnMedals;
