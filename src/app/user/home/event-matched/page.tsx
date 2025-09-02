"use client";

import { Fredoka } from "next/font/google";
import { TypingIcon, YingYang2 } from "../../../../../public/svg-icons/icons";
import { PaymentModal } from "@/components/PaymentModal/PaymentModal";
import { AddCardModal } from "@/components/PaymentModal/AddNewCard/AddNewCard";
import { useState } from "react";

const Fredoka_font = Fredoka({ subsets: ["latin"], weight: ["700"] });

export default function Home() {
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isAddCardModalOpen, setAddCardModalOpen] = useState(false);

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
  return (
    <>
      <div className="relative h-screen w-full bg-[url('/bg-imgs/preview-event.jpg')] bg-cover bg-center">
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
              onClick={handleOpenPayment}
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
      <AddCardModal isOpen={isAddCardModalOpen} onClose={handleCloseAddCard} />
    </>
  );
}
