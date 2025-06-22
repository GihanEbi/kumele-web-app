"use client";

import React, { useState } from "react";
import {
  BackToPageIcon,
  Confetti2Icon,
  EthereumIcon,
  DodgeCoinIcon,
  USDCoinIcon,
} from "../../../../public/svg-icons/icons";

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
);

const cryptoOptions = [
  { name: "Ethereum", icon: EthereumIcon, colorClass: "text-gray-800" },
  { name: "Dogecoin", icon: DodgeCoinIcon, colorClass: "text-yellow-500" },
  { name: "USD Coin", icon: USDCoinIcon, colorClass: "text-blue-600" },
];

interface CoinbasePaymentModalProps {
  isOpen: boolean;
  onClose: () => void; // Used for the new back button
  onPayWithCoinbaseClick: () => void;
}

export const CoinbasePaymentModal: React.FC<CoinbasePaymentModalProps> = ({
  isOpen,
  onClose,
  onPayWithCoinbaseClick,
}) => {
  const [selectedCoin, setSelectedCoin] = useState("Ethereum");

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[2000] flex flex-col font-sans bg-app-background-primary pt-[64px]">
      <div className="flex-grow w-full max-w-sm mx-auto p-6 flex flex-col">
        {/* Added a functional Back button --- */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={onClose} className="p-2 -ml-2">
            {/* <BackToPageIcon className="w-6 h-6" /> */}
          </button>
          <div className="flex items-center gap-2">
            <Confetti2Icon className="w-10 h-10" />
            <h1 className="text-app-blog-card-heading font-plusJakartaSans font-normal text-[28px]">
              Event Ads
            </h1>
          </div>
          {/* Empty div to balance the flexbox layout */}
          <div className="w-6 h-6 p-2"></div>
        </div>

        {/* Details Section */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Confetti2Icon className="w-6 h-6" />
              <h2 className="text-app-blog-card-heading font-plusJakartaSans font-normal text-[18px]">
                Event Ads
              </h2>
            </div>
            <ChevronDownIcon className="w-6 h-6 text-gray-500" />
          </div>

          <span className="text-app-blog-card-author-text font-plusJakartaSans font-normal text-[16px]">
            Total
          </span>
          <p className="text-app-text-blue font-plusJakartaSans font-bold text-[23px] mt-1">
            $23.07
          </p>

          <button
            onClick={onPayWithCoinbaseClick}
            className="w-full bg-app-button-primary text-app-button-text-color font-plusJakartaSans font-normal text-[16px] py-4 rounded-lg mt-4"
          >
            Pay with Coinbase
          </button>
        </div>
        {/* "Or" Divider */}
        <div className="my-6 flex items-center gap-x-4">
          <div className="h-px flex-1 bg-app-range-slider-track-active"></div>
          <span className="text-app-blog-card-author-text font-plusJakartaSans font-normal text-[16px]">
            Or select a crypto currency
          </span>
          <div className="h-px flex-1 bg-app-range-slider-track-active"></div>
        </div>

        {/* Crypto Selection List */}
        <div className="border border-app-range-slider-track-active  w-full">
          {cryptoOptions.map((crypto, index) => {
            const isSelected = selectedCoin === crypto.name;
            return (
              <div
                key={crypto.name}
                onClick={() => setSelectedCoin(crypto.name)}
                className={`flex items-center gap-4 p-4 cursor-pointer ${
                  index > 0 ? "border-t border-gray-200" : ""
                }`}
              >
                <div
                  className={`w-5 h-5 border-2 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isSelected
                      ? "border-app-radio-button-color"
                      : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 bg-app-radio-button-color rounded-full"></div>
                  )}
                </div>

                <crypto.icon className={`w-6 h-6 ${crypto.colorClass}`} />
                <span className="text-app-blog-card-author-text font-plusJakartaSans font-normal text-[16px]">
                  {crypto.name}
                </span>
              </div>
            );
          })}
        </div>

        <button className="text-blue-600 font-plusJakartaSans font-semibold text-[16px] mt-4">
          Show more
        </button>
      </div>
      
      <div className="w-full text-center pb-10">
        <p className="text-sm font-plusJakartaSans font-normal text-app-blog-card-author-text">
          Payments processed by{" "}
          <a href="#" className="text-app-text-blue">
            Coinbase Commerce
          </a>
        </p>
      </div>
    </div>
  );
};
