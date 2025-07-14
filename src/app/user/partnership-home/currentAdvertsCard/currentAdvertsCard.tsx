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

const CurrentAdvertsCard: React.FC<CurrentAdvertsCardProps> = ({
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
      <div
        className="flex items-center justify-end"
        onClick={() => cardClick()}
      >
        <CardMenuIcon />
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2 px-2 pb-2">
          <img
            src={image}
            alt={title}
            className="rounded-md w-[42px] h-[42px]"
          />
          <div>
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
        <div className="mr-4">
          <NotificationBadge icon={icon} name={iconText} />
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

export default CurrentAdvertsCard;
