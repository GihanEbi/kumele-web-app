"use client";

import { get_event_by_event_id } from "@/routes/Events";
import React, { useEffect, useState } from "react";
import {
  ClockIcon,
  CloseIcon,
  DownArrowIcon,
  LocationIcon,
  ShareIcon,
  TwoTicketsIcon,
  UsersIcon,
} from "../../../public/svg-icons/icons";
import HobbyTagIcon from "../HobbyTagIcon/HobbyTagIcon";
import { useTheme } from "next-themes";
import ClockGif from "../GifComponents/ClockGif/ClockGif";
import HostInfo from "../SwipeEventCard/hostInfo/HostInfo";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import Image from "next/image";

interface eventData {
  id: string;
  user_id: string;
  category_id: string;
  event_image_url: string;
  event_name: string;
  subtitle: string;
  description: string;
  event_start_in: string;
  event_date: string;
  event_start_time: string;
  event_end_time: string;
  street_address: string;
  home_number: string;
  district: string;
  postal_zip_code: string;
  state: string;
  age_range_min: string;
  age_range_max: string;
  max_guests: string;
  payment_type: string;
  price: string;
  created_at: string;
  host: {
    id: string;
    about_me: string;
    host_rating: number;
    following_count: number;
    username: string;
    profilePicture: string;
  };
}

interface EventNotificationProps {
  event_id: string;
  isOpen: boolean;
  onClose: () => void;
}

interface hostData {
  name: string;
  avatarSrc: string;
  followers: number;
  rating: number;
  level: string;
  levelIcon: string;
  aboutTitle: string;
  aboutBio: string;
}

const EventNotificationCard: React.FC<EventNotificationProps> = ({
  event_id,
  isOpen,
  onClose,
}) => {
  //   loading state
  const [loading, setLoading] = useState(false);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [isExtendedPreviewOpen, setIsExtendedPreviewOpen] =
    useState<boolean>(true);

  //   state for event details
  const [eventDetails, setEventDetails] = useState<eventData | null>(null);
  const [hostData, setHostData] = useState<hostData | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchEventDetails();
    }
  }, [isOpen]);

  const fetchEventDetails = async () => {
    setLoading(true);
    try {
      const data = await get_event_by_event_id(event_id);

      if (data.success) {
        setEventDetails(data.data);
        setHostData({
          name: data.data.host_details.username,
          avatarSrc: data.data.host_details.profilePicture,
          followers: data.data.host_details.following_count,
          rating: data.data.host_details.host_rating,
          level: "Pro",
          levelIcon: "1",
          aboutTitle: "About the Host",
          aboutBio: data.data.host_details.about_me,
        });
      }
    } catch (error) {
      setError("An error occurred");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return;
    } finally {
      setLoading(false);
    }
  };

  // get the remaining time to event start
  function getHoursRemaining(
    eventDate: string | Date,
    eventStartTime: string
  ): number {
    // Convert eventDate to Date object
    const baseDate = new Date(eventDate);

    // Extract hours and minutes from eventStartTime (e.g., "09:26 PM")
    const [time, modifier] = eventStartTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier.toLowerCase() === "pm" && hours < 12) {
      hours += 12;
    }
    if (modifier.toLowerCase() === "am" && hours === 12) {
      hours = 0;
    }

    // Create a new Date with combined date + time
    const eventDateTime = new Date(baseDate);
    eventDateTime.setHours(hours, minutes, 0, 0);

    // Get current time
    const now = new Date();

    // Calculate difference in hours
    const diffMs = eventDateTime.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    // Round down to nearest hour (no decimals)
    return Math.floor(diffHours);
  }
  if (!isOpen) return null;

  return (
    <div>
      {/* Loading spinner */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}

      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex justify-center items-center p-4" //
      >
        {/* Modal Content - We use flex-col to structure the layout */}
        <div
          onClick={(e) => e.stopPropagation()}
          className=" bg-app-background-tertiary rounded-4xl w-full max-w-sm max-h-[70vh] shadow-lg flex flex-col overflow-y-auto no-scrollbar p-3 sm:p-5"
        >
          {/* 2. Scrollable Content Section */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-2 sm:p-5">
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute -top-1 -right-1 z-20 bg-app-background-tertiary p-1"
                aria-label="Close"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
              <Image
                src={
                  eventDetails?.event_image_url
                    ? eventDetails.event_image_url
                    : "/default-event-image.png"
                }
                alt={eventDetails?.event_name || ""}
                width={400}
                height={250}
                className="w-full h-65 object-cover rounded-t-2xl"
              />

              <HobbyTagIcon hobbyId={eventDetails?.category_id ?? ""} />
            </div>
            <div className="flex justify-between items-start mb-4 mt-3">
              <h1 className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[25px]">
                {eventDetails?.event_name}
              </h1>
              <button
                // onClick={() => setInviteModalOpen(true)}
                className={`${
                  isDark ? "bg-white" : "bg-black"
                }  p-1 rounded-md`}
              >
                <ShareIcon
                  className={`w-[18.07px] h-[18.07px] ${
                    isDark ? "text-black" : "text-white"
                  } `}
                />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2  text-sm ">
                <div className="flex items-center space-x-1">
                  <TwoTicketsIcon className="h-[20px] w-[20px]" />{" "}
                  <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                    {eventDetails?.payment_type}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-[20px] w-[20px]" />{" "}
                  <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                    {eventDetails?.event_start_time
                      .replace(/(AM|PM)/i, "")
                      .trim()}
                    -
                    {eventDetails?.event_end_time
                      .replace(/(AM|PM)/i, "")
                      .trim()}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <UsersIcon className="h-[20px] w-[20px]" />{" "}
                  <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                    {eventDetails?.max_guests} guests
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <div className="flex items-center space-x-1">
                    <ClockGif width={19} height={19} />
                    <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                      Starts in{" "}
                      {eventDetails?.event_date &&
                      eventDetails?.event_start_time
                        ? getHoursRemaining(
                            eventDetails.event_date,
                            eventDetails.event_start_time
                          )
                        : "--"}{" "}
                      hrs
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <LocationIcon className="h-[20px] w-[20px]" />{" "}
                    <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                      {eventDetails?.home_number} {eventDetails?.street_address}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setIsExtendedPreviewOpen(!isExtendedPreviewOpen)
                  }
                  className={`${
                    isDark ? "bg-gray-500" : "bg-app-range-slider-track-active"
                  } dark:bg-zinc-700 rounded-full p-1 self-end`}
                >
                  <DownArrowIcon
                    className={`${
                      !isExtendedPreviewOpen ? "rotate-180" : ""
                    } w-6 h-6`}
                  />
                </button>
              </div>
            </div>
            {/* scrollable area:for further reference styles */}

            {!isExtendedPreviewOpen && (
              <div>
                <div className="mt-6 overflow-y-auto max-h-24 pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <div className="flex items-start space-x-2 mb-4">
                    <p className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[13px]">
                      {eventDetails?.subtitle}
                    </p>
                  </div>
                  <p className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[13px] mt-1">
                    {eventDetails?.description}
                  </p>
                </div>

                <div className="mt-16">
                  {hostData && <HostInfo host={hostData} />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventNotificationCard;
