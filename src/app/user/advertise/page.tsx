"use client";

import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import React, { useEffect, useRef, useState } from "react";
import InterestCard from "@/components/InterestCard/InterestCard";
import InputComponent from "@/components/InputComponent/InputComponent";
import {
  AdvertiseIcon,
  BoldIcon,
  BulletedListIcon,
  HeaderOneIcon,
  ImageIcon,
  InstagramIcon,
  ItalicIcon,
  LinkIcon,
  MovieIcon,
  NewYoutubeIcon,
  NumberListIcon,
  OkayGreenIcon,
  OkayIcon,
  PictureIcon,
  PubIcon,
  SportsIcon,
  TwitterIcon,
  YoutubeIcon,
} from "../../../../public/svg-icons/icons";
import NotificationBadge from "@/components/NotificationCard/NotificationBadge";
import DropDown from "@/components/DropDown/DropDown";
import { UnderlineIcon } from "lucide-react";
import TextAreaComponent from "@/components/TextAreaComponent/TextAreaComponent";
import RadioButtonComponent from "@/components/RadioButtonComponent/RadioButtonComponent";
import RadioButtonGroupComponent from "@/components/RadioButtonGroupComponent/RadioButtonGroupComponent";
import ImageUploadComponent from "@/components/ImageUploadComponent/ImageUploadComponent";

// types
type ChooseInterestsProps = {
  id: number;
  name: string;
  icon: string;
};

const mockInterestData = [
  {
    id: 1,
    name: "Movies",
    icon: <MovieIcon />,
  },
  {
    id: 2,
    name: "Sports",
    icon: <SportsIcon />,
  },
  {
    id: 3,
    name: "Festival",
    icon: <PubIcon />,
  },
  {
    id: 4,
    name: "Movies",
    icon: <MovieIcon />,
  },
  {
    id: 5,
    name: "Sports",
    icon: <SportsIcon />,
  },
  {
    id: 6,
    name: "Festival",
    icon: <PubIcon />,
  },
];

// maximum number of selections allowed
const MAX_SELECTIONS = 5;

const page = () => {
  //   loading state
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("english");
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [confirm, setConfirm] = useState(true);

  const [previewBlog, setPreviewBlog] = useState(false);

  // ------- state to hold the selected interests ------
  const [selectedInterestsIds, setSelectedInterestsIds] = useState<number[]>(
    []
  );

  // CATEGORY SELECTION

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
    <div
      className={`overflow-y-auto max-h-screen no-scrollbar ${
        isDropdownOpen ? "bg-k-background-secondary" : "bg-k-background-primary"
      } `}
    >
      <div className={`min-h-screen flex flex-col`}>
        <div className={`w-full max-w-md px-4 top-0 left-0 right-0 `}>
          {/* Header */}
          <header
            className={`fixed w-full pt-[64px] flex items-center mb-10 z-1000 ${
              isDropdownOpen
                ? "bg-k-background-secondary"
                : "bg-k-background-primary"
            } `}
          >
            <h1 className="mt-4 text-[23px] font-semibold text-app-text-primary font-plusJakartaSans-700">
              Create advert
            </h1>
          </header>
        </div>
        {/* body section */}

        <div className="space-y-1 mt-[130px] px-10 mb-80">
          <div>
            <p className="text-xs font-plusJakartaSans text-app-text-primary mb-3">
              Advert Category
            </p>
            <div className="mb-6 sm:mb-8 relative w-full">
              <div
                ref={tabsContainerRef}
                className="flex gap-1 overflow-x-auto sm:-mx-0 sm:px-0 no-scrollbar"
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
                {mockInterestData.map((interest, index) => (
                  <div className="">
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
                        } else if (
                          selectedInterestsIds.length < MAX_SELECTIONS
                        ) {
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
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-[10px]">
            <p className="text-[13.89px] text-app-text-primary font-plusJakartaSans-400">
              Advert Image
            </p>
            <p className="text-[10.59px] text-app-text-secondary font-plusJakartaSans-400 mb-[10px]">
              (Recommended size 400*400px)
            </p>
          </div>
          <div className="mb-5">
            <div className="mb-5">
              <RadioButtonGroupComponent
                name=""
                options={[{ id: 1, label: "Static Ads", value: "static_ads" }]}
              />
            </div>
            <ImageUploadComponent />
          </div>
          <div className="mb-5">
            <div className="mb-5">
              <RadioButtonGroupComponent
                name=""
                options={[
                  { id: 1, label: "Carousel Ads", value: "carousel_ads" },
                ]}
              />
            </div>
            <ImageUploadComponent />
            <div className="flex gap-2 items-center justify-between mt-4">
              <ImageUploadComponent />
              <ImageUploadComponent />
              <ImageUploadComponent />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[13.89px] mb-1 text-app-text-primary font-plusJakartaSans-400">
              Call to Action
            </p>
            <DropDown
              dataArray={[
                { label: "Buy now", value: "Buy now" },
                { label: "Learn more", value: "learn_more" },
                { label: "Install now", value: "install_now" },
                { label: "Subscribe", value: "subscribe" },
              ]}
              placeHolder="select"
              isOpen={(value: boolean) => {
                setIsDropdownOpen(value);
              }}
            />
          </div>
          <div className="mt-4">
            <p className="text-[13.89px] mb-1 text-app-text-primary font-plusJakartaSans-400">
              Call to Action link
            </p>
            <div className="space-y-4 mb-[24px]">
              <div className="relative">
                <InputComponent
                  placeholder="Enter link"
                  value={""}
                  onChange={(e) => {}}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[13.89px] mb-1 text-app-text-primary font-plusJakartaSans-400">
              2nd Call to Action Text
            </p>
            <div className="space-y-4 mb-[24px]">
              <div className="relative">
                <InputComponent
                  placeholder="Enter text"
                  value={""}
                  onChange={(e) => {}}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[13.89px] mb-1 text-app-text-primary font-plusJakartaSans-400">
              2nd Call to Action Link
            </p>
            <div className="space-y-4 mb-[24px]">
              <div className="relative">
                <InputComponent
                  placeholder="Enter link"
                  value={""}
                  onChange={(e) => {}}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[13.89px] mb-1 text-app-text-primary font-plusJakartaSans-400">
              Saved Campaign
            </p>
            <div className="flex items-center gap-2 justify-between">
              <div className="w-full">
                <DropDown
                  dataArray={[]}
                  placeHolder="Special Offer"
                  isOpen={(value: boolean) => {
                    setIsDropdownOpen(value);
                  }}
                />
              </div>
              <div
                className="bg-app-okay-icon-filter rounded-lg p-2 h-1/2"
                onClick={() => {
                  setConfirm(!confirm);
                }}
              >
                {confirm ? (
                  <OkayIcon className="text-app-icon " />
                ) : (
                  <OkayGreenIcon />
                )}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[13.89px] mb-1 text-app-text-primary font-plusJakartaSans-400">
                Campaign Name
              </p>
              <div className="space-y-4 mb-[24px]">
                <div className="relative">
                  <InputComponent
                    placeholder="New Campaign"
                    value={""}
                    onChange={(e) => {}}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[13.89px] mb-1 text-app-text-primary font-plusJakartaSans-400">
                Title
              </p>
              <div className="space-y-4 mb-[24px]">
                <div className="relative">
                  <InputComponent
                    placeholder="Add a title"
                    value={""}
                    onChange={(e) => {}}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[13.89px] mb-1 text-app-text-primary font-plusJakartaSans-400">
                Description
              </p>
              <div className="space-y-4">
                <div className="relative">
                  <TextAreaComponent placeholder="More about the event" />
                </div>
              </div>
              <p className="text-[10.59px] text-end mb-1 text-app-text-secondary font-plusJakartaSans-400">
                23/1200 Max
              </p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-[13.89px] mb-1 text-app-text-primary font-plusJakartaSans-400">
              Audience Insight
            </p>
            <div className="mt-2 border-2 rounded-lg border-app-text-primary px-2 py-4">
              <div className="mb-5">
                <p className="text-[13.89px] mb-2 text-app-text-primary font-plusJakartaSans-400">
                  Gender
                </p>
                <RadioButtonGroupComponent
                  name=""
                  options={[
                    { id: 1, label: "Male", value: "male" },
                    { id: 2, label: "Female", value: "female" },
                    { id: 3, label: "Other", value: "other" },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
