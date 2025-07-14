"use client";
import React, { useEffect, useRef, useState } from "react";
import { DownArrow } from "../../../public/svg-icons/icons";
import { authConstants } from "@/constants/auth-constants";

// prop types
type DropDownProps = {
  dataArray: Array<{ label: string | React.ReactNode; value: string }>;
  isOpen: Function;
  placeHolder: string | React.ReactNode;
  itemSelected?: string | null | React.ReactNode;
  bgColor?: string;
};

const DropDown: React.FC<DropDownProps> = ({
  isOpen,
  placeHolder,
  dataArray,
  itemSelected,
  bgColor,
}) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    string | null | React.ReactNode
  >(itemSelected || null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleList = () => setIsListOpen((prev) => !prev);

  const selectItem = (item: string | null | React.ReactNode) => {
    setSelectedItem(item);
    setIsListOpen(false);
    isOpen(false);
    itemSelected = item; // Update the itemSelected prop
  };

  // Effect for closing dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsListOpen(false);
        isOpen(false);
      }
    };

    if (isListOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isListOpen]);

  return (
    <div className="w-full">
      {/* Custom Month Dropdown Area */}
      <div
        className={`relative ${
          bgColor || "bg-app-input-primary"
        } rounded-sm py-2 px-2`}
        ref={dropdownRef}
      >
        <div
          onClick={() => {
            isOpen(true);
            toggleList();
          }}
          className={`text-[14.23px] ${
            selectedItem ? "text-app-text-primary" : "text-app-text-primary"
          } flex items-center justify-between`}
          aria-haspopup="listbox"
          aria-expanded={isListOpen}
          aria-controls="dropdown"
        >
          <span>{selectedItem ? selectedItem : placeHolder}</span>

          <DownArrow className="text-app-icon w-4 h-4 ml-3" />
        </div>

        {isListOpen && (
          <div
            id="dropdown"
            className="absolute right-0 mt-3 w-full bg-app-background-primary rounded-md z-20 py-1 overflow-y-auto max-h-[400px] no-scrollbar"
            role="listbox"
          >
            <ul className="overflow-y-auto flex flex-col items-center">
              {dataArray.map((item) => (
                <li
                  key={item.value}
                  className={`block px-4 py-1.5 text-[14.23px] text-app-text-primary text-center`}
                  onClick={() => {
                    selectItem(item.label);
                  }}
                  role="option"
                  aria-selected={selectedItem === item.label}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
