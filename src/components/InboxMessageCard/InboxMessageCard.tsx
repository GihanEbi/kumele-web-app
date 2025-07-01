import React from "react";
import MessageGif from "../GifComponents/MessageGif/MessageGif";

type props = {
  img: string;
  name: string;
  date: string;
  message: string;
};

const InboxMessageCard: React.FC<props> = ({ img, name, date, message }) => {
  return (
    <div className="flex flex-col items-start">
      <div className="w-2/3 bg-app-input-yellow rounded-tl-2xl rounded-br-2xl rounded-tr-xl px-2 py-1">
        <div className="flex items-start space-x-4 pt-4 pb-4">
          <img
            src={img}
            alt={`${name}'s profile`}
            className={`w-12 h-12 rounded-full bg-app-text-blue `}
          />
          <div>
            <h2 className="text-[13px] font-semibold text-app-text-black font-plusJakartaSans-700">
              {name}
            </h2>
            <p className="text-[13px] text-app-text-inbox-chat-date font-plusJakartaSans-400">
              *{date}* <span className="text-app-text-blue">Reply</span>
            </p>
            <h2 className="text-[16px] text-app-text-black font-plusJakartaSans-400">
              {message}
            </h2>
          </div>
        </div>
      </div>
      <MessageGif/>
    </div>
  );
};

export default InboxMessageCard;
