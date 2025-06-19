import React from "react";

type RadioButtonGroupComponentProps = {
  name: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: { id: number; label: string; value: string }[];
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
      <p className="text-sm font-medium font-plusJakartaSans text-app-text-primary mb-5">{name}</p>
      <div className="flex justify-between items-center space-x-6">
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
              className="peer hidden"
            />

            <div
              className={`w-5 h-5 rounded-full border-2 ${
                gender.value !== value
                  ? "border-app-button-primary"
                  : "border-app-button-blue"
              } flex items-center justify-center`}
            >
              <div className={`w-2.5 h-2.5 rounded-full ${gender.value !== value ? "" : "bg-app-button-blue"} transition-all`} />
            </div>
            <p className="text-sm text-app-text-primary font-plusJakartaSans">{gender.label}</p>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButtonGroupComponent;
