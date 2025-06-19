"use client";

import { useState } from "react";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import {
  BackArrow,
  HousePartyNotificationIcon,
  LiveMusicNotificationIcon,
  TermsAndConditionsIcon,
} from "../../../../public/svg-icons/icons";
import NotificationCard from "@/components/NotificationCard/NotificationCard";

const matchedHobbies = [
  {
    userImg: "/images/notification img3.jpg",
    title: "Group meditation",
    icon: <HousePartyNotificationIcon className="text-app-icon" />,
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
    icon: <HousePartyNotificationIcon className="text-app-icon" />,
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
    icon: <HousePartyNotificationIcon className="text-app-icon" />,
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
];

const page = () => {
  //   loading state
  const [loading, setLoading] = useState(false);
  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <div className="min-h-screen px-2 bg-app-background-primary flex flex-col items-center pt-6 font-sans">
        <div className="w-full max-w-md px-4">
          {/* Header */}
          <header className="flex items-center">
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
          <div className="mt-5 border-t border-0.5 border-app-border">
            {/* Notification items go here */}
          </div>
          <div className="mt-3">
            <h1 className="text-sm font-thin text-app-text-primary font-plusJakartaSans">
              Matched Hobby(ies)
            </h1>
            <div>
              {matchedHobbies.map((item, index) => (
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
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3">
            <h1 className="text-sm font-thin text-app-text-primary font-plusJakartaSans">
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
          <div className="mt-3">
            <h1 className="text-sm font-thin text-app-text-primary font-plusJakartaSans">
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
