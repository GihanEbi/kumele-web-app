"use client";

import React, { useRef, useState } from "react";
import { CloseIcon } from "../../../../../../public/svg-icons/icons";
import Image from "next/image";

interface modalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockData = [
  { name: "Amount Spend", amount: "500$", reach: "1.45K" },
  { name: "Amount Spend Per Day", amount: "10$", reach: "1.45K" },
  { name: "CPC", amount: "0.01$", reach: "1.45K" },
  { name: "Links Clicked", amount: "259", reach: "1.45K" },
  { name: "Ads Duration", amount: "14 Days", reach: "1.45K" },
  { name: "Reach", amount: "12.6M", reach: "1.45K" },
  { name: "Male", amount: "345", reach: "1.45K" },
  { name: "Female", amount: "212", reach: "1.45K" },
  { name: "Other Genders", amount: "103", reach: "1.45K" },
  { name: "Berlin", amount: "300k", reach: "1.45K" },
  { name: "Vienna", amount: "4k", reach: "1.45K" },
  { name: "Colombo", amount: "20k", reach: "1.45K" },
];

const CampaignAdModel: React.FC<modalProps> = ({ isOpen, onClose }) => {
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  if (!isOpen) return null;
  // CATEGORY SELECTION

  const handleTabClick = (tabId: string) => {
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

  // styles for active and inactive tabs to keep the JSX clean
  const activeTabStyles =
    "bg-app-background-primary shadow text-app-blog-card-author-text";
  const inactiveTabStyles = "bg-transparent text-app-search-bar-text";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-8
                 transition-opacity duration-300 ease-in-out
                 ${isOpen ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm text-center rounded-3xl bg-app-background-model p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between gap-4"
          onClick={onClose}
        >
          <div></div>
          <h2 className="text-app-button-model-text-color font-plusJakartaSans font-bold text-[19px]">
            CampaignAd.Data
          </h2>
          <CloseIcon className="text-app-icon" width={24} height={24} />
        </div>
        <div className="flex flex-col items-center">
          <p className="mt-2 leading-relaxed text-app-text-secondary font-plusJakartaSans-400 font-normal text-[16px]">
            Special Offer
          </p>
          <div className="pb-5 mt-4 w-full">
            <div className="mb-6 sm:mb-8 relative">
              <div
                ref={tabsContainerRef}
                className="flex gap-2 overflow-x-auto sm:-mx-0 sm:px-0 no-scrollbar"
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
                {mockData.map((item, index) => (
                  <div
                    className="w-auto min-w-1/2 sm:w-[150px] flex-shrink-0"
                    key={index}
                  >
                    <div className="py-2 px-4 rounded-md flex flex-col items-center bg-app-input-primary">
                      <p className="text-[10.98px] font-md text-app-text-primary font-plusJakartaSans-400">
                        {item.name}
                      </p>
                      <p className="text-[18.98px] font-md text-app-text-primary font-plusJakartaSans-400">
                        {item.amount}
                      </p>
                      <div className="flex item-center">
                        <Image
                          src="/images/Arrow 1.png"
                          alt="arrow"
                          width={5}
                          height={5}
                        />
                        <p className="text-[10.98px] font-md text-chart-2 font-plusJakartaSans-400">
                          {item.reach}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="w-full px-6">
              <button
                className="text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-2 px-5 rounded-lg"
                onClick={() => {}}
              >
                Duplicate
              </button>
            </div>
            <div className="w-full px-6">
              <button
                className="text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-2 px-10 rounded-lg"
                onClick={() => {}}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignAdModel;
