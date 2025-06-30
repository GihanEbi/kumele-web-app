"use client";

import React, {
  useState,
  useRef,
  KeyboardEvent,
  ChangeEvent,
  useEffect,
} from "react";

import { TwoTicketsIcon, BuyIcon } from "../../../../../public/svg-icons/icons";

import GuestInviteModal from "./GuestInviteModal/GuestInviteModal";
import { PayPalPayModal } from "@/components/PaymentModal/PayPalModal/PayPalPayModal";
import { AddCardModal } from "@/components/PaymentModal/AddNewCard/AddNewCard";

interface GuestCounterProps {
  label?: string;
  initialGuests?: number; // Number between 0 and 99
  onAddToCart?: (guests: number) => void;
  isSuccess: boolean;
  setIsSuccess: (value: boolean) => void;
  isInviteModalOpen: boolean;
  setIsInviteModalOpen: (value: boolean) => void;
}

const GuestCounter: React.FC<GuestCounterProps> = ({
  initialGuests = 1,
  onAddToCart,
  isSuccess,
  setIsSuccess,
  isInviteModalOpen,
  setIsInviteModalOpen,
}) => {
  const [digit1, setDigit1] = useState<string>("");
  const [digit2, setDigit2] = useState<string>("");
  const [digit3, setDigit3] = useState<string>("");

  const input1Ref = useRef<HTMLInputElement>(null!);
  const input2Ref = useRef<HTMLInputElement>(null!);
  const input3Ref = useRef<HTMLInputElement>(null!);

  const [guestCount, setGuestCount] = useState(initialGuests);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isCardAddModalOpen, setIsCardAddModalOpen] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSuccess) {
      timer = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isSuccess]);

  const updateDigitsFromCount = (count: number) => {
    const paddedStr = count.toString().padStart(3, "0");
    setDigit1(paddedStr[0]);
    setDigit2(paddedStr[1]);
    setDigit3(paddedStr[2]);
  };

  useEffect(() => {
    updateDigitsFromCount(guestCount);
  }, []);

  const parseGuests = () => {
    const d1 = digit1 || "0";
    const d2 = digit2 || "0";
    const d3 = digit3 || "0";
    return parseInt(`${d1}${d2}${d3}`, 10);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    digitSetter: React.Dispatch<React.SetStateAction<string>>,
    nextInputRef?: React.RefObject<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
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
    setIsPaymentModalOpen(true);
    console.log("Adding to cart, guests:", guests);
  };

  const handleCloseModal = () => {
    setIsSuccess(false);
  };

  const handleModalClose = (finalCount: number) => {
    setGuestCount(finalCount);

    updateDigitsFromCount(finalCount);
    setIsInviteModalOpen(false);
  };

  return (
    <div className="w-full max-w-xs">
      {" "}
      <div className="flex items-stretch">
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center bg-app-input-primary pl-3 pr-2 py-2 rounded-l-lg border-app-input-primary border-r-0  gap-3"
        >
          <TwoTicketsIcon />

          <div className="flex items-center border gap-3 rounded-lg">
            {/* Input 1 */}
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
            <span className="text-app-text-secondary select-none">|</span>

            {/* Input 2 - corrected onChange to focus the new third input */}
            <input
              ref={input2Ref}
              type="text"
              maxLength={1}
              value={digit2}
              onChange={(e) => handleInputChange(e, setDigit2, input3Ref)}
              onKeyDown={(e) => handleKeyDown(e, input1Ref)}
              className="w-5 h-7 text-center text-app-text-secondary bg-transparent focus:outline-none appearance-none"
              aria-label="Second digit of guest count"
            />
            <span className="text-app-text-secondary select-none">|</span>

            <input
              ref={input3Ref}
              type="text"
              maxLength={1}
              value={digit3}
              onChange={(e) => handleInputChange(e, setDigit3)}
              onKeyDown={(e) => handleKeyDown(e, input2Ref)}
              className="w-5 h-7 text-center text-app-text-secondary bg-transparent focus:outline-none appearance-none pr-2"
              aria-label="Third digit of guest count"
            />
          </div>
        </button>

        {/* Right blue button */}
        <button
          onClick={handleAddToCartClick}
          className="bg-app-button-blue  text-white px-4 py-2 rounded-r-lg flex items-center justify-center"
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
      <PayPalPayModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onAddNewCardClick={() => setIsCardAddModalOpen(true)}
      />
      <AddCardModal
        isOpen={isCardAddModalOpen}
        onClose={() => setIsCardAddModalOpen(false)}
      />
    </div>
  );
};

export default GuestCounter;
