"use client";

import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import {
  BackArrow,
  EmoryIcon,
  RightArrowIcon,
} from "../../../../../public/svg-icons/icons";
import SwitchComponent from "@/components/SwitchComponent/SwitchComponent";
import { sound_Notifications } from "@/routes/profile";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import InterestCard from "@/components/InterestCard/InterestCard";
import Image from "next/image";
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

// types
type ChooseInterestsProps = {
  id: number;
  name: string;
  icon: string;
};

const mockInterestData = [
  {
    id: 1,
    name: "Sports",
    icon: <EmoryIcon />,
  },
  {
    id: 2,
    name: "Music",
    icon: <EmoryIcon />,
  },
  {
    id: 3,
    name: "Travel",
    icon: <EmoryIcon />,
  },
  {
    id: 4,
    name: "Cooking",
    icon: <EmoryIcon />,
  },
  {
    id: 5,
    name: "Art",
    icon: <EmoryIcon />,
  },
];

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
    <div>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <div className="min-h-screen bg-app-background-primary flex flex-col items-center pt-6 font-plusJakartaSans">
        <div className="w-full max-w-md px-4">
          {/* Header */}
          <header className="sticky top-0 bg-app-background-primary z-10 flex items-center">
            <button
              aria-label="Go back"
              onClick={() => window.history.back()} // Simple back navigation
              className="mr-2" // Added padding for easier click and negative margin to align
            >
              <BackArrow className="text-app-icon" />
            </button>
            <h1 className="text-xl font-bold text-app-text-primary font-plusJakartaSans">
              Change interests
            </h1>
          </header>
        </div>
        <div className="w-4/5 mt-5 mb-6">
          <p className="text-xs font-plusJakartaSans text-app-text-primary mb-5">
            Language choice:
          </p>
          <div className="mb-6 sm:mb-8 relative">
            <div
              ref={tabsContainerRef}
              className="flex space-x-3 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-0 sm:px-0 no-scrollbar"
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
          <p className="font-plusJakartaSans text-app-text-primary text-sm mb-6 ml-5">
            Choose up to {MAX_SELECTIONS} interests:
          </p>

          {/* Interests Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {mockInterestData.map((interest) => (
              <InterestCard
                key={interest.id}
                interest={interest}
                isSelected={selectedInterestsIds.includes(interest.id)}
                onToggle={(id) => {
                  // Handle interest selection logic here
                  console.log("Toggled interest:", id);
                  // push or remove interest from selectedInterestsIds
                  const interestId = parseInt(id, 10);
                  if (selectedInterestsIds.includes(interestId)) {
                    setSelectedInterestsIds((prev) =>
                      prev.filter((i) => i !== interestId)
                    );
                  } else if (selectedInterestsIds.length < MAX_SELECTIONS) {
                    setSelectedInterestsIds((prev) => [...prev, interestId]);
                  } else {
                    alert(
                      `You can only select up to ${MAX_SELECTIONS} interests.`
                    );
                  }
                }}
              />
            ))}
          </div>
          <div className="space-y-3">
            <button
              onClick={() => {}}
              className="w-full mt-5 bg-app-button-primary text-app-text-tertiary font-plusJakartaSans py-3 px-4 rounded-lg "
            >
              Save
            </button>
          </div>
          <header className="items-center mb-8">
            <h1 className="text-xl mt-5 text-center font-bold font-plusJakartaSans text-app-text-primary">
              Earn Medals and rewards
            </h1>
          </header>

          {/* Medal List */}
          <main className="space-y-8">
            {medalData.map((medal) => (
              <MedalCard key={medal.id} medal={medal} />
            ))}
          </main>
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
        <h2 className="text-xl font-semibold font-plusJakartaSans text-app-text-primary">
          {medal.title}
        </h2>
        <p className="text-xs font-plusJakartaSans text-app-text-secondary mt-1 leading-relaxed">
          {medal.description}
        </p>
      </div>
    </div>
  );
};

export default page;
