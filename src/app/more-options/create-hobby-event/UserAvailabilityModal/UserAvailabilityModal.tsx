"use client";

import HotChocolateGif from "@/components/GifComponents/HotChocolateGif/HotChocolateGif";
import React, { useEffect, useState } from "react";

interface UsersAroundModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAvailable: boolean;
}

const UsersAroundModal: React.FC<UsersAroundModalProps> = ({
  isOpen,
  onClose,
  isAvailable,
}) => {
  const [showAlternateText, setShowAlternateText] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowAlternateText(true);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setShowAlternateText(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-8"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-4xl bg-white dark:bg-black p-10 flex flex-col"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div className="mb-6">
          <HotChocolateGif/>
        </div>

        <div className="min-h-[140px]">
          <h2 className="mb-3 font-plusJakartaSans font-bold text-[19px] text-black dark:text-white">
            {isAvailable ? "Users around" : "No users around"}
          </h2>

          <p className="font-plusJakartaSans font-normal text-[16px] text-app-search-bar-text leading-relaxed">
            {isAvailable ? (
              <>
                Potential matches matching your <br />
                criteria found currently.
              </>
            ) : (
              <>
                Unfortunately, no potential matches currently but get
                <br />
                rewarded by referring us to new users.
                <br />
                It’s a win, win.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsersAroundModal;
