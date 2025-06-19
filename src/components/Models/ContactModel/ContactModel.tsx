import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import React, { useState } from "react";
import { CloseIcon } from "../../../../public/svg-icons/icons";
import InputComponent from "@/components/InputComponent/InputComponent";
import TextAreaComponent from "@/components/TextAreaComponent/TextAreaComponent";
// props types
type ContactModelProps = {
  isOpen: boolean;
  onClose: () => void;
};

const contactReasons = [
  { id: 1, label: "Business", value: "business" },
  { id: 2, label: "Complaint", value: "complaint" },
  { id: 3, label: "Improvement", value: "improvement" },
];

const ContactModel: React.FC<ContactModelProps> = ({ isOpen, onClose }) => {
  // --------- state for loading spinner ---------
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

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
              <h1 className="text-2xl font-bold text-app-text-primary font-plusJakartaSans">
                Contact
              </h1>
              <button
                onClick={() => {
                  onClose();
                }}
                aria-label="Close notification prompt"
                className="p-1 -m-1 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <CloseIcon className="text-app-icon" />
              </button>
            </div>

            {/* body */}
            <div className="flex flex-col">
              <p className="text-sm font-plusJakartaSans text-app-text-primary mb-5">
                Choose a reason
              </p>
              <div>
                {contactReasons.map((item, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 cursor-pointer mb-3"
                    onClick={() => {
                      setValue(item.value);
                      console.log("Selectedsss value:", item.value);
                    }}
                  >
                    <input
                      type="radio"
                      name={""}
                      value={value}
                      className="peer hidden"
                    />

                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        item.value !== value
                          ? "border-app-button-primary"
                          : "border-app-button-blue"
                      } flex items-center justify-center`}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          item.value !== value ? "" : "bg-app-button-blue"
                        } transition-all`}
                      />
                    </div>
                    <p className="text-sm text-app-text-primary font-plusJakartaSans">
                      {item.label}
                    </p>
                  </label>
                ))}
              </div>
              <p className="text-sm font-plusJakartaSans text-app-text-primary mb-5">
                Comment
              </p>
              <div>
                <TextAreaComponent placeholder="Add your comment" />
              </div>
              <div className="pt-4">
                <button
                  className="w-full bg-app-button-primary text-app-text-tertiary py-3.5 rounded-lg font-plusJakartaSans text-md"
                  onClick={() => () => {}}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactModel;
