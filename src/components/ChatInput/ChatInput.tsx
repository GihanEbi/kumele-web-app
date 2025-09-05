import React from "react";
import { PlusIcon, SendIcon } from "../../../public/svg-icons/icons";

type props = {
  value: string;
  onChange: Function;
  onSend: Function;
};

const ChatInput = ({ value, onChange, onSend }: props) => {
  return (
    <div className="bg-app-input-primary rounded-lg flex items-center justify-between">
      <input
        type={"text"}
        placeholder={"Type a message"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSend();
          }
        }}
        className={`w-full placeholder:font-plusJakartaSans placeholder:text-app-text-secondary placeholder:text-sm pl-3 pr-3 py-3 text-app-text-primary rounded-lg text-sm focus:ring-1`}
      />
      <div className="flex items-center gap-3 pr-3">
        <PlusIcon className="text-app-icon" />
        {/* make event handler to enter key */}
        <SendIcon className="text-app-icon" onClick={() => onSend()} />
      </div>
      {/* <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"></div> */}
    </div>
  );
};

export default ChatInput;
