"use client";

import React, { useState } from "react";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  BackArrow,
  GestScanIcon,
  LocationIcon,
  TwoTicketsIcon,
} from "../../../../../public/svg-icons/icons";
import InboxMessageCard from "@/components/InboxMessageCard/InboxMessageCard";
import SentMessageCard from "@/components/SentMessageCard/SentMessageCard";
import ChatInput from "@/components/ChatInput/ChatInput";
import { useRouter } from "next/navigation";
// mock data for avatars
// should be replaced with actual user data
const profilePics = [
  {
    name: "James",
    src: "/avatar-img/avatar-1.jpg",
    borderColor: "border-yellow-400",
  },
  {
    name: "Jermy",
    src: "/avatar-img/avatar-2.jpg",
    borderColor: "border-blue-500",
  },
  {
    name: "Linda",
    src: "/avatar-img/avatar-3.png",
    borderColor: "border-blue-500",
  },
  {
    name: "Olivia",
    src: "/avatar-img/avatar-4.jpg",
    borderColor: "border-blue-500",
  },
];

const page = () => {
  //   loading state
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <div className="overflow-y-auto max-h-screen no-scrollbar">
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <div className=" min-h-screen bg-app-background-primary flex flex-col">
        <div className="w-full max-w-md top-0 left-0 right-0 ">
          {/* Header */}
          <header className="z-100 px-4 fixed w-full pt-[64px] bg-app-background-primary flex justify-between items-center mb-10">
            <div className="flex items-center w-full">
              <button
                aria-label="Go back"
                onClick={() => window.history.back()} // Simple back navigation
                className="mr-2 mt-4" // Added padding for easier click and negative margin to align
              >
                <BackArrow className="text-app-icon" />
              </button>
              <h1 className="mt-4 text-[23px] font-semibold text-app-text-primary font-plusJakartaSans-700">
                Group Meditation
              </h1>
            </div>
            <div
              className="mr-10"
              onClick={() => {
                router.push("/more-options/chat-pages/scan-qr");
                console.log("Scan QR clicked");
              }}
            >
              <GestScanIcon className="text-app-icon mt-4" />
            </div>
          </header>
        </div>
        <div className="space-y-1 mt-[130px] px-6">
          <p className="text-[13px] text-app-text-profile-tabs font-plusJakartaSans-400">
            10 Guests
          </p>
          <div className="w-full">
            <div className="flex">
              {profilePics.slice(0, 4).map((pic, index) => (
                <div
                  key={pic.name}
                  className="flex flex-col items-center mx-[-6px]"
                >
                  <div
                    className={`relative w-[31px] h-[31px] rounded-full ${pic.borderColor} border-2 overflow-hidden`}
                    style={{ zIndex: 4 - 1 - index }}
                  >
                    <Image
                      src={pic.src}
                      alt={pic.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                </div>
              ))}
              <div className="flex flex-col items-center ml-[-6px]">
                <div className="bg-app-background-card-secondary text-app-text-tertiary text-[14px] px-3 rounded-full font-plusJakartaSans-700 flex items-center h-7">
                  10 Guests
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-[10px ] items-center gap-1">
            <TwoTicketsIcon className="text-app-icon" width={17} height={17} />
            <p className="text-[13px] text-app-text-profile-tabs font-plusJakartaSans-400">
              Price: Cash on entry 20 USD
            </p>
          </div>
          <div className="flex mt-[10px ] items-center gap-1">
            <LocationIcon className="text-app-icon" width={17} height={17} />
            <p className="text-[13px] text-app-text-profile-tabs font-plusJakartaSans-400">
              Event Address: United Kingdom, 39495, kentucky
            </p>
          </div>
        </div>
        <div className="my-2">
          <Separator className="bg-app-text-secondary p-0.4" />
        </div>

        {/* chat section */}
        <div className="space-y-1 mt-[10px] px-6 mb-25">
          <p className="text-[13px] text-center text-app-text-profile-tabs font-plusJakartaSans-400">
            Today
          </p>
          <div>
            <InboxMessageCard
              img="/avatar-img/avatar-1.jpg"
              name="Alkesh Kumar"
              date="23 August 2022"
              message="Welcome to my event"
            />
          </div>
          <div className="flex justify-end mt-10">
            <SentMessageCard
              img="/avatar-img/avatar-4.jpg"
              name="Josh Durrant"
              date="23 August 2022"
              message="lorem ipsum dolor sit amet, consectetur adipiscing elit."
              receiver="Alkesh Kumar"
            />
          </div>
          <div className="mt-10">
            <InboxMessageCard
              img="/avatar-img/avatar-1.jpg"
              name="Alkesh Kumar"
              date="23 August 2022"
              message="Welcome to my event"
            />
          </div>
          <div className="flex justify-end mt-10">
            <SentMessageCard
              img="/avatar-img/avatar-4.jpg"
              name="Josh Durrant"
              date="23 August 2022"
              message="lorem ipsum dolor sit amet, consectetur adipiscing elit."
              receiver="Alkesh Kumar"
            />
          </div>
        </div>

        <div className="w-full max-w-md px-5 fixed bottom-0 left-0 pb-10 bg-app-background-primary">
          <div className="z-200 w-full">
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
