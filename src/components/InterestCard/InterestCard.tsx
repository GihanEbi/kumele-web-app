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
        p-3 sm:p-4 rounded-xl flex flex-col items-center justify-center aspect-square
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${
          isSelected
            ? "bg-app-input-yellow text-app-text-black shadow-md" // Selected style from image
            : "bg-app-input-primary text-app-text-secondary" // Unselected style from image
        }
      `}
    >
      {/* <Image
        src={icon}
        alt={name}
        className="w-8 h-8 sm:w-10 sm:h-10 mb-1 sm:mb-2"
        width={40}
        height={40}
      /> */}
      {icon}
      <span className="text-xs sm:text-sm font-plusJakartaSans text-app-text-secondary text-center">{name}</span>
    </button>
  );
};

export default InterestCard;
