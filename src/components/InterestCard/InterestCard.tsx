import Image from "next/image";
import React from "react";

// --- Types ---
type Interest = {
  id: number;
  name: string;
  icon: React.JSX.Element;
};

// --- Interest Card Component ---
type InterestCardProps = {
  interest: Interest;
  isSelected: boolean;
  onToggle: (id: string) => void;
};

const InterestCard: React.FC<InterestCardProps> = ({
  interest,
  isSelected,
  onToggle,
}) => {
  const { id, name, icon } = interest;
  return (
    <button
      type="button"
      onClick={() => onToggle(String(interest.id))}
      className={`
        py-3 px-4 sm:p-4 rounded-[8.48px] flex flex-col h-[58.13px] w-[65px] items-center justify-center aspect-square
        transition-all duration-200 ease-in-out
      
        ${
          isSelected
            ? "bg-app-input-yellow text-app-text-black border border-[0.71px] border-red-600" // Selected style from image
            : "bg-app-input-primary" // Unselected style from image
        }
      `}
    >
      {icon}
      <span
        className={`text-center ${
          isSelected
            ? "text-app-text-interest-card-selected font-plusJakartaSans-700 text-[11.49px]" // Selected style from image
            : "text-app-text-interest-card-unselected font-plusJakartaSans-400 text-[11.49px]" // Unselected style from image
        }`}
      >
        {name}
      </span>
    </button>
  );
};

export default InterestCard;
