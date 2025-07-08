import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import React, { useState } from "react";
import Image from "next/image";
import InputComponent from "@/components/InputComponent/InputComponent";
import { SignOutIcon } from "../../../../public/svg-icons/icons";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
// props types
type SignoutModelProps = {
  isOpen: boolean;
  onClose: () => void;
};
const SignoutModel: React.FC<SignoutModelProps> = ({ isOpen, onClose }) => {
  // --------- state for loading spinner ---------
  const [loading, setLoading] = useState(false);

  // use the appContext to get the more option state
  const { setIsPartnerShipAccount } = useAppContext();
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
            className={`bg-app-background-model w-full max-w-md p-6 sm:p-8 rounded-t-4xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            <div className="flex flex-col items-center mb-5">
              <SignOutIcon className="text-app-icon" width={90} height={90} />
              <div className="mb-4"></div>
              <p className="px-10 text-app-text-primary font-plusJakartaSans-700 text-[19px] font-semibold mb-6 text-center">
                Are you sure you want to signout?
              </p>
            </div>

            <div className="w-full mb-12">
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                  }}
                  className="text-[16px] flex-1 py-3 px-4 bg-app-button-primary text-app-text-tertiary rounded-lg font-plusJakartaSans-400"
                >
                  Cancel
                </button>
                <button
                  className="text-[16px] flex-1 py-3 px-4 bg-app-button-primary text-app-text-tertiary rounded-lg font-plusJakartaSans-400"
                  onClick={() => {
                    setIsPartnerShipAccount(false);
                    router.push("/");
                  }}
                >
                  Signout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignoutModel;
