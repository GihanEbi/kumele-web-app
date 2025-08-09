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
  BlogFacebookIcon,
  BlogInstagramIcon,
  BlogPinterestIcon,
  BlogTwitterIcon,
  InsertBannerImageIcon,
  Header3Icon,
  Header2Icon,
} from "../../../../public/svg-icons/icons";
import NotificationBadge from "@/components/NotificationCard/NotificationBadge";
import DropDown from "@/components/DropDown/DropDown";
import { UnderlineIcon } from "lucide-react";
import TextAreaComponent from "@/components/TextAreaComponent/TextAreaComponent";
import PreviewModel from "./models/PreviewModel";
import BlogPreviewModel from "./models/PreviewModel";
import InsertLinkModal from "./models/InsertLinkModal";

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
  const [isInsertLinkModalOpen, setIsInsertLinkModalOpen] = useState(false);

  // ------- state to hold the selected interests ------
  const [selectedInterestsIds, setSelectedInterestsIds] = useState<number[]>(
    []
  );

  // CATEGORY SELECTION

  console.log("is dropdown open", isDropdownOpen);

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

  /*--------Insert Link Modal Handlers --------*/
  const openModal = () => setIsInsertLinkModalOpen(true);
  const closeModal = () => setIsInsertLinkModalOpen(false);
  return (
    <div
      className={`overflow-y-auto max-h-screen no-scrollbar ${
        isDropdownOpen || previewBlog || isInsertLinkModalOpen
          ? "bg-k-background-secondary"
          : "bg-k-background-primary"
      } `}
    >
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <div className={`min-h-screen flex flex-col`}>
        <div className={`w-full max-w-md px-4 top-0 left-0 right-0 `}>
          {/* Header */}
          <header
            className={`fixed w-full pt-[64px] flex items-center mb-10 z-1000 ${
              isDropdownOpen || previewBlog || isInsertLinkModalOpen
                ? "bg-k-background-secondary"
                : "bg-k-background-primary"
            } `}
          >
            <h1 className="mt-4  font-semibold text-app-text-primary font-plusJakartaSans font-bold text-[23px]">
              Create Blog
            </h1>
          </header>
        </div>
        {/* body section */}

        <div className="space-y-1 mt-[130px] px-10 mb-50">
          <div>
            <p className="font-plusJakartaSans font-normal text-[13.89px] text-app-text-primary mb-3">
              Advert Category
            </p>
            <div className="mb-6 sm:mb-8 relative w-full">
              <div
                ref={tabsContainerRef}
                className="flex space-x-3 overflow-x-auto sm:-mx-0 sm:px-0 no-scrollbar"
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
                      isPartnership={true}
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
          {/* blog name */}
          <div>
            <p className="text-app-text-primary font-plusJakartaSans font-normal text-[13.89px] mb-[10px]">
              Blog Name
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
          {/* banner image */}
          <div className=" mb-[24px] ">
            <p className="mb-[10px] text-app-text-primary font-plusJakartaSans font-normal text-[13.89px]">
              Banner Image
            </p>
            <div className="flex justify-between w-[168.73px] h-[38px] bg-app-background-card-secondary rounded-lg  px-2 pt-2">
              <div>
                {/* <ImageIcon
                  className="text-app-badge-background-qr"
                  width={20}
                  height={20}
                /> */}
                <ImageIcon
                  className="text-white dark:text-black"
                  width={20}
                  height={20}
                />
              </div>
              <p className="font-md text-app-text-tertiary font-plusJakartaSans font-normal text-[12.98px] mb-[10px]">
                Insert banner image
              </p>
            </div>
          </div>
          {/* social media links */}
          <div className="mb-[37px]">
            <p className="mb-[10px] text-app-text-primary font-plusJakartaSans font-normal text-[13.89px]">
              Social Media Links
            </p>
            <div className="flex gap-2">
              <div className="space-y-3">
                <div className="relative w-[176px] h-[35px]">
                  <InputComponent
                    placeholder="www.example.com"
                    value={""}
                    onChange={(e) => {}}
                  />
                </div>
              </div>
              <div>
                <DropDown
                  dataArray={[
                    { label: <NewYoutubeIcon />, value: "youtube" },
                    { label: <BlogFacebookIcon />, value: "facebook" },
                    { label: <BlogInstagramIcon />, value: "instagram" },
                    { label: <BlogPinterestIcon />, value: "pinterest" },
                    { label: <BlogTwitterIcon />, value: "twitter" },
                  ]}
                  placeHolder={<NewYoutubeIcon className="w-[24px] h-[24px]" />}
                  // isOpen={(value: boolean) => {
                  //   console.log("is dropdown openda", value);
                  //   setIsDropdownOpen(value);
                  // }}
                  isOpen={() => setIsDropdownOpen(!isDropdownOpen)}
                />
              </div>
              <div
                className="bg-app-okay-icon-filter rounded-lg p-2 h-1/2 w-[38px] h-[38px]"
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
          </div>
          {/* insert image section */}
          <div className="flex justify-between items-center mb-6">
            <div className="bg-app-background-card-secondary rounded-lg  px-2 pt-2 gap-2 flex justify-between">
              {/* <div className="flex justify-between w-1/2 bg-app-background-card-secondary rounded-lg  px-2 pt-2"> */}
              {/* <ImageIcon className="text-app-icon" width={20} height={20} /> */}
              <ImageIcon
                className="text-white dark:text-black mt-[3px]"
                width={20}
                height={20}
              />
              <p className="font-md text-white dark:text-black font-plusJakartaSans font-normal text-[12.98px] mb-[10px]">
                Insert image
              </p>
            </div>
            <div className="bg-k-background-secondary rounded-lg  px-5 pt-2 gap-2 flex justify-between">
              <NewYoutubeIcon
                className="text-app-icon mt-[3px]"
                width={20}
                height={20}
              />
              <p className="font-md text-app-text-primary font-plusJakartaSans font-normal text-[12.98px] mb-[10px]">
                paste video link
              </p>
            </div>
          </div>
          {/* blog writing section */}
          <div>
            <div className="flex mb-[34px] items-center gap-3">
              <div>
                <DropDown
                  dataArray={[
                    { label: <HeaderOneIcon />, value: "facebook" },
                    { label: <Header2Icon />, value: "twitter" },
                    { label: <Header3Icon />, value: "instagram" },
                  ]}
                  placeHolder={<HeaderOneIcon />}
                  // isOpen={(value: boolean) => {
                  //   setIsDropdownOpen(value);
                  // }}
                  isOpen={() => setIsDropdownOpen(!isDropdownOpen)}
                />
              </div>
              <div>
                <BoldIcon />
              </div>
              <div>
                <ItalicIcon />
              </div>
              <div>
                <BulletedListIcon />
              </div>
              <div>
                <NumberListIcon />
              </div>
              <div>
                <button onClick={openModal} className="">
                  <LinkIcon />
                </button>
              </div>
            </div>
            <div>
              <TextAreaComponent placeholder="Write your blog..." />
            </div>
          </div>
          {/* submit button */}
          <div className="flex flex-col items-center mt-8">
            <button
              className="w-1/2 bg-app-button-primary text-app-text-tertiary font-plusJakartaSans font-normal text-[14.57px] py-3 px-2 rounded-lg"
              onClick={() => {
                setPreviewBlog(true);
              }}
            >
              Preview Blog
            </button>
          </div>
        </div>
      </div>
      <BlogPreviewModel
        isOpen={previewBlog}
        onClose={() => setPreviewBlog(false)}
      />
      <InsertLinkModal isOpen={isInsertLinkModalOpen} onClose={closeModal} />
    </div>
  );
};

export default page;
