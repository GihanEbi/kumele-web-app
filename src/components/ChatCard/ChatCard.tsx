"use client";

import React from "react";
import NotificationBadge from "../NotificationCard/NotificationBadge";
import { DeleteIcon, MoreOptionIcon } from "../../../public/svg-icons/icons";
import MoreOptionModel from "./Models/MoreOptionsModel";
import DropDownIconMenuComponent from "../DropDownIconMenuComponent/DropDownIconMenuComponent";
import { useRouter } from "next/navigation";
import ProgressBarComponent from "../ProgressBarComponent/ProgressBarComponent";

type ChatCardProps = {
  // Define any props you need here
  icon: React.ReactNode;
  category: string;
  title: string;
  leftDays: string;
  hostBy: string;
  date: string;
  review: string;
  scannedList: string;
  eventStatus: string;
  isActive: boolean;
  event_id: string; // Required event_id prop
};

const ChatCard: React.FC<ChatCardProps> = ({
  icon,
  category,
  title,
  leftDays,
  hostBy,
  date,
  review,
  scannedList,
  eventStatus,
  isActive,
  event_id,
}) => {
  const [showMoreOptions, setShowMoreOptions] = React.useState(false);
  const router = useRouter();
  return (
    <div
      className={`bg-app-background-chat-card px-3 py-4 rounded-xl ${
        !isActive && "pointer-events-none opacity-50 select-none"
      }`}
    >
      {/* header */}
      <div
        className={`flex justify-between items-center ${
          !isActive && "pointer-events-none opacity-50 select-none"
        }`}
      >
        <div className="inline-flex gap-2 text-sm text-app-text-primary font-plusJakartaSans w-auto items-center">
          {icon}
          <div>{category}</div>
        </div>
        <div
          onClick={() => {
            setShowMoreOptions(true);
          }}
        >
          <div className="">
            <DropDownIconMenuComponent />
          </div>
        </div>
      </div>
      {/* body */}
      <div className="flex mt-1 justify-between items-center">
        <div>
          <h2 className="text-md font-semibold text-app-text-primary font-plusJakartaSans">
            {title}
          </h2>
          <p className="mt-1 text-[10px] text-app-text-host font-semibold font-plusJakartaSans">
            Hosted by {hostBy}
          </p>
          <p className="mt-1 text-[10px] text-app-text-secondary font-plusJakartaSans">
            {date}
          </p>
        </div>
        <div>
          <p className="text-[8px] text-app-text-primary font-plusJakartaSans text-right">
            {leftDays} days left to rate & <br /> review
          </p>
          <div className="mt-1 w-full">
            <ProgressBarComponent />
          </div>
          <p className="text-[8px] mt-2 text-app-text-primary font-plusJakartaSans text-right">
            Scanned list: {scannedList} <br />
          </p>
        </div>
      </div>
      {/* footer */}
      <div className="flex justify-between items-center mt-2">
        <div
          className="text-sm text-app-text-tertiary font-plusJakartaSans bg-app-button-primary px-6 py-1 rounded-md"
          onClick={() => {
            router.push(`/more-options/chat-pages/chat?event_id=${event_id}`);
          }}
        >
          {eventStatus}
        </div>
        {!isActive && (
          <div className="mt-5">
            <DeleteIcon width={20} height={20} />
          </div>
        )}
      </div>{" "}
    </div>
  );
};

export default ChatCard;
