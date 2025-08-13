"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { BackToPageIcon } from "../../../public/svg-icons/icons";

// --- Helper Functions ---
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday first
};

const formatDateForInput = (date: Date | null): string => {
  if (!date) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// --- Single Calendar View Component ---
interface SingleCalendarProps {
  date: Date;
  setDate: (date: Date) => void;
  startDate: Date | null;
  endDate: Date | null;
  onDateClick: (date: Date) => void;
}

const SingleCalendar: React.FC<SingleCalendarProps> = ({
  date,
  setDate,
  startDate,
  endDate,
  onDateClick,
}) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const year = date.getFullYear();
  const month = date.getMonth();

  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const yearSelectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        yearSelectorRef.current &&
        !yearSelectorRef.current.contains(event.target as Node)
      ) {
        setIsYearDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePrevMonth = () => setDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setDate(new Date(year, month + 1, 1));

  const handleYearSelect = (newYear: number) => {
    setDate(new Date(newYear, month, 1));
    setIsYearDropdownOpen(false);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  const prevMonthDays = getDaysInMonth(year, month - 1);
  const prevMonthDisplay = Array.from(
    { length: firstDayIndex },
    (_, i) => prevMonthDays - firstDayIndex + i + 1
  );

  const totalDays = firstDayIndex + daysInMonth;
  const nextMonthDisplayCount = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);
  const nextMonthDisplay = Array.from(
    { length: nextMonthDisplayCount },
    (_, i) => i + 1
  );

  const renderDay = (day: number, currentMonthDate: Date) => {
    const fullDate = new Date(
      currentMonthDate.getFullYear(),
      currentMonthDate.getMonth(),
      day
    );
    fullDate.setHours(0, 0, 0, 0);

    const isSelectedStart =
      startDate && fullDate.getTime() === startDate.getTime();
    const isSelectedEnd = endDate && fullDate.getTime() === endDate.getTime();

    const dayClasses = `
        w-[35.21px] h-[29.03px] rounded-[2.67px] flex items-center justify-center font-plusJakartaSans font-normal text-[12.13px]
        hover:bg-gray-100 dark:hover:bg-gray-700/50
        ${
          isSelectedStart || isSelectedEnd
            ? "bg-black text-white dark:bg-white dark:text-black"
            : ""
        }
    `;

    return (
      <button
        key={fullDate.toISOString()}
        onClick={() => onDateClick(fullDate)}
        className={dayClasses}
      >
        {day}
      </button>
    );
  };

  return (
    <div className="p-1">
      <div className="flex justify-between items-center mb-4">
        <span className="font-plusJakartaSans font-bold text-[15.17px]">
          {date.toLocaleString("default", { month: "long" })}
        </span>
        <div className="flex items-center space-x-2">
          <div className="relative" ref={yearSelectorRef}>
            <button
              onClick={() => setIsYearDropdownOpen((prev) => !prev)}
              className="w-[77px] h-[28px] flex items-center space-x-2 px-3 py-1.5 bg-app-input-primary rounded-md font-plusJakartaSans font-normal text-[13px] hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <span>{year}</span>
              <BackToPageIcon className="-rotate-90 w-[25px] h-[25px]" />
            </button>
            {isYearDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-[77px] bg-app-background-primary rounded-md z-20 border border-gray-200 dark:border-gray-700 max-h-48 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => handleYearSelect(y)}
                    className="block w-full text-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center -space-x-1">
            <button
              onClick={handlePrevMonth}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <BackToPageIcon className="w-[18.53px] h-[18.53px]" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <BackToPageIcon className="rotate-180 w-[18.53px] h-[18.53px]" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center text-black dark:text-white font-plusJakartaSans font-normal text-[14px]  text-app-calendar-date mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="w-full">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center text-sm place-items-center">
        {prevMonthDisplay.map((day) => (
          <div
            key={`prev-${day}`}
            className="text-gray-500 dark:text-gray-500 font-plusJakartaSans font-normal text-[12.13px]  w-full h-10 flex justify-center items-center"
          >
            {day}
          </div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => renderDay(i + 1, date))}
        {nextMonthDisplay.map((day) => (
          <div
            key={`next-${day}`}
            className="text-gray-500 dark:text-gray-500 font-plusJakartaSans font-normal text-[12.13px]  w-full h-10 flex justify-center items-center"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Calendar Popup Container ---
interface CalendarPopupProps {
  initialStartDate: Date | null;
  initialEndDate: Date | null;
  onApply: (startDate: Date | null, endDate: Date | null) => void;
  onClose: () => void;
}

const CalendarPopup: React.FC<CalendarPopupProps> = ({
  initialStartDate,
  initialEndDate,
  onApply,
  onClose,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);

  const initialMonth = initialStartDate || new Date();
  const [month1, setMonth1] = useState(
    new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1)
  );
  const [month2, setMonth2] = useState(
    new Date(initialMonth.getFullYear(), initialMonth.getMonth() + 1, 1)
  );

  const handleDateClick = (clickedDate: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (clickedDate >= startDate) {
        setEndDate(clickedDate);
      } else {
        setEndDate(startDate);
        setStartDate(clickedDate);
      }
    }
  };

  return (
    <div className="w-full bg-white dark:bg-black text-gray-800 dark:text-gray-200 rounded-2xl p-4 shadow-lg z-50">
      <div className="flex flex-col">
        <SingleCalendar
          date={month1}
          setDate={setMonth1}
          startDate={startDate}
          endDate={endDate}
          onDateClick={handleDateClick}
        />
        <SingleCalendar
          date={month2}
          setDate={setMonth2}
          startDate={startDate}
          endDate={endDate}
          onDateClick={handleDateClick}
        />
      </div>
      <div className="flex items-center mt-4 pt-4  border-gray-200 dark:border-gray-700 space-x-3 px-2">
        <button
          onClick={onClose}
          className="w-full px-6 py-3 rounded-[8.36px] font-plusJakartaSans font-normal text-[13.66px] bg-black text-white dark:bg-white dark:text-black"
        >
          Cancel
        </button>
        <button
          onClick={() => onApply(startDate, endDate)}
          className="w-full px-6 py-3 rounded-[8.36px] font-plusJakartaSans font-normal text-[13.66px] bg-black text-white dark:bg-white dark:text-black"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

// --- Main Date Picker Input Component ---
interface DateRangePickerProps {
  label?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date(2025, 0, 6)); // Jan 6
  const [endDate, setEndDate] = useState<Date | null>(new Date(2025, 1, 22)); // Feb 22

  const handleApply = (newStart: Date | null, newEnd: Date | null) => {
    setStartDate(newStart);
    setEndDate(newEnd);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const displayValue = useMemo(() => {
    if (startDate && endDate) {
      return `${formatDateForInput(startDate)} - ${formatDateForInput(
        endDate
      )}`;
    }
    return "Select Date Range";
  }, [startDate, endDate]);

  return (
    <>
      <div className="max-w-xs w-full relative font-plusJakartaSans">
        {label && (
          <label className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <button
          type="button"
          className="w-full flex items-center justify-between px-3 py-2 bg-app-input-primary rounded-lg  text-left"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          <div className="flex items-center space-x-2.5">
            <span className="text-black dark:text-white font-plusJakartaSans font-normal text-[13px]">
              {displayValue}
            </span>
          </div>
          <BackToPageIcon className="-rotate-90 w-[20px] h-[20px]" />
        </button>
      </div>

      {/* Modal with Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
          onClick={handleClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-screen-md"
          >
            <CalendarPopup
              initialStartDate={startDate}
              initialEndDate={endDate}
              onApply={handleApply}
              onClose={handleClose}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DateRangePicker;
