"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ClockIcon,
  UpArrowIcon,
  DownArrowIcon,
} from "../../../public/svg-icons/icons";

// Data for the pickers
const hours = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0")
);
const minutes = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0")
);
const periods = ["AM", "PM"];

interface TimePickerDisplayProps {
  label: string;
  currentTimeDisplay?: string;
  onChange?: (time: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const TimePickerWithModal: React.FC<TimePickerDisplayProps> = ({
  label,
  currentTimeDisplay,
  onChange,
  isOpen, setIsOpen
}) => {
  // Function to get the current time, used for initialization
  const getCurrentTime = () => {
    const now = new Date();
    let hour = now.getHours();
    const minute = now.getMinutes();
    const period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
    return {
      hour: String(hour).padStart(2, "0"),
      minute: String(minute).padStart(2, "0"),
      period,
    };
  };

  const initialTime = getCurrentTime();
  //const [isOpen, setIsOpen] = useState(false);
  const [hour, setHour] = useState(initialTime.hour);
  const [minute, setMinute] = useState(initialTime.minute);
  const [period, setPeriod] = useState(initialTime.period);
  const [displayTime, setDisplayTime] = useState(
    currentTimeDisplay ||
      `${initialTime.hour}:${initialTime.minute} ${initialTime.period}`
  );

  // Effect to sync with external changes to currentTimeDisplay prop
  useEffect(() => {
    if (currentTimeDisplay) {
      const [time, ampm] = currentTimeDisplay.split(" ");
      if (time && ampm) {
        const [h, m] = time.split(":");
        setHour(h);
        setMinute(m);
        setPeriod(ampm);
      }
    }
  }, [currentTimeDisplay]);

  // Effect to update the display time and call onChange when the picker values change
  useEffect(() => {
    const newTime = `${hour}:${minute} ${period}`;
    setDisplayTime(newTime);
    onChange?.(newTime);
  }, [hour, minute, period, onChange]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // A reusable component for the scrolling columns (hour, minute, period)
  const TimeScroller = ({
    items,
    value,
    setValue,
    className,
  }: {
    items: string[];
    value: string;
    setValue: (v: string) => void;
    className?: string;
  }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Effect to scroll the initial value to the center
    useEffect(() => {
      const scroller = scrollRef.current;
      if (scroller) {
        const selectedItem = Array.from(scroller.children).find(
          (child) => child.textContent === value
        ) as HTMLElement;
        if (selectedItem) {
          const scrollerHeight = scroller.offsetHeight;
          const itemHeight = selectedItem.offsetHeight;
          // Calculate the scroll position to center the item
          const scrollTop =
            selectedItem.offsetTop - scrollerHeight / 2 + itemHeight / 2;
          scroller.scrollTo({ top: scrollTop, behavior: "auto" });
        }
      }
    }, []); // Run only on initial mount

    return (
      <div
        ref={scrollRef}
        className={`h-[150px] overflow-y-scroll no-scrollbar text-4xl ${className}`}
        style={{ scrollSnapType: "y mandatory" }}
      >
        {/* Top padding to allow first item to be centered */}
        <div className="h-[50px]" />
        {items.map((item) => (
          <div
            key={item}
            onClick={() => setValue(item)}
            className={`model-texts h-12 flex items-center justify-center cursor-pointer scroll-snap-align-center ${
              value === item
                ? "text-app-button-model-text-color font-semibold"
                : "text-gray-500"
            }`}
          >
            {item}
          </div>
        ))}
        {/* Bottom padding to allow last item to be centered */}
        <div className="h-[50px]" />
      </div>
    );
  };

  return (
    <div className="relative w-full">
      <label className="block text-body mb-3 mb-1">{label}</label>
      <button
        type="button"
        className="w-full flex items-center justify-between px-3 py-2.5 bg-app-input-primary  rounded-md"
        onClick={handleToggle}
      >
        <div className="flex items-center space-x-2.5">
          <ClockIcon  />
          <span className="text-sm font-medium text-gray-800">
            {displayTime}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <UpArrowIcon className="w-3 h-3 text-gray-500" />
          <DownArrowIcon className="w-3 h-3 text-gray-500" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-0 bg-app-background-tertiary shadow-lg rounded-xl p-4 w-full max-w-xs">
          <h2 className="model-texts mb-4 text-app-button-model-text-color">Set time</h2>
          <div className="relative flex justify-evenly items-center h-[150px]">
            {/* Highlight bar for the selected time */}
            <div className="absolute top-1/2 left-1 right-1 h-14 -translate-y-1/2 border border-gray-500 rounded-lg pointer-events-none" />

            <TimeScroller
              items={hours}
              value={hour}
              setValue={setHour}
              className="w-20 text-[15px] model-texts"
            />
            <span className="model-texts text-app-button-model-text-color pb-1">:</span>
            <TimeScroller
              items={minutes}
              value={minute}
              setValue={setMinute}
              className="w-20 text-[15px]"
            />
            <div className="h-8 w-px bg-gray-500" />
            <TimeScroller
              items={periods}
              value={period}
              setValue={setPeriod}
              className="w-24 text-[15px] "
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scroll-snap-align-center {
          scroll-snap-align: center;
        }
      `}</style>
    </div>
  );
};

export default TimePickerWithModal;
