// components/EventPreviewModal/EventPreviewModal.tsx
"use client";

import Image from "next/image";
import { mockEventData, mockHostData, mockOtherEvents } from "../data";
import HostInfo from "../hostInfo/HostInfo";
import {
  DownArrowIcon,
  YingyangIcon,
  ShareIcon,
  TwoTicketsIcon,
  ClockIcon,
  UsersIcon,
  LocationIcon,
} from "../../../../../../../public/svg-icons/icons";
import { useState } from "react";
import EventPreviewModalExtended from "../EventPreviewModalExtented/EventPreviewModalExtended";
import OtherEvents from "../otherEvents/OtherEvents";
import ClockGif from "@/components/GifComponents/ClockGif/ClockGif";

type EventPreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EventPreviewModal = ({ isOpen, onClose }: EventPreviewModalProps) => {
  const [isExtendedPreviewOpen, setIsExtentedPreviewOpen] =
    useState<boolean>(false);
  if (!isOpen) return null;

  const { eventData, hostData, otherEvents } = {
    eventData: mockEventData,
    hostData: mockHostData,
    otherEvents: mockOtherEvents,
  };

  return (
    // Backdrop
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-center items-center p-4"
    >
      {/* Modal Content - We use flex-col to structure the layout */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-app-background-tertiary rounded-2xl w-full max-w-sm max-h-[95vh] shadow-lg flex flex-col"
      >
        {/* 1. Image Section (Fixed Height) */}
      

        {/* 2. Scrollable Content Section */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 sm:p-5">
              <div className="relative">
          <Image
            src={eventData.imageSrc}
            alt={eventData.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover rounded-t-2xl"
          />
          <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full flex items-center space-x-1.5">
            <YingyangIcon />
            <span className="font-plusJakartaSans text-app-button-text-color font-normal text-[13px]">
              {eventData.category}
            </span>
          </div>
        </div>
          <div className="flex justify-between items-start mb-4">
            <h1 className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[25px]">
              {eventData.title}
            </h1>
            <button className="bg-black text-white p-2 rounded-lg">
              <ShareIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm ">
              <div className="flex items-center space-x-2">
                <TwoTicketsIcon />{" "}
                <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                  {eventData.price}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon />{" "}
                <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                  {eventData.time}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <UsersIcon />{" "}
                <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                  {eventData.guests} guests
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div>
                <div className="flex items-center space-x-2">
                  <ClockGif width={20} height={20}/>
                  <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                    {eventData.startsIn}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <LocationIcon />{" "}
                  <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                    {eventData.location}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsExtentedPreviewOpen(true)}
                className="bg-zinc-200 dark:bg-zinc-700 rounded-full p-1 self-end"
              >
                <DownArrowIcon onClick={onClose} className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/*
            Event Details Section - CHANGE HERE
            - `max-h-24` gives the container a max height of 6rem (96px).
            - `overflow-y-auto` makes it scrollable if content exceeds this height.
            - The other classes hide the scrollbar itself.
          */}
          <div className="mt-6 overflow-y-auto max-h-24 pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex items-start space-x-2">
              <p className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[13px]">
                {eventData.subtitle}
              </p>
            </div>
            <p className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[13px] mt-1">
              {eventData.description}
            </p>
          </div>
          {/* Event details section end */}

          {/* HostInfo is now inside the scrollable area */}
          <div className="mt-6">
            <HostInfo host={hostData} />
          </div>

          {/* Buttons are now inside the scrollable area */}
          {/* <div className="flex flex-row gap-3 mt-6">
            <button className="w-full bg-app-button-primary text-app-button-text-color py-3 px-4 rounded-lg transition-colors">
              Pay Now
            </button>
            <button className="w-full bg-app-button-primary text-app-button-text-color py-3 px-4 rounded-lg transition-colors">
              Create Event
            </button>
          </div> */}
           <OtherEvents events={otherEvents} hostName={hostData.name} />
        </div>
      </div>
      <EventPreviewModalExtended
        isOpen={isExtendedPreviewOpen}
        onClose={() => setIsExtentedPreviewOpen(false)}
      />
    </div>
  );
};

export default EventPreviewModal;