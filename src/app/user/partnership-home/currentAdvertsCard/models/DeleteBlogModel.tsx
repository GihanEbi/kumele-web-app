import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import React, { useState } from "react";
import Image from "next/image";
import InputComponent from "@/components/InputComponent/InputComponent";
import ErrorGif from "@/components/GifComponents/ErrorGif/ErrorGif";
// props types
type DeleteBlogModelProps = {
  isOpen: boolean;
  onClose: () => void;
};
const DeleteBlogModel: React.FC<DeleteBlogModelProps> = ({
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
            className={`bg-app-background-model w-full max-w-md p-6 sm:p-8 rounded-t-4xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            <div className="flex flex-col items-center">
              <div className="mb-4">
                {/* <Image
                  src="/common-gifs/verification-wrong.gif"
                  alt="Success"
                  width={100}
                  height={100}
                /> */}
                <ErrorGif />
              </div>
              <p className="text-app-text-primary font-plusJakartaSans-700 text-[19px] font-semibold mb-6 text-center">
                Are you sure you want to <br /> delete this blog?
              </p>
            </div>

            <div className="w-full">
              <div className="flex space-x-3 mb-6">
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
                  onClick={() => {}}
                >
                  Delete 
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBlogModel;
