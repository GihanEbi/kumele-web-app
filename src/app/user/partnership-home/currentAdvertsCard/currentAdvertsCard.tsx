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
  onClick: Function;
};

const CurrentAdvertsCard: React.FC<CurrentAdvertsCardProps> = ({
  image,
  title,
  date,
  icon,
  iconText,
  isDisabled,
  cardClick,
  onClick,
}) => {
  const [isModelOpen, setIsModelOpen] = React.useState(false);
  return (
    <div
      className={`bg-app-background-chat-card px-1 pb-1 rounded-lg flex flex-col mb-3 ${
        isDisabled ? "opacity-50 pointer-events-none select-none" : ""
      }`}
    >
      {/* <div className="flex items-center justify-end mt-2">
        <CardMenuIcon onClick={() => cardClick()}  width={24} height={24}/>
      </div> */}
      <div className="flex justify-between py-4 pr-1 pl-4">
        <div className="flex items-center gap-2 " onClick={() => onClick()}>
          <img
            src={image}
            alt={title}
            className="rounded-md w-[42px] h-[42px]"
          />
          <div>
            <h3
              className={`text-app-text-primary font-plusJakartaSans font-normal text-[13.98px] mb-2`}
            >
              {title}
            </h3>
            <p className="text-app-text-secondary font-plusJakartaSans font-normal text-[11.36px]  text-right">
              {date}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-start ">
            <NotificationBadge icon={icon} name={iconText} />
            <CardMenuIcon onClick={() => cardClick()} width={24} height={24} />
          </div>
          {isDisabled && (
            <div className="flex items-center justify-end">
              <DeleteIcon width={24} height={24} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentAdvertsCard;
