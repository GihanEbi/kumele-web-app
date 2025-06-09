// src/components/UsersAroundModal.tsx
import React, { useEffect } from "react";
import Image from "next/image";

interface UsersAroundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UsersAroundModal: React.FC<UsersAroundModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-none bg-opacity-40 transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-15 shadow-xl"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <div className="mb-4">
            <Image
              src="/common-gifs/mug.gif"
              alt="mug"
              width={40}
              height={40}
            />
          </div>

          <h2 className="mb-2 text-xl font-bold text-gray-900">Users around</h2>

          <p className="text-gray-500">
            Potential matches matching your criteria found currently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsersAroundModal;
