"use client";
import React from "react";
import { useState, useEffect } from "react";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { CloseIcon } from "../../../../../../public/svg-icons/icons";
import { set_user_name } from "@/routes/permissions_and_hobbies";
import InputComponent from "@/components/InputComponent/InputComponent";

// props types
type ContactProps = {
  isOpen: boolean;
  onClose: Function;
};

const Contact: React.FC<ContactProps> = ({ isOpen, onClose }) => {
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
            <h2 className="text-md font-bold text-center text-black flex-grow px-3 leading-tight">
              Choose your username
            </h2>
            <button
              onClick={() => {
                setLoading(false); // Reset loading state before closing
                onClose();
              }}
              aria-label="Close notification prompt"
              className="p-1 -m-1 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <CloseIcon />
            </button>
          </div>

          <p className="text-sm text-black text-center mb-6 px-2">
            Choose a reason
          </p>

          <div className="w-full">
            <div className="space-y-3">
              <button
                className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                onClick={() => {
                  setLoading(true);
                  // Simulate an API call
                  setTimeout(() => {
                    setLoading(false);
                    onClose();
                  }, 1000); // Simulate a 1 second delay
                }}
              >
                Skip
              </button>
              <button
                onClick={() => {
                  setLoading(true);
                  // Simulate an API call to save the username
                  setTimeout(() => {
                    setLoading(false);
                    onClose();
                  }, 1000); // Simulate a 1 second delay
                }}
                className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
