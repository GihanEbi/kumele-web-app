"use client";
import React from "react";
import { useState, useEffect } from "react";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { CloseIcon, UserIcon } from "../../../../public/svg-icons/icons";
import { set_user_name } from "@/routes/permissions_and_hobbies";
import InputComponent from "@/components/InputComponent/InputComponent";

// props types
type UserNameProps = {
  isOpen: boolean;
  onClose: Function;
};

const ChooseUserNameModel: React.FC<UserNameProps> = ({ isOpen, onClose }) => {
  // --------- state for loading spinner ---------
  const [loading, setLoading] = useState(false);

  // ------- state for username permissions ------
  const [userNameForm, setUserNameForm] = useState({
    action: "skip", // default action is skip
    username: "",
  });

  //   state for username input
  const [usernameInput, setUsernameInput] = useState("");

  // Function to submit username
  const handleSubmitUserName = async (action: string) => {
    setLoading(true);
    let dataObj;

    if (action === "skip") {
      // If action is skip, we don't need to send username
      dataObj = {
        action: action,
      };
    } else {
      dataObj = {
        action: action,
        username: usernameInput.trim(), // Use trimmed input
      };
    }
    try {
      // Here you would typically send the username data to your backend
      console.log("Submitting username with data:", dataObj);

      const data = await set_user_name(dataObj);
      console.log("Username submission response:", data);

      if (data.success) {
        console.log("Username submitted successfully");
        setLoading(false); // Reset loading state after submission
        onClose();
      } else {
        console.error("Failed to submit username:", data);
        setLoading(false); // Reset loading state on failure
        onClose();
      }
    } catch (error) {
      console.error("Error submitting username:", error);
      setLoading(false);
      onClose();
    } finally {
      setLoading(false);
      onClose();
    }
  };
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
          className={`bg-app-background-model w-full max-w-md p-6 sm:p-8 rounded-t-4xl shadow-xl transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
          }`}
          onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
        >
          {/* Top section: Icon, Title, Close Button */}
          <div className="flex items-start justify-between mb-6">
            <div className="pt-1">
              {" "}
              <UserIcon className="text-app-icon" width={28} height={28} />
              {/* To align bell better with multi-line title */}
            </div>
            <h2 className="text-[19px] font-plusJakartaSans-700 text-app-text-primary text-center flex-grow px-3 leading-tight">
              Choose your username
            </h2>
            <button
              onClick={() => {
                setUserNameForm((prev) => ({ ...prev, action: "skip" }));
                handleSubmitUserName("skip");
              }}
              aria-label="Close notification prompt"
              className="p-1 -m-1 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <CloseIcon className="text-app-icon" width={24} height={24} />
            </button>
          </div>

          <p className="text-[16px] text-app-text-notifications-body font-plusJakartaSans-400 text-center mb-[24px] px-2">
            Usernames can only be changed every 3 months
          </p>

          <div className="w-full">
            <div className="mb-[32px]">
              <p className="text-[16px] text-app-text-primary font-plusJakartaSans-400 mb-1 px-2">
                Username
              </p>
              <InputComponent
                placeholder="Enter your user name"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
              />
            </div>
            <div className="space-y-3 mb-[16px]">
              <button
                className="w-full text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
                onClick={() => {
                  setUserNameForm((prev) => ({ ...prev, action: "skip" }));
                  handleSubmitUserName("skip");
                }}
              >
                Skip
              </button>
              <button
                onClick={() => {
                  setUserNameForm((prev) => ({ ...prev, action: "save" }));
                  handleSubmitUserName("save");
                }}
                className="w-full text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
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

export default ChooseUserNameModel;
