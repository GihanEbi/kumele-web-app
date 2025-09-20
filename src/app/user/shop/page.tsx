"use client";

import React, { useEffect, useState } from "react";

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
import SubscriptionExpirationModal from "./InitialPopup/Modal";
import { useAppContext } from "@/context/AppContext";
import { useTheme } from "next-themes";
import StripeModel from "@/components/StripeModel/StripeModel";
import { useRouter } from "next/navigation";
import SuccessModel from "@/components/Models/SuccessModel/SuccessModel";
import ErrorModel from "@/components/Models/ErrorModel/ErrorModel";
import { get_all_subscribe_and_unsubscribed_data } from "@/routes/subscription";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import InlineSvg from "@/components/InlineSVG/InlineSVG";

type Plan = {
  id: string;
  icon_code: string;
  title: string;
  price: string;
  description: string;
  validity_period: { days?: number; months?: number; years?: number };
  isActive: boolean;
};

export default function SubscriptionsPage() {
  const router = useRouter();
  //State to track the active tab
  const [activeTab, setActiveTab] = useState<"subscriptions" | "tickets">(
    "subscriptions"
  );
  //   loading state
  const [loading, setLoading] = useState(false);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // amount to pay in stripe
  const [stripeAmount, setStripeAmount] = useState(0)

  // state for subscription data
  const [subscriptionData, setSubscriptionData] = useState<Plan[]>([]);

  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isAddCardModalOpen, setAddCardModalOpen] = useState(false);
  const [isSendPaymentOpen, setSendPaymentOpen] = useState(false);
  const [isCoinbaseOpen, setCoinbaseOpen] = useState(false);
  const [isThankYouOpen, setThankYouOpen] = useState(false);
  const { setIsBottomNavBarFixed } = useAppContext();

  //-----------initial pop up state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStripeModelOpen, setIsStripeModelOpen] = useState(false);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const isMoreOptionsOpen = useAppContext().moreOption;

  // styles for active and inactive tabs to keep the JSX clean
  const activeTabStyles =
    "bg-app-background-primary shadow text-app-blog-card-author-text";
  const inactiveTabStyles = "bg-transparent text-app-search-bar-text";

  //initial popup modal open handling
  useEffect(() => {
    fetchSubscriptionAndUnSubscriptionByUser();
    setIsBottomNavBarFixed(true);
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  //lock background when modal opening
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

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
    setSendPaymentOpen(true); // Open the send payment modal
  };
  const handleCloseSendPayment = () => {
    setSendPaymentOpen(false); // Close the send payment modal
    setPaymentModalOpen(true); // Go back to the payment modal
  };

  const handleNavigateToCoinbase = () => {
    setSendPaymentOpen(false); // Close the current modal
    setCoinbaseOpen(true); // Open the new one
  };

  const handleCloseCoinbase = () => {
    setCoinbaseOpen(false); // Close the coinbase modal
    setSendPaymentOpen(true); // Go back to the previous modal
  };
  const handleNavigateToThankYou = () => {
    setCoinbaseOpen(false); // Close the current modal
    setThankYouOpen(true); // Open the new one
  };

  const handleCloseThankYou = () => {
    setThankYouOpen(false);
    setPaymentModalOpen(true); // Close the final screen, ending the flow
  };

  const fetchSubscriptionAndUnSubscriptionByUser = async () => {
    setLoading(true);
    try {
      const data = await get_all_subscribe_and_unsubscribed_data();

      if (data.success) {
        setSubscriptionData(data.subscriptions);
      }
    } catch (error) {
      setError("An error occurred");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`font-sans pt-[64px] pb-20 ${
          isMoreOptionsOpen && isDark
            ? "bg-neutral-900"
            : isMoreOptionsOpen && !isDark
            ? "bg-gray-200"
            : ""
        }`}
      >
        {/* Loading spinner */}
        {loading && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <LoadingComponent />
          </div>
        )}
        <div className="mx-auto p-4">
          {/* Segmented Control Header */}
          <div className="bg-app-range-slider-track-active p-1 rounded-lg flex items-center mt-2">
            {/* Subscriptions Button */}
            <button
              onClick={() => setActiveTab("subscriptions")}
              className={`flex-1 py-3 px-4 rounded-lg font-plusJakartaSans font-medium text-[14px] transition-all duration-300 ${
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
              className={`flex-1 py-3 px-4 rounded-lg font-plusJakartaSans font-medium text-[14px] transition-all duration-300 ${
                activeTab === "tickets" ? activeTabStyles : inactiveTabStyles
              }`}
            >
              Guest tickets
            </button>
          </div>

          {/* This list now dynamically renders the correct data */}
          <div className="mt-8 space-y-4 pb-8">
            {subscriptionData.map((plan) => (
              <div
                key={`${activeTab}-${plan.id}`} // Using a unique key for each item
                className={`rounded-2xl p-5 ${
                  plan.isActive
                    ? "bg-app-blog-selected-tabs-background"
                    : "bg-app-blog-card-background"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* <plan.Icon
                    className={`w-8 h-8 flex-shrink-0 mt-1 ${
                      plan.isHighlighted ? "text-gray-900" : ""
                    }`}
                  /> */}
                  <InlineSvg
                    svg={plan.icon_code}
                    className={`w-8 h-8 ${
                      plan.isActive ? "text-gray-900" : ""
                    }`}
                    // title={category}
                  />
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-start">
                      <h2
                        className={`font-bold text-lg ${
                          plan.isActive
                            ? "text-black font-plusJakartaSans font-700 text-[19px]"
                            : "text-app-blog-card-heading font-plusJakartaSans font-bold text-[19px]"
                        }`}
                      >
                        {plan.title}
                      </h2>
                      <p
                        className={`font-plusJakartaSans font-bold text-[19px] whitespace-nowrap ${
                          !plan.isActive
                            ? "text-app-text-yellow"
                            : "text-blue-600"
                        }`}
                      >
                        {plan.price}
                      </p>
                    </div>
                    <p
                      className={`mt-2 font-plusJakartaSans font-normal text-[16px] ${
                        plan.isActive
                          ? "text-gray-800"
                          : "text-app-blog-card-author-text"
                      }`}
                    >
                      {plan.description}
                    </p>
                    {!plan.isActive ? (
                      <div className="mt-5 flex ">
                        <button
                          onClick={() => {
                            setStripeAmount(Number(plan.price))
                            setIsStripeModelOpen(true);
                          }}
                          className="bg-app-card-button-bg-primary text-app-button-text-color font-plusJakartaSans font-normal text-[16px] py-2 px-20 rounded-lg shadow-sm"
                        >
                          Buy now
                        </button>
                      </div>
                    ) : (
                      <div className="mt-5 flex ">
                        <button className="bg-app-card-highlight-button text-black py-2 px-22 font-plusJakartaSans font-normal text-[16px] rounded-lg shadow-sm">
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
      />
      ,
      <CoinbasePaymentModal
        onPayWithCoinbaseClick={handleNavigateToThankYou}
        isOpen={isCoinbaseOpen}
        onClose={handleCloseCoinbase} // You can use this for a back button if you add one
      />
      <PaymentCompleteModal
        isOpen={isThankYouOpen}
        onClose={handleCloseThankYou} // This closes the modal and ends the flow
      />
      {/* <SubscriptionExpirationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}
      <StripeModel
        isOpen={isStripeModelOpen}
        onClose={() => setIsStripeModelOpen(false)}
        amount={stripeAmount.toString()}
      />
      <SuccessModel
        isOpen={showSuccessModel}
        onClose={() => {
          setShowSuccessModel(false);
          setSuccess("");
        }}
        successMessage={success || ""}
      />
      <ErrorModel
        isOpen={showErrorModel}
        onClose={() => {
          setShowErrorModel(false);
          setError("");
        }}
        errorMessage={error || ""}
      />
    </>
  );
}
