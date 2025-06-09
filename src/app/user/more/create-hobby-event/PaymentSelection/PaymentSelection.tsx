// components/PaymentOptionChip.tsx
"use client";

import React from 'react';

interface PaymentSelectionProps {
  id: string; // Unique ID for the input and label association
  mainLabel: string; // e.g., "Free Event", "Card Payment"
  valueText: string; // e.g., "Free", "20$", "50$"
  name: string; // Name for the radio group (e.g., "paymentMethod")
  value: string; // The actual value this radio option represents
  checked: boolean; // Is this option currently selected?
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Handler for selection change
  className?: string; // Optional additional class for the outer div
}

const PaymentSelection: React.FC<PaymentSelectionProps> = ({
  id,
  mainLabel,
  valueText,
  name,
  value,
  checked,
  onChange,
  className = "",
}) => {
  return (
    <div className={`flex flex-col   ${className}`}>
      <span className="block text-body mb-1.5 sm:text-left">
        {mainLabel}
      </span>
      <label
        htmlFor={id}
        className="flex items-center space-x-2 cursor-pointer p-1 rounded-md  transition-colors" // Added hover & padding
        role="radio"
        aria-checked={checked}
        tabIndex={0} // Make the label focusable
        onKeyDown={(e) => { // Allow selection with Space or Enter
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            // Simulate a change event
            onChange({ target: { value: value, checked: true, name: name } } as any);
          }
        }}
      >
        <div className="bg-app-input-primary text-app-text-secondary px-3 py-2.5 rounded-lg  text-center select-none ml-[-4px]">
          {valueText}
        </div>
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="sr-only" // Visually hide the native radio button
        />
        {/* Custom Radio Button Visual */}
        <div className="relative flex items-center justify-center w-5 h-5" aria-hidden="true">
          <div
            className={`w-5 h-5 rounded-full border-2 transition-all duration-150 ease-in-out
                        ${checked
                          ? 'border-blue-600 bg-blue-600'
                          : 'border-white bg-app-background-primary hover:border-gray-500'
                        }`}
          >
            {checked && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[1rem] h-[1rem] bg-blue-600 border-3 border-app-background-primary rounded-full transform scale-100 transition-transform duration-100 ease-out"></div>
              </div>
            )}
          </div>
        </div>
      </label>
    </div>
  );
};

export default PaymentSelection;