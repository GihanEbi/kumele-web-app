"use client";

import Image from "next/image";
import { mockEventData, mockHostData, mockOtherEvents } from "./data";
import HostInfo from "./hostInfo/HostInfo";
import {
  DownArrowIcon,
  YingyangIcon,
  ShareIcon,
  TwoTicketsIcon,
  ClockIcon,
  UsersIcon,
  LocationIcon,
  CloseIcon,
} from "../../../../../public/svg-icons/icons";
import { useEffect, useState } from "react";

import OtherEvents from "./otherEvents/OtherEvents";
import { useTheme } from "next-themes";
import ClockGif from "@/components/GifComponents/ClockGif/ClockGif";
import { PaymentModal } from "@/components/PaymentModal/PaymentModal";
import { AddCardModal } from "@/components/PaymentModal/AddNewCard/AddNewCard";
import { SendPaymentModal } from "@/components/PaymentModal/SendPayment/SendPayment";
import { CoinbasePaymentModal } from "@/components/PaymentModal/CoinBasePaymentModal/CoinBasePaymentModal";
import { PaymentCompleteModal } from "@/components/PaymentModal/PaymentCompleteModal/PaymentCompleteModal";
import InviteModal from "./ShareModal/ShareModal";

type EventPreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EventPreviewModal = ({ isOpen, onClose }: EventPreviewModalProps) => {
  const [isExtendedPreviewOpen, setIsExtentedPreviewOpen] =
    useState<boolean>(false);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);
  const [isAddCardModalOpen, setAddCardModalOpen] = useState<boolean>(false);
  const [isSendPaymentOpen, setSendPaymentOpen] = useState<boolean>(false);
  const [isCoinbaseOpen, setCoinbaseOpen] = useState<boolean>(false);
  const [isThankYouOpen, setThankYouOpen] = useState<boolean>(false);
  const [isInviteModalOpen, setInviteModalOpen] = useState<boolean>(false);
  if (!isOpen) return null;


  // useEffect(() => {
  //     if (isOpen) {
  //       document.body.style.overflow = "hidden";
  //     } else {
  //       document.body.style.overflow = "unset";
  //     }
  //     return () => {
  //       // Cleanup
  //       document.body.style.overflow = "unset";
  //     };
  //   }, [isOpen]);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";



  const { eventData, hostData, otherEvents } = {
    eventData: mockEventData,
    hostData: mockHostData,
    otherEvents: mockOtherEvents,
  };
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

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex justify-center items-center p-4" //
      >
        {/* Modal Content - We use flex-col to structure the layout */}
        <div
          onClick={(e) => e.stopPropagation()}
          className=" bg-app-background-tertiary rounded-4xl w-full max-w-sm max-h-[70vh] shadow-lg flex flex-col overflow-y-auto no-scrollbar p-3 sm:p-5"
        >
          {/* 2. Scrollable Content Section */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-2 sm:p-5">
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute -top-1 -right-1 z-20 bg-app-background-tertiary p-1"
                aria-label="Close"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
              <Image
                src={eventData.imageSrc}
                alt={eventData.title}
                width={400}
                height={250}
                className="w-full h-65 object-cover rounded-t-2xl"
              />
              <div className="absolute top-5 right-6 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full flex items-center space-x-1.5">
                <YingyangIcon />
                <span className="font-plusJakartaSans text-app-button-text-color font-normal text-[13px]">
                  {eventData.category}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-start mb-4 mt-3">
              <h1 className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[25px]">
                {eventData.title}
              </h1>
              <button
              onClick={()=>setInviteModalOpen(true)}
                className={`${
                  isDark ? "bg-white" : "bg-black"
                }  p-2 rounded-lg`}
              >
                <ShareIcon
                  className={`${isDark ? "text-black" : "text-white"} `}
                />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm ">
                <div className="flex items-center space-x-2">
                  <TwoTicketsIcon className="h-[20px] w-[20px]" />{" "}
                  <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                    {eventData.price}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-[20px] w-[20px]" />{" "}
                  <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                    {eventData.time}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <UsersIcon className="h-[20px] w-[20px]" />{" "}
                  <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                    {eventData.guests} guests
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <div className="flex items-center space-x-2">
                    <ClockGif
                      width={19}
                      height={19}
                      className={`${isDark ? "bg-white" : ""}`}
                    />
                    <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                      {eventData.startsIn}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <LocationIcon className="h-[20px] w-[20px]" />{" "}
                    <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                      {eventData.location}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setIsExtentedPreviewOpen(!isExtendedPreviewOpen)
                  }
                  className={`${
                    isDark ? "bg-gray-500" : "bg-app-range-slider-track-active"
                  } dark:bg-zinc-700 rounded-full p-1 self-end`}
                >
                  <DownArrowIcon
                    className={`${
                      !isExtendedPreviewOpen ? "rotate-180" : ""
                    } w-6 h-6`}
                  />
                </button>
              </div>
            </div>
            {/* scrollable area:for further reference styles */}
            <div className="mt-6 overflow-y-auto max-h-24 pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex items-start space-x-2">
                <p className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[13px]">
                  {eventData.subtitle}
                </p>
              </div>
              <p className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[13px] mt-1">
                {eventData.description}
              </p>
            </div>
            {/* Event details section end */}

            <div className="mt-6">
              <HostInfo host={hostData} />
            </div>

            {isExtendedPreviewOpen ? (
              <OtherEvents events={otherEvents} hostName={hostData.name} />
            ) : (
              <div className="flex flex-row gap-3 mt-6">
                <button
                  onClick={handleOpenPayment}
                  className="w-full bg-app-button-primary text-app-button-text-color py-3 px-4 rounded-lg transition-colors"
                >
                  Pay Now
                </button>
                <button className="w-full bg-app-button-primary text-app-button-text-color py-3 px-4 rounded-lg transition-colors cursor-not-allowed opacity-50">
                  Create Event
                </button>
              </div>
            )}
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
        onClose={handleCloseCoinbase}
      />
      <PaymentCompleteModal
        isOpen={isThankYouOpen}
        onClose={handleCloseThankYou}
      />
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
      />
    </>
  );
};

export default EventPreviewModal;
