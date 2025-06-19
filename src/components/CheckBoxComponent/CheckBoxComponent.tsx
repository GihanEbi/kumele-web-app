import React from "react";
import { UnCheckedIcon } from "../../../public/svg-icons/icons";

type CheckBoxComponentProps = {
  label: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  value: boolean;
};

const CheckBoxComponent: React.FC<CheckBoxComponentProps> = ({
  label,
  checked,
  onChange,
  disabled,
  error,
  value,
}) => {
  
  return (
    <div className="">
      <label className="flex items-center space-x-2.5 cursor-pointer">
        {/* <UnCheckedIcon /> */}
        <input
          type="checkbox"
          id={label}
          onChange={(e) => {
            onChange(e);
          }}
          checked={value}
          className="form-checkbox h-4 w-4 text-app-text-blue border-gray-300 rounded"
        />{" "}
        {/* Requires @tailwindcss/forms or use accent-blue-600 */}
        <span className="text-sm font-plusJakartaSans text-app-text-primary">{label}</span>
      </label>
    </div>
  );
};

export default CheckBoxComponent;
