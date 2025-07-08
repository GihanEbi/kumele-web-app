import React from "react";
import { CloseIcon } from "../../../../../public/svg-icons/icons";
import Image from "next/image";

interface ModelProps {
  isOpen: boolean;
  onClose: () => void;
}

const PreviewModel: React.FC<ModelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className={`fixed h-screen inset-0 z-50 flex items-center justify-center p-8
                 transition-opacity duration-300 ease-in-out
                 ${isOpen ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
    >
      <div
        className="w-full  rounded-3xl max-w-sm text-center bg-app-background-model p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end" onClick={onClose}>
          <CloseIcon className="text-app-icon" width={24} height={24} />
        </div>
        <div className="flex flex-col items-center">
          {/* <MedalGif width={75} height={75} /> */}

          <div className="pb-2 ">
            <Image
              width={312}
              height={202}
              className="rounded-t-2xl"
                // className="w-full h-65 object-cover rounded-t-2xl"
              src="/images/blog-image-1.jpg"
              alt="img"
            />
          </div>
          <p className="mt-3 text-app-text-medal-model font-plusJakartaSans-700 font-bold text-[17.9px] text-start">
            Singleton of Glen Ord 38-year old and the Singleton range.
          </p>

          {/* <p className="mt-3 leading-relaxed text-app-text-medal-model font-plusJakartaSans-400 font-normal text-[16px]">
            User created a minimum of 3 events or user attended a minimum of 3
            events without fail in the last 30 days. The user gets 4% discount
            of one in-app purchase of choice.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default PreviewModel;
