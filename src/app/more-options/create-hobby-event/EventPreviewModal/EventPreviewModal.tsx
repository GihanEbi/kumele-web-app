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
import HobbyTagIcon from "@/components/HobbyTagIcon/HobbyTagIcon";
import { EventPaymentModal } from "@/components/Models/EventPymentModel/EventPymentModel";
import SuccessModel from "@/components/Models/SuccessModel/SuccessModel";
import ErrorModel from "@/components/Models/ErrorModel/ErrorModel";
import { add_to_cart, get_user_cart } from "@/routes/cart";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

type EventCreationPayload = {
  category_id: string;
  destination: string;
  event_image: string;
  event_name: string;
  subtitle: string;
  description: string;
  event_start_in: string;
  event_date: string;
  event_start_time: string;
  event_end_time: string;
  street_address: string;
  home_number: string;
  district: string;
  postal_zip_code: string;
  state: string;
  age_range_min: string;
  age_range_max: string;
  max_guests: string;
  payment_type: string;
  price: string;
};

type EventPreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  eventDataObj: EventCreationPayload;
  tempImgUrl: string | undefined | null;
  onEventCreate: Function;
};

interface userCart {
  id: string;
  quantity: number;
  product_id: string;
  name: string;
  price: number;
  description: string;
}

const EventPreviewModal = ({
  isOpen,
  onClose,
  eventDataObj,
  tempImgUrl,
  onEventCreate,
}: EventPreviewModalProps) => {
  //   loading state
  const [loading, setLoading] = useState(false);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //   state to store user cart data
  const [cartData, setCartData] = useState<userCart[]>([]);
  //   state to amount to pay
  const [amountToPay, setAmountToPay] = useState(0);

  const [isExtendedPreviewOpen, setIsExtentedPreviewOpen] =
    useState<boolean>(false);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);
  const [isAddCardModalOpen, setAddCardModalOpen] = useState<boolean>(false);
  const [isSendPaymentOpen, setSendPaymentOpen] = useState<boolean>(false);
  const [isCoinbaseOpen, setCoinbaseOpen] = useState<boolean>(false);
  const [isThankYouOpen, setThankYouOpen] = useState<boolean>(false);
  const [isInviteModalOpen, setInviteModalOpen] = useState<boolean>(false);
  const [eventPaymentModelOpen, setEventPaymentModalOpen] =
    useState<boolean>(false);
  if (!isOpen) return null;

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

  // get the remaining time to event start
  function getHoursRemaining(
    eventDate: string | Date,
    eventStartTime: string
  ): number {
    // Convert eventDate to Date object
    const baseDate = new Date(eventDate);

    // Extract hours and minutes from eventStartTime (e.g., "09:26 PM")
    const [time, modifier] = eventStartTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier.toLowerCase() === "pm" && hours < 12) {
      hours += 12;
    }
    if (modifier.toLowerCase() === "am" && hours === 12) {
      hours = 0;
    }

    // Create a new Date with combined date + time
    const eventDateTime = new Date(baseDate);
    eventDateTime.setHours(hours, minutes, 0, 0);

    // Get current time
    const now = new Date();

    // Calculate difference in hours
    const diffMs = eventDateTime.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    // Round down to nearest hour (no decimals)
    return Math.floor(diffHours);
  }

  // fetch products from backend
  const fetchCartProducts = async () => {
    setLoading(true);
    try {
      const data = await get_user_cart();

      if (data.success) {
        // filter the type of product and only get the EVENT_START_TIME, NO_OF_GESTURES type and add it to cart data
        const filteredData = data.data.filter((item: userCart) =>
          ["EVENT_START_TIME", "NO_OF_GUESTS"].includes(item.name)
        );
        setCartData(filteredData);
        const totalAmount = filteredData.reduce(
          (acc: number, item: userCart) => acc + item.price * item.quantity,
          0
        );
        setAmountToPay(totalAmount);
        if (totalAmount === 0) {
          // no items to pay then create the event
          onEventCreate();
          onClose();
        } else {
          setEventPaymentModalOpen(true);
        }
      } else {
        setCartData([]);
        setError("No products found");
        setShowErrorModel(true);
        setTimeout(() => setShowErrorModel(false), 3600);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError("Error fetching cart");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Loading spinner */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}
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
                src={tempImgUrl ? tempImgUrl : "/images/blog-preview.png"}
                alt={eventData.title}
                width={400}
                height={250}
                className="w-full h-65 object-cover rounded-t-2xl"
              />

              <HobbyTagIcon hobbyId={eventDataObj.category_id} />
            </div>
            <div className="flex justify-between items-start mb-4 mt-3">
              <h1 className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[25px]">
                {eventDataObj?.event_name}
              </h1>
              <button
                onClick={() => setInviteModalOpen(true)}
                className={`${
                  isDark ? "bg-white" : "bg-black"
                }  p-1 rounded-md`}
              >
                <ShareIcon
                  className={`w-[18.07px] h-[18.07px] ${
                    isDark ? "text-black" : "text-white"
                  } `}
                />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2  text-sm ">
                <div className="flex items-center space-x-1">
                  <TwoTicketsIcon className="h-[20px] w-[20px]" />{" "}
                  <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                    {eventDataObj?.payment_type}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-[20px] w-[20px]" />{" "}
                  <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                    {eventDataObj?.event_start_time
                      .replace(/(AM|PM)/i, "")
                      .trim()}
                    -
                    {eventDataObj?.event_end_time
                      .replace(/(AM|PM)/i, "")
                      .trim()}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <UsersIcon className="h-[20px] w-[20px]" />{" "}
                  <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                    {eventDataObj?.max_guests} guests
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <div className="flex items-center space-x-1">
                    <ClockGif width={19} height={19} />
                    <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                      Starts in{" "}
                      {getHoursRemaining(
                        eventDataObj?.event_date,
                        eventDataObj?.event_start_time
                      )}{" "}
                      hrs
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <LocationIcon className="h-[20px] w-[20px]" />{" "}
                    <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                      {eventDataObj.home_number} {eventDataObj.street_address}
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
              <div className="flex items-start space-x-2 mb-4">
                <p className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[13px]">
                  {eventDataObj.subtitle}
                </p>
              </div>
              <p className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[13px] mt-1">
                {eventDataObj.description}
              </p>
            </div>
            {/* Event details section end */}

            <div className="mt-16">
              <HostInfo host={hostData} />
            </div>

            {/* {isExtendedPreviewOpen ? (
              <OtherEvents events={otherEvents} hostName={hostData.name} />
            ) : ( */}
            <div className="flex flex-row gap-3 mt-6 mb-10">
              {/* <button
                onClick={handleOpenPayment}
                className="w-full bg-app-button-primary text-app-button-text-color py-3 px-4 rounded-lg transition-colors"
              >
                Pay Now
              </button> */}
              <button
                className="w-full bg-app-button-primary text-app-button-text-color py-3 px-4 rounded-lg"
                onClick={() => {
                  fetchCartProducts();
                }}
              >
                Create Event
              </button>
            </div>
            {isExtendedPreviewOpen && (
              <OtherEvents events={otherEvents} hostName={hostData.name} />
            )}

            {/* )} */}
          </div>
        </div>
      </div>
      <EventPaymentModal
        isOpen={eventPaymentModelOpen}
        onClose={() => setEventPaymentModalOpen(false)}
        onPayWithWalletClick={handleNavigateToSendPayment}
        amountToPay={amountToPay}
        cartData={cartData}
        onEventCreate={onEventCreate}
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
