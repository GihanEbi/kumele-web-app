"use client";

import React, { useState } from "react";
import {
  BackArrow,
  DeleteIcon,
  MasterCardIcon,
  OkayRedIcon,
  VisaCardIcon,
} from "../../../../../public/svg-icons/icons";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import RadioButtonComponent from "@/components/RadioButtonComponent/RadioButtonComponent";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import SubscriptionCard from "@/components/SubscriptionCard/SubscriptionCard";

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
  {
    cardNumber: "**** **** **** 5678",
    expiryDate: "11/24",
    cardHolderName: "Jane Smith",
    cardType: "MasterCard", // visa or master card
  },
];

// card type icons
const cardTypeIcons = {
  Visa: <VisaCardIcon />, // replace with actual path to Visa icon
  MasterCard: <MasterCardIcon />, // replace with actual path to MasterCard icon
};
const subscriptionPlans = [
  {
    title: "Monthly Silver",
    price: "$15.00",
    priceColor: "text-yellow-400",
    description: [
      "Get 30 days ADs free experience.",
      "Cancel anytime but before the new month starts.",
    ],
    isActive: false,
  },
  {
    title: "Monthly Gold",
    price: "$18.87",
    priceColor: "text-blue-600",
    description: [
      "Get 30 days ADs free experience.",
      "One time free (6-20 guest invite),",
      "additional purchase needed for more guest.",
      "Cancel anytime but before the new month starts.",
    ],
    isActive: true,
  },
  {
    title: "Yearly Gold",
    price: "$120.00",
    priceColor: "text-yellow-400",
    description: [
      "Get 365 days ADs free experience.",
      "One time free (6-20 guest invite).",
      "Unlimited location change",
    ],
    isActive: false,
  },
];

const Payment = () => {
  //   loading state
  const [loading, setLoading] = useState(false);
  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <div className="min-h-screen bg-app-background-primary flex flex-col pt-6 font-sans">
        <div className="w-full max-w-md px-4">
          {/* Header */}
          <header className="fixed p-4 top-0 left-0 right-0 bg-app-background-primary flex items-center mb-10">
            <button
              aria-label="Go back"
              onClick={() => window.history.back()} // Simple back navigation
              className="p-2 -ml-2 mr-2" // Added padding for easier click and negative margin to align
            >
              <BackArrow className="text-app-icon" />
            </button>
            <h1 className="text-2xl font-bold text-app-text-primary font-plusJakartaSans">
              Remove card
            </h1>
          </header>
        </div>
        {/* body section - added cards */}
        <div className="space-y-1 mt-15">
          <div className="items-center">
            <RadioGroup name="card-selection">
              {cardDetails.map((option, index) => (
                <div className="flex ml-5 mb-5 items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem
                      value={option.cardNumber}
                      id={option.cardNumber}
                    />
                    <div className="">
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-app-text-primary font-plusJakartaSans">
                          •••• •••• •••• {option.cardNumber.slice(-4)}
                        </p>
                        <MasterCardIcon />
                        <p className="text-xs text-app-text-primary font-plusJakartaSans">
                          Master card
                        </p>
                      </div>
                      <p className="text-xs text-app-text-primary font-plusJakartaSans">
                        Expires {option.expiryDate}
                      </p>
                    </div>
                    <div className="ml-10">
                      <DeleteIcon className="text-app-icon" />
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="mx-4 mb-8">
            <Separator className="bg-app-text-secondary p-0.4" />
          </div>

          {/* Escrow Account Section */}
          <div className="space-y-4 flex flex-col items-center mb-8">
            <h2 className="text-lg font-bold text-app-text-primary font-plusJakartaSans">
              Connect your Escrow Account
            </h2>
            <div className="flex items-center gap-3">
              <button className="flex bg-app-button-primary rounded-lg px-8 py-2">
                <Image
                  src="/images/paypal.png"
                  alt="PayPal"
                  width={24}
                  height={24}
                />
                <span className="ml-2 text-app-text-tertiary font-plusJakartaSans">
                  PayPal
                </span>
              </button>
              <button className="bg-app-okay-icon-background rounded-lg p-3 h-auto ">
                {/* <Check className="h-5 w-5 text-green-500" /> */}
                <OkayRedIcon />
              </button>
            </div>
          </div>

          <div className="mx-4 mb-8">
            <Separator className="bg-app-text-secondary p-0.4" />
          </div>

          {/* Subscriptions Section */}
          <div className="space-y-6 flex flex-col items-center mb-8">
            <h2 className="text-xl text-app-text-primary font-plusJakartaSans font-bold">
              Subscriptions
            </h2>
            <div className="space-y-4 w-5/6">
              {subscriptionPlans.map((plan, index) => (
                <SubscriptionCard key={index} plan={plan} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
