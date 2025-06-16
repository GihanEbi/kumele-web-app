import React from "react";
import NotificationBadge from "./NotificationBadge";
import { DeleteAccountIcon, DeleteIcon } from "../../../public/svg-icons/icons";

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
}) => {
  return (
    <div>
      <div className="flex items-start space-x-4 pt-4 pb-4 rounded-lg shadow-sm">
        <img
          src={userImage}
          alt={`${userName}'s profile`}
          className={`w-12 h-12 rounded-full bg-app-text-blue ${
            isShowCancelled &&
            isCancelled &&
            "pointer-events-none opacity-50 select-none"
          }`}
        />
        <div className="flex-1">
          <h3
            className={`text-xs font-semibold text-app-text-primary font-plusJakartaSans ${
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
                  className={`mt-2 inline-flex text-[10px] bg-app-text-blue rounded-full py-1 px-2 text-app-text-secondary font-plusJakartaSans w-auto`}
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
            <span className="text-[10px] text-app-text-blue font-plusJakartaSans">
              {userName}{" "}
            </span>
            {description}
          </p>
        </div>
        <div>
          <p className="flex flex-col items-end text-[10px] font-plusJakartaSans">
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
