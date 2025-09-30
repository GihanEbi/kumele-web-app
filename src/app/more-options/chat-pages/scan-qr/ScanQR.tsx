"use client";

import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { paddings } from "@/constants/layout-constants";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  BackArrow,
  GestScanIcon,
  NewSpiritualityNotificationIcon,
  SpiritualityNotificationIcon,
} from "../../../../../public/svg-icons/icons";
import Image from "next/image";
import NotificationBadge from "@/components/NotificationCard/NotificationBadge";
import { useSearchParams } from "next/navigation";
import { get_event_by_event_id } from "@/routes/Events";
import { get_user_event_by_user_id } from "@/routes/profile";
import HobbyTagIcon from "@/components/HobbyTagIcon/HobbyTagIcon";

type user_data = {
  id: string;
  username: string;
  profilePicture: string;
};

type event = {
  id: string;
  price: string;
  state: string;
  user_id: string;
  district: string;
  subtitle: string;
  event_date: string;
  event_name: string;
  max_guests: string;
  category_id: string;
  description: string;
  home_number: string;
  payment_type: string;
  age_range_max: string;
  age_range_min: string;
  event_end_time: string;
  event_start_time: string;
  street_address: string;
  event_image_url: string;
  postal_zip_code: string;
  host: user_data;
  participants: user_data[];
};

interface profileData {
  id: string;
  username: string;
  fullname: string;
  email: string;
  gender: string;
  language: string;
  dateofbirth: string;
  referralcode: string;
  abovelegalage: boolean;
  termsandconditionsaccepted: boolean;
  subscribedtonewsletter: boolean;
  profilepicture: string;
  about_me: string;
  to_tp_secret: string;
  is_2fa_enabled: boolean;
  my_referral_code: string;
  qr_code_url: string;
}

const ScanQR = () => {
  //   loading state
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  // state for store the chat data
  const [eventData, setEventData] = useState<event | null>(null);
  const [hostData, setHostData] = useState<profileData | null>(null);

  useEffect(() => {
    fetchEventData();
    fetchHostData();
  }, []);

  // function to fetch event data
  const fetchEventData = async () => {
    setLoading(true);

    try {
      if (searchParams) {
        const data = await get_event_by_event_id(
          searchParams!.get("event_id")!
        ); // Non-null assertion since we check above

        if (data.success) {
          console.log("Fetched event data successfully:", data.data);
          setEventData(data.data);
        } else {
          console.error("Failed to fetch event data:", data.message);
        }
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
    } finally {
      setLoading(false);
    }
  };

  //   function to get host data

  // function to fetch event data
  const fetchHostData = async () => {
    setLoading(true);

    try {
      if (searchParams) {
        const data = await get_user_event_by_user_id(
          searchParams!.get("host_id")!
        ); // Non-null assertion since we check above

        if (data.success) {
          console.log("Fetched host data successfully:", data.data);
          setHostData(data.data);
        } else {
          console.error("Failed to fetch host data:", data.message);
        }
      }
    } catch (error) {
      console.error("Error fetching host data:", error);
    } finally {
      setLoading(false);
    }
  };

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
            Guest
          </p>
          {hostData && (
            <div className="bg-app-input-yellow rounded-full w-[60px] h-[60px] flex items-center justify-center mb-3">
              <Image
                src={`${hostData?.profilepicture}`}
                alt="Profile"
                width={60}
                height={60}
                className="rounded-full"
              />
            </div>
          )}
          <p className="text-[19px] font-plusJakartaSans-700 text-center text-app-text-primary">
            {eventData?.event_name}
          </p>
          <p className="text-[13px] font-plusJakartaSans-400 text-center text-app-text-primary mt-[9px]">
            Hosted by {hostData?.username}
          </p>
          <p className="text-[13px] font-plusJakartaSans-400 text-center text-app-text-primary mt-[9px]">
            {eventData
              ? eventData.home_number + " " + eventData.street_address
              : ""}
            , IN
          </p>
          {/* <NotificationBadge
            icon={<NewSpiritualityNotificationIcon className="text-app-icon" />}
            name={"Spirituality"}
          /> */}

          {eventData && (
            <div className=" mt-2 inline-flex text-[10px] bg-app-badge-background-qr rounded-full px-2 py-1 items-center space-x-2 text-app-text-secondary font-plusJakartaSans w-auto">
              {<NewSpiritualityNotificationIcon />}
              <div>Spirituality</div>
            </div>
          )}

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

          {hostData && (
            <div className="mt-[60px]">
              <Image
                src={`${hostData?.qr_code_url}`}
                alt="QR Code"
                width={200}
                height={200}
              />
            </div>
          )}
          <p className="text-[16px] font-plusJakartaSans-400 text-center text-app-text-primary mt-1">
            Guest QR
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScanQR;
