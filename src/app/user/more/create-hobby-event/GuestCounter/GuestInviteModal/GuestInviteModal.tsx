"use client";
import React, { useState, useEffect, useRef } from "react";
import { TimeDigitScroller } from "../DigitScroller/DigitScrollerUpdate";
import {
  TwoTicketsIcon,
  CloseIcon,
} from "../../../../../../../public/svg-icons/icons";

// --- Data ---
const digits = Array.from({ length: 10 }, (_, i) => String(i));

// --- Main GuestInviteModal Component ---
interface GuestInviteModalProps {
  isOpen: boolean;
  onClose: (finalCount: number) => void;
  initialGuests: number;
  maxGuests?: number;
}

const GuestInviteModal: React.FC<GuestInviteModalProps> = ({
  isOpen,
  onClose,
  initialGuests,
  maxGuests = 150,
}) => {
  const [d1, setD1] = useState("0");
  const [d2, setD2] = useState("0");
  const [d3, setD3] = useState("0");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isInitialMount = useRef(true);

  // Logic to update digits based on a number, respecting the max limit
  const updateDigits = (newTotal: number) => {
    const cappedTotal = Math.min(newTotal, maxGuests);
    const paddedStr = cappedTotal.toString().padStart(3, "0");
    setD1(paddedStr[0]);
    setD2(paddedStr[1]);
    setD3(paddedStr[2]);
  };

  // Handle modal open/close and set initial state
  useEffect(() => {
    if (isOpen) {
      isInitialMount.current = true;
      updateDigits(initialGuests);
      const timer = setTimeout(() => {
        setIsTransitioning(true);
        isInitialMount.current = false;
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsTransitioning(false);
    }
  }, [isOpen, initialGuests, maxGuests]);

  // Enforce maxGuests limit when a digit changes
  useEffect(() => {
    if (isInitialMount.current) return;
    const currentTotal = parseInt(`${d1}${d2}${d3}`, 10);
    if (currentTotal > maxGuests) {
      updateDigits(maxGuests);
    }
  }, [d1, d2, d3]);

  const totalGuests = parseInt(`${d1}${d2}${d3}`, 10);

  const handleClose = () => {
    onClose(totalGuests);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0   bg-opacity-50 flex items-end justify-center z-50"
      onClick={handleClose}
    >
      <div
        className={`bg-app-background-tertiary w-full max-w-md rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-out ${
          isTransitioning ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <TwoTicketsIcon className="w-12 h-12" />
            <button onClick={handleClose} aria-label="Close">
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>

          <h2 className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[21px]">
            Guest Invite
          </h2>
          <p className="font-plusJakartaSans text-app-button-model-text-color font-normal ext-[13.45px]">
            1-5 Free
          </p>

          {/* --- Scroller Container Using Your Component --- */}
          {/* <div className="relative flex justify-around items-center h-[150px]"> */}
          <div className="relative flex justify-around items-center">
            {/* The "window" or highlight bar that sits ON TOP of the scrollers */}
            <div className="absolute top-1/2 -translate-y-1/2 w-48 h-14 border border-app-search-bar-text rounded-xl pointer-events-none" />

            {/* The vertical dividers */}
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-[2.75rem] h-8 w-px bg-app-search-bar-text" />
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 translate-x-[2.75rem] h-8 w-px bg-app-search-bar-text" />

            {/* Using your exact scroller component three times */}
            <div className=" flex flex-row gap-15">
              <TimeDigitScroller items={digits} value={d1} setValue={setD1} />
              <TimeDigitScroller items={digits} value={d2} setValue={setD2} />
              <TimeDigitScroller items={digits} value={d3} setValue={setD3} />
            </div>
          </div>

          <div className="text-left mt-8">
            <div className="flex flex-row gap-2">
              <p className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px] mb-2 ">
                Total Guests
              </p>
              <p className="font-plusJakartaSans text-app-button-model-text-color font-semibold text-[16px]">
                {totalGuests}
              </p>
            </div>
            <div className="flex flex-row gap-2">
              <p className="font-plusJakartaSans text-red-500 font-normal text-[10px]">*</p>
              <p className="font-plusJakartaSans text-gray-400 font-normal text-[10px]">
                 Max {maxGuests} Guests. Disclaimer: we cannot guarantee 100%
                matches due to certain factors beyond our control.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestInviteModal;
