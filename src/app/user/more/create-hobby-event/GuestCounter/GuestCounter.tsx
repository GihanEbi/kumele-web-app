// components/GuestCounter.tsx
"use client";

import React, {
  useState,
  useRef,
  KeyboardEvent,
  ChangeEvent,
  useEffect,
} from "react";
//import { InfoIcon, TicketIcon, ShoppingCartIconSolid } from './icons'; // Adjust path if needed
import {
  TwoTicketsIcon,
  BuyIcon,
} from "../../../../../../public/svg-icons/icons";
import CheckMarkGif from "@/components/GifComponents/CheckMarkGif/CheckMarkGif";
import GuestInviteModal from "./GuestInviteModal/GuestInviteModal";

interface GuestCounterProps {
  label?: string;
  initialGuests?: number; // Number between 0 and 99
  onAddToCart?: (guests: number) => void;
  isSuccess: boolean;
  setIsSuccess: (value: boolean) => void;
  isInviteModalOpen:boolean;
  setIsInviteModalOpen:(value: boolean) => void;
}

const GuestCounter: React.FC<GuestCounterProps> = ({
  initialGuests = 1,
  onAddToCart,
  isSuccess,
  setIsSuccess,
  isInviteModalOpen,
  setIsInviteModalOpen
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
  // State to control the visibility of the success modal
  //const [isSuccess, setIsSuccess] = useState(false);
  //const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(initialGuests);
  // Effect to automatically close the success modal after 3 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSuccess) {
      timer = setTimeout(() => {
        setIsSuccess(false);
      }, 3000); // 3-second delay
    }
    // Cleanup function to clear the timer if the component unmounts or state changes
    return () => {
      clearTimeout(timer);
    };
  }, [isSuccess]);

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
    // Set isSuccess to true to show the modal
    setIsSuccess(true);
    console.log("Adding to cart, guests:", guests);
  };

  // Handler to close the modal manually (e.g., by clicking the overlay)
  const handleCloseModal = () => {
    setIsSuccess(false);
  };

  const handleModalClose = (finalCount: number) => {
    setGuestCount(finalCount);
    setIsInviteModalOpen(false);
  };

  return (
    <div className="w-full max-w-xs">
      {" "}
      {/* Adjust max-w as needed */}
      <div className="flex items-stretch">
        {/* Left section with icon and input */}
        <button onClick={()=>setIsInviteModalOpen(true)} className="flex items-center bg-app-input-primary pl-3 pr-2 py-2 rounded-l-lg border border-r-0  gap-3">
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
        </button>

        {/* Right blue button */}
        <button
          onClick={handleAddToCartClick}
          className="bg-blue-600  text-white px-4 py-2 rounded-r-lg flex items-center justify-center"
          aria-label="Add to cart"
        >
          <BuyIcon />
        </button>
      </div>
      <GuestInviteModal
        isOpen={isInviteModalOpen}
        onClose={handleModalClose}
        initialGuests={guestCount}
        maxGuests={150}
      />
      {/* POP UP SUCCESS SHOWING MODEL */}
      {isSuccess && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-50 transition-opacity duration-300 ease-in-out"
          onClick={handleCloseModal} // Close modal if overlay is clicked
        >
          <div
            className="bg-app-background-primary w-full max-w-md p-6 sm:p-8 rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-out"
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <CheckMarkGif className="text-white" />
              </div>
              <p className="text-app-text-primary font-plusJakartaSans text-sm mb-6 text-center">
                This item has been added to your cart
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestCounter;
