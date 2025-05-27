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
    <div className="relative flex-1">
      <select className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-lg py-3 px-3 text-sm text-gray-500 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
        <option>{placeholder}</option>

        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <div className="h-5 w-5 text-gray-400 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none">
        <DownArrow />
      </div>
    </div>
  );
};

export default SelectComponent;
