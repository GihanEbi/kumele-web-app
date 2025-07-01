"use client";

import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { paddings } from "@/constants/layout-constants";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import {
  BackArrow,
  GestScanIcon,
  NewSpiritualityNotificationIcon,
  SpiritualityNotificationIcon,
} from "../../../../../public/svg-icons/icons";
import Image from "next/image";
import NotificationBadge from "@/components/NotificationCard/NotificationBadge";

const page = () => {
  //   loading state
  const [loading, setLoading] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  return (
    <div className="overflow-y-auto max-h-screen no-scrollbar">
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <div className="min-h-screen bg-app-background-primary flex flex-col">
        <div className={`w-full max-w-md top-0 left-0 `}>
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
                Scan QR
              </h1>
            </div>
          </header>
        </div>

        <div className="flex flex-col items-center group space-y-1 mt-[130px] px-6 mb-10">
          <p className="text-[16px] font-plusJakartaSans-400 text-center text-app-text-primary">
            Host
          </p>
          <div className="bg-app-input-yellow rounded-full w-[60px] h-[60px] flex items-center justify-center mb-3">
            <Image
              src="/avatar-img/profile-pic.png"
              alt="Profile"
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>
          <p className="text-[19px] font-plusJakartaSans-700 text-center text-app-text-primary">
            Group Meditation
          </p>
          <p className="text-[13px] font-plusJakartaSans-400 text-center text-app-text-primary mt-[9px]">
            Hosted by Ankit Maheshwari
          </p>
          <p className="text-[13px] font-plusJakartaSans-400 text-center text-app-text-primary mt-[9px]">
            Indore, Madhya Pradesh, IN
          </p>
          {/* <NotificationBadge
            icon={<NewSpiritualityNotificationIcon className="text-app-icon" />}
            name={"Spirituality"}
          /> */}

          <div className=" mt-2 inline-flex text-[10px] bg-app-badge-background-qr rounded-full px-2 py-1 items-center space-x-2 text-app-text-secondary font-plusJakartaSans w-auto">
            {<NewSpiritualityNotificationIcon />}
            <div>Spirituality</div>
          </div>

          <div className="flex item-center justify-between px-4 py-2 mt-[16px] bg-app-background-card-secondary rounded-lg">
            {/* <div>
              <GestScanIcon className="text-app-icon mt-4" />
            </div> */}
            <div>
              <p className="text-[16px] font-plusJakartaSans-400 text-center text-app-text-tertiary">
                Scan QR Code
              </p>
            </div>
          </div>

          <div className="mt-[60px]">
            <Image
              src="/images/QR-code.png"
              alt="QR Code"
              width={200}
              height={200}
            />
          </div>
          <p className="text-[16px] font-plusJakartaSans-400 text-center text-app-text-primary mt-1">
            Host QR
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
