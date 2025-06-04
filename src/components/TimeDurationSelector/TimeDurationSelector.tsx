"use client";
import React, { useState } from "react";
import { BuyIcon } from "../../../public/svg-icons/icons";

// Define the possible time options
const TIME_OPTIONS = ["24 Hrs", "48 Hrs", "7 Days"] as const; // Use 'as const' for stricter typing
type TimeOption = (typeof TIME_OPTIONS)[number];

const TimeDurationSelector: React.FC = () => {
  const [currentTimeIndex, setCurrentTimeIndex] = useState<number>(0); // Start with "24 Hrs"

  const currentTime: TimeOption = TIME_OPTIONS[currentTimeIndex];
  const isBlueSectionVisible = currentTime !== "24 Hrs";

  const handleIncrement = () => {
    if (currentTimeIndex < TIME_OPTIONS.length - 1) {
      setCurrentTimeIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleDecrement = () => {
    if (currentTimeIndex > 0) {
      setCurrentTimeIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="flex items-center p-1  max-w-xs">
      {/* Time Display Section */}
      <div
        className={`bg-black text-white text-text-caption px-3 py-2.5 ${
          isBlueSectionVisible ? "rounded-l-lg" : "rounded-lg"
        } min-w-[70px] text-center`}
      >
        {currentTime}
      </div>

      {/* Blue Cart Section (Conditional) */}
      {isBlueSectionVisible && (
        <div className="bg-blue-600 py-2 rounded-r-lg px-6">
          <BuyIcon />
        </div>
      )}

      {/* Increment/Decrement Section */}
      <div className="bg-white px-3 gap-6 py-1.5 border rounded-lg flex items-center justify-between min-w-[60px] ml-4">
        <button
          onClick={handleDecrement}
          disabled={currentTimeIndex === 0}
          className="text-gray-600 hover:text-gray-800 disabled:opacity-40 disabled:cursor-not-allowed text-xl font-semibold"
          aria-label="Decrease time"
        >
          -
        </button>
        <button
          onClick={handleIncrement}
          disabled={currentTimeIndex === TIME_OPTIONS.length - 1}
          className="text-gray-600 hover:text-gray-800 disabled:opacity-40 disabled:cursor-not-allowed text-xl font-semibold"
          aria-label="Increase time"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default TimeDurationSelector;
