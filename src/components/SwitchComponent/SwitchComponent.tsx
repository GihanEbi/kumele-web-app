"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// ------ types ------
type SwitchComponentProps = {
  required?: boolean;
  disabled?: boolean;
  value?: boolean;
  onChange?: (value: boolean) => void;
  checked?: boolean;
  error?: string;
  onclick: Function;
};

const SwitchComponent = ({
  required,
  disabled,
  value,
  onChange,
  error,
  onclick,
}: SwitchComponentProps) => {

    const handleCheckedChange = () => {
        onclick(!value);
    }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="airplane-mode"
        required={required}
        disabled={disabled}
        checked={value}
        onClick={handleCheckedChange}
        
      />
    </div>
  );
};

export default SwitchComponent;
