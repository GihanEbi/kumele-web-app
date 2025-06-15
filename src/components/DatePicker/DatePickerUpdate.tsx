"use client";

import React, { useState, useEffect, useRef } from "react";

import {
  CalenderIcon,
  UpArrowIcon,
  DownArrowIcon,
  BackToPageIcon,
} from "../../../public/svg-icons/icons";

interface CalendarProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  setSelectedDate: (date: Date) => void;
  onClose: () => void;
}

interface DatePickerProps {
  label?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CalendarPopup: React.FC<CalendarProps> = ({
  currentDate,
  setCurrentDate,
  setSelectedDate,
  onClose,
}) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(year, month, day));
    onClose();
  };

  return (
    <div className="absolute top-full mt-2 w-full bg-app-background-primary text-app-text-primary rounded-xl p-4 shadow-lg z-10">
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold text-lg">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <div>
          <button
            onClick={handlePrevMonth}
            className="p-1 rounded-full hover:bg-gray-700"
          >
            <BackToPageIcon className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1 rounded-full hover:bg-gray-700"
          >
            <BackToPageIcon className="w-5 h-5 rotate-180" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-xs text-gray-400 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center text-sm">
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={`empty-${i}`}></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, day) => {
          const date = day + 1;
          const isSelected = date === 22;
          return (
            <button
              key={date}
              onClick={() => handleDateClick(date)}
              className={`p-2 rounded-md hover:bg-gray-700 ${
                isSelected ? "bg-white text-black font-bold" : ""
              }`}
            >
              {date}
            </button>
          );
        })}
      </div>
    </div>
  );
};

interface DatePickerProps {
  label?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ label = "Date", isOpen,         // Use the prop
  setIsOpen   }) => {
  // --- CHANGE #3: Add state for managing visibility and selected date ---
  //const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date("2022-04-13"));
  const [calendarDate, setCalendarDate] = useState(new Date("2022-12-01"));

  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  const formattedDate = selectedDate
    .toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(/, /g, ", ");

  const commonInputClasses =
    "w-full flex items-center justify-between px-3 py-2.5 bg-k-primary-color hover:bg-k-primary-color rounded-lg";

  return (
    <div className="max-w-full w-full relative" ref={datePickerRef}>
      {label && <label className="block text-body mb-2">{label}</label>}
      <button
        type="button"
        className={commonInputClasses}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={`Selected date: ${formattedDate}. Click to change date.`}
      >
        <div className="flex items-center space-x-2.5 py-[-2px]">
          <CalenderIcon />

          <span className="text-text-caption">{formattedDate}</span>
        </div>
        <div className="flex flex-col gap-1">
          <UpArrowIcon />
          <DownArrowIcon />
        </div>
      </button>

      {isOpen && (
        <CalendarPopup
          currentDate={calendarDate}
          setCurrentDate={setCalendarDate}
          setSelectedDate={setSelectedDate}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default DatePicker;
