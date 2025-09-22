import React from "react";
import HobbyTagIcon from "../HobbyTagIcon/HobbyTagIcon";
import { DeleteIcon } from "../../../public/svg-icons/icons";
import { useRouter } from "next/navigation";

type NotificationCardProps = {
  // Define any props you need here
  hostImage: string;
  hostName: string;
  title: string;
  category_id: string;
  notification_created_at: string;
  message: string;
  eventStatus: string;
  notificationType: string;
  viewEvent: Function;
  event_id: string;
};

const CreatedHobbiesNotificationCard: React.FC<NotificationCardProps> = ({
  hostImage,
  hostName,
  title,
  category_id,
  notification_created_at,
  message,
  eventStatus,
  notificationType,
  viewEvent,
  event_id,
}) => {
  const router = useRouter();
  function formatTo12HourTime(dateString: string): string {
    const date = new Date(dateString);

    // Get hours and minutes in local time
    let hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine AM/PM
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12

    // Pad hours and minutes
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }
  return (
    <div>
      <div className="flex items-start space-x-4 pt-4 pb-4 rounded-lg">
        <img
          src={hostImage ? hostImage : hostName[0]}
          alt={`${hostName}'s profile`}
          className={`w-12 h-12 rounded-full bg-app-text-blue ${
            eventStatus === "CANCELED" &&
            "pointer-events-none opacity-50 select-none"
          }`}
        />

        <div className="flex-1">
          <h3
            className={`text-[14px] font-semibold text-app-text-primary font-plusJakartaSans-600 ${
              eventStatus === "CANCELED" &&
              "pointer-events-none opacity-50 select-none"
            }`}
            onClick={() => {
              viewEvent();
            }}
          >
            {title}
          </h3>
          {category_id && (
            <div
              className={`w-auto mt-2 flex gap-2 ${
                eventStatus === "CANCELED" &&
                "pointer-events-none opacity-50 select-none"
              }`}
            >
              <div
                onClick={() => {
                  viewEvent();
                }}
              >
                <HobbyTagIcon hobbyId={category_id} isNormalComponent={true} />
              </div>
              {notificationType === "FOLLOWERS_EVENT_CREATION" && (
                <div
                  className={`inline-flex text-[10px] bg-app-text-blue rounded-full pt-1.5 px-2 text-app-text-secondary font-plusJakartaSans w-auto ${
                    eventStatus === "CANCELED" &&
                    "pointer-events-none opacity-50 select-none"
                  }`}
                  onClick={() => {
                    router.push(`/more-options/event-matched?event_id=${event_id}`);
                  }}
                >
                  Join now
                </div>
              )}
              {notificationType === "MATCH_HOBBIES" && (
                <div
                  className={`inline-flex text-[10px] bg-app-text-blue rounded-full pt-1.5 px-2 text-app-text-secondary font-plusJakartaSans w-auto ${
                    eventStatus === "CANCELED" &&
                    "pointer-events-none opacity-50 select-none"
                  }`}
                  onClick={() => {
                    router.push(`/more-options/event-matched?event_id=${event_id}`);
                  }}
                >
                  Matched
                </div>
              )}
            </div>
          )}
          <p
            className={`mt-1 text-[10px] text-app-text-secondary font-plusJakartaSans ${
              eventStatus === "CANCELED" &&
              "pointer-events-none opacity-50 select-none"
            }`}
            onClick={() => {
              viewEvent();
            }}
          >
            <span className="text-[11.33px] text-app-text-blue font-plusJakartaSans">
              {hostName}{" "}
            </span>
            {message}
          </p>
        </div>
        <div
          onClick={() => {
            viewEvent();
          }}
        >
          <p className="flex flex-col items-end text-[11.33px] font-plusJakartaSans-600">
            <div className="flex-end text-app-text-blue">
              {formatTo12HourTime(notification_created_at)}
            </div>
            {notificationType === "MATCH_HOBBIES" && (
              <div
                className={`mt-2 inline-flex text-[10px] bg-app-text-blue rounded-full py-1 px-2 text-app-text-secondary font-plusJakartaSans w-auto ${
                  eventStatus === "CANCELED" &&
                  "pointer-events-none opacity-50 select-none"
                }`}
              >
                <div>{eventStatus === "CANCELED" ? "Canceled" : "Cancel"}</div>
              </div>
            )}
            {eventStatus === "CANCELED" && (
              <div className="mt-5">
                <DeleteIcon width={20} height={20} />
              </div>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatedHobbiesNotificationCard;
