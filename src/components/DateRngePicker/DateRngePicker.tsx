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
import  SimpleCalendar  from "../CustomeCalender/CustomeCalender";

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
          {/* <SimpleCalendar /> */}

          <div className="flex justify-between gap-4 p-4">
            <button
              className="w-full text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
              onClick={() => {}}
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
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerRangeVertical;
