import React from "react";

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
      <label className="flex space-x-3 cursor-pointer">
        <input
          type="checkbox"
          name={""}
          onChange={(e) => {
            onChange(e)
          }}
          checked={value}
          className="peer hidden"
        />

        <div
          className={`w-4.5 h-4.5 rounded border-2 ${
            !value ? "border-app-button-radio" : "border-app-button-blue"
          } flex items-center justify-center`}
        >
          <div
            className={`w-2.5 h-2.5 ${
              !value ? "" : "bg-app-button-blue"
            } transition-all`}
          />
        </div>
        <p className="text-sm text-app-text-primary font-plusJakartaSans">
          {label}
        </p>
      </label>
    </div>
  );
};

export default CheckBoxComponent;
