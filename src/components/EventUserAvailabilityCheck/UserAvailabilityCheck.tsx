// components/UserAvailabilityCheck.tsx
"use client";

import { check_user_availability } from "@/routes/Events";
import axios from "axios";
import React, { useState } from "react";

interface UserAvailabilityCheckProps {
  onCheckAvailability: (isAvailable: boolean) => void;
  initialGuestCount?: number;
  street_address?: string;
  home_number?: string;
  district?: string;
  postal_zip_code?: string;
  state?: string;
}

const UserAvailabilityCheck: React.FC<UserAvailabilityCheckProps> = ({
  onCheckAvailability,
  initialGuestCount = 100, // Default value based on the image
  street_address,
  home_number,
  district,
  postal_zip_code,
  state,
}) => {
  const [guestCount, setGuestCount] = useState<number | string>(
    initialGuestCount
  );

  const handleGuestCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string for clearing, or numbers
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setGuestCount(value === "" ? "" : parseInt(value, 10));
    }
  };

  const handleCheckClick = async () => {
    let data = await handleCheckAvailability();
    console.log(guestCount);

    if(guestCount > data?.data){
      onCheckAvailability(false)
    }else{
      onCheckAvailability(true)
    }
    
  };

  // check user availability
  const handleCheckAvailability = async () => {
    // first check street , home number , district , postal code , state are filled
    if (
      !street_address ||
      !home_number ||
      !district ||
      !postal_zip_code ||
      !state
    ) {
      return;
    }

    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        `${home_number} ${street_address}, ${district}, ${postal_zip_code}, ${state}`
      )}&format=json&limit=1`;

      const { data } = await axios.get(url, {
        headers: { "User-Agent": "MyApp/1.0" },
      });

      if (data.length === 0) throw new Error("Address not found");

      const dataObj = {
        longitude: data[0].lon,
        latitude: data[0].lat,
      };
      let checkAccess = await check_user_availability(dataObj);
      

      return checkAccess;
      // You can now use lat and lon for further processing, like checking user availability
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-stretch space-x-2 sm:space-x-3">
        <button
          onClick={handleCheckClick}
          className="flex-grow bg-app-button-primary text-app-button-text-color font-plusJakartaSans font-normal text-[14.57px]  px-4 py-3 rounded-xl"
        >
          Check User Availability
        </button>
        <input
          type="text"
          value={guestCount}
          onChange={handleGuestCountChange}
          className="w-20 sm:w-24 bg-app-input-primary text-app-text-primary text-sm sm:text-base font-medium text-center px-3 py-3 border-2 rounded-xl focus:outline-none placeholder-white-500"
          placeholder="No."
          aria-label="Number of guests"
        />
      </div>
      <div className="text-paragraph text-[13px] space-y-[0px]">
        <p className="font-plusJakartaSans font-normal text-[10px]">
          <span className="text-red-500 font-semibold">*</span>To use this,
          please add your address and number of guest.
        </p>
        <p className="font-plusJakartaSans font-normal text-[10px]">
          Disclaimer: we cannot guarantee 100% matches due to certain factors
          beyond our control.
        </p>
      </div>
    </div>
  );
};

export default UserAvailabilityCheck;
