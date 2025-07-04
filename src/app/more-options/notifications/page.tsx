"use client";

import { useState, useRef } from "react";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import {
  BackArrow,
  HousePartyNotificationIcon,
  LiveMusicNotificationIcon,
  NewSpiritualityNotificationIcon,
  SpiritualityNotificationIcon,
  TermsAndConditionsIcon,
} from "../../../../public/svg-icons/icons";
import { useRouter } from "next/navigation";
import NotificationCard from "@/components/NotificationCard/NotificationCard";
import Image from "next/image";

const matchedHobbies = [
  {
    userImg: "/images/notification img3.jpg",
    title: "Group meditation",
    icon: <SpiritualityNotificationIcon className="text-app-icon" />,
    time: "12.33 PM",
    category: "Spirituality",
    userName: "Akesh kumar",
    description: "You are following this event host. Be the first to join.",
    isShowCancelled: false,
    isCancelled: false,
    isJoinNow: false,
  },
  {
    userImg: "/images/notification img1.jpg",
    title: "Psychedelic jazz",
    icon: <HousePartyNotificationIcon className="text-app-icon" />,
    time: "12.33 PM",
    category: "House party",
    userName: "Riya Sharma",
    description: "You are following this event host. Be the first to join.",
    isCancelled: false,
    isShowCancelled: false,
    isJoinNow: false,
  },
];

const createdHobbies = [
  {
    userImg: "/images/notification img3.jpg",
    title: "Group meditation",
    icon: <LiveMusicNotificationIcon className="text-app-icon" />,
    time: "12.33 PM",
    category: "Spirituality",
    userName: "Akesh kumar",
    description: "You are following this event host. Be the first to join.",
    isShowCancelled: true,
    isCancelled: false,
    isJoinNow: false,
  },
  {
    userImg: "/images/notification img1.jpg",
    title: "Psychedelic jazz",
    icon: <LiveMusicNotificationIcon className="text-app-icon" />,
    time: "12.33 PM",
    category: "House party",
    userName: "Riya Sharma",
    description: "You are following this event host. Be the first to join.",
    isCancelled: true,
    isShowCancelled: true,
    isJoinNow: false,
  },
];

const otherNotifications = [
  {
    userImg: "/images/notification img1.jpg",
    title: "Psychedelic jazz",
    icon: <HousePartyNotificationIcon className="text-app-icon" />,
    time: "12.33 PM",
    category: "House party",
    userName: "Riya Sharma",
    description: "You are following this event host. Be the first to join.",
    isCancelled: false,
    isShowCancelled: false,
    isJoinNow: true,
  },
  {
    userImg: "/images/cancel-img.png",
    title: "Event Cancelled",
    time: "12.33 PM",
    description:
      "The host unfortunately cancelled the event.We apologize for the inconvenience...",
    isShowCancelled: false,
    isCancelled: false,
    isJoinNow: false,
  },
  {
    userImg: "/images/notification img1.jpg",
    title: "Blog Comments",
    icon: <HousePartyNotificationIcon className="text-app-icon" />,
    time: "12.33 PM",
    category: "House party",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    isCancelled: false,
    isShowCancelled: false,
    isJoinNow: false,
    isBlogComment: true,
  },
  {
    userImg: "/images/cancel-img.png",
    title: "Event Cancelled",
    time: "12.33 PM",
    description:
      "The host unfortunately cancelled the event.We apologize for the inconvenience...",
    isShowCancelled: false,
    isCancelled: false,
    isJoinNow: false,
  },
  {
    userImg: "/images/cancel-img.png",
    title: "Hobby Event Reminder",
    time: "12.33 PM",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    isShowCancelled: false,
    isCancelled: false,
    isJoinNow: false,
    isEventCancelled: true,
  },
];

const imageList = [
  "/images/notification img1.jpg",
  "/images/notification img2.jpg",
  "/images/notification img3.jpg",
];

const page = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -158 : 158;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  const onMouseLeave = () => {
    if (!scrollContainerRef.current) return;
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = "grab";
  };

  const onMouseUp = () => {
    if (!scrollContainerRef.current) return;
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = "grab";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  //   loading state
  const [loading, setLoading] = useState(false);
  // routing
  const router = useRouter();
  return (
    <div className="overflow-y-auto max-h-screen no-scrollbar">
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <div className="min-h-screen bg-app-background-primary flex flex-col">
        <div className="w-full max-w-md px-4 top-0 left-0 right-0">
          {/* Header */}
          <header className="fixed w-full pt-[64px] bg-app-background-primary flex items-center mb-10 z-200">
            <button
              aria-label="Go back"
              onClick={() => window.history.back()} // Simple back navigation
              className="p-2 -ml-2 mr-2" // Added padding for easier click and negative margin to align
            >
              <BackArrow className="text-app-icon" />
            </button>
            <h1 className="text-xl font-semibold text-app-text-primary font-plusJakartaSans">
              Notifications
            </h1>
          </header>
          <div className="border-t border-0.5 border-app-border space-y-1 mt-[130px]">
            {/* Notification items go here */}
          </div>
          <div className="mt-[12px]">
            <h1 className="text-[16px] font-semibold text-app-text-primary font-plusJakartaSans-400">
              Matched Hobby(ies)
            </h1>
            <div>
              {matchedHobbies.map((item, index) => (
                <div
                  key={index}
                  className=" mb-[12px] border-b border-app-border"
                  onClick={() => {
                    router.push("/user/shop");
                  }}
                >
                  <NotificationCard
                    userImage={item.userImg}
                    title={item.title}
                    icon={item.icon}
                    time={item.time}
                    category={item.category}
                    userName={item.userName}
                    description={item.description}
                    isCancelled={item.isCancelled}
                    isShowCancelled={item.isShowCancelled}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3">
            <h1 className="text-sm font-semibold text-app-text-primary font-plusJakartaSans">
              Created Hobby(ies)
            </h1>
            <div>
              {createdHobbies.map((item, index) => (
                <div key={index} className="border-b border-app-border">
                  <NotificationCard
                    userImage={item.userImg}
                    title={item.title}
                    icon={item.icon}
                    time={item.time}
                    category={item.category}
                    userName={item.userName}
                    description={item.description}
                    isCancelled={item.isCancelled}
                    isShowCancelled={item.isShowCancelled}
                    isJoinNow={item.isJoinNow}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="mt-[12px] mb-[12px] rounded-xl bg-app-background-add w-full h-[240px] flex items-center justify-center">
              <div
                ref={scrollContainerRef}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                className="flex space-x-4 overflow-x-auto pb-2 -mx-0 px-2 no-scrollbar cursor-grab"
              >
                {imageList.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Notification Image ${index + 1}`}
                    width={144}
                    height={120}
                    className="rp-5"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h1 className="text-sm font-semibold text-app-text-primary font-plusJakartaSans">
              Other Notifications
            </h1>
            <div>
              {otherNotifications.map((item, index) => (
                <div key={index} className="border-b border-app-border">
                  <NotificationCard
                    userImage={item.userImg}
                    title={item.title}
                    icon={item.icon}
                    time={item.time}
                    category={item.category}
                    userName={item.userName}
                    description={item.description}
                    isCancelled={item.isCancelled}
                    isShowCancelled={item.isShowCancelled}
                    isJoinNow={item.isJoinNow}
                    isBlogComment={item.isBlogComment}
                    isEventCancelled={item.isEventCancelled}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
