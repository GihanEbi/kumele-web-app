import React from "react";
import { CloseIcon } from "../../../../public/svg-icons/icons";
// props types
type AboutUsModelProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AboutUsModel: React.FC<AboutUsModelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null; // Don't render anything if the modal is not open
  }
  return (
    <div>
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
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-app-text-primary font-plusJakartaSans">
                About us
              </h1>
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
            <div className="mt-5">
              <p className="text-app-text-primary font-plusJakartaSans text-sm mb-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id
                ipsa, corporis amet explicabo reiciendis totam iure fugiat
                consequuntur repellat saepe! Ut facilis magnam voluptatum
                molestiae. Dicta quis reprehenderit necessitatibus veniam.
              </p>
              <p className="text-app-text-primary font-plusJakartaSans text-sm mb-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id
                ipsa, corporis amet explicabo reiciendis totam iure fugiat
                consequuntur repellat saepe! Ut facilis magnam voluptatum
                molestiae. Dicta quis reprehenderit necessitatibus veniam.
              </p>
              <p className="text-app-text-primary font-plusJakartaSans text-sm mb-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id
                ipsa, corporis amet explicabo reiciendis totam iure fugiat
                consequuntur repellat saepe! Ut facilis magnam voluptatum
                molestiae. Dicta quis reprehenderit necessitatibus veniam.
              </p>
              <p className="text-app-text-primary font-plusJakartaSans text-sm mb-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id
                ipsa, corporis amet explicabo reiciendis totam iure fugiat
                consequuntur repellat saepe! Ut facilis magnam voluptatum
                molestiae. Dicta quis reprehenderit necessitatibus veniam.
              </p>
              <p className="text-app-text-primary font-plusJakartaSans text-sm mb-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id
                ipsa, corporis amet explicabo reiciendis totam iure fugiat
                consequuntur repellat saepe! Ut facilis magnam voluptatum
                molestiae. Dicta quis reprehenderit necessitatibus veniam.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUsModel;
