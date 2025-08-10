"use client";

import React, { useState } from "react";
import { DeleteIcon, EditIcon } from "../../../../../public/svg-icons/icons";
import NotificationBadge from "@/components/NotificationCard/NotificationBadge";
import { useRouter } from "next/navigation";
import DeleteBlogModel from "./models/DeleteBlogModel";

type CardProps = {
  image: string;
  title: string;
  icon: React.ReactNode;
  iconText: string;
  isDisabled: boolean;
  cardClick: Function;
  author: string;
  date: string;
};

const PartnershipBlogCard: React.FC<CardProps> = ({
  image,
  title,
  icon,
  iconText,
  isDisabled,
  cardClick,
  author,
  date,
}) => {
  // routing
  const router = useRouter();
  const [deleteBlogModelOpen, setDeleteBlogModelOpen] = useState(false);

  return (
    <>
      <div
        className={`bg-app-background-chat-card pb-1 rounded-lg flex flex-col mb-4 ${
          isDisabled || deleteBlogModelOpen
            ? "opacity-50 pointer-events-none select-none"
            : ""
        }`}
      >
        <div
          className="flex items-center justify-end"
          onClick={() => {
            router.push("/user/partnership-blog");
          }}
        >
          <div className="">
            <EditIcon />
          </div>
        </div>

        <div className="flex gap-4 px-4 pb-2">
          {/* Image */}
          <img
            src={image}
            alt={title}
            className="rounded-md w-[92px] h-[92px] flex-shrink-0"
          />

          <div className="flex flex-col flex-1">
            <div>
              <h3 className="text-[16px] text-app-text-primary font-plusJakartaSans-400 mb-2">
                {title}
              </h3>
              <div className="mr-4">
                <NotificationBadge icon={icon} name={iconText} />
              </div>
            </div>

            <div className="flex items-end justify-between w-full mt-auto">
              <p className="text-app-blog-card-author-text font-plusJakartaSans font-normal text-[13px]">
                {author} • {date}
              </p>
              <div
                className="cursor-pointer -mr-3"
                onClick={() => {
                  cardClick();
                }}
              >
                <DeleteIcon width={24} height={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {deleteBlogModelOpen && (
        <DeleteBlogModel
          isOpen={deleteBlogModelOpen}
          onClose={() => setDeleteBlogModelOpen(false)}
        />
      )}
    </>
  );
};

export default PartnershipBlogCard;
