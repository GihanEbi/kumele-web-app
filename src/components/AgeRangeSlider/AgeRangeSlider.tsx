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
    "absolute w-8 h-8  bg-app-range-slider-primary text-app-range-slider-secondary test-text-caption rounded-full flex items-center justify-center transform -translate-x-1/2 pointer-events-none select-none";
  const valueBubbleTopPosition = "-top-10"; // Adjust for spacing above the track

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
          className={`${valueBubbleBaseStyle} ${valueBubbleTopPosition} z-10 ml-2`}
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
          <SliderPrimitive.Track className="bg-app-range-slider-track-active relative grow rounded-full h-[6px] sm:h-1">
            <SliderPrimitive.Range className="absolute bg-app-range-slider-track rounded-full h-full" />
          </SliderPrimitive.Track>

          {/* Thumb for min value */}
          <SliderPrimitive.Thumb
            className="block w-5 h-5 bg-app-range-slider-primary rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
            aria-label={`Minimum ${label.toLowerCase()}`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-[7px] h-[7px] bg-app-range-slider-secondary rounded-full"></div>
            </div>
          </SliderPrimitive.Thumb>

          {/* Thumb for max value */}
          <SliderPrimitive.Thumb
            className="block w-5 h-5 bg-app-range-slider-primary rounded-full  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
            aria-label={`Maximum ${label.toLowerCase()}`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-[7px] h-[7px] bg-app-range-slider-secondary rounded-full"></div>
            </div>
          </SliderPrimitive.Thumb>
        </SliderPrimitive.Root>
      </div>
    </div>
  );
};

export default RadixAgeRangeSlider;
