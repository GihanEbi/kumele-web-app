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
//import AnalyticsChart from "@/components/partnershipChartComponent/AnalyticsChart";
import Image from "next/image";
import DropDown from "@/components/DropDown/DropDown";
import { authConstants } from "@/constants/auth-constants";
import CurrentAdvertsCard from "./currentAdvertsCard/currentAdvertsCard";
import {
  DownArrowIcon,
  HousePartyNotificationIcon,
  LiveMusicNotificationIcon,
  SearchIcon,
  SpiritualityNotificationIcon,
} from "../../../../public/svg-icons/icons";
import CampaignAdModel from "./currentAdvertsCard/models/CampaignAdModel";
import NotificationCard from "./currentAdvertsCard/notificationCard";
import InputComponent from "@/components/InputComponent/InputComponent";
import PartnershipBlogCard from "./currentAdvertsCard/blogCard";
import { DateRange } from "react-day-picker";
import DatePickerRangeVertical from "@/components/DateRngePicker/DateRngePicker";
import { addDays } from "date-fns";
import PreviewAdvertise from "../advertise/models/PreviewModal";
import DeleteBlogModel from "./currentAdvertsCard/models/DeleteBlogModel";
import SimpleCalendar from "@/components/CustomeCalender/CustomeCalender";
import DateRangePicker from "@/components/DateRangePicker/DateRangePicker";
import AnalyticsChart from "@/components/partnershipChartComponent/AnalyticsChartJs";

const chartData = [
  { name: "Jan", amountSpent: 2000, reach: 9000 },
  { name: "Feb", amountSpent: 1500, reach: 10000 },
  { name: "Mar", amountSpent: 700, reach: 3000 },
  { name: "Apr", amountSpent: 1800, reach: 2200 },
  { name: "May", amountSpent: 300, reach: 1500 },
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
  { name: "Oct", amountSpent: 600, reach: 2200 },
  { name: "Nov", amountSpent: 700, reach: 1200 },
  { name: "Dec", amountSpent: 2000, reach: 1000 },
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

const TABS = [
  { id: "all", label: "All" },
  { id: "pubs-bars", label: "Pubs & Bars" },
  { id: "video-games", label: "Video Games" },
  { id: "sports", label: "Sports" },
  { id: "music", label: "Music" },
  { id: "travel", label: "Travel" },
];

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
    icon: <HousePartyNotificationIcon className="text-white" />,
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
    icon: <HousePartyNotificationIcon className="text-white" />,
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
    icon: <HousePartyNotificationIcon className="text-white" />,
    iconText: "Spirituality",
    isDisabled: false,
  },
  {
    image: "/images/blogCard.jpg",
    title: "Singleton og Glen Ord 38-year-old and Singleton range.",
    icon: <HousePartyNotificationIcon className="text-white" />,
    iconText: "Spirituality",
    isDisabled: false,
  },
];

const ALL_BLOGS_DATA = [
  {
    id: "1",
    image: "/images/blogCard.jpg",
    title: "Singleton of Glen Ord 38-year old and the Singleton range.",
    icon: <HousePartyNotificationIcon className="text-white" />,
    iconText: "Spirituality",
    isDisabled: false,
    author: "Steve Austin",
    date: "23 August, 2022",
    tags: ["all", "pubs-bars"],
  },
  {
    id: "2",
    image: "/images/blogCard.jpg",
    title: "Exploring the latest indie video game hits of the year.",
    icon: <HousePartyNotificationIcon className="text-white" />,
    iconText: "Video Games",
    isDisabled: false,
    author: "Steve Austin",
    date: "23 August, 2022",
    tags: ["all", "video-games"],
  },
  {
    id: "3",
    image: "/images/blogCard.jpg",
    title: "Top 5 Sports Moments You Might Have Missed This Month.",
    icon: <HousePartyNotificationIcon className="text-white" />,
    iconText: "Sports",
    isDisabled: false,
    author: "Steve Austin",
    date: "23 August, 2022",
    tags: ["all", "sports"],
  },
  {
    id: "4",
    image: "/images/blogCard.jpg",
    title: "Music Festivals to Look Forward To Next Summer.",
    icon: <HousePartyNotificationIcon className="text-white" />,
    iconText: "Music",
    isDisabled: true,
    author: "Steve Austin",
    date: "23 August, 2022",
    tags: ["all", "music"],
  },
  {
    id: "5",
    image: "/images/blogCard.jpg",
    title: "Backpacking Through Southeast Asia: A Travelogue.",
    icon: <HousePartyNotificationIcon className="text-white" />,
    iconText: "Travel",
    isDisabled: false,
    author: "Steve Austin",
    date: "23 August, 2022",
    tags: ["all", "travel"],
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
  const [isModelOpen, setIsModelOpen] = useState(false); // State to hold the final, applied date range
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [isCardPreviewOpen, setIsCardPreviewOpen] = useState(false);
  const [deleteBlogModelOpen, setDeleteBlogModelOpen] = useState(false);

  const [activeBlogTab, setActiveBlogTab] = useState<string>("all");
  const [blogSearchTerm, setBlogSearchTerm] = useState<string>("");

  useEffect(() => {
    setIsBottomNavBarFixed(true);
  }, []);

  // ADDED: Filtering logic for blog posts
  const filteredBlogPosts = ALL_BLOGS_DATA.filter((post) => {
    const matchesTab =
      activeBlogTab === "all" || post.tags.includes(activeBlogTab);
    const matchesSearch = post.title
      .toLowerCase()
      .includes(blogSearchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

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

  // ADDED: Handler for clicking on a blog category tab
  const handleBlogTabClick = (tabId: string) => {
    setActiveBlogTab(tabId);
    scrollToTab(`blog-tab-${tabId}`); // Using a unique prefix for blog tabs
  };

  // styles for active and inactive tabs to keep the JSX clean
  const activeTabStyles =
    "bg-app-background-primary shadow text-app-blog-card-author-text";
  const inactiveTabStyles = "bg-transparent text-app-search-bar-text";

  return (
    <div
      className={`pb-30 overflow-y-auto max-h-screen no-scrollbar ${
        isDropdownOpen || isModelOpen || deleteBlogModelOpen
          ? "bg-k-background-secondary"
          : "bg-k-background-primary"
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
          <h1 className="text-app-text-black font-plusJakartaSans font-bold text-[23px]">
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
          {/* <div>
            <DropDown
              dataArray={authConstants.yearList}
              isOpen={(value: boolean) => {
                setIsDropdownOpen(value);
              }}
              placeHolder="YYYY"
            />
          </div> */}
          <DateRangePicker />

          {/* <div>
           
            <div className="flex gap-4 justify-between bg-app-input-primary rounded-sm pt-2 px-2">
              <p className="text-xs font-plusJakartaSans text-app-text-primary mb-3">
                Jan 12- Jul 12
              </p>

              <div className="">
                <DownArrowIcon
                  onClick={() => {
                    setIsDropdownOpen(true);
                  }}
                />
              </div>
            </div>
            <DatePickerRangeVertical
              isOpens={(value: boolean) => {
                setIsDropdownOpen(value);
              }}
            />
          </div> */}
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
                  <p className="text-app-text-primary font-plusJakartaSans font-medium text-[9.66px]">
                    {item.name}
                  </p>
                  <p className="font-plusJakartaSans font-semibold text-[20.11px] text-app-text-primary">
                    {item.amount}
                  </p>
                  <div className="flex item-center">
                    <Image
                      src="/images/Arrow 1.png"
                      alt="arrow"
                      width={5}
                      height={5}
                    />
                    <p
                      className="font-plusJakartaSans font-normal text-[10px]"
                      style={{ color: "#01B574" }}
                    >
                      {item.reach}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ml-0 pr-5 pl-5">
        {/* <AnalyticsChart data={chartData} /> */}
        <AnalyticsChart data={chartData} />
      </div>
      <div className="p-4">
        <div className="bg-app-range-slider-track-active p-1 gap-1 rounded-lg flex justify-between items-center mt-2">
          <div
            className={`text-center relative py-3 px-5 w-full h-[54.91px] rounded-[8px] transition-all duration-300 ${
              activeTabEvents === "Current Adverts"
                ? activeTabStyles
                : inactiveTabStyles
            }`}
          >
            <button
              className="font-plusJakartaSans font-semibold text-[12px]"
              onClick={() => setActiveTabEvents("Current Adverts")}
            >
              Current Adverts
            </button>
            <div className="rounded-full bg-app-input-yellow w-[19px] h-[19px] absolute top-[4px] right-[4px] flex items-center justify-center">
              <p className="text-app-text-black font-plusJakartaSans font-semibold text-[8.93px]">
                4
              </p>
            </div>
          </div>
          <div
            className={`text-center relative py-5 px-5 w-full h-[54.91px] rounded-[8px] transition-all duration-300 ${
              activeTabEvents === "Notifications"
                ? activeTabStyles
                : inactiveTabStyles
            }`}
          >
            <button
              className="font-plusJakartaSans font-medium text-[12px]"
              onClick={() => setActiveTabEvents("Notifications")}
            >
              Notifications <br />
            </button>
            <div className="rounded-full bg-app-input-yellow w-[19px] h-[19px] absolute top-[4px] right-[4px] flex items-center justify-center">
              <p className="font-plusJakartaSans font-semibold text-[8.93px] text-[12px] text-app-text-black">
                2
              </p>
            </div>
          </div>
          <div
            className={`text-center relative py-5 px-5 w-full h-[54.91px] rounded-[8px]  transition-all duration-300 ${
              activeTabEvents === "Blogs" ? activeTabStyles : inactiveTabStyles
            }`}
          >
            <button
              className="font-plusJakartaSans font-medium text-[12px]"
              onClick={() => setActiveTabEvents("Blogs")}
            >
              Blogs
            </button>
            <div className="rounded-full bg-app-input-yellow w-[19px] h-[19px] absolute top-[4px] right-[4px] flex items-center justify-center">
              <p className="font-plusJakartaSans font-semibold text-[8.93px] text-app-text-black">
                30
              </p>
            </div>
          </div>
        </div>

        {activeTabEvents === "Current Adverts" && (
          <div className="mt-[15px]">
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
                onClick={() => {
                  setIsCardPreviewOpen(true);
                }}
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
          <div className="mt-[15px]">
            {/* <InputComponent placeholder="Search" icon={<SearchIcon className="text-gray-500" />} /> */}
            <InputComponent
              placeholder="Search"
              icon={<SearchIcon className="text-gray-500" />}
              value={blogSearchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBlogSearchTerm(e.target.value)
              }
            />
            <div className="mb-6 sm:mb-8 relative w-full mt-4">
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
                {/* {TABS.map((item, index) => (
                  <div
                    className="w-auto sm:w-[150px] flex-shrink-0"
                    key={index}
                  >
                    <div className="mt-2 py-2 px-4 rounded-xl items-center bg-app-input-primary">
                      <p className="text-[12.98px] font-md text-app-text-primary font-plusJakartaSans-400">
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))} */}
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    id={`blog-tab-${tab.id}`} // Unique ID for scrolling
                    onClick={() => handleBlogTabClick(tab.id)}
                    className={`py-2 px-5 rounded-full font-plusJakartaSans font-normal text-[13px] whitespace-nowrap flex-shrink-0 transition-colors duration-150
                  ${
                    activeBlogTab === tab.id
                      ? "bg-app-blog-selected-tabs-background text-app-blog-selected-tabs-text"
                      : "bg-app-blog-unselected-tabs-background text-app-blog-unselected-tabs-text hover:bg-gray-700"
                  } `}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-[15px]">
              {/* {blogCardData.map((advert, index) => (
                <PartnershipBlogCard
                  key={index}
                  image={advert.image}
                  title={advert.title}
                  icon={advert.icon}
                  iconText={advert.iconText}
                  isDisabled={advert.isDisabled}
                  cardClick={() => (
                    setDeleteBlogModelOpen(true), console.log("Card clicked")
                  )}
                />
              ))} */}
              {filteredBlogPosts.length > 0 ? (
                filteredBlogPosts.map((post) => (
                  <PartnershipBlogCard
                    author={post.author}
                    date={post.date}
                    key={post.id}
                    image={post.image}
                    title={post.title}
                    icon={post.icon}
                    iconText={post.iconText}
                    isDisabled={post.isDisabled}
                    cardClick={() => (
                      setDeleteBlogModelOpen(true), console.log("Card clicked")
                    )}
                  />
                ))
              ) : (
                <p className="text-app-text-primary text-center py-8">
                  No posts found matching your criteria.
                </p>
              )}
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
      <PreviewAdvertise
        isOpen={isCardPreviewOpen}
        onClose={() => {
          setIsCardPreviewOpen(false);
        }}
      />

      {deleteBlogModelOpen && (
        <DeleteBlogModel
          isOpen={deleteBlogModelOpen}
          onClose={() => setDeleteBlogModelOpen(false)}
        />
      )}
      <SimpleCalendar
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
      />
    </div>
  );
};

export default page;
