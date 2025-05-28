import React from "react";

type RadioButtonGroupComponentProps = {
  name: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: { label: string; value: string }[];
  value?: string;
  disabled?: boolean;
  error?: string;
};

const RadioButtonGroupComponent: React.FC<RadioButtonGroupComponentProps> = ({
  name,
  defaultValue,
  onChange,
  options,
  value,
  disabled,
  error,
}) => {
  return (
    <div>
      <p className="text-sm font-medium text-gray-800 mb-2">{name}</p>
      <div className="flex items-center space-x-6">
        {options.map((gender, idx) => (
          <label
            key={idx}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              name={name || ""}
              value={gender.value}
              onChange={onChange ? (e) => onChange(e.target.value) : undefined}
              className="form-radio h-4 w-4 text-blue-800 border-blue-800" 
            />
            <p className="text-xs text-gray-700">{gender.label}</p>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButtonGroupComponent;
