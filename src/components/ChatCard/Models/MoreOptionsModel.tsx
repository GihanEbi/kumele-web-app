"use client";
import React from "react";
import { FollowHostIcon, GestScanIcon, RateEventIcon, ReportEventIcon } from "../../../../public/svg-icons/icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MoreOptionsModel: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className={`inset-0 z-50 p-8
                 transition-opacity duration-300 ease-in-out
                 ${isOpen ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
    >
      <div className="inline-block top-0 rounded-3xl bg-app-background-model p-5 items-center">
        <ul className="flex flex-col items-start w-full">
          <li className="flex items-center gap-2 mb-4 cursor-pointer">
            <RateEventIcon className="text-app-icon" />
            <p className="text-[16px] font-plusJakartaSans-400 text-app-text-medal-model">
              Rate event
            </p>
          </li>
          <li className="flex items-center gap-2 mb-4 cursor-pointer">
            <ReportEventIcon className="text-app-icon" />
            <p className="text-[16px] font-plusJakartaSans-400 text-app-text-medal-model">
              Report event
            </p>
          </li>
          <li className="flex items-center gap-2 mb-4 cursor-pointer">
            <GestScanIcon className="text-app-icon" />
            <p className="text-[16px] font-plusJakartaSans-400 text-app-text-medal-model">
              Guest scan
            </p>
          </li>
          <li className="flex items-center gap-2 mb-4 cursor-pointer">
            <FollowHostIcon className="text-white" />
            <p className="text-[16px] font-plusJakartaSans-400 text-app-text-medal-model">
              Follow host
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MoreOptionsModel;
