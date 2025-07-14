import React from "react";
import {
  CardMenuIcon,
  DeleteIcon,
} from "../../../../../public/svg-icons/icons";
import Image from "next/image";
import NotificationBadge from "@/components/NotificationCard/NotificationBadge";

type CurrentAdvertsCardProps = {
  image: string;
  title: string;
  date: string;
  icon: React.ReactNode;
  iconText: string;
  isDisabled: boolean;
  cardClick: Function;
};

const NotificationCard: React.FC<CurrentAdvertsCardProps> = ({
  image,
  title,
  date,
  icon,
  iconText,
  isDisabled,
  cardClick,
}) => {
  const [isModelOpen, setIsModelOpen] = React.useState(false);
  return (
    <div
      className={`bg-app-background-chat-card px-1 pb-1 rounded-lg flex flex-col mb-2 ${
        isDisabled ? "opacity-50 pointer-events-none select-none" : ""
      }`}
    >
      <div className="flex justify-between mt-2">
        <div className="flex items-center gap-2 px-2 pb-2">
          <img
            src={image}
            alt={title}
            className="rounded-md w-[54px] h-[52px]"
          />
          <div className="flex flex-col items-start">
            <h3
              className={`text-[14px] text-app-text-primary font-plusJakartaSans-600 mb-2`}
            >
              {title}
            </h3>
            <p className="text-[8px] text-app-text-secondary font-plusJakartaSans text-right">
              {date}
            </p>
          </div>
        </div>
      </div>
      {isDisabled && (
        <div className="flex items-center justify-end">
          <DeleteIcon width={24} height={24} />
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
