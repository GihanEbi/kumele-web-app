"use client";

import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import {
  BackArrow,
  EmoryIcon,
  EyeIcon,
  PasswordIcon,
  ProfileIcon,
  RightArrowIcon,
} from "../../../../public/svg-icons/icons";
import SwitchComponent from "@/components/SwitchComponent/SwitchComponent";
import { sound_Notifications } from "@/routes/profile";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import InterestCard from "@/components/InterestCard/InterestCard";
import Image from "next/image";
import InputComponent from "@/components/InputComponent/InputComponent";
import TextAreaComponent from "@/components/TextAreaComponent/TextAreaComponent";
import { paddings } from "@/constants/layout-constants";

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
const page = () => {
  //   loading state
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("english");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // LANGUAGE SELECTION

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
      <div className="min-h-screen bg-app-background-primary flex flex-col pt-6 font-plusJakartaSans">
        <div className={`w-full max-w-md px-4 ${paddings.topMargin}`}>
          {/* Header */}
          <header className="sticky top-0 bg-app-background-primary z-10 flex items-center">
            <button
              aria-label="Go back"
              onClick={() => window.history.back()} // Simple back navigation
              className="mr-2" // Added padding for easier click and negative margin to align
            >
              <BackArrow className="text-app-icon" />
            </button>
            <h1 className="text-[23px] font-semibold text-app-text-primary font-plusJakartaSans-700">
              Edit Profile
            </h1>
          </header>
        </div>

        <div className="flex flex-col items-center group mt-10">
          <div className="bg-app-input-yellow rounded-full w-[80px] h-[80px] flex items-center justify-center mb-3">
            <ProfileIcon className="text-app-text-black w-12 h-12" />
          </div>
          <p className="text-[16px] font-plusJakartaSans-400 text-center text-app-text-primary">
            Username
          </p>
        </div>
        {/* <div className="mb-6 px-5">
          <p className="text-xs font-plusJakartaSans text-app-text-primary mb-5">
            Language choice:
          </p>
          <div className="mb-6 sm:mb-8 relative w-full">
            <div
              ref={tabsContainerRef}
              className="flex gap-5 space-x-4 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-0 sm:px-0 no-scrollbar"
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
                      ? "bg-app-button-yellow text-app-text-black font-medium"
                      : "bg-app-input-primary text-app-text-secondary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div> */}

        <div className="mt-5 w-full items-center max-w-md px-5">
          <div className="mb-[25px]">
            <p className="text-[16px] font-plusJakartaSans-400 mb-2 text-app-text-primary">
              Current E-mail
            </p>
            <InputComponent placeholder="kumele@gmail.com" />
          </div>
          <div className="mb-[25px]">
            <p className="text-[16px] font-plusJakartaSans-400 mb-2 text-app-text-primary">
              New E-mail
            </p>
            <InputComponent placeholder="Enter your new E-mail" />
          </div>
          <div className="mb-[25px]">
            <p className="text-[16px] font-plusJakartaSans-400 mb-2 text-app-text-primary">
              Password
            </p>
            <div className="relative mt-5">
              <InputComponent
                placeholder="************"
                type={passwordVisible ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {passwordVisible ? (
                  <EyeIcon className="text-app-icon" />
                ) : (
                  <EyeIcon className="text-app-icon" />
                )}
              </button>
            </div>
          </div>
          <div className="mb-2">
            <p className="text-sm font-plusJakartaSans mb-2 text-app-text-primary">
              About
            </p>
            <TextAreaComponent placeholder="Enter your bio(Max 500 characters" />
          </div>
        </div>
          <div className="fixed bottom-[40px] left-1/2 transform -translate-x-1/2 w-full px-6">
          <button
            onClick={() => {}}
              className="w-full text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
          >
            Update profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
