"use client";

import React, { useState } from "react";
import {
  BackArrow,
  DeleteIcon,
  MasterCardIcon,
  OkayRedIcon,
  VisaCardIcon,
} from "../../../../public/svg-icons/icons";
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
    expiryDate: "12-08-23",
    cardHolderName: "John Doe",
    cardType: "Visa", // visa or master card
  },
  {
    cardNumber: "**** **** **** 5678",
    expiryDate: "12-08-23",
    cardHolderName: "Jane Smith",
    cardType: "MasterCard", // visa or master card
  },
  {
    cardNumber: "**** **** **** 9012",
    expiryDate: "12-08-23",
    cardHolderName: "Alice Johnson",
    cardType: "Visa", // visa or master card
  },
  {
    cardNumber: "**** **** **** 5678",
    expiryDate: "12-08-23",
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
  const [checkedCard, setCheckedCard] = useState<number | null>(null);
  return (
    <div className="overflow-y-auto max-h-screen no-scrollbar">
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <div className=" min-h-screen bg-app-background-primary flex flex-col">
        <div className="w-full max-w-md px-4 top-0 left-0 right-0 ">
          {/* Header */}
          <header className="fixed w-full pt-[64px] bg-app-background-primary flex items-center mb-10">
            <button
              aria-label="Go back"
              onClick={() => window.history.back()} // Simple back navigation
              className="p-2 -ml-2 mr-2 mt-4" // Added padding for easier click and negative margin to align
            >
              <BackArrow className="text-app-icon" />
            </button>
            <h1 className="mt-4 text-[23px] font-semibold text-app-text-primary font-plusJakartaSans-700">
              Remove card
            </h1>
          </header>
        </div>
        {/* body section - added cards */}
        <div className="space-y-1 mt-[130px]">
          <div className="items-center">
            <RadioGroup name="card-selection">
              {cardDetails.map((option, index) => (
                <div className="flex ml-5 items-center justify-between gap-4">
                  <div
                    className="flex items-center gap-3"
                    onClick={(e) => {
                      setCheckedCard(index);
                    }}
                  >
                    <input
                      key={index}
                      type="checkbox"
                      name={""}
                      checked={checkedCard === index}
                      className="peer hidden"
                    />

                    <div
                      className={`w-4.5 h-4.5 rounded-full border-2 ${
                        checkedCard !== index
                          ? "border-app-button-radio"
                          : "border-app-button-blue"
                      } flex items-center justify-center`}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-2xl ${
                          checkedCard !== index ? "" : "bg-app-button-blue"
                        } transition-all`}
                      />
                    </div>
                    <div className="">
                      <div className="flex items-center gap-1">
                        <p className="text-[13.09px] text-app-text-profile-tabs font-plusJakartaSans-400">
                          •••• •••• •••• {option.cardNumber.slice(-4)}
                        </p>
                        <MasterCardIcon />
                        <p className="text-[11.23px] text-app-text-profile-tabs font-plusJakartaSans-400">
                          Master card
                        </p>
                      </div>
                      <p className="text-[10.64px] text-app-text-profile-tabs font-plusJakartaSans-400">
                        Expires {option.expiryDate}
                      </p>
                    </div>
                  </div>
                  <div className="mr-5">
                    <DeleteIcon
                      className="text-app-icon"
                      width={24.7}
                      height={24.7}
                    />
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="mx-4 my-8">
            <Separator className="bg-app-text-secondary p-0.4" />
          </div>

          {/* Escrow Account Section */}
          <div className="space-y-4 flex flex-col items-center mb-8">
            <h2 className="text-[19px] font-semibold text-app-text-primary font-plusJakartaSans-700 mb-8">
              Connect your Escrow Account
            </h2>
            <div className="flex items-center gap-3">
              <button className="flex bg-app-button-primary rounded-lg px-8 py-2">
                <Image
                  src="/images/paypal.png"
                  alt="PayPal"
                  width={20}
                  height={24}
                />
                <span className="ml-2 text-[14.4px] text-app-text-tertiary font-plusJakartaSans-500">
                  PayPal
                </span>
              </button>
              <button className="bg-app-okay-icon-background rounded-lg p-2 h-auto ">
                {/* <Check className="h-5 w-5 text-green-500" /> */}
                <OkayRedIcon />
              </button>
            </div>
          </div>

          <div className="mx-4 mb-8">
            <Separator className="bg-app-text-secondary p-0.4" />
          </div>

          {/* Subscriptions Section */}
          <div className="space-y-6 flex flex-col items-center mb-18">
            <h2 className="text-[19px] mb-[32px] text-app-text-primary font-plusJakartaSans-700 font-semibold">
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
