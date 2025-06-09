import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import React, { useState } from "react";
import Image from "next/image";
import InputComponent from "@/components/InputComponent/InputComponent";
// props types
type DeleteAccountModelProps = {
  isOpen: boolean;
  onClose: () => void;
};
const DeleteAccountModel: React.FC<DeleteAccountModelProps> = ({
  isOpen,
  onClose,
}) => {
  // --------- state for loading spinner ---------
  const [loading, setLoading] = useState(false);

  if (!isOpen) {
    return null; // Don't render anything if the modal is not open
  }
  return (
    <div>
      {/* Loading spinner */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-1000 transition-opacity duration-300 ease-in-out"
          onClick={onClose}
        >
          <div
            className={`bg-app-background-model w-full max-w-md p-6 sm:p-8 rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <Image
                  src="/common-gifs/verification-wrong.gif"
                  alt="Success"
                  width={100}
                  height={100}
                />
              </div>
              <p className="text-app-text-primary font-plusJakartaSans text-md font-bold mb-6 text-center">
                Are you sure? This action cannot be undone. Please retype
                password.
              </p>
            </div>

              <div className="w-full">
                <div className="mb-6">
                  <InputComponent
                    placeholder="Enter password to delete account"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                    }}
                    className="flex-1 py-1 px-4 bg-app-button-primary text-app-text-tertiary rounded-lg font-plusJakartaSans"
                  >
                    No
                  </button>
                  <button
                    className="flex-1 py-3 px-4 bg-app-button-primary text-app-text-tertiary rounded-lg font-plusJakartaSans"
                    onClick={() => {
                    }}
                  >
                    Delete account
                  </button>
                </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccountModel;
