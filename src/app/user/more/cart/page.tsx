"use client";
import { AddCardModal } from "@/components/PaymentModal/AddNewCard/AddNewCard";
import { PaymentModal } from "@/components/PaymentModal/PaymentModal";
import { SendPaymentModal } from "@/components/PaymentModal/SendPayment/SendPayment";
import { CoinbasePaymentModal } from "@/components/PaymentModal/CoinBasePaymentModal/CoinBasePaymentModal";
import React, { useState } from "react";
import { PaymentCompleteModal } from "@/components/PaymentModal/PaymentCompleteModal/PaymentCompleteModal";

const page = () => {
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(true);
  const [isAddCardModalOpen, setAddCardModalOpen] = useState(false);
  const [isSendPaymentOpen, setSendPaymentOpen] = useState(false);
  const [isCoinbaseOpen, setCoinbaseOpen] = useState(false);
  const [isThankYouOpen, setThankYouOpen] = useState(false);

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
    setPaymentModalOpen(false);
    setSendPaymentOpen(true);
  };
  const handleCloseSendPayment = () => {
    setSendPaymentOpen(false);
    setPaymentModalOpen(true);
  };
  const handleCloseCoinbase = () => {
    setCoinbaseOpen(false);
    setSendPaymentOpen(true);
  };
  const handleNavigateToCoinbase = () => {
    setSendPaymentOpen(false);
    setCoinbaseOpen(true);
  };
  const handleNavigateToThankYou = () => {
    setCoinbaseOpen(false);
    setThankYouOpen(true);
  };

  const handleCloseThankYou = () => {
    setThankYouOpen(false);
    setPaymentModalOpen(true);
  };

  return (
    <div>
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
      <CoinbasePaymentModal
        onPayWithCoinbaseClick={handleNavigateToThankYou}
        isOpen={isCoinbaseOpen}
        onClose={handleCloseCoinbase}
      />
      <PaymentCompleteModal
        isOpen={isThankYouOpen}
        onClose={handleCloseThankYou}
      />
      ,
    </div>
  );
};

export default page;
