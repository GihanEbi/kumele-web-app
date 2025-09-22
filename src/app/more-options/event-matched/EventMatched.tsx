"use client";

import { Fredoka } from "next/font/google";
import { TypingIcon, YingYang2 } from "../../../../public/svg-icons/icons";
import { PaymentModal } from "@/components/PaymentModal/PaymentModal";
import { AddCardModal } from "@/components/PaymentModal/AddNewCard/AddNewCard";
import { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ModalPortal from "@/components/ModalPortal/ModalPortal";
import { get_event_by_event_id } from "@/routes/Events";
import SuccessModel from "@/components/Models/SuccessModel/SuccessModel";
import ErrorModel from "@/components/Models/ErrorModel/ErrorModel";
import { EventPaymentModal } from "@/components/Models/EventPymentModel/EventPymentModel";
import { SendPaymentModal } from "@/components/PaymentModal/SendPayment/SendPayment";
import { CoinbasePaymentModal } from "@/components/PaymentModal/CoinBasePaymentModal/CoinBasePaymentModal";
import { PaymentCompleteModal } from "@/components/PaymentModal/PaymentCompleteModal/PaymentCompleteModal";
import InviteModal from "../create-hobby-event/EventPreviewModal/ShareModal/ShareModal";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { getUserEventsByEventId, userAcceptEvent } from "@/routes/user events";

const Fredoka_font = Fredoka({ subsets: ["latin"], weight: ["700"] });

interface eventData {
  id: string;
  user_id: string;
  category_id: string;
  event_image_url: string;
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
  created_at: string;
  host: {
    id: string;
    about_me: string;
    host_rating: number;
    following_count: number;
    username: string;
    profilePicture: string;
  };
}
const EventMatched = () => {
  const searchParams = useSearchParams();
  const route = useRouter();
  //   loading state
  const [loading, setLoading] = useState(false);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);
  //   state for event details
  const [eventDetails, setEventDetails] = useState<eventData | null>(null);

  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isAddCardModalOpen, setAddCardModalOpen] = useState(false);
  const [eventPaymentModelOpen, setEventPaymentModalOpen] =
    useState<boolean>(false);
  const [isSendPaymentOpen, setSendPaymentOpen] = useState<boolean>(false);
  const [isCoinbaseOpen, setCoinbaseOpen] = useState<boolean>(false);
  const [isThankYouOpen, setThankYouOpen] = useState<boolean>(false);
  const [isInviteModalOpen, setInviteModalOpen] = useState<boolean>(false);

  const [amountToPay, setAmountToPay] = useState<number>(0);

  const [userEventID, setUserEventID] = useState<string | null>(null);

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

  useEffect(() => {
    fetchUserEventDetails();
    fetchEventDetails();
  }, []);

  const fetchUserEventDetails = async () => {
    setLoading(true);
    try {
      if (!searchParams) {
        setError("Missing search parameters");
        setShowErrorModel(true);
        setLoading(false);
        return;
      }
      const eventId = searchParams.get("event_id");
      if (!eventId) {
        setError("Missing event ID");
        setShowErrorModel(true);
        setLoading(false);
        return;
      }
      const data = await getUserEventsByEventId(eventId);

      if (data.success) {
        setUserEventID(data.data?.id || null);
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

  const fetchEventDetails = async () => {
    setLoading(true);
    try {
      if (!searchParams) {
        setError("Missing search parameters");
        setShowErrorModel(true);
        setLoading(false);
        return;
      }
      const eventId = searchParams.get("event_id");
      if (!eventId) {
        setError("Missing event ID");
        setShowErrorModel(true);
        setLoading(false);
        return;
      }
      const data = await get_event_by_event_id(eventId);

      if (data.success) {
        setEventDetails(data.data);
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

  const handlePayment = async () => {
    // check if event type is card_payment and price moere than 0
    if (
      eventDetails?.payment_type === "card_payment" &&
      Number(eventDetails?.price) > 0
    ) {
      // redirect to payment gateway
      setAmountToPay(Number(eventDetails?.price));
      setEventPaymentModalOpen(true);
    } else {
      // confirm user event
      let data = await userAcceptEvent(userEventID || "");
      if (!data.success) {
        setError(data.message || "Failed to join the event");
        setShowErrorModel(true);
        setTimeout(() => setShowErrorModel(false), 3600);
      } else {
        setSuccess("You have successfully joined the event!");
        setShowSuccessModel(true);
        setTimeout(() => {
          setShowSuccessModel(false);
          route.push("/user/more/chat");
        }, 3600);
      }
    }
  };

  const afterPayment = async () => {
    let data = await userAcceptEvent(userEventID || "");
    if (!data.success) {
      setError(data.message || "Failed to join the event");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
    } else {
      setSuccess("You have successfully joined the event!");
      setShowSuccessModel(true);
      setTimeout(() => {
        setShowSuccessModel(false);
        route.push("/user/more/chat");
      }, 3600);
    }
  };
  return (
    <>
      <div className="relative h-screen w-full bg-[url('/bg-imgs/preview-event.jpg')] bg-cover bg-center">
        {/* Loading spinner */}
        {loading && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <LoadingComponent />
          </div>
        )}
        {/* overlays for readability (won't block clicks) */}
        <div className="pointer-events-none absolute inset-0 bg-black/45" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 md:p-12">
          <div className="z-10 w-full max-w-md text-center flex flex-col items-center">
            {/* Headline */}
            <h1
              className={`${Fredoka_font.className} text-[#FFC23B]  leading-none tracking-tight drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]`}
            >
              <span className="block text-[81.33px]">It’s a</span>
              <span className="block -mt-1 text-[135.56px]">
                Go
                <img
                  src="/common-gifs/celebrate.gif"
                  alt="Go animation"
                  className="absolute inset-0 mx-auto h-[220px] w-[220px] object-contain pointer-events-none"
                />
              </span>
            </h1>

            <div className="mt-3 flex items-center justify-center gap-[9.98px]">
              <YingYang2 className="w-[43.64px] h-[43.64px] text-gray-100" />

              <p className="tracking-wide font-plusJakartaSans text-white font-bold text-[24.68px]">
                Group meditation
              </p>
            </div>

            <div className="mt-3 flex items-center justify-center gap-3">
              <div className="relative">
                <div className="relative z-10 h-12 w-20 mx-auto">
                  <div className="absolute -left-3 top-0 h-[65.1px] w-[65.1px] overflow-hidden rounded-full ring-4 ring-yellow-400">
                    <div className="h-full w-full bg-[url('/avatar-img/alkesh.png')] bg-cover bg-center" />
                  </div>
                  <div className="absolute left-10 top-0 h-[65.1px] w-[65.1px] overflow-hidden rounded-full ring-4 ring-blue-500">
                    <div className="h-full w-full bg-[url('/avatar-img/ankit.png')] bg-cover bg-center" />
                  </div>
                </div>
                <div className="ml-[2px] mt-4 font-plusJakartaSans text-white font-normal text-[19.8px]">
                  Ankit&nbsp;&nbsp;Alkesh
                </div>
              </div>

              <div className="relative -left-6 -top-3 rounded-full bg-white pl-8  pr-6 py-2 font-plusJakartaSans text-black font-normal text-[19.8px] shadow">
                12 guests
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 font-plusJakartaSans text-white font-normal text-[16px] shadow-lg hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <TypingIcon />
              Go to chat
            </button>
          </div>
        </div>
      </div>
      <PaymentModal
        onAddNewCardClick={handleNavigateToAddCard}
        isOpen={isPaymentModalOpen}
        onClose={handleClosePayment}
        //onPayWithWalletClick={handleNavigateToSendPayment}
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
      <EventPaymentModal
        isOpen={eventPaymentModelOpen}
        onClose={() => setEventPaymentModalOpen(false)}
        onPayWithWalletClick={handleNavigateToSendPayment}
        amountToPay={amountToPay}
        cartData={[]}
        onEventCreate={() => {
          afterPayment();
          setEventPaymentModalOpen(false);
        }}
      />
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
      <AddCardModal isOpen={isAddCardModalOpen} onClose={handleCloseAddCard} />
    </>
  );
};

export default EventMatched;
