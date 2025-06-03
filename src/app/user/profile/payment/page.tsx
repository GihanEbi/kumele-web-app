"use client";

import React from "react";
import { BackArrow, MasterCardIcon, VisaCardIcon } from "../../../../../public/svg-icons/icons";

// mock data for card details
const cardDetails = [
  {
    cardNumber: "**** **** **** 1234",
    expiryDate: "12/25",
    cardHolderName: "John Doe",
    cardType: "Visa", // visa or master card
  },
  {
    cardNumber: "**** **** **** 5678",
    expiryDate: "11/24",
    cardHolderName: "Jane Smith",
    cardType: "MasterCard", // visa or master card
  },
  {
    cardNumber: "**** **** **** 9012",
    expiryDate: "10/23",
    cardHolderName: "Alice Johnson",
    cardType: "Visa", // visa or master card
  },
];

// card type icons
const cardTypeIcons = {
  Visa: <VisaCardIcon />, // replace with actual path to Visa icon
  MasterCard: <MasterCardIcon />, // replace with actual path to MasterCard icon
};

const Payment = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-6 font-sans">
      <div className="w-full max-w-md px-4">
        {/* Header */}
        <header className="flex items-center mb-10">
          <button
            aria-label="Go back"
            onClick={() => window.history.back()} // Simple back navigation
            className="p-2 -ml-2 mr-2" // Added padding for easier click and negative margin to align
          >
            <BackArrow />
          </button>
          <h1 className="text-3xl font-bold text-black">Remove card</h1>
          <VisaCardIcon/>
        </header>
      </div>
    </div>
  );
};

export default Payment;
