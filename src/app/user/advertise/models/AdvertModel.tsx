import React from "react";
import { LocationIcon } from "../../../../../public/svg-icons/icons";
// props types
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AdvertModel: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null; // Don't render anything if the modal is not open
  }
  return (
    <div>
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-8
                 transition-opacity duration-300 ease-in-out
                 ${isOpen ? "opacity-100" : "opacity-0"}`}
          onClick={onClose}
        >
          <div
            className="w-full max-w-sm text-center rounded-lg bg-app-background-card-secondary p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            <div className="flex flex-col ">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center ">
                  <LocationIcon className="text-app-background-card" />
                  <p className="text-[13.89px] text-app-text-tertiary font-plusJakartaSans-400">
                    122, Street
                  </p>
                </div>
                <div>
                  <p className="text-[13.89px] text-app-text-tertiary font-plusJakartaSans-400">
                    Area, Town
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center ">
                  <LocationIcon className="text-app-background-card" />
                  <p className="text-[13.89px] text-app-text-tertiary font-plusJakartaSans-400">
                    122, Street
                  </p>
                </div>
                <div>
                  <p className="text-[13.89px] text-app-text-tertiary font-plusJakartaSans-400">
                    Area, Town
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center ">
                  <LocationIcon className="text-app-background-card" />
                  <p className="text-[13.89px] text-app-text-tertiary font-plusJakartaSans-400">
                    122, Street
                  </p>
                </div>
                <div>
                  <p className="text-[13.89px] text-app-text-tertiary font-plusJakartaSans-400">
                    Area, Town
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center ">
                  <LocationIcon className="text-app-background-card" />
                  <p className="text-[13.89px] text-app-text-tertiary font-plusJakartaSans-400">
                    122, Street
                  </p>
                </div>
                <div>
                  <p className="text-[13.89px] text-app-text-tertiary font-plusJakartaSans-400">
                    Area, Town
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <p className="text-[9.89px] text-app-text-secondary font-plusJakartaSans-400">
                Powered by Google inc
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvertModel;
