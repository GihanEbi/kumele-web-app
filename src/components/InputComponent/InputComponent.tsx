import React from "react";

type InputComponentProps = {
  placeholder?: string;
  className?: string;
  required?: boolean;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  defaultValue?: string;
  icon?: React.ReactNode;
};

const InputComponent: React.FC<InputComponentProps> = ({
  placeholder,
  className,
  required,
  type,
  value,
  onChange,
  disabled,
  defaultValue,
  icon,
  error,
}) => {
  return (
    <div className="">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          {icon}
        </div>
      )}

      <input
        type={type || "text"}
        value={value}
        placeholder={placeholder || "Enter text"}
        onChange={onChange}
        required={required}
        disabled={disabled}
        defaultValue={defaultValue}
        className={`w-full ${
          icon ? "pl-10" : "pl-3"
        } pr-3 py-3 bg-gray-200 text-black border rounded-lg text-sm focus:ring-1 placeholder-gray-400`}
      />
    </div>
  );
};

export default InputComponent;
