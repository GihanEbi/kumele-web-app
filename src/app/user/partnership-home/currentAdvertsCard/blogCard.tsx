"use client";

import React from "react";
import { DeleteIcon, EditIcon } from "../../../../../public/svg-icons/icons";
import NotificationBadge from "@/components/NotificationCard/NotificationBadge";

type CardProps = {
  image: string;
  title: string;
  icon: React.ReactNode;
  iconText: string;
  isDisabled: boolean;
  cardClick: Function;
};
const PartnershipBlogCard: React.FC<CardProps> = ({
  image,
  title,
  icon,
  iconText,
  isDisabled,
  cardClick,
}) => {
  return (
    <div
      className={`bg-app-background-chat-card px-1 pb-1 rounded-lg flex flex-col mb-4 ${
        isDisabled ? "opacity-50 pointer-events-none select-none" : ""
      }`}
    >
      <div
        className="flex items-center justify-end "
        onClick={() => cardClick()}
      >
        <EditIcon />
      </div>
      <div className="flex gap-4 items-start px-4">
        <img src={image} alt={title} className="rounded-md w-[92px] h-[92px]" />
        <div className="flex flex-col items-start">
          <h3
            className={`text-[16px] text-app-text-primary font-plusJakartaSans-400 mb-2`}
          >
            {title}
          </h3>
          <div className="mr-4">
            <NotificationBadge icon={icon} name={iconText} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <DeleteIcon width={24} height={24} />
      </div>
    </div>
  );
};

export default PartnershipBlogCard;
