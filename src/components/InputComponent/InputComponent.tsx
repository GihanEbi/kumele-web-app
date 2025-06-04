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
    <div className="bg-k-primary-color rounded-lg">
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
        className={`w-full placeholder:font-plusJakartaSans placeholder:text-k-text-button ${
          icon ? "pl-12" : "pl-3"
        } pr-3 py-3 text-k-text-primary rounded-lg text-sm focus:ring-1`}
      />
    </div>
  );
};

export default InputComponent;
