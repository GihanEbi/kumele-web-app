"use client";

import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import {
  BackArrow,
  EmoryIcon,
  RightArrowIcon,
} from "../../../../public/svg-icons/icons";
import SwitchComponent from "@/components/SwitchComponent/SwitchComponent";
import { sound_Notifications } from "@/routes/profile";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import InterestCard from "@/components/InterestCard/InterestCard";
import Image from "next/image";
import { paddings } from "@/constants/layout-constants";
// Mock data for the medal icon GIF
const MOCK_MEDAL_ICON_SRC = "/common-gifs/badge.gif";
import {
  SvgIcon1,
  SvgIcon10,
  SvgIcon11,
  SvgIcon12,
  SvgIcon13,
  SvgIcon14,
  SvgIcon15,
  SvgIcon16,
  SvgIcon17,
  SvgIcon18,
  SvgIcon19,
  SvgIcon2,
  SvgIcon20,
  SvgIcon21,
  SvgIcon22,
  SvgIcon23,
  SvgIcon24,
  SvgIcon25,
  SvgIcon3,
  SvgIcon4,
  SvgIcon5,
  SvgIcon6,
  SvgIcon7,
  SvgIcon8,
  SvgIcon9,
} from "../../../../public/svg-icons/newInterestIcons";

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

// types
type ChooseInterestsProps = {
  id: number;
  name: string;
  icon: string;
};

const languages = [
  {
    id: "english",
    label: "English",
  },
  {
    id: "french",
    label: "French",
  },
  {
    id: "spanish",
    label: "Spanish",
  },
  {
    id: "chinese",
    label: "Chinese",
  },
  {
    id: "arabic",
    label: "Arabic",
  },
];

const mockInterestData = [
  {
    id: 1,
    name: "Sports",
    icon: <SvgIcon1 />,
  },
  {
    id: 2,
    name: "Music",
    icon: <SvgIcon2 />,
  },
  {
    id: 3,
    name: "Travel",
    icon: <SvgIcon3 />,
  },
  {
    id: 4,
    name: "Cooking",
    icon: <SvgIcon4 />,
  },
  {
    id: 5,
    name: "Art",
    icon: <SvgIcon5 />,
  },
  {
    id: 6,
    name: "Travel",
    icon: <SvgIcon6 />,
  },
  {
    id: 7,
    name: "Sports",
    icon: <SvgIcon7 />,
  },
  {
    id: 8,
    name: "Music",
    icon: <SvgIcon8 />,
  },
  {
    id: 9,
    name: "Travel",
    icon: <SvgIcon9 />,
  },
  {
    id: 10,
    name: "Sports",
    icon: <SvgIcon10 />,
  },
  {
    id: 11,
    name: "Music",
    icon: <SvgIcon11 />,
  },
  {
    id: 12,
    name: "Travel",
    icon: <SvgIcon12 />,
  },
  {
    id: 13,
    name: "Sports",
    icon: <SvgIcon13 />,
  },
  {
    id: 14,
    name: "Music",
    icon: <SvgIcon14 />,
  },
  {
    id: 15,
    name: "Travel",
    icon: <SvgIcon15 />,
  },
  {
    id: 16,
    name: "Sports",
    icon: <SvgIcon16 />,
  },
  {
    id: 17,
    name: "Music",
    icon: <SvgIcon17 />,
  },
  {
    id: 18,
    name: "Travel",
    icon: <SvgIcon18 />,
  },
  {
    id: 19,
    name: "Sports",
    icon: <SvgIcon19 />,
  },
  {
    id: 20,
    name: "Music",
    icon: <SvgIcon20 />,
  },
  {
    id: 21,
    name: "Travel",
    icon: <SvgIcon21 />,
  },
  {
    id: 22,
    name: "Sports",
    icon: <SvgIcon22 />,
  },
  {
    id: 23,
    name: "Music",
    icon: <SvgIcon23 />,
  },
  {
    id: 24,
    name: "Travel",
    icon: <SvgIcon24 />,
  },
  {
    id: 25,
    name: "Travel",
    icon: <SvgIcon25 />,
  },
];

// maximum number of selections allowed
const MAX_SELECTIONS = 5;

const page = () => {
  //   loading state
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("english");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  //   ------ state for interests selection ------
  const [selectedInterests, setSelectedInterests] = useState<
    ChooseInterestsProps[]
  >([]);

  // ------- state to hold the selected interests ------
  const [selectedInterestsIds, setSelectedInterestsIds] = useState<number[]>(
    []
  );

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    scrollToTab(tabId);
  }; // Mobile-like drag scrolling handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (tabsContainerRef.current?.offsetLeft || 0));
    setScrollLeft(tabsContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !tabsContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (tabsContainerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll speed multiplier
    tabsContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (tabsContainerRef.current?.offsetLeft || 0));
    setScrollLeft(tabsContainerRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !tabsContainerRef.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - (tabsContainerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    tabsContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const scrollToTab = (tabId: string) => {
    const tabElement = document.getElementById(`tab-${tabId}`);
    if (tabElement && tabsContainerRef.current) {
      const container = tabsContainerRef.current;
      const containerWidth = container.offsetWidth;
      const tabLeft = tabElement.offsetLeft;
      const tabWidth = tabElement.offsetWidth;

      const scrollPosition = tabLeft - (containerWidth - tabWidth) / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="overflow-y-auto max-h-screen no-scrollbar">
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <div className=" min-h-screen bg-app-background-primary flex flex-col">
        <div className="w-full max-w-md px-4 top-0 left-0 right-0">
          {/* Header */}
          <header
            className={`fixed w-full bg-app-background-primary flex items-center mb-10 ${paddings.topMargin}`}
          >
            <button
              aria-label="Go back"
              onClick={() => window.history.back()} // Simple back navigation
              className="mr-2" // Added padding for easier click and negative margin to align
            >
              <BackArrow className="text-app-icon" />
            </button>
            <h1 className="text-[23px] font-bold font-plusJakartaSans-700 text-app-text-primary ml-[24px]">
              Change interests
            </h1>
          </header>
        </div>
        <div className="space-y-1 mt-[100px]">
          <div>
            <div className="mb-6 px-10">
              <p className="text-xs font-plusJakartaSans text-app-text-primary mb-5">
                Language choice:
              </p>
              <div className="mb-6 sm:mb-8">
                <div
                  ref={tabsContainerRef}
                  className="flex space-x-5 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-0 sm:px-0 no-scrollbar"
                  onMouseDown={handleMouseDown}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={{
                    cursor: isDragging ? "grabbing" : "grab",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  {languages.map((tab, index) => (
                    <button
                      key={tab.id}
                      id={`tab-${tab.id}`}
                      onClick={() => handleTabClick(tab.id)}
                      className={`py-2 px-5 rounded-md text-sm font-medium whitespace-nowrap flex-shrink-0 transition-colors duration-150
                  ${
                    activeTab === tab.id
                      ? "bg-app-input-secondary text-app-text-black"
                      : "bg-app-input-primary text-app-text-secondary"
                  }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mx-4">
              <p className="font-plusJakartaSans text-app-text-primary text-sm mb-6 ml-5">
                Choose up to {MAX_SELECTIONS} interests:
              </p>

              {/* Interests Grid */}
              <div className="grid grid-cols-3 gap-[14px] px-3">
                {mockInterestData.map((interest) => (
                  <InterestCard
                    key={interest.id}
                    interest={interest}
                    isSelected={selectedInterestsIds.includes(interest.id)}
                    onToggle={(id) => {
                      // Handle interest selection logic here
                      // push or remove interest from selectedInterestsIds
                      const interestId = parseInt(id, 10);
                      if (selectedInterestsIds.includes(interestId)) {
                        setSelectedInterestsIds((prev) =>
                          prev.filter((i) => i !== interestId)
                        );
                      } else if (selectedInterestsIds.length < MAX_SELECTIONS) {
                        setSelectedInterestsIds((prev) => [
                          ...prev,
                          interestId,
                        ]);
                      } else {
                        alert(
                          `You can only select up to ${MAX_SELECTIONS} interests.`
                        );
                      }
                    }}
                  />
                ))}
              </div>
              <div className="space-y-3 mt-[44px]">
                <button
                  onClick={() => {}}
                  className="w-full mt-5 bg-app-button-primary text-app-text-tertiary font-plusJakartaSans py-3 px-4 rounded-lg "
                >
                  Save
                </button>
              </div>
              <header className="items-center mb-8 mt-[44px]">
                <h1 className="text-[23px] mt-5 text-center font-semibold font-plusJakartaSans-700 text-app-text-primary">
                  Earn Medals and rewards
                </h1>
              </header>

              {/* Medal List */}
              <main className="space-y-8 mt-[32px]">
                {medalData.map((medal) => (
                  <MedalCard key={medal.id} medal={medal} />
                ))}
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      <div className="mt-5">
        <h2 className="text-[19px] font-semibold font-plusJakartaSans-700 text-app-text-primary">
          {medal.title}
        </h2>
        <p className="text-[15px] font-plusJakartaSans-400 text-app-text-secondary mt-1 leading-relaxed">
          {medal.description}
        </p>
      </div>
    </div>
  );
};

export default page;
