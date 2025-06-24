"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  DollarIcon,
  UsersIcon,
  ClockIcon,
  YingyangIcon,
  Copy2Icon,
  CloseIcon,
} from "../../../../public/svg-icons/icons";

// --- Data structure for the event ---
interface EventDetails {
  imageSrc: string;
  category: string;
  title: string;
  price: string;
  time: string;
  guests: number;
  eventId: string;
  location: string;
}

const mockEvent: EventDetails = {
  imageSrc: "/bg-imgs/preview-event.jpg", // Replace with your actual image path
  category: "Spirituality",
  title: "Group meditation",
  price: "Free",
  time: "7:45-9:30",
  guests: 12,
  eventId: "20242206B",
  location: "Indore, Madhya Pradesh, IN",
};

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);
  const event = mockEvent;

  const handleCopy = () => {
    navigator.clipboard.writeText(event.eventId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); 
  };

  // If the modal is not open, render nothing.
  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 " onClick={onClose} />

      {/* Modal Content (The Bottom Sheet) */}
      <div className="fixed bottom-0 left-0 right-0  bg-white dark:bg-black rounded-t-2xl shadow-2xl max-w-md mx-auto z-50">
        <div className="p-4 max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[16px]">
              Limited Invites.
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full  hover:bg-zinc-100 dark:hover:bg-zinc-700"
              aria-label="Close"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Event Image */}
          <div className="relative mb-4">
            <Image
              src={event.imageSrc}
              alt={event.title}
              width={500}
              height={250}
              className="w-full h-30 object-cover rounded-t-xl"
            />
            <div className="absolute top-2 right-2 bg-black/70 text-white px-3 py-1.5 rounded-full flex items-center space-x-2 text-sm">
              <YingyangIcon className="h-4 w-4" />
              <span className="font-plusJakartaSans text-white font-normal text-[13px]">
                {event.category}
              </span>
            </div>
          </div>

          {/* Event Details Box */}
          <div className="text-left p-4 bg-zinc-100 dark:bg-app-blog-selected-tabs-text rounded-xs mb-2 space-y-0">
            <h3 className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[16px]">
              {event.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <div className="flex items-center gap-1.5">
                <DollarIcon className="h-[20px] w-[20px]" />
                <p className="font-plusJakartaSans text-blue-700 dark:text-app-text-yellow font-normal text-[14px]">
                  {event.price}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <ClockIcon className="h-[20px] w-[20px]" />
                <p className="font-plusJakartaSans text-blue-700 dark:text-app-text-yellow font-normal text-[14px]">
                  {event.time}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <UsersIcon className="h-[20px] w-[20px]" />
                <p className="font-plusJakartaSans text-blue-700 dark:text-app-text-yellow font-normal text-[14px]">
                  {event.guests} guests
                </p>
              </div>
            </div>
            <div className=" pt-1">
              <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[14px]">
                Event ID:{" "}
              </span>
              <span className="font-plusJakartaSans text-blue-700 dark:text-app-text-yellow font-normal text-[14px]">
                {event.eventId}
              </span>
            </div>
            <div className="">
              <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[14px]">
                Location:{" "}
              </span>
              <span className="font-plusJakartaSans text-blue-700 dark:text-app-text-yellow font-normal text-[14px]">
                {event.location}
              </span>
            </div>
          </div>

          {/* How it Works Box */}
          <div className="text-left p-4 bg-zinc-100 dark:bg-app-blog-selected-tabs-text rounded-xs mb-6">
            <h4 className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[16px] mb-2 ">
              How it works:
            </h4>
            <ol className="list-decimal list-inside text-sm text-zinc-600 dark:text-zinc-300 space-y-0">
              <li>
                <span className="font-plusJakartaSans text-blue-700 dark:text-app-text-yellow font-bold text-[14px]">
                  Login
                </span>{" "}
                or{" "}
                <span className="font-plusJakartaSans text-blue-700 dark:text-app-text-yellow font-bold text-[14px]">
                  Signup
                </span>
                .
              </li>
              <li className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[14px]">
                Copy the event code.
              </li>
              <li className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[14px]">
                Search the event and join. It's that easy.
              </li>
            </ol>
          </div>

          {/* Invite Section */}
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-plusJakartaSans text-app-button-model-text-color font-medium text-[16px]">
                Invite your friends and family
              </h4>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 mt-1 text-sm text-zinc-600 dark:text-zinc-400"
              >
                <Copy2Icon className="h-5 w-5" />

                {isCopied ? (
                  <span className="font-plusJakartaSans text-green-600 dark:text-green-500 font-medium text-[11px]">
                    Copied!
                  </span>
                ) : (
                  <div className="flex flex-col text-left leading-tight">
                    <span className="font-plusJakartaSans text-app-button-model-text-color font-medium text-[11px]">
                      Copy to
                    </span>
                    <span className="font-plusJakartaSans text-app-button-model-text-color font-medium text-[11px]">
                      clipboard
                    </span>
                  </div>
                )}
              </button>
            </div>
            <Image src="/images/logo.png" alt="logo" width={50} height={44} />
          </div>

          {/* bottom bar space */}
          <div className="h-6"></div>
        </div>
      </div>
    </>
  );
};

export default InviteModal;
