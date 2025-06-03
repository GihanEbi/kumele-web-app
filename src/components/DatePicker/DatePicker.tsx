"use client";
import React from "react";
import {
  CalenderIcon,
  UpArrowIcon,
  DownArrowIcon,
} from "../../../public/svg-icons/icons";

// Calendar Icon SVG
const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className || "w-5 h-5 text-gray-600"}
  >
    <path
      fillRule="evenodd"
      d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c0-.69.56-1.25 1.25-1.25H14c.69 0 1.25.56 1.25 1.25v6.5c0 .69-.56 1.25-1.25 1.25H6c-.69 0-1.25-.56-1.25-1.25v-6.5zm1.75-.75a.75.75 0 00-1.5 0v.25H4.5a.75.75 0 000 1.5h.75V9H4.5a.75.75 0 000 1.5h.75v.75H4.5a.75.75 0 000 1.5h.75v.75H4.5a.75.75 0 000 1.5h.75V15H4.5a.75.75 0 000 1.5h.75V16a.75.75 0 001.5 0v-.25h8.5v.25a.75.75 0 001.5 0v-.75h.75a.75.75 0 000-1.5h-.75V12h.75a.75.75 0 000-1.5h-.75V10h.75a.75.75 0 000-1.5h-.75V7.75h.75a.75.75 0 000-1.5h-.75V6H6.5V4.75z"
      clipRule="evenodd"
    />
  </svg>
);

// Chevron Up/Down Icon SVG (Selector Icon)
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

interface DatePickerDisplayProps {
  label?: string;
  currentDateDisplay: string;
  onClick?: () => void;
}

const DatePicker: React.FC<DatePickerDisplayProps> = ({
  label = "Date",
  currentDateDisplay = "Wednesday, 13th April, 2022",
  onClick,
}) => {
  const commonInputClasses =
    "w-full flex items-center justify-between px-3 py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors";

  return (
    <div className="max-w-full w-full">
      {" "}
      {/* Adjust max-w-xs as needed */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <button
        type="button"
        className={commonInputClasses}
        onClick={onClick}
        aria-haspopup="dialog" // If it opens a dialog-like calendar
        aria-expanded="false" // This would be managed by state if interactive
        aria-label={`Selected date: ${currentDateDisplay}. Click to change date.`}
      >
        <div className="flex items-center space-x-2.5">
          <CalenderIcon />
          <span className="text-sm text-gray-800 font-medium">
            {currentDateDisplay}
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

export default DatePicker;
