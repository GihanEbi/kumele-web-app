// src/components/your-components/DatePickerRangeVertical.tsx

"use client";

import * as React from "react";
import { addMonths, format, subMonths } from "date-fns";
import { DateRange } from "react-day-picker";

// Your custom SVG icons
import {
  BackArrow,
  DownArrowIcon,
  RightArrowIcon,
} from "../../../public/svg-icons/icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type props = {
  isOpens: Function;
};

const DatePickerRangeVertical: React.FC<props> = ({ isOpens }) => {
  const [committedDate, setCommittedDate] = React.useState<
    DateRange | undefined
  >({
    from: new Date(2025, 5, 12),
    to: addMonths(new Date(2025, 5, 12), 1),
  });
  const [tempDate, setTempDate] = React.useState<DateRange | undefined>(
    committedDate
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date>(
    committedDate?.from || new Date()
  );

  const handleCancel = () => {
    setTempDate(committedDate);
    setIsOpen(false);
  };

  const handleApply = () => {
    setCommittedDate(tempDate);
    setIsOpen(false);
  };

  React.useEffect(() => {
    isOpens(isOpen);
    if (isOpen) {
      setTempDate(committedDate);
      setMonth(committedDate?.from || new Date());
    }
  }, [isOpen, committedDate]);

  // These functions will now be used by your custom buttons
  const handlePreviousMonth = () => {
    setMonth(subMonths(month, 1));
  };

  const handleNextMonth = () => {
    setMonth(addMonths(month, 1));
  };

  return (
    <div className="grid gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild className="rounded-md">
          <div className="flex items-center gap-2">
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !committedDate && "text-muted-foreground"
              )}
            >
              {committedDate?.from ? (
                committedDate.to ? (
                  <>
                    {format(committedDate.from, "LLL dd")} -{" "}
                    {format(committedDate.to, "LLL dd")}
                  </>
                ) : (
                  format(committedDate.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
              <DownArrowIcon />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-app-background-primary"
          align="start"
        >
          {/* ---- MODIFIED SECTION ---- */}
          {/* This is your custom header. We'll make the arrows functional. */}
          <div className="flex items-center justify-between p-4 pb-2">
            <div className="text-sm font-medium">
              {format(month, "MMMM yyyy")}
            </div>
            <div className="flex items-center gap-1">
              {/* Use Button components for accessibility and add onClick handlers */}
              <BackArrow className="h-4 w-4" />
              {/* <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
                <span className="sr-only">Go to previous month</span>
              </Button>
              <Button variant="outline" size="icon" onClick={handleNextMonth}>
                <span className="sr-only">Go to next month</span>
              </Button> */}
              <RightArrowIcon className="h-4 w-4" />
            </div>
          </div>
          {/* ---- END MODIFIED SECTION ---- */}

          <Calendar
            initialFocus
            mode="range"
            // selected={tempDate}
            // onSelect={setTempDate}
            numberOfMonths={2}
            className="flex-col-calendar"
            month={month}
            onMonthChange={setMonth}
            // --- THE KEY CHANGE ---
            // This prop hides the default arrows and titles inside the calendar
            hideNavigation
            // --- END KEY CHANGE ---
            classNames={{
              months: "pt-0",
              month: "p-0 pt-2",
            }}
          />

          <div className="flex justify-between gap-2 p-4">
            <Button onClick={handleApply}>Cancel</Button>
            <Button onClick={handleApply}>Apply</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerRangeVertical;
