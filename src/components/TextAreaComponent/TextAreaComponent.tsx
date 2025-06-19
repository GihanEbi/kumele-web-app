import React from "react";

type TextAreaComponentProps = {
  placeholder?: string;
  className?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
  defaultValue?: string;
  icon?: React.ReactNode;
};
const TextAreaComponent: React.FC<TextAreaComponentProps> = ({
  placeholder,
  className,
  required,
  value,
  onChange,
  error,
  disabled,
  defaultValue,
  icon,
}) => {
  return (
    <div className="bg-app-input-primary rounded-lg">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          {icon}
        </div>
      )}

      <textarea
        placeholder={placeholder || "Enter text"}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        defaultValue={defaultValue}
        className={`w-full placeholder:font-plusJakartaSans placeholder:text-app-text-secondary ${
          icon ? "pl-12" : "pl-3"
        } pr-3 py-3 text-app-text-primary rounded-lg text-sm focus:ring-1`}
      />
    </div>
  );
};

export default TextAreaComponent;
