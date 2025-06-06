"use client";

import React, { useState, useCallback } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

interface RadixAgeRangeSliderProps {
  label?: string;
  min: number;
  max: number;
  initialValues: [number, number]; // e.g., [18, 28]
  step?: number;
  onValueChange?: (values: [number, number]) => void;
}

const RadixAgeRangeSlider: React.FC<RadixAgeRangeSliderProps> = ({
  label = "",
  min,
  max,
  initialValues,
  step = 1,
  onValueChange,
}) => {
  const [currentValues, setCurrentValues] =
    useState<[number, number]>(initialValues);

  const handleValueChange = (newValues: [number, number]) => {
    setCurrentValues(newValues);
    if (onValueChange) {
      onValueChange(newValues);
    }
  };

  // Helper to calculate percentage for tooltip positioning
  const getPercentage = useCallback(
    (value: number) => {
      return ((value - min) / (max - min)) * 100;
    },
    [min, max]
  );

  const valueBubbleBaseStyle =
    "absolute w-7 h-7 bg-gray-800 text-white text-xs font-bold rounded-full flex items-center justify-center transform -translate-x-1/2 pointer-events-none select-none";
  const valueBubbleTopPosition = "-top-9"; // Adjust for spacing above the track

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-start items-center mb-3">
          <span className="text-base sm:text-lg font-semibold text-gray-800">
            {label}
          </span>
          {/* Optional: Display current range next to label
          <span className="ml-auto text-sm text-gray-600 font-medium">
            {currentValues[0]} - {currentValues[1]}
          </span>
          */}
        </div>
      )}

      <div className="relative pt-8 pb-2">
        {" "}
        {/* pt-8 for tooltip space */}
        {/* Min Value Tooltip */}
        <div
          className={`${valueBubbleBaseStyle} ${valueBubbleTopPosition} z-10`}
          style={{ left: `${getPercentage(currentValues[0])}%` }}
          aria-hidden="true"
        >
          {currentValues[0]}
        </div>
        {/* Max Value Tooltip */}
        <div
          className={`${valueBubbleBaseStyle} ${valueBubbleTopPosition} z-10`}
          style={{ left: `${getPercentage(currentValues[1])}%` }}
          aria-hidden="true"
        >
          {currentValues[1]}
        </div>
        <SliderPrimitive.Root
          className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer mt-[-30px]"
          value={currentValues} // Controlled component
          onValueChange={handleValueChange}
          min={min}
          max={max}
          step={step}
          minStepsBetweenThumbs={1}
          aria-label={label}
        >
          <SliderPrimitive.Track className="bg-gray-200 relative grow rounded-full h-[3px] sm:h-1">
            <SliderPrimitive.Range className="absolute bg-black rounded-full h-full" />
          </SliderPrimitive.Track>

          {/* Thumb for min value */}
          <SliderPrimitive.Thumb
            className="block w-4 h-4 bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
            aria-label={`Minimum ${label.toLowerCase()}`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-[5px] h-[5px] bg-white rounded-full"></div>
            </div>
          </SliderPrimitive.Thumb>

          {/* Thumb for max value */}
          <SliderPrimitive.Thumb
            className="block w-4 h-4 bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
            aria-label={`Maximum ${label.toLowerCase()}`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-[5px] h-[5px] bg-white rounded-full"></div>
            </div>
          </SliderPrimitive.Thumb>
        </SliderPrimitive.Root>
      </div>
    </div>
  );
};

export default RadixAgeRangeSlider;
