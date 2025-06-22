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
    <div>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <div className="min-h-screen bg-app-background-primary flex flex-col pt-6 font-plusJakartaSans">
        <div className={`w-full max-w-md px-4 ${paddings.topMargin}`}>
          {/* Header */}
          <header className="sticky top-0 bg-app-background-primary z-10 flex items-center">
            <button
              aria-label="Go back"
              onClick={() => window.history.back()} // Simple back navigation
              className="mr-2" // Added padding for easier click and negative margin to align
            >
              <BackArrow className="text-app-icon" />
            </button>
            <h1 className="text-[23px] font-semibold text-app-text-primary font-plusJakartaSans-700">
              Scan QR
            </h1>
          </header>
        </div>

        <div className="flex flex-col items-center group mt-10">
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
          <NotificationBadge
            icon={<NewSpiritualityNotificationIcon className="text-app-icon" />}
            name={"Spirituality"}
          />

          <div className="flex item-center justify-between px-4 py-4 mt-[16px] bg-app-background-card-secondary rounded-lg">
            <div>
              <GestScanIcon
                className={`${theme === "light" ? "text-black" : "text-white"}`}
              />
            </div>
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
