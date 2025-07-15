// src/components/ui/date-range-picker.tsx

"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DownArrow } from "../../../public/svg-icons/icons";

// Define the props for the component, including an optional className
interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  // The selected date range
  date?: DateRange;
  // Callback function when the date range is applied
  onDateChange: (date: DateRange | undefined) => void;
}

export function DateRangePicker({
  className,
  date: initialDate,
  onDateChange,
}: DateRangePickerProps) {
  // State for the popover open/closed status
  const [isOpen, setIsOpen] = React.useState(false);

  // Local state to manage the date selection within the popover
  // It's initialized with the prop value
  const [date, setDate] = React.useState<DateRange | undefined>(initialDate);

  // When the popover opens, reset the local date state to the prop's value
  React.useEffect(() => {
    if (isOpen) {
      setDate(initialDate);
    }
  }, [isOpen, initialDate]);

  const handleCancel = () => {
    // Reset date to the initial state and close
    setDate(initialDate);
    setIsOpen(false);
  };

  const handleApply = () => {
    // Pass the selected date range to the parent component and close
    onDateChange(date);
    setIsOpen(false);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "text-left text-[14.23px] rounded-sm py-2 px-2 bg-app-input-primary flex items-center justify-between",
              !date && "text-muted-foreground"
            )}
          >
            {initialDate?.from ? (
              initialDate.to ? (
                <>
                  {format(initialDate.from, "LLL dd")} -{" "}
                  {format(initialDate.to, "LLL dd")}
                </>
              ) : (
                format(initialDate.from, "LLL dd")
              )
            ) : (
              <span>Pick a date range</span>
            )}
            <DownArrow className="text-app-icon w-4 h-4 ml-3" />
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-app-background-primary "
          align="center"
        >
          {/* We add a flex container to stack the calendars vertically */}
          <div className="flex flex-col">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </div>
          {/* Action buttons at the bottom */}
          <div className="flex justify-end gap-2 p-4 border-t border-gray-800">
            <Button variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleApply}>Apply</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
