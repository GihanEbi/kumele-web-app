import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import React, { useState } from "react";
import { CloseIcon, CopyIcon } from "../../../../public/svg-icons/icons";
import Image from "next/image";
// props types
type ReferralModelProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ReferralModel: React.FC<ReferralModelProps> = ({ isOpen, onClose }) => {
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
            {/* Top section: Icon, Title, Close Button */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-app-text-primary font-plusJakartaSans"></h1>
              <button
                onClick={() => {
                  onClose();
                }}
                aria-label="Close notification prompt"
                className="p-1 -m-1 text-gray-500 hover:text-gray-700 transition-colors justify-end"
              >
                <CloseIcon className="text-app-icon" />
              </button>
            </div>
            <div>
              <h1 className="text-lg font-bold text-app-text-primary text-center font-plusJakartaSans">
                {" "}
                Invite your friends to Kumele
              </h1>
              <div className="flex flex-col items-center justify-center">
                <p className="text-sm text-app-text-primary font-plusJakartaSans mt-2">
                  Referral code
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-app-text-blue font-plusJakartaSans text-md font-bold tracking-widest">
                    {"SXF2RS4"}
                  </span>
                  <Image
                    src="/images/copy-img.png"
                    alt="Copy"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <div className="border-t-1 border-app-text-secondary mt-4"></div>
              <div className="grid grid-cols-4 gap-y-4 p-6 pt-2 mt-4">
                {/* Share Item: Copy to clipboard */}
                <button className="flex flex-col items-center gap-2 group">
                  <div className="">
                    <Image
                      src="/images/copy-img.png"
                      alt="Copy"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                    />
                  </div>
                  <span className="text-xs text-app-text-primary text-center font-plusJakartaSans">
                    Copy to
                    <br />
                    clipboard
                  </span>
                </button>
                <button className="flex flex-col items-center gap-2 group">
                  <div className="">
                    <Image
                      src="/images/blutooth-img.png"
                      alt="Copy"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                    />
                  </div>
                  <span className="text-xs text-app-text-primary text-center font-plusJakartaSans">
                    Bluetooth
                  </span>
                </button>
                <button className="flex flex-col items-center gap-2 group">
                  <div className="">
                    <Image
                      src="/images/drive-img.png"
                      alt="Copy"
                      width={32}
                      height={32}
                      className="cursor-pointer"
                    />
                  </div>
                  <span className="text-xs text-app-text-primary text-center font-plusJakartaSans">
                    Drive
                  </span>
                </button>
                <button className="flex flex-col items-center gap-2 group">
                  <div className="">
                    <Image
                      src="/images/whatsapp-img.png"
                      alt="Copy"
                      width={32}
                      height={32}
                      className="cursor-pointer"
                    />
                  </div>
                  <span className="text-xs text-app-text-primary text-center font-plusJakartaSans">
                    Copy to
                    <br />
                    clipboard
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralModel;
