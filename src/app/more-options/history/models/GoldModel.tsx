import React from "react";
import MedalGif from "@/components/GifComponents/MedalGif/MedalGif";
import { CloseIcon } from "../../../../../public/svg-icons/icons";

interface ModelProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoldModel: React.FC<ModelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-8
                 transition-opacity duration-300 ease-in-out
                 ${isOpen ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm text-center rounded-3xl bg-app-background-model p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end" onClick={onClose}>
          <CloseIcon className="text-app-icon" width={24} height={24} />
        </div>
        <div className="flex flex-col items-center">
          <MedalGif width={75} height={75} />

          <h2 className="mt-6 text-app-button-model-text-color font-plusJakartaSans font-bold text-[19px]">
            Gold Status
          </h2>

          <p className="mt-3 leading-relaxed text-app-text-medal-model font-plusJakartaSans-400 font-normal text-[16px]">
            User created a minimum of 4 events or user attended a minimum of 4
            events without fail in the last 30 days. The user gets 8% discount
            of one in-app purchase of choice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoldModel;
