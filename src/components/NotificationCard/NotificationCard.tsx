import React from "react";
import NotificationBadge from "./NotificationBadge";
import {
  BlogHomeIcon,
  BlogIcon,
  DeleteAccountIcon,
  DeleteIcon,
} from "../../../public/svg-icons/icons";
import ClockGif from "../GifComponents/ClockGif/ClockGif";

type NotificationCardProps = {
  // Define any props you need here
  userImage: string;
  title: string;
  icon?: React.ReactNode;
  time: string;
  category?: string;
  userName?: string;
  description?: string;
  isCancelled?: boolean;
  isShowCancelled?: boolean;
  isJoinNow?: boolean;
  isBlogComment?: boolean;
  isEventCancelled?: boolean;
};

const NotificationCard: React.FC<NotificationCardProps> = ({
  userImage,
  title,
  icon,
  time,
  category,
  userName,
  description,
  isCancelled = false,
  isShowCancelled = false,
  isJoinNow = false,
  isBlogComment = false,
  isEventCancelled = false,
}) => {
  return (
    <div>
      <div className="flex items-start space-x-4 pt-4 pb-4 rounded-lg">
        {isBlogComment ? (
          <div className="border-1 border-app-text-secondary rounded-full p-3">
            <BlogHomeIcon className="text-app-icon" />
          </div>
        ) : isEventCancelled ? (
          <div className="border-1 border-app-text-secondary rounded-full p-3">
            <ClockGif width={24} height={24} />
          </div>
        ) : (
          <img
            src={userImage}
            alt={`${userName}'s profile`}
            className={`w-12 h-12 rounded-full bg-app-text-blue ${
              isShowCancelled &&
              isCancelled &&
              "pointer-events-none opacity-50 select-none"
            }`}
          />
        )}

        <div className="flex-1">
          <h3
            className={`text-[14px] font-semibold text-app-text-primary font-plusJakartaSans-600 ${
              isShowCancelled &&
              isCancelled &&
              "pointer-events-none opacity-50 select-none"
            }`}
          >
            {title}
          </h3>
          {icon && (
            <div
              className={`w-auto flex gap-2 ${
                isShowCancelled &&
                isCancelled &&
                "pointer-events-none opacity-50 select-none"
              }`}
            >
              <NotificationBadge icon={icon} name={category} />
              {isJoinNow && (
                <div
                  className={`mt-2 text-[10px] bg-app-text-blue rounded-xl text-app-text-secondary font-plusJakartaSans py-1 px-2 cursor-pointer`}
                >
                  Join now
                </div>
              )}
            </div>
          )}

          <p
            className={`mt-1 text-[10px] text-app-text-secondary font-plusJakartaSans ${
              isShowCancelled &&
              isCancelled &&
              "pointer-events-none opacity-50 select-none"
            }`}
          >
            <span className="text-[11.33px] text-app-text-blue font-plusJakartaSans">
              {userName}{" "}
            </span>
            {description}
          </p>
        </div>
        <div>
          <p className="flex flex-col items-end text-[11.33px] font-plusJakartaSans-600">
            <div className="flex-end text-app-text-blue">{time}</div>
            {isShowCancelled && (
              <>
                <div
                  className={`mt-2 inline-flex text-[10px] bg-app-text-blue rounded-full py-1 px-2 text-app-text-secondary font-plusJakartaSans w-auto ${
                    isShowCancelled &&
                    isCancelled &&
                    "pointer-events-none opacity-50 select-none"
                  }`}
                >
                  <div>{isCancelled ? "Canceled" : "Cancel"}</div>
                </div>
                {isCancelled && (
                  <div className="mt-5">
                    <DeleteIcon width={20} height={20} />
                  </div>
                )}
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
