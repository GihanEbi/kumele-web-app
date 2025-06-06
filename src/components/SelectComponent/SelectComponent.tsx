import React from "react";
import { DownArrow } from "../../../public/svg-icons/icons";

type SelectComponentProps = {
  items: { value: string; label: string }[];
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  error?: string;
  required?: boolean;
};

const SelectComponent: React.FC<SelectComponentProps> = ({
  items,
  placeholder,
  handleChange,
  value,
  error,
  required,
}) => {
  return (
    <div className="relative flex-1 ">
      <select
        onChange={(e) => {
          handleChange(e);
        }}
        value={value}
        className="w-full appearance-none font-plusJakartaSans bg-app-input-primary rounded-lg py-3 px-3 text-sm text-app-text-button"
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>

        {items.map((item) => (
          <option
            key={item.value}
            value={item.value}
            className="bg-app-background-primary text-app-text-primary text-center font-plusJakartaSans text-xs rounded-lg "
          >
            {item.label}
          </option>
        ))}
      </select>
      <div className="h-5 w-5 text-app-text-primary absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none">
        <DownArrow className="text-app-icon" />
      </div>
    </div>
  );
};

export default SelectComponent;
