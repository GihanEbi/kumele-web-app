"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { BackArrow, RightArrowIcon } from "../../../public/svg-icons/icons";
// props types
type Props = {
  isOpen: boolean;
  onClose: () => void;
};
const SimpleCalendar: React.FC<Props> = ({ isOpen, onClose }) => {
  // To match the image, we need a month where the 22nd is a Tuesday.
  // August 2023 works perfectly for this.
  const exampleDate = new Date(2023, 7, 22); // Month is 0-indexed (7 = August)

  const [date, setDate] = React.useState<Date | undefined>(exampleDate);
  if (!isOpen) {
    return null; // Don't render anything if the modal is not open
  }

  return (
    // This wrapper simulates the dark background from your screenshot
    <div className="rounded-xl">
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-8
                 transition-opacity duration-300 ease-in-out
                 ${isOpen ? "opacity-100" : "opacity-0"}`}
          onClick={onClose}
        >
          <div
            className="w-full max-w-sm text-center rounded-lg bg-app-background-primary p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            <div className="p-4 flex items-center justify-between">
              <p className="text-[15.98px] text-app-text-primary font-plusJakartaSans-400">
                January
              </p>
              <div className="flex items-center gap-2">
                <BackArrow className="text-app-icon" width={15} />
                <RightArrowIcon className="text-app-icon" width={15} />
              </div>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              // This is the key part: we use Tailwind classes to style internal parts
              classNames={{
                // --- HIDE HEADER AND NAVIGATION ---
                caption_label: "hidden", // Hides the "Month Year" text
                nav: "hidden", // Hides the container for navigation buttons

                // --- CUSTOM STYLES TO MATCH THE IMAGE ---

                // Style for the selected day
                day_selected:
                  "bg-zinc-200 text-zinc-900 rounded-md hover:bg-zinc-300 focus:bg-zinc-200",

                // Remove the default blue circle for today's date if it's not selected
                day_today: "bg-transparent text-white",

                // General day styles
                day: "text-zinc-300 h-9 w-9",

                // Style for days outside the current month
                day_outside: "text-zinc-500",

                // Weekday headers (Su, Mo, etc.)
                head_cell: "text-zinc-500 font-normal w-9",
              }}
            />
            <div className="p-4 flex items-center justify-between">
              <p className="text-[15.98px] text-app-text-primary font-plusJakartaSans-400">
                February
              </p>
              <div className="flex items-center gap-2">
                <BackArrow className="text-app-icon" width={15} />
                <RightArrowIcon className="text-app-icon" width={15} />
              </div>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              // This is the key part: we use Tailwind classes to style internal parts
              classNames={{
                // --- HIDE HEADER AND NAVIGATION ---
                caption_label: "hidden", // Hides the "Month Year" text
                nav: "hidden", // Hides the container for navigation buttons

                // --- CUSTOM STYLES TO MATCH THE IMAGE ---

                // Style for the selected day
                day_selected:
                  "bg-zinc-200 text-zinc-900 rounded-md hover:bg-zinc-300 focus:bg-zinc-200",

                // Remove the default blue circle for today's date if it's not selected
                day_today: "bg-transparent text-white",

                // General day styles
                day: "text-zinc-300 h-9 w-9",

                // Style for days outside the current month
                day_outside: "text-zinc-500",

                // Weekday headers (Su, Mo, etc.)
                head_cell: "text-zinc-500 font-normal w-9",
              }}
            />{" "}
            <div className="flex justify-between gap-4 p-4">
              <button
                className="w-full text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
                onClick={() => {onClose()}}
              >
                Cancel
              </button>
              <button
                className="w-full text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
                onClick={() => {}}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SimpleCalendar;
