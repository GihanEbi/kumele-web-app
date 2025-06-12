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
    <div className="flex items-center w-full bg-app-input-primary rounded-lg py-3 px-3">
      <select
        onChange={(e) => {
          handleChange(e);
        }}
        value={value}
        className="font-plusJakartaSans text-sm text-app-text-button appearance-none"
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>

        {items.map((item) => (
          <option
            key={item.value}
            value={item.value}
            className="bg-app-background-primary text-app-text-primary font-plusJakartaSans text-xs"
          >
            {item.label}
          </option>
        ))}
      </select>
      <div className="ml-auto">
        <DownArrow className="text-app-icon" />
      </div>
    </div>
  );
};

export default SelectComponent;
