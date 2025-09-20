"use client";

import React, { useEffect, useState } from "react";
import NotificationBadge from "../NotificationCard/NotificationBadge";
import { DeleteIcon, MoreOptionIcon } from "../../../public/svg-icons/icons";
import MoreOptionModel from "./Models/MoreOptionsModel";
import DropDownIconMenuComponent from "../DropDownIconMenuComponent/DropDownIconMenuComponent";
import { useRouter } from "next/navigation";
import ProgressBarComponent from "../ProgressBarComponent/ProgressBarComponent";
import InlineSvg from "../InlineSVG/InlineSVG";
import HobbyTagIcon from "../HobbyTagIcon/HobbyTagIcon";
import SuccessModel from "../Models/SuccessModel/SuccessModel";
import ErrorModel from "../Models/ErrorModel/ErrorModel";
import { getEventRating } from "@/routes/event_and_host_rating";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

type ChatCardProps = {
  // Define any props you need here
  icon: string;
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
  host_id?: string; // Optional host_id prop
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
  host_id,
}) => {
  const [showMoreOptions, setShowMoreOptions] = React.useState(false);
  const router = useRouter();
  const [eventRate, setEventRate] = React.useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEventRate();
  }, []);

  // fetch event rate
  const fetchEventRate = async () => {
    try {
      setLoading(true);
      const data = await getEventRating(event_id);
      if (data.success) {
        setEventRate(data.data.average_rating);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div
      className={`bg-app-background-chat-card px-3 py-4 rounded-xl ${
        !isActive && "pointer-events-none opacity-50 select-none"
      }`}
    >
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}
      {/* header */}
      <div
        className={`flex justify-between items-center ${
          !isActive && "pointer-events-none opacity-50 select-none"
        }`}
      >
        <div className="inline-flex gap-2 text-sm text-app-text-primary font-plusJakartaSans w-auto items-center">
          <InlineSvg
            svg={icon}
            className="w-[15.24px] h-[15.24px]"
            // title={category}
          />
          <div>{category}</div>
        </div>
        <div
          onClick={() => {
            setShowMoreOptions(true);
          }}
        >
          <div className="">
            <DropDownIconMenuComponent event_id={event_id} host_id={host_id} />
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
            <ProgressBarComponent eventRate={eventRate} />
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
      </div>
      <SuccessModel
        isOpen={showSuccessModel}
        onClose={() => {
          setShowSuccessModel(false);
          setSuccess("");
        }}
        successMessage={success || ""}
      />
      <ErrorModel
        isOpen={showErrorModel}
        onClose={() => {
          setShowErrorModel(false);
          setError("");
        }}
        errorMessage={error || ""}
      />
    </div>
  );
};

export default ChatCard;
