"use client";
import React from "react";
import { useState, useEffect } from "react";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import {
  CloseIcon,
  NotificationIcon,
} from "../../../../public/svg-icons/icons";

// props types
type NotificationsProps = {
  isOpen: boolean;
  onClose: Function;
};

const Notifications: React.FC<NotificationsProps> = ({ isOpen, onClose }) => {
  // --------- state for loading spinner ---------
  const [loading, setLoading] = useState(false);
  return (
    <div>
      {/* Loading spinner */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}
      <div
        className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-50 transition-opacity duration-300 ease-in-out"
        //   onClick={onClose}
      >
        <div
          className={`bg-app-background-model w-full max-w-md p-6 sm:p-8 rounded-t-4xl shadow-xl transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
          }`}
          onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
        >
          {/* Top section: Icon, Title, Close Button */}
          <div className="flex items-start justify-between mb-4">
            <div className="pt-1">
              {" "}
              <NotificationIcon className="text-app-icon" width={28} height={28}/>
              {/* To align bell better with multi-line title */}
            </div>
            <h2 className="text-[19px] font-plusJakartaSans-700 text-app-text-primary text-center flex-grow px-3 leading-tight">
              "Kumele" Would Like to
              <br />
              Send You Push Notifications
            </h2>
            <button
              onClick={() => {
                onClose(false);
              }}
              aria-label="Close notification prompt"
              className="p-1 -m-1 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <CloseIcon className="text-app-icon" width={24} height={24}/>
            </button>
          </div>

          <p className="text-[16px] text-app-text-notifications-body font-plusJakartaSans-400 text-center mb-[90px] px-2">
            Notifications may include alerts, sounds and icon badges. These can
            be configured in Settings.
          </p>
          <div className="space-y-3 mb-4">
            <button
              //   onClick={handleDontAllow}
              className="w-full text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg mb-[16px]"
              onClick={() => {
                onClose(false);
              }}
            >
              Don't Allow
            </button>
            <button
              onClick={() => {
                onClose(true), console.log("Notification permission: true");
              }}
              className="w-full text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
            >
              Allow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
