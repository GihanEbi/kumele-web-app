"use client";

import Image from "next/image";
import { mockEventData, mockHostData, mockOtherEvents } from "./data";
import HostInfo from "./hostInfo/HostInfo";
import {
  DownArrowIcon,
  YingyangIcon,
  ShareIcon,
  TwoTicketsIcon,
  ClockIcon,
  UsersIcon,
  LocationIcon,
  CloseIcon,
} from "../../../public/svg-icons/icons";
import { useState } from "react";

import OtherEvents from "./otherEvents/OtherEvents";
import { useTheme } from "next-themes";
import ClockGif from "@/components/GifComponents/ClockGif/ClockGif";
import InviteModal from "./ShareModal/ShareModal";

type HomeEventCardProps = {
  event: EventType;
  isExtended: boolean;
  isTopCard: boolean;
  onToggleExtend: () => void;
  onRemove: () => void;
  onOpenShareModal: () => void;
};
export type EventType = {
  id: number;
  imageSrc: string;
  title: string;
  category: string;
  price: string;
  time: string;
  guests: string;
  startsIn: string;
  location: string;
  subtitle: string;
  description: string;
};

const HomeEventCard = ({
  event,
  isExtended,
  onToggleExtend,
  isTopCard,
  onRemove,
  onOpenShareModal,
}: HomeEventCardProps) => {
  
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const { eventData, hostData, otherEvents } = {
    eventData: mockEventData,
    hostData: mockHostData,
    otherEvents: mockOtherEvents,
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex justify-center items-center p-4" //
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-app-background-tertiary rounded-4xl w-full max-w-sm max-h-[85vh]  ${
            isTopCard ? "shadow-2xl" : "shadow-lg"
          }  flex flex-col ${
            isExtended ? "overflow-y-auto no-scrollbar" : "overflow-hidden"
          } p-3 sm:p-5`}
        >
          <div className="relative">
              <Image
                src={event.imageSrc}
                alt={event.title}
                width={400}
                height={400}
                className="w-full h-70 object-cover rounded-t-2xl"
              />
          {/* 2. Scrollable Content Section */}
          <div
            className={`flex-1  ${
              isExtended ? "overflow-y-auto no-scrollbar" : "overflow-hidden"
            }  p-2 sm:p-5`}
          >
            
              <div className="absolute top-5 right-6 bg-app-blog-card-category-background text-white text-xs px-3 py-1.5 rounded-full flex items-center space-x-1.5">
                <YingyangIcon />
                <span className="font-plusJakartaSans text-white font-normal text-[13px]">
                  {event.category}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-start mb-4 mt-3">
              <h1 className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[25px]">
                {event.title}
              </h1>
              <button
                onClick={onOpenShareModal}
                className={`${
                  isDark ? "bg-white" : "bg-black"
                }  p-2 rounded-lg`}
              >
                <ShareIcon
                  className={`${isDark ? "text-black" : "text-white"} `}
                />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm ">
                <div className="flex items-center space-x-2">
                  <TwoTicketsIcon className="h-[20px] w-[20px]" />{" "}
                  <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                    {event.price}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-[20px] w-[20px]" />{" "}
                  <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                    {event.time}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <UsersIcon className="h-[20px] w-[20px]" />{" "}
                  <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                    {event.guests} guests
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <div className="flex items-center space-x-2">
                    <ClockGif
                      width={19}
                      height={19}
                    />
                    <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                      {event.startsIn}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <LocationIcon className="h-[20px] w-[20px]" />{" "}
                    <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                      {event.location}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onToggleExtend}
                  className={`${
                    isDark ? "bg-gray-500" : "bg-app-range-slider-track-active"
                  }  rounded-full p-1 self-end`}
                >
                  <DownArrowIcon
                    className={`${isExtended ? "rotate-180" : ""} w-6 h-6`}
                  />
                </button>
              </div>
            </div>

            {/* scrollable area:for further reference styles */}

            {isExtended && (
              <div>
                <div className="mt-6 overflow-y-auto max-h-24 pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <div className="flex items-start space-x-2">
                    <p className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[13px]">
                      {event.subtitle}
                    </p>
                  </div>
                  <p className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[13px] mt-1">
                    {event.description}
                  </p>
                </div>
                {/* Event details section end */}

                <div className="mt-6">
                  <HostInfo host={hostData} />
                </div>
                <OtherEvents events={otherEvents} hostName={hostData.name} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeEventCard;
