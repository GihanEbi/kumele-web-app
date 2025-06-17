"use client";

import { useState } from "react";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { HousePartyNotificationIcon } from "../../../../../public/svg-icons/icons";
import ChatCard from "@/components/ChatCard/ChatCard";

const chatData = [
  {
    icon: <HousePartyNotificationIcon className="text-app-icon" />,
    category: "House party",
    title: "Group Meditation",
    leftDays: "4",
    hostBy: "Akesh Kumar",
    date: "8th Oct, 2022",
    review: "60%",
    scannedList: "13",
    eventStatus: "Chat",
    isActive: true,
  },
  {
    icon: <HousePartyNotificationIcon className="text-app-icon" />,
    category: "House party",
    title: "Group Meditation",
    leftDays: "4",
    hostBy: "Akesh Kumar",
    date: "8th Oct, 2022",
    review: "60%",
    scannedList: "13",
    eventStatus: "Chat",
    isActive: true,
  },
  {
    icon: <HousePartyNotificationIcon className="text-app-icon" />,
    category: "House party",
    title: "Group Meditation",
    leftDays: "4",
    hostBy: "Akesh Kumar",
    date: "8th Oct, 2022",
    review: "60%",
    scannedList: "13",
    eventStatus: "Chat",
    isActive: false,
  },
  {
    icon: <HousePartyNotificationIcon className="text-app-icon" />,
    category: "House party",
    title: "Group Meditation",
    leftDays: "4",
    hostBy: "Akesh Kumar",
    date: "8th Oct, 2022",
    review: "60%",
    scannedList: "13",
    eventStatus: "Event Cancelled",
    isActive: false,
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
          <header className="flex items-center">
            <h1 className="text-xl font-bold text-app-text-primary font-plusJakartaSans">
              Chats
            </h1>
          </header>
          <div>
            {chatData.map((item, index) => (
              <div key={index} className="mt-5">
                <ChatCard
                  icon={item.icon}
                  category={item.category}
                  title={item.title}
                  leftDays={item.leftDays}
                  hostBy={item.hostBy}
                  date={item.date}
                  review={item.review}
                  scannedList={item.scannedList}
                  eventStatus={item.eventStatus}
                  isActive={item.isActive}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
