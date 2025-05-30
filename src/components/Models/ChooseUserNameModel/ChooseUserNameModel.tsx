"use client";
import React from "react";
import { useState, useEffect } from "react";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { CloseIcon, UserIcon } from "../../../../public/svg-icons/icons";

// props types
type UserNameProps = {
  isOpen: boolean;
  onClose: Function;
};

const ChooseUserNameModel: React.FC<UserNameProps> = ({ isOpen, onClose }) => {
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
      <div className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-50 transition-opacity duration-300 ease-in-out">
        <div
          className={`bg-white w-full max-w-md p-6 sm:p-8 rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
          }`}
          onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
        >
          {/* Top section: Icon, Title, Close Button */}
          <div className="flex items-start justify-between mb-4">
            <div className="pt-1">
              {" "}
              <UserIcon />
              {/* To align bell better with multi-line title */}
            </div>
            <h2 className="text-md font-bold text-center text-black flex-grow px-3 leading-tight">
              Choose your username
            </h2>
            <button
              onClick={() => {
                onClose(false);
              }}
              aria-label="Close notification prompt"
              className="p-1 -m-1 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUserNameModel;
