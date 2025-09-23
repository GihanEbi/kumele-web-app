import React from "react";

type Option = { id?: number; label: string; value: string };

type RadioButtonGroupComponentProps = {
  name: string;
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  options: Option[];
  value?: string | string[];
  disabled?: boolean;
  error?: string;
  isMultiSelect?: boolean;
  isColumn?: boolean;
};

const RadioButtonGroupComponent: React.FC<RadioButtonGroupComponentProps> = ({
  name,
  defaultValue,
  onChange,
  options,
  value,
  disabled,
  error,
  isMultiSelect = false,
  isColumn = false,
}) => {
  // Normalize value
  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

  const handleChange = (selectedValue: string) => {
    if (isMultiSelect) {
      let updated: string[];
      if (selectedValues.includes(selectedValue)) {
        updated = selectedValues.filter((v) => v !== selectedValue);
      } else {
        updated = [...selectedValues, selectedValue];
      }
      onChange?.(updated);
    } else {
      onChange?.(selectedValue);
    }
  };

  return (
    <div>
      {name !== "" && (
        <p className="text-sm font-medium font-plusJakartaSans text-app-text-primary mb-5">
          {name}
        </p>
      )}
      <div
        className={`flex ${
          isColumn
            ? "flex-col justify-start space-y-4"
            : "flex-row justify-between items-center space-x-6"
        }`}
      >
        {options.map((opt, idx) => {
          const isSelected = selectedValues.includes(opt.value);

          return (
            <label
              key={idx}
              className={`flex items-center space-x-2 cursor-pointer ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <input
                type={isMultiSelect ? "checkbox" : "radio"}
                name={isMultiSelect ? `${name}-${idx}` : name || ""}
                value={opt.value}
                checked={isSelected}
                onChange={() => handleChange(opt.value)}
                disabled={disabled}
                className="peer hidden"
              />

              {/* Custom circle style */}
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  isSelected
                    ? "border-app-button-blue"
                    : "border-app-button-radio"
                } flex items-center justify-center`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    isSelected ? "bg-app-button-blue" : ""
                  } transition-all`}
                />
              </div>
              <p className="text-sm text-app-text-primary font-plusJakartaSans">
                {opt.label}
              </p>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default RadioButtonGroupComponent;
