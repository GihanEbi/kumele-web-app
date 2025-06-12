"use client";
import React from "react";
import {
  CalenderIcon,
  UpArrowIcon,
  DownArrowIcon,
} from "../../../public/svg-icons/icons";

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
    "w-full flex items-center justify-between px-3 py-2.5 bg-k-primary-color hover:bg-k-primary-color rounded-lg";

  return (
    <div className="max-w-full w-full">
      {" "}
      {/* Adjust max-w-xs as needed */}
      {label && <label className="block text-body mb-2">{label}</label>}
      <button
        type="button"
        className={commonInputClasses}
        onClick={onClick}
        aria-haspopup="dialog" // If it opens a dialog-like calendar
        aria-expanded="false" // This would be managed by state if interactive
        aria-label={`Selected date: ${currentDateDisplay}. Click to change date.`}
      >
        <div className="flex items-center space-x-2.5 py-[-2px]">
          <CalenderIcon />
          <span className="text-text-caption">{currentDateDisplay}</span>
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
