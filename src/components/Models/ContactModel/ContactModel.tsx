"use client";

import React, { useState } from "react";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { CloseIcon } from "../../../../public/svg-icons/icons";
import InputComponent from "@/components/InputComponent/InputComponent";
import TextAreaComponent from "@/components/TextAreaComponent/TextAreaComponent";
import Image from "next/image";
import ErrorModel from "../ErrorModel/ErrorModel";
import SuccessModel from "../SuccessModel/SuccessModel";
import { customerSupport } from "@/routes/profile";
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

  // ---------- form for login details -----------
  const [form, setForm] = useState({
    supportType: "",
    supportMessage: "",
  });

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) {
    return null; // Don't render anything if the modal is not open
  }

  // -------- handleChange for input fields ---------
  const handleInputChange = (value: string | Boolean, name: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (loading) return;
    if (!form.supportType || !form.supportMessage.trim()) {
      setError("All fields are required.");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return;
    }
    setLoading(true);
    try {
      const data = await customerSupport(form);
      if (data?.success) {
        setSuccess("Your message has been sent successfully.");
        setShowSuccessModel(true);
        // reset the form
        setForm({
          supportType: "",
          supportMessage: "",
        });
        setTimeout(() => setShowSuccessModel(false), 3600);
      } else {
        setError(data?.message || "An error occurred");
        setShowErrorModel(true);
        setTimeout(() => setShowErrorModel(false), 3600);
        return;
      }
    } catch (error) {
      setError("An error occurred");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
    } finally {
      setLoading(false);
    }
  };

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
            className={`${
              showErrorModel || showSuccessModel
                ? "bg-app-background-primary"
                : "bg-app-background-model"
            } w-full max-w-md p-6 sm:p-8 rounded-t-4xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            {/* Top section: Icon, Title, Close Button */}
            <div className="flex items-center justify-between mb-[25px]">
              <div></div>
              <h1 className="text-[19px] font-semibold text-app-text-primary font-plusJakartaSans-700">
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
              <p className="text-[16px] font-plusJakartaSans-400 text-app-text-profile-tabs mb-[16px]">
                Choose a reason
              </p>
              <div>
                {contactReasons.map((item, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 cursor-pointer mb-3"
                    onClick={() => {
                      handleInputChange(item.value, "supportType");
                    }}
                  >
                    <input
                      type="radio"
                      name={""}
                      value={form.supportType}
                      className="peer hidden"
                    />

                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        item.value !== form.supportType
                          ? "border-app-button-radio"
                          : "border-app-button-blue"
                      } flex items-center justify-center`}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          item.value !== form.supportType
                            ? ""
                            : "bg-app-button-blue"
                        } transition-all`}
                      />
                    </div>
                    <p className="text-sm text-app-text-profile-tabs font-plusJakartaSans">
                      {item.label}
                    </p>
                  </label>
                ))}
              </div>
              <p className="text-[16px] font-plusJakartaSans-400 text-app-text-profile-tabs mt-[15px] mb-[8px]">
                Comment
              </p>
              <div>
                <TextAreaComponent
                  placeholder="Add your comment"
                  value={form.supportMessage}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "supportMessage")
                  }
                />
              </div>
              <div className="pt-4 mt-[24px]">
                <button
                  className="w-full text-[16px] mb-[12px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Send
                </button>
                <Image
                  src="/bg-imgs/auth/robot-img.png"
                  alt="robot icon"
                  width={38}
                  height={38}
                  className="ml-2"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <SuccessModel
        isOpen={showSuccessModel}
        onClose={() => {
          setShowSuccessModel(false);
          setSuccess("");
        }}
        successMessage={success || ""}
      />
      <ErrorModel
        isOpen={showErrorModel}
        onClose={() => {
          setShowErrorModel(false);
          setError("");
        }}
        errorMessage={error || ""}
      />
    </div>
  );
};

export default ContactModel;
