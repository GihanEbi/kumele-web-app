"use client";

import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import NotificationBadge from "@/components/NotificationCard/NotificationBadge";
import { SpiritualityNotificationIcon } from "../../../../public/svg-icons/icons";
import { get_user_event_by_user_id } from "@/routes/profile";

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
  host_details: user_data;
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

// props types
type ModelProps = {
  isOpen: boolean;
  userId: string | null;
  eventData: event | null;
  onClose: () => void;
};
const MemberModel: React.FC<ModelProps> = ({
  isOpen,
  onClose,
  userId,
  eventData,
}) => {
  // --------- state for loading spinner ---------
  const [loading, setLoading] = useState(false);
  // state for store the fetched user data
  const [userData, setUserData] = useState<profileData | null>(null);

  useEffect(() => {
    console.log("eventData in model:", eventData);
    
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // function to fetch user data
  const fetchUserData = async () => {
    if (!userId) return;
    setLoading(true);

    try {
      const data = await get_user_event_by_user_id(userId);

      if (data.success) {
        setUserData(data.data);
      } else {
        console.error("Failed to fetch host data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching host data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Loading spinner */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-1000 transition-opacity duration-300 ease-in-out"
          onClick={onClose}
        >
          <div
            className={`bg-app-background-model w-full max-w-md p-6 sm:p-8 rounded-t-4xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            <div className="flex flex-col items-center">
              <div className="bg-app-text-blue p-1 rounded-full mb-[8px]">
                <Image
                  src={userData?.profilepicture || "/default-profile.png"}
                  alt="Member Image"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
              <p className="text-[13px] font-plusJakartaSans-400 text-app-text-profile-tabs mb-[20px]">
                {userData?.username}
              </p>
              <h1 className="text-[19px] font-semibold text-app-text-primary font-plusJakartaSans-700">
                {eventData?.event_name}
              </h1>
              <div>
                <NotificationBadge
                  icon={<SpiritualityNotificationIcon />}
                  name={"Spirituality"}
                />
              </div>
              <p className="text-[13px] font-plusJakartaSans-400 text-app-text-profile-tabs mt-[8px]">
                {eventData?.host_details.username}
              </p>
              <p className="text-[13px] font-plusJakartaSans-400 text-app-text-profile-tabs mt-[8px]">
                {eventData
                  ? eventData.home_number + " " + eventData.street_address
                  : ""}
              </p>
              <button
                className="w-full mt-[64px] text-[16px] mb-[12px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
                onClick={() => () => {}}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberModel;
