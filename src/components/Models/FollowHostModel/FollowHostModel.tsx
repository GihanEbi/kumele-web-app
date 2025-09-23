import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import React, { useState } from "react";
import { SignOutIcon, UserIcon } from "../../../../public/svg-icons/icons";
// props types
type ModelProps = {
  isOpen: boolean;
  onClose: () => void;
  onChange: Function;
};

const FollowHostModel: React.FC<ModelProps> = ({
  isOpen,
  onClose,
  onChange,
}) => {
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
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-1000 transition-opacity duration-300 ease-in-out"
          onClick={onClose}
        >
          <div
            className={`bg-app-background-model w-full max-w-md p-6 sm:p-8 rounded-t-4xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            <div className="flex flex-col items-center mb-5">
              <UserIcon className="text-app-icon" width={90} height={90} />
              <div className="mb-4"></div>
              <p className="px-10 text-app-text-primary font-plusJakartaSans-700 text-[19px] font-semibold mb-[24px] text-center">
                Follow host
              </p>
              <p className="px-10 text-app-text-secondary font-plusJakartaSans-400 text-[16px] mb-6 text-center">
                Do you want to follow host?
              </p>

              <div className="w-full mb-12">
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                    }}
                    className="text-[16px] flex-1 py-3 px-4 bg-app-button-primary text-app-text-tertiary rounded-lg font-plusJakartaSans-400"
                  >
                    No
                  </button>
                  <button
                    className="text-[16px] flex-1 py-3 px-4 bg-app-button-primary text-app-text-tertiary rounded-lg font-plusJakartaSans-400"
                    onClick={() => {
                      onChange();
                    }}
                  >
                    Follow host
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowHostModel;
