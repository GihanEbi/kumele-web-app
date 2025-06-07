// components/GuestCounter.tsx
"use client";

import React, { useState, useRef, KeyboardEvent, ChangeEvent } from "react";
//import { InfoIcon, TicketIcon, ShoppingCartIconSolid } from './icons'; // Adjust path if needed
import {
  TwoTicketsIcon,
  BuyIcon,
} from "../../../../../../public/svg-icons/icons";

interface GuestCounterProps {
  label?: string;
  initialGuests?: number; // Number between 0 and 99
  onAddToCart?: (guests: number) => void;
}

const GuestCounter: React.FC<GuestCounterProps> = ({
  initialGuests = 1,
  onAddToCart,
}) => {
  const [digit1, setDigit1] = useState<string>(
    initialGuests >= 10
      ? Math.floor(initialGuests / 10).toString()
      : initialGuests > 0
      ? initialGuests.toString()
      : ""
  );
  const [digit2, setDigit2] = useState<string>(
    initialGuests >= 10
      ? (initialGuests % 10).toString()
      : initialGuests > 0 && initialGuests < 10
      ? ""
      : ""
  );

  const input1Ref = useRef<HTMLInputElement>(null!);
  const input2Ref = useRef<HTMLInputElement>(null!);

  const parseGuests = () => {
    const d1 = digit1 === "" ? "0" : digit1; // Treat empty as 0 for parsing if needed
    const d2 = digit2 === "" ? (digit1 === "" ? "" : "0") : digit2; // If d1 is empty, d2 should also be empty or treated as 0

    if (digit1 === "" && digit2 === "") return 0; // Or handle as invalid based on your needs
    if (digit1 !== "" && digit2 === "") return parseInt(d1, 10); // Single digit case

    return parseInt(d1 + d2, 10);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    digitSetter: React.Dispatch<React.SetStateAction<string>>,
    nextInputRef?: React.RefObject<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      // Allow empty or single digit
      digitSetter(value);
      if (value && nextInputRef?.current) {
        nextInputRef.current.focus();
        nextInputRef.current.select();
      }
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    prevInputRef?: React.RefObject<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      e.currentTarget.value === "" &&
      prevInputRef?.current
    ) {
      prevInputRef.current.focus();
    }
  };

  const handleAddToCartClick = () => {
    const guests = parseGuests();
    if (onAddToCart) {
      onAddToCart(guests);
    }
    console.log("Adding to cart, guests:", guests);
  };

  return (
    <div className="w-full max-w-xs">
      {" "}
      {/* Adjust max-w as needed */}
      <div className="flex items-stretch">
        {/* Left section with icon and input */}
        <div className="flex items-center bg-app-input-primary pl-3 pr-2 py-2 rounded-l-lg border border-r-0  gap-3">
          <TwoTicketsIcon />
          <div className="flex items-center border gap-3 rounded-lg">
            <input
              ref={input1Ref}
              type="text"
              maxLength={1}
              value={digit1}
              onChange={(e) => handleInputChange(e, setDigit1, input2Ref)}
              onKeyDown={(e) => handleKeyDown(e)}
              className="w-5 h-7 text-center text-app-text-secondary bg-transparent focus:outline-none appearance-none pl-2"
              aria-label="First digit of guest count"
            />
            <span className="text-gray-400 select-none">|</span>
            <input
              ref={input2Ref}
              type="text"
              maxLength={1}
              value={digit2}
              onChange={(e) => handleInputChange(e, setDigit2)}
              onKeyDown={(e) => handleKeyDown(e, input1Ref)}
              className="w-5 h-7 text-center text-app-text-secondary bg-transparent focus:outline-none appearance-none "
              aria-label="Second digit of guest count"
            />
            <span className="text-app-text-secondary select-none">|</span>
            <input
              ref={input2Ref}
              type="text"
              maxLength={1}
              value={digit2}
              onChange={(e) => handleInputChange(e, setDigit2)}
              onKeyDown={(e) => handleKeyDown(e, input1Ref)}
              className="w-5 h-7 text-center text-app-text-secondary bg-transparent focus:outline-none appearance-none pr-2"
              aria-label="Second digit of guest count"
            />
          </div>
        </div>

        {/* Right blue button */}
        <button
          onClick={handleAddToCartClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          aria-label="Add to cart"
        >
          <BuyIcon />
        </button>
      </div>
    </div>
  );
};

export default GuestCounter;
