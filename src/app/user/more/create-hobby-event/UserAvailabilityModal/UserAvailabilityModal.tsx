"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface UsersAroundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UsersAroundModal: React.FC<UsersAroundModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [showAlternateText, setShowAlternateText] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowAlternateText(true);
      }, 3000);

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 p-4 transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl mx-auto rounded-2xl bg-app-background-tertiary px-6 py-15 shadow-xl"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <div className="mb-4">
            <Image
              src="/common-gifs/mug.gif"
              alt="mug"
              width={76}
              height={76}
            />
          </div>

          <h2 className="mb-2 text-title text-app-button-model-text-color">
            {showAlternateText
              ? "Users around"
              : "No user around"}
          </h2>

          <p className="text-body text-app-search-bar-text leading-loose">
            {showAlternateText ? (
              <>
               Potential matches matching your <br/>
               criteria found currently.
                
              </>
            ) : (
              <>
                Unfortunately, no potential matches currently, <br />
                but get rewarded by referring us <br />
                to new users. <br />
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
