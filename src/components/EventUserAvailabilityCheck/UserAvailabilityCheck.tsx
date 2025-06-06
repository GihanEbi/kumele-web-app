// components/UserAvailabilityCheck.tsx
"use client";

import React, { useState } from 'react';

interface UserAvailabilityCheckProps {
  onCheckAvailability?: (guests: number) => void;
  initialGuestCount?: number;
}

const UserAvailabilityCheck: React.FC<UserAvailabilityCheckProps> = ({
  onCheckAvailability,
  initialGuestCount = 100, // Default value based on the image
}) => {
  const [guestCount, setGuestCount] = useState<number | string>(initialGuestCount);

  const handleGuestCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string for clearing, or numbers
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setGuestCount(value === '' ? '' : parseInt(value, 10));
    }
  };

  const handleCheckClick = () => {
    if (onCheckAvailability) {
      const count = typeof guestCount === 'string' && guestCount === '' ? 0 : Number(guestCount);
      onCheckAvailability(count);
    }
    // You might want to add actual API call logic here
    console.log("Checking availability for guests:", guestCount);
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-stretch space-x-2 sm:space-x-3">
        <button
          onClick={handleCheckClick}
          className="flex-grow bg-black text-white text-text-caption px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Check User Availability
        </button>
        <input
          type="text" 
          value={guestCount}
          onChange={handleGuestCountChange}
          className="w-20 sm:w-24 bg-gray-100 text-gray-900 text-sm sm:text-base font-medium text-center px-3 py-3 border-2 border-red-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-500 placeholder-gray-500"
          placeholder="No."
          aria-label="Number of guests"
        />
      </div>
      <div className="text-paragraph text-[13px] space-y-[0px]">
        <p>
          <span className="text-red-500 font-semibold">*</span>To use this,
          please add your address and number of guest.
        </p>
        <p>
          Disclaimer: we cannot guarantee 100% matches due to certain factors
          beyond our control.
        </p>
      </div>
    </div>
  );
};

export default UserAvailabilityCheck;