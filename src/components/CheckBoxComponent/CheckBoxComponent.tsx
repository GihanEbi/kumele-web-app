import React from "react";

type CheckBoxComponentProps = {
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
};

const CheckBoxComponent: React.FC<CheckBoxComponentProps> = ({
  label,
  checked,
  onChange,
  disabled,
  error,
}) => {
  return (
    <div>
      <label className="flex items-center space-x-2.5 cursor-pointer">
        <input
          type="checkbox"
          id={label}
          className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition duration-150 ease-in-out"
        />{" "}
        {/* Requires @tailwindcss/forms or use accent-blue-600 */}
        <span className="text-sm text-gray-700">{label}</span>
      </label>
    </div>
  );
};

export default CheckBoxComponent;
