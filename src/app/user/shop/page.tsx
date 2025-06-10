"use client";

import React, { useState } from "react";

import {
  CrownIcon,
  AirCraftIcon,
  Confetti2Icon,
  TwoTicketsIcon,
} from "../../../../public/svg-icons/icons";
import { PaymentModal } from "@/components/PaymentModal/PaymentModal";
import { AddCardModal } from "@/components/PaymentModal/AddNewCard/AddNewCard";
import { SendPaymentModal } from "@/components/PaymentModal/SendPayment/SendPayment";
import { CoinbasePaymentModal } from "@/components/PaymentModal/CoinBasePaymentModal/CoinBasePaymentModal";
import { PaymentCompleteModal } from "@/components/PaymentModal/PaymentCompleteModal/PaymentCompleteModal";

type Plan = {
  id: number;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  price: string;
  description: string;
  status: "buy" | "active";
  isHighlighted?: boolean;
  priceColor: "yellow" | "blue";
};

const subscriptionPlans: Plan[] = [
  {
    id: 1,
    Icon: Confetti2Icon,
    title: "Event ads",
    price: "$7.07",
    description: "Purchase 7 days pre-event AD",
    status: "buy",
    priceColor: "yellow",
  },
  {
    id: 2,
    Icon: AirCraftIcon,
    title: "Location change",
    price: "$8.25",
    description: "Unlimited location change, valid for 30 days",
    status: "active",
    isHighlighted: true,
    priceColor: "blue",
  },
  {
    id: 3,
    Icon: CrownIcon,
    title: "Monthly Silver",
    price: "$15.00",
    description:
      "Get 30 days ADs free experience. Cancel anytime but before the new month starts.",
    status: "buy",
    priceColor: "yellow",
  },
  {
    id: 4,
    Icon: CrownIcon,
    title: "Monthly Gold",
    price: "$18.87",
    description:
      "Get 30 days ADs free experience. One time free (6-20 guest invite), additional purchase needed for more guest. Cancel anytime but before the new month starts.",
    status: "buy",
    priceColor: "yellow",
  },
  {
    id: 5,
    Icon: CrownIcon,
    title: "Yearly Gold",
    price: "$120.00",
    description:
      "Get 365 days ADs free experience. One time free (6-20 guest invite). Unlimited location change",
    status: "buy",
    priceColor: "yellow",
  },
];

// Data for the "Guest tickets" tab
const guestTickets: Plan[] = [
  {
    id: 1,
    Icon: TwoTicketsIcon,
    title: "6-20 guests",
    price: "$7.07",
    description: "Number of guests valid only for this event",
    status: "active",
    isHighlighted: true,
    priceColor: "blue",
  },
  {
    id: 2,
    Icon: TwoTicketsIcon,
    title: "21-40 guests",
    price: "$10.61",
    description: "Number of guests valid only for this event",
    status: "buy",
    priceColor: "yellow",
  },
  {
    id: 3,
    Icon: TwoTicketsIcon,
    title: "41-60 guests",
    price: "$14.15",
    description: "Number of guests valid only for this event",
    status: "buy",
    priceColor: "yellow",
  },
  {
    id: 4,
    Icon: TwoTicketsIcon,
    title: "61-80 guests",
    price: "$17.69",
    description: "Number of guests valid only for this event",
    status: "buy",
    priceColor: "yellow",
  },
  {
    id: 5,
    Icon: TwoTicketsIcon,
    title: "81-150 guests",
    price: "$21.23",
    description: "Number of guests valid only for this event",
    status: "buy",
    priceColor: "yellow",
  },
];

export default function SubscriptionsPage() {
  //State to track the active tab
  const [activeTab, setActiveTab] = useState<"subscriptions" | "tickets">(
    "subscriptions"
  );

  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isAddCardModalOpen, setAddCardModalOpen] = useState(false);
  const [isSendPaymentOpen, setSendPaymentOpen] = useState(false);
  const [isCoinbaseOpen, setCoinbaseOpen] = useState(false);
  const [isThankYouOpen, setThankYouOpen] = useState(false); 
  // Determine which data to show based on the active tab
  const currentData =
    activeTab === "subscriptions" ? subscriptionPlans : guestTickets;

  // styles for active and inactive tabs to keep the JSX clean
  const activeTabStyles =
    "bg-app-background-primary shadow text-app-blog-card-author-text";
  const inactiveTabStyles = "bg-transparent text-app-search-bar-text";

  const handleOpenPayment = () => setPaymentModalOpen(true);
  const handleClosePayment = () => setPaymentModalOpen(false);
  const handleNavigateToAddCard = () => {
    setPaymentModalOpen(false); // Close the current modal
    setAddCardModalOpen(true); // Open the new one
  };
  const handleCloseAddCard = () => {
    setAddCardModalOpen(false);
    setPaymentModalOpen(true);
   
  };
  const handleNavigateToSendPayment = () => {
    setPaymentModalOpen(false); // Close the payment modal
    setSendPaymentOpen(true);   // Open the send payment modal
  };
  const handleCloseSendPayment = () => {
    setSendPaymentOpen(false);  // Close the send payment modal
    setPaymentModalOpen(true);  // Go back to the payment modal
  };

   const handleNavigateToCoinbase = () => {
    setSendPaymentOpen(false); // Close the current modal
    setCoinbaseOpen(true);     // Open the new one
  };
  
  const handleCloseCoinbase = () => {
    setCoinbaseOpen(false);      // Close the coinbase modal
    setSendPaymentOpen(true);    // Go back to the previous modal
  };
   const handleNavigateToThankYou = () => {
    setCoinbaseOpen(false);      // Close the current modal
    setThankYouOpen(true);       // Open the new one
  };
  
  const handleCloseThankYou = () => {
    setThankYouOpen(false); 
    setPaymentModalOpen(true)     // Close the final screen, ending the flow
  };

  return (
    <>
      <div className="font-sans">
        <div className="mx-auto p-4">
          {/* Segmented Control Header */}
          <div className="bg-app-range-slider-track-active p-1 rounded-lg flex items-center mt-2">
            {/* Subscriptions Button */}
            <button
              onClick={() => setActiveTab("subscriptions")}
              className={`flex-1 py-3 px-4 rounded-lg text-sm transition-all duration-300 ${
                activeTab === "subscriptions"
                  ? activeTabStyles
                  : inactiveTabStyles
              }`}
            >
              Subscriptions
            </button>

            {/* Guest Tickets Button */}
            <button
              onClick={() => setActiveTab("tickets")}
              className={`flex-1 py-3 px-4 rounded-lg text-sm transition-all duration-300 ${
                activeTab === "tickets" ? activeTabStyles : inactiveTabStyles
              }`}
            >
              Guest tickets
            </button>
          </div>

          {/* This list now dynamically renders the correct data */}
          <div className="mt-8 space-y-4 pb-8">
            {currentData.map((plan) => (
              <div
                key={`${activeTab}-${plan.id}`} // Using a unique key for each item
                className={`rounded-2xl p-5 ${
                  plan.isHighlighted
                    ? "bg-app-blog-selected-tabs-background"
                    : "bg-app-blog-card-background"
                }`}
              >
                <div className="flex items-start gap-3">
                  <plan.Icon
                    className={`w-8 h-8 flex-shrink-0 mt-1 ${
                      plan.isHighlighted ? "text-gray-900" : ""
                    }`}
                  />
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-start">
                      <h2
                        className={`font-bold text-lg ${
                          plan.isHighlighted
                            ? "text-black"
                            : "text-app-blog-card-heading"
                        }`}
                      >
                        {plan.title}
                      </h2>
                      <p
                        className={`font-bold text-lg whitespace-nowrap ${
                          plan.priceColor === "yellow"
                            ? "text-app-text-yellow"
                            : "text-blue-600"
                        }`}
                      >
                        {plan.price}
                      </p>
                    </div>
                    <p
                      className={`mt-2 text-sm ${
                        plan.isHighlighted
                          ? "text-gray-800"
                          : "text-app-blog-card-author-text"
                      }`}
                    >
                      {plan.description}
                    </p>
                    {plan.status === "buy" ? (
                      <div className="mt-5 flex ">
                        <button
                          onClick={handleOpenPayment}
                          className="bg-app-card-button-bg-primary text-app-button-text-color py-2 px-20 rounded-lg shadow-sm"
                        >
                          Buy now
                        </button>
                      </div>
                    ) : (
                      <div className="mt-5 flex ">
                        <button className="bg-app-card-highlight-button text-black py-2 px-22 rounded-lg shadow-sm">
                          Active
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PaymentModal
        onAddNewCardClick={handleNavigateToAddCard}
        isOpen={isPaymentModalOpen}
        onClose={handleClosePayment}
        onPayWithWalletClick={handleNavigateToSendPayment}
      />
      <AddCardModal isOpen={isAddCardModalOpen} onClose={handleCloseAddCard} />
       <SendPaymentModal
          isOpen={isSendPaymentOpen}
          onClose={handleCloseSendPayment} 
           onPayWithWalletClick={handleNavigateToCoinbase}
        />,
         <CoinbasePaymentModal
         onPayWithCoinbaseClick={handleNavigateToThankYou}
        isOpen={isCoinbaseOpen}
        onClose={handleCloseCoinbase} // You can use this for a back button if you add one
      />
       <PaymentCompleteModal
              isOpen={isThankYouOpen}
              onClose={handleCloseThankYou} // This closes the modal and ends the flow
            />
    </>
  );
}
