"use client";

import React from "react";
import {
  ClockIcon,
  UpArrowIcon,
  DownArrowIcon,
} from "../../../public/svg-icons/icons";

// Clock Icon SVG

// Reusable Chevron Up/Down Icon SVG (same as in DatePickerDisplay)
const ChevronUpDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className || "w-5 h-5 text-gray-500"}
  >
    <path
      fillRule="evenodd"
      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.24a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

interface TimePickerDisplayProps {
  label: string; // Label is mandatory here based on the image
  currentTimeDisplay: string;
  onClick?: () => void;
}

const TimePicker: React.FC<TimePickerDisplayProps> = ({
  label,
  currentTimeDisplay = "08:30 PM", // Default value if not provided
  onClick,
}) => {
  const commonInputClasses =
    "w-full flex items-center justify-between px-3 py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors";

  return (
    <div className="w-full">
      {" "}
      {/* Each time picker takes full width of its container */}
      <label className="block text-body mb-1">
        {label}
      </label>
      <button
        type="button"
        className={commonInputClasses}
        onClick={onClick}
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-label={`Selected time for ${label}: ${currentTimeDisplay}. Click to change time.`}
      >
        <div className="flex items-center space-x-2.5">
          <ClockIcon />
          <span className="text-text-caption">
            {currentTimeDisplay}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <UpArrowIcon />
          <DownArrowIcon />
        </div>
      </button>
    </div>
  );
};

export default TimePicker;
