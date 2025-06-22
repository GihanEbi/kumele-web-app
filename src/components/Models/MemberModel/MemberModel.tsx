import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import React, { useState } from "react";
import Image from "next/image";
import NotificationBadge from "@/components/NotificationCard/NotificationBadge";
import { SpiritualityNotificationIcon } from "../../../../public/svg-icons/icons";
// props types
type ModelProps = {
  isOpen: boolean;
  onClose: () => void;
};
const MemberModel: React.FC<ModelProps> = ({ isOpen, onClose }) => {
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
            <div className="flex flex-col items-center">
              <div className="bg-app-text-blue p-1 rounded-full mb-[8px]">
                <Image
                  src="/followers/9.png"
                  alt="Member Image"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
              <p className="text-[13px] font-plusJakartaSans-400 text-app-text-profile-tabs mb-[20px]">
                Guest Franklin
              </p>
              <h1 className="text-[19px] font-semibold text-app-text-primary font-plusJakartaSans-700">
                Group meditation
              </h1>
              <div>
                <NotificationBadge
                  icon={<SpiritualityNotificationIcon />}
                  name={"Spirituality"}
                />
              </div>
              <p className="text-[13px] font-plusJakartaSans-400 text-app-text-profile-tabs mt-[8px]">
                Hosted by Ankit Maheshwari
              </p>
              <p className="text-[13px] font-plusJakartaSans-400 text-app-text-profile-tabs mt-[8px]">
                Indore,Madhya Pradesh, IN
              </p>
              <button
                className="w-full mt-[64px] text-[16px] mb-[12px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
                onClick={() => () => {}}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberModel;
