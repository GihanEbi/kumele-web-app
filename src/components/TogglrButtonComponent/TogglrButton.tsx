"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

// Define the types for the component's props for clarity and type safety
interface CustomToggleProps {
  /** The current state of the toggle (on or off) */
  checked: boolean;
  /** Callback function that is called when the toggle state changes */
  onCheckedChange: (checked: boolean) => void;
  /** An accessible label for the toggle is required for screen readers */
  "aria-label": string;
  /** Optional className to pass for additional custom styling */
  className?: string;
  /** Optional ID for linking with a <label> element */
  id?: string;
  singleChecked: boolean;
}

/**
 * A custom-styled toggle button component based on your design,
 * built with Radix UI and Tailwind CSS.
 */
const CustomToggle: React.FC<CustomToggleProps> = ({
  checked,
  onCheckedChange,
  className,
  id,
  singleChecked,
  ...props // This captures the 'aria-label' and any other native props
}) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [toggleBgColor, setToggleBgColor] = React.useState<string>("");
  const [toggleThumbColor, setToggleThumbColor] = React.useState<string>("");

  React.useEffect(() => {
    if (!singleChecked) {
      if (theme === "light" && checked) {
        setToggleBgColor("bg-black");
        setToggleThumbColor("bg-gray-500");
      } else if (theme === "light" && !checked) {
        setToggleBgColor("bg-gray-500");
        setToggleThumbColor("bg-black");
      } else if (theme === "dark" && checked) {
        setToggleBgColor("bg-white");
        setToggleThumbColor("bg-gray-500");
      } else if (theme === "dark" && !checked) {
        setToggleBgColor("bg-gray-500");
        setToggleThumbColor("bg-white");
      }
    } else {
      if (!checked) {
        setToggleBgColor("bg-gray-500");
        setToggleThumbColor("bg-black");
      } else {
        setToggleBgColor("bg-white");
        setToggleThumbColor("bg-gray-500");
      }
    }
  }, [theme, checked, systemTheme]);

  return (
    // The Root primitive is the main component. It behaves like a button.
    // We pass the state and event handler props directly to it.
    <SwitchPrimitives.Root
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        // Base styles for the toggle track (the background)
        `peer inline-flex h-[18px] w-[24px] shrink-0 cursor-pointer items-center 
        rounded-full border ${toggleBgColor} transition-colors 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
        focus-visible:ring-offset-2 focus-visible:ring-offset-background 
        disabled:cursor-not-allowed disabled:opacity-50`,

        // Conditional style: when checked, the border turns black
        "data-[state=checked]:border-black",

        // Allows for passing custom classes from the parent
        className
      )}
      {...props}
    >
      {/* The Thumb primitive is the sliding part of the toggle */}
      <SwitchPrimitives.Thumb
        className={cn(
          // Base styles for the thumb (the circle)
          `pointer-events-none block h-[12px] w-[12px] rounded-full shadow-lg ring-0 
          transition-transform`,

          `${
            // Conditional style: when checked, the thumb moves to the right
            checked ? "translate-x-[7px] " : "translate-x-[3px] "
          } ${toggleThumbColor} 
          `
        )}
      />
    </SwitchPrimitives.Root>
  );
};

export default CustomToggle;
