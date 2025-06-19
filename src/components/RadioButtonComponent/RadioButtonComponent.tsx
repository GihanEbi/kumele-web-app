"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type RadioButtonComponentProps = {
  name: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: { label: string; value: string }[];
  value?: string;
  disabled?: boolean;
  error?: string;
};

const RadioButtonComponent: React.FC<RadioButtonComponentProps> = ({
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
      <RadioGroup
        name={name}
        defaultValue={defaultValue}
        onValueChange={onChange}
        value={value}
        disabled={disabled}
      >
        {options.map((option) => (
          <div className="flex items-center space-x-2">
            <RadioGroupItem key={option.value} value={option.value}>
              <Label>{option.label}</Label>
            </RadioGroupItem>
          </div>
        ))}
      </RadioGroup>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default RadioButtonComponent;
