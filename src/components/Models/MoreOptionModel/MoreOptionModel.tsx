import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import React, { useState } from "react";
import {
  BinocularsIcon,
  CartIcon,
  ChatIcon,
  CloseIcon,
  CopyIcon,
  CreateHobbyIcon,
  HistoryAndStatisticsIcon,
  NotificationNewIcon,
  YellowCircleIcon,
  YellowIcon,
} from "../../../../public/svg-icons/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
// props types
type MoreModelProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ChatNotificationIcon() {
  return (
    <div className="relative inline-block">
      <ChatIcon className="" />
      <YellowCircleIcon className="absolute -top-0 -right-0" />
    </div>
  );
}

export function CartnewIcon() {
  return (
    <div className="relative inline-block">
      <CartIcon className="" />
      <YellowIcon className="absolute -top-2 -right-2" />
    </div>
  );
}

const MoreOptionModel: React.FC<MoreModelProps> = ({ isOpen, onClose }) => {
  // --------- state for loading spinner ---------
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
            className={`bg-app-background-more-model w-full max-w-md p-6 sm:p-8 rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-out ${
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
            <div className="grid grid-cols-3 gap-y-4 p-6 pt-2 mt-4">
              <button
                className="flex flex-col items-center gap-2 group"
                onClick={() => {
                  router.push("/more-options/create-hobby-event");
                  onClose();
                }}
              >
                <div className="">
                  {/* <Image
                    src="/images/create-event-img.png"
                    alt="Copy"
                    width={36}
                    height={36}
                    className="cursor-pointer"
                  /> */}
                  <CreateHobbyIcon />
                </div>
                <span className="text-xs text-app-text-primary text-center font-plusJakartaSans">
                  Create Hobby Events
                </span>
              </button>
              <button
                className="flex flex-col items-center gap-2 group"
                onClick={() => {
                  router.push("/more-options/filter");
                  onClose();
                }}
              >
                <div className="mt-4">
                  {/* <Image
                    src="/images/find-event-img.png"
                    alt="Copy"
                    width={36}
                    height={36}
                    className="cursor-pointer text-gray-600"
                  /> */}
                  <BinocularsIcon />
                </div>
                <span className="text-xs text-app-text-primary text-center font-plusJakartaSans">
                  Find Hobby Events
                </span>
              </button>
              <button
                className="flex flex-col items-center gap-0 group"
                onClick={() => {
                  router.push("/more-options/history");
                  onClose();
                }}
              >
                <div className="mt-2">
                  {/* <Image
                    src="/images/history-img.png"
                    alt="Copy"
                    width={36}
                    height={36}
                    className="cursor-pointer "
                  /> */}
                  <HistoryAndStatisticsIcon />
                </div>
                <span className="text-xs text-app-text-primary text-center font-plusJakartaSans">
                  History & Statistics
                </span>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-y-4 p-6 pt-2 mt-4">
              <button
                className="flex flex-col items-center gap-2 group"
                onClick={() => {
                  router.push("/more-options/notifications");
                  onClose();
                }}
              >
                <div className="">
                  {/* <Image
                    src="/images/notification-img.png"
                    alt="Copy"
                    width={42}
                    height={42}
                    className="cursor-pointer"
                  /> */}
                  <NotificationNewIcon />
                </div>
                <span className="text-xs text-app-text-primary text-center font-plusJakartaSans">
                  Notifications
                </span>
              </button>
              <button
                className="flex flex-col items-center gap-0 group"
                onClick={() => {
                  router.push("/user/more/chat");
                  onClose();
                }}
              >
                <div className="">
                  {/* <Image
                    src="/images/chat-img.png"
                    alt="Copy"
                    width={36}
                    height={36}
                    className="cursor-pointer"
                  /> */}
                  <ChatNotificationIcon />
                </div>
                <span className="text-xs text-app-text-primary text-center font-plusJakartaSans ">
                  Chat
                </span>
              </button>
              <button
                onClick={() => {
                  router.push("/more-options/cart");
                  onClose();
                }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="mt-2">
                  {/* <Image
                    src="/images/cart-img.png"
                    alt="Copy"
                    width={36}
                    height={36}
                    className="cursor-pointer"
                  /> */}
                  <CartnewIcon />
                </div>
                <span className="text-xs text-app-text-primary text-center font-plusJakartaSans">
                  Cart
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreOptionModel;
