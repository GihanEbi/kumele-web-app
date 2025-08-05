import React from "react";
import { CloseIcon, LinkIcon } from "../../../../../public/svg-icons/icons";

interface InsertLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InsertLinkModal: React.FC<InsertLinkModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-opacity-75 flex items-center justify-center z-50">
      {/* Modal Container */}

      <div className="bg-white dark:bg-black rounded-[24px] shadow-xl w-auto h-[178px] flex flex-col justify-center items-center p-5 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>

        {/* Modal Header */}

        <h2 className="font-plusJakartaSans font-bold text-[23px] text-black dark:text-white mb-4">
          Insert Link your link
        </h2>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <LinkIcon />
          </div>
          <input
            type="text"
            placeholder="Add your link..."
            className="w-[233px] h-[38px] bg-app-search-bar-background border-none rounded-xl py-2 pl-12 pr-4 text-gray-700 placeholder-gray-500 placeholder:font-plusJakartaSans placeholder:text-[12.98px] placeholder:font-normal placeholder:text-app-search-bar-text"
          />
        </div>
      </div>
    </div>
  );
};

export default InsertLinkModal;
