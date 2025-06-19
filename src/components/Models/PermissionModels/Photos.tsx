"use client";
import React from "react";
import { useState, useEffect } from "react";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import {
  CloseIcon,
  NotificationIcon,
  PictureIcon,
} from "../../../../public/svg-icons/icons";

// props types
type PhotosProps = {
  isOpen: boolean;
  onClose: Function;
};

const Photos: React.FC<PhotosProps> = ({ isOpen, onClose }) => {
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
          className={`bg-app-background-model w-full max-w-md p-6 sm:p-8 rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
          }`}
          onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
        >
          {/* Top section: Icon, Title, Close Button */}
          <div className="flex items-start justify-between mb-4">
            <div className="pt-1">
              {" "}
              <PictureIcon className="text-app-icon" />
              {/* To align bell better with multi-line title */}
            </div>
            <h2 className="font-plusJakartaSans font-bold text-app-text-primary text-center flex-grow px-3 leading-tight">
              "Kumele" Would to Access
              <br />
              Your Photos
            </h2>
            <button
              onClick={() => {
                onClose("none");
              }}
              aria-label="Close notification prompt"
              className="p-1 -m-1 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <CloseIcon className="text-app-icon" />
            </button>
          </div>

          <p className="text-sm text-app-text-primary font-plusJakartaSans text-center mb-6 px-2">
            Allow "Kumele" to access your photos to send images or videos
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                onClose("selected");
              }}
              className="w-full bg-app-button-primary text-app-text-tertiary py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Select Photos...
            </button>
            <button
              onClick={() => {
                onClose("all");
              }}
              className="w-full bg-app-button-primary text-app-text-tertiary py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Allow Access to All Photos
            </button>
            <button
              className="w-full bg-app-button-primary text-app-text-tertiary py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              onClick={() => {
                onClose("none");
              }}
            >
              Don't Allow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photos;
