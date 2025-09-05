import React from "react";
import MessageGif from "../GifComponents/MessageGif/MessageGif";
import Image from "next/image";

type props = {
  isLoggedInUser: boolean;
  img: string;
  name: string;
  date: string;
  message: string;
  sentUserProfilePic?: string;
};

const InboxMessageCard: React.FC<props> = ({
  img,
  name,
  date,
  message,
  isLoggedInUser,
  sentUserProfilePic,
}) => {
  function convertTo12HourFormat(time: string): string {
    // Split the string into hours, minutes, and seconds
    const [hoursStr, minutesStr] = time.split(":");
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    // Determine AM or PM
    const ampm = hours >= 12 ? "P.M." : "A.M.";

    // Convert 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // "0" should be "12"

    // Format minutes with leading zero if needed
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${hours.toString().padStart(2, "0")}:${formattedMinutes} ${ampm}`;
  }
  return (
    <div
      className={`flex flex-col ${
        isLoggedInUser ? "items-end" : "items-start"
      }`}
    >
      <div
        className={`${
          isLoggedInUser
            ? "bg-app-background-chat-sent rounded-bl-2xl"
            : "bg-app-input-yellow rounded-br-2xl"
        } w-2/3 rounded-tl-2xl rounded-tr-xl px-2 py-1`}
      >
        <div className="flex items-start space-x-2 pt-4 pb-4">
          {!isLoggedInUser ? (
            <Image
              src={img ? `${img.replace(/\\/g, "/")}` : name[0]}
              alt={name}
              width={76}
              height={76}
              className="rounded-full object-cover"
            />
          ) : (
            <Image
              src={
                sentUserProfilePic
                  ? `${(sentUserProfilePic ?? "").replace(/\\/g, "/")}`
                  : name[0]
              }
              alt={name}
              width={76}
              height={76}
              className="rounded-full object-cover"
            />
          )}
          <div>
            <div className="flex space-x-1 w-full">
              <h2
                className={`${
                  isLoggedInUser ? "text-white" : "text-black"
                } text-[13px] font-bold font-plusJakartaSans-700`}
              >
                {name}
              </h2>

              {!isLoggedInUser && (
                <>
                  <span className="mt-1 text-[13px] font-bold text-app-text-black font-plusJakartaSans-700">
                    *
                  </span>
                  <p className="text-[13px] text-app-text-inbox-chat-date font-plusJakartaSans-400">
                    <span className="text-app-text-blue">Reply</span>
                  </p>
                </>
              )}
            </div>
            <h2
              className={`${
                isLoggedInUser ? "text-white" : "text-black"
              } text-[16px] font-plusJakartaSans-400`}
            >
              {message}
            </h2>
          </div>
        </div>
        <div className="flex justify-end pr-3">
          <p
            className={`${
              isLoggedInUser ? "text-white" : "text-black"
            } text-[13px] font-plusJakartaSans-100`}
          >
            {convertTo12HourFormat(date)}
          </p>
        </div>
      </div>
      {/* <MessageGif/> */}
    </div>
  );
};

export default InboxMessageCard;
