"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import Notifications from "@/components/Models/PermissionModels/Notifications";
import Photos from "@/components/Models/PermissionModels/Photos";
import Location from "@/components/Models/PermissionModels/Location";
import ChooseUserNameModel from "@/components/Models/ChooseUserNameModel/ChooseUserNameModel";
import {
  getNewPartnershipUser,
  getPartnershipToken,
  removeNewPartnershipUser,
} from "@/utils/partnershipUtils";
import AnalyticsChart from "@/components/partnershipChartComponent/AnalyticsChart";
import Image from "next/image";
import DropDown from "@/components/DropDown/DropDown";
import { authConstants } from "@/constants/auth-constants";
import CurrentAdvertsCard from "./currentAdvertsCard/currentAdvertsCard";
import {
  HousePartyNotificationIcon,
  LiveMusicNotificationIcon,
  SearchIcon,
  SpiritualityNotificationIcon,
} from "../../../../public/svg-icons/icons";
import CampaignAdModel from "./currentAdvertsCard/models/CampaignAdModel";
import NotificationCard from "./currentAdvertsCard/notificationCard";
import InputComponent from "@/components/InputComponent/InputComponent";
import PartnershipBlogCard from "./currentAdvertsCard/blogCard";

const chartData = [
  { name: "May", amountSpent: 100, reach: 2200 },
  {
    name: "Jun",
    amountSpent: 800,
    reach: 2800,
    // Add annotation data for this point
    annotation: { value: "+200", type: "reach" as "reach" },
  },
  { name: "Jul", amountSpent: 1000, reach: 900 },
  {
    name: "Aug",
    amountSpent: 700,
    reach: 300,
    // Add annotation data for this point
    annotation: { value: "−50", type: "spent" as "spent" },
  },
  { name: "Sep", amountSpent: 500, reach: 500 },
];

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

const blogData = ["All", "Pub & Bars", "Cannabis", "Sports", "Sports"];

const advertsCard = [
  {
    image: "/images/notification img3.jpg",
    title: "Special offer",
    date: "23 August, 2022, 122.40",
    icon: <SpiritualityNotificationIcon className="text-app-icon" />,
    iconText: "Spirituality",
    isDisabled: false,
  },
  {
    image: "/images/notification img1.jpg",
    title: "Crazy Monday",
    date: "23 August, 2022, 122.40",
    icon: <HousePartyNotificationIcon className="text-app-icon" />,
    iconText: "House party",
    isDisabled: false,
  },
  {
    image: "/images/notification img3.jpg",
    title: "420 Party",
    date: "23 August, 2022, 122.40",
    icon: <LiveMusicNotificationIcon className="text-app-icon" />,
    iconText: "Cannabis",
    isDisabled: false,
  },
  {
    image: "/images/notification img1.jpg",
    title: "Crazy Monday",
    date: "23 August, 2022, 122.40",
    icon: <HousePartyNotificationIcon className="text-app-icon" />,
    iconText: "House party",
    isDisabled: false,
  },
  {
    image: "/images/notification img3.jpg",
    title: "Special offer",
    date: "23 August, 2022, 122.40",
    icon: <SpiritualityNotificationIcon className="text-app-icon" />,
    iconText: "Spirituality",
    isDisabled: true,
  },
  {
    image: "/images/notification img3.jpg",
    title: "420 Party",
    date: "23 August, 2022, 122.40",
    icon: <LiveMusicNotificationIcon className="text-app-icon" />,
    iconText: "Cannabis",
    isDisabled: true,
  },
];

const notificationCard = [
  {
    image: "/images/logo.png",
    title: "Easter Special Discount",
    date: "23 August, 2022, 122.40",
    icon: <SpiritualityNotificationIcon className="text-app-icon" />,
    iconText: "Spirituality",
    isNotification: true,
    isDisabled: false,
  },
  {
    image: "/images/logo.png",
    title: "Holiday",
    date: "23 August, 2022, 122.40",
    icon: <SpiritualityNotificationIcon className="text-app-icon" />,
    iconText: "Spirituality",
    isNotification: true,
    isDisabled: false,
  },
  {
    image: "/images/logo.png",
    title: "40% off",
    date: "23 August, 2022, 122.40",
    icon: <SpiritualityNotificationIcon className="text-app-icon" />,
    iconText: "Spirituality",
    isNotification: true,
    isDisabled: true,
  },
  {
    image: "/images/logo.png",
    title: "Crazy Monday",
    date: "23 August, 2022, 122.40",
    icon: <SpiritualityNotificationIcon className="text-app-icon" />,
    iconText: "Spirituality",
    isNotification: true,
    isDisabled: true,
  },
];
const blogCardData = [
  {
    image: "/images/blogCard.jpg",
    title: "Singleton og Glen Ord 38-year-old and Singleton range.",
    icon: <HousePartyNotificationIcon className="text-app-icon" />,
    iconText: "Spirituality",
    isDisabled: false,
  },
  {
    image: "/images/blogCard.jpg",
    title: "Singleton og Glen Ord 38-year-old and Singleton range.",
    icon: <HousePartyNotificationIcon className="text-app-icon" />,
    iconText: "Spirituality",
    isDisabled: false,
  },
];

const page = () => {
  //   loading state
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("english");
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  // use the appContext to get the more option state
  const isNewPartnershipUser = getNewPartnershipUser();
  //  ------ states for permissions ------
  // ------- state for notification permissions ------
  const [notificationPermission, setNotificationPermission] =
    useState<boolean>(false);
  // ------- state for location permissions ------
  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  // ------- state for photos permissions ------
  const [photosPermission, setPhotosPermission] = useState<boolean>(false);
  // ------- state for user name permissions ------
  const [userNamePermission, setUserNamePermission] = useState<boolean>(false);
  // use the appContext to get the more option state
  const { setIsBottomNavBarFixed } = useAppContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  //State to track the active tab
  const [activeTabEvents, setActiveTabEvents] = useState<
    "Current Adverts" | "Notifications" | "Blogs"
  >("Current Adverts");
  const [isModelOpen, setIsModelOpen] = useState(false);

  useEffect(() => {
    setIsBottomNavBarFixed(false);
  }, []);

  // This effect runs once when the component mounts to set notification permission
  // You can replace this with actual permission request logic if needed
  useEffect(() => {
    setNotificationPermission(true);
  }, []);
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

  // styles for active and inactive tabs to keep the JSX clean
  const activeTabStyles =
    "bg-app-background-primary shadow text-app-blog-card-author-text";
  const inactiveTabStyles = "bg-transparent text-app-search-bar-text";

  return (
    <div
      className={`overflow-y-auto max-h-screen no-scrollbar ${
        isDropdownOpen ? "bg-k-background-secondary" : "bg-k-background-primary"
      } `}
    >
      {/* Header Section */}
      <div className="relative h-[200px]">
        {" "}
        {/* Container for the header, same height as before */}
        {/* Background Image */}
        <img
          src="/bg-imgs/auth/signup-bg.png" // Assumes background.png is in your /public folder
          alt="Header background design"
          className="absolute inset-0 w-full h-full object-cover"
          // Consider other object-fit values if needed:
          // - object-fill: Stretches image to fit, may distort aspect ratio.
          // - object-contain: Ensures entire image is visible, may result in letterboxing.
          // object-cover is often a good default for background images.
        />
        {/* Logo Image */}
        {/* This div helps in positioning your logo.
            Adjust 'top-4', 'left-6', and the image className (e.g., 'h-12')
            to match your logo.png and how it should appear on background.png.
            The initial 'top-4 left-6' attempts to replicate the padding from the previous CSS logo.
        */}
        <div className="absolute top-4 left-3 z-10">
          {" "}
          {/* z-10 ensures logo is above the background image */}
          <Image
            className="p-2"
            alt="logo"
            src="/images/logo.png"
            width={100}
            height={100}
          />
        </div>
        {/* Sign up Text & Google Icon */}
        {/* This is positioned at the bottom of the 200px header area.
            Ensure the part of your background.png where this text appears
            has sufficient contrast for the 'text-black'.
        */}
        <div className="absolute bottom-4 left-6 flex items-center space-x-2 z-10">
          {" "}
          {/* z-10 ensures text is above background */}
          <h1 className="text-xl font-bold text-app-text-black font-plusJakartaSans">
            History & Statistics
          </h1>
        </div>
      </div>
      <div className=" p-5 w-2/3">
        <DropDown
          dataArray={[
            { label: "Spotify Subscription", value: "Spotify Subscription" },
          ]}
          placeHolder={"Spotify Subscription"}
          isOpen={(value: boolean) => {
            setIsDropdownOpen(value);
          }}
        />
        <div className="flex items-center space-x-2 justify-between mt-4">
          <div>
            <DropDown
              dataArray={authConstants.yearList}
              isOpen={(value: boolean) => {
                setIsDropdownOpen(value);
              }}
              placeHolder="YYYY"
            />
          </div>
          <div>
            <DropDown
              dataArray={[
                {
                  label: "Jan 6-Feb22",
                  value: "Jan 6-Feb22",
                },
              ]}
              placeHolder={"Jan 6-Feb22"}
              isOpen={(value: boolean) => {
                setIsDropdownOpen(value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="px-5 pb-5">
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
            {mockData.map((item, index) => (
              <div
                className="w-auto min-w-1/3 sm:w-[150px] flex-shrink-0"
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
      <AnalyticsChart data={chartData} />

      <div className="p-4">
        <div className="bg-app-range-slider-track-active p-1 gap-1 rounded-lg flex justify-between items-center mt-2">
          <div
            className={`text-center relative py-3 px-5 w-full rounded-lg font-plusJakartaSans-500 font-medium text-[11px] transition-all duration-300 ${
              activeTabEvents === "Current Adverts"
                ? activeTabStyles
                : inactiveTabStyles
            }`}
          >
            <button onClick={() => setActiveTabEvents("Current Adverts")}>
              Current Adverts
            </button>
            <div className="rounded-full bg-app-input-yellow text-app-text-black py-[2px] px-2 absolute top-[1px] right-[1px]">
              <p className="text-[10.52px]">4</p>
            </div>
          </div>
          <div
            className={`text-center relative py-5 px-5 w-full rounded-lg font-plusJakartaSans-500 font-medium text-[11px] transition-all duration-300 ${
              activeTabEvents === "Notifications"
                ? activeTabStyles
                : inactiveTabStyles
            }`}
          >
            <button onClick={() => setActiveTabEvents("Notifications")}>
              Notifications <br />
            </button>
            <div className="rounded-full bg-app-input-yellow text-app-text-black py-[2px] px-2 absolute top-[1px] right-[1px]">
              <p className="text-[10.52px]">2</p>
            </div>
          </div>
          <div
            className={`text-center relative py-5 px-5 w-full rounded-lg font-plusJakartaSans-500 font-medium text-[11px] transition-all duration-300 ${
              activeTabEvents === "Blogs" ? activeTabStyles : inactiveTabStyles
            }`}
          >
            <button onClick={() => setActiveTabEvents("Blogs")}>Blogs</button>
            <div className="rounded-full bg-app-input-yellow text-app-text-black py-[2px] px-2 absolute top-[1px] right-[1px]">
              <p className="text-[10.52px]">3</p>
            </div>
          </div>
        </div>

        {activeTabEvents === "Current Adverts" && (
          <div className="mt-[25px]">
            {advertsCard.map((advert, index) => (
              <CurrentAdvertsCard
                key={index}
                image={advert.image}
                title={advert.title}
                date={advert.date}
                icon={advert.icon}
                iconText={advert.iconText}
                isDisabled={advert.isDisabled}
                cardClick={() => (
                  setIsModelOpen(true), console.log("Card clicked")
                )}
              />
            ))}
          </div>
        )}

        {activeTabEvents === "Notifications" && (
          <div className="mt-[25px]">
            {notificationCard.map((advert, index) => (
              <NotificationCard
                key={index}
                image={advert.image}
                title={advert.title}
                date={advert.date}
                icon={advert.icon}
                iconText={advert.iconText}
                isDisabled={advert.isDisabled}
                cardClick={() => (
                  setIsModelOpen(true), console.log("Card clicked")
                )}
              />
            ))}
          </div>
        )}

        {activeTabEvents === "Blogs" && (
          <div className="mt-[25px]">
            <InputComponent placeholder="Search" icon={<SearchIcon />} />

            <div className="mb-6 sm:mb-8 relative w-full">
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
                {blogData.map((item, index) => (
                  <div
                    className="w-auto sm:w-[150px] flex-shrink-0"
                    key={index}
                  >
                    <div className="mt-2 py-2 px-4 rounded-xl items-center bg-app-input-primary">
                      <p className="text-[12.98px] font-md text-app-text-primary font-plusJakartaSans-400">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-[15px]">
              {blogCardData.map((advert, index) => (
                <PartnershipBlogCard
                  key={index}
                  image={advert.image}
                  title={advert.title}
                  icon={advert.icon}
                  iconText={advert.iconText}
                  isDisabled={advert.isDisabled}
                  cardClick={() => (
                    setIsModelOpen(true), console.log("Card clicked")
                  )}
                />
              ))}
            </div>
          </div>
        )}
        <CampaignAdModel
          isOpen={isModelOpen}
          onClose={() => setIsModelOpen(false)}
        />
      </div>
      {notificationPermission && isNewPartnershipUser === "yes" && (
        <Notifications
          isOpen={notificationPermission}
          onClose={(value: boolean) => {
            setNotificationPermission(false);
            setPhotosPermission(true);
          }}
        />
      )}
      {photosPermission &&
        !notificationPermission &&
        isNewPartnershipUser === "yes" && (
          <Photos
            isOpen={photosPermission}
            onClose={(value: string) => {
              setPhotosPermission(false);
              setLocationPermission(true);
            }}
          />
        )}
      {locationPermission &&
        !photosPermission &&
        isNewPartnershipUser === "yes" && (
          <Location
            isOpen={locationPermission}
            onClose={(value: string) => {
              setLocationPermission(false);
              setUserNamePermission(true);
            }}
          />
        )}
      {userNamePermission &&
        !locationPermission &&
        isNewPartnershipUser === "yes" && (
          <ChooseUserNameModel
            isOpen={userNamePermission}
            onClose={() => {
              removeNewPartnershipUser();
              setUserNamePermission(false);
            }}
          />
        )}
    </div>
  );
};

export default page;
