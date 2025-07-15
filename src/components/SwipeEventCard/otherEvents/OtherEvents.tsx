"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
//import { Event } from "../data";

import {
  UsersIcon,
  Confetti2Icon,
  DollarIcon,
  ClockIcon,
  RightArrowIcon,
} from "..//../../../public/svg-icons/icons";

type Event = {
  id: number;
  imageSrc: string;
  title: string;
  category: string;
  price: string;
  time: string;
  guests: string;
  startsIn: string;
  location: string;
  subtitle: string;
  description: string;
  isPlaceholder?: boolean;
};

type OtherEventsProps = {
  events: Event[];
  hostName: string;
  onSelect: (ev: Event) => void;
};



const OtherEvents = ({ events, hostName,onSelect }: OtherEventsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);


  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -158 : 158;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  const onMouseLeave = () => {
    if (!scrollContainerRef.current) return;
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = "grab";
  };

  const onMouseUp = () => {
    if (!scrollContainerRef.current) return;
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = "grab";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="mt-6">
      <h3 className="font-plusJakartaSans text-app-button-model-text-color font-semibold text-[19px] mb-4 text-left ml-1">
        Other Events from {hostName}
      </h3>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center z-10">
          <button
            onClick={() => handleScroll("left")}
            className="bg-app-arrow-bg border-none rounded-xl p-1 shadow-md left-10"
            aria-label="Scroll left"
          >
            <RightArrowIcon className="w-5 h-5  rotate-180" />
          </button>
        </div>
        <div
          ref={scrollContainerRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          className="flex space-x-4 overflow-x-auto pb-2 -mx-0 px-2 no-scrollbar cursor-grab"
        >
          {events.map((event) => (
            <button
            onClick={()=>onSelect(event)}
              key={event.id}
              className="flex-shrink-0 w-[142px] h-[160px] flex flex-col bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-[14px] overflow-hidden select-none"
            >
              <div className="relative h-[88px] pointer-events-none">
                <Image
                  src={event.imageSrc}
                  alt={event.title}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute top-2 right-2 bg-gray-900 px-2 py-1 rounded-full flex items-center space-x-1">
                  <Confetti2Icon className="w-[14px] h-[14px] text-white" />
                  <span className="font-plusJakartaSans text-white font-normal text-[11.11px]">
                    {event.category}
                  </span>
                </div>
              </div>

              <div className="p-2 pointer-events-none flex-1 flex flex-col justify-center">
                <h4 className="font-plusJakartaSans text-left text-app-button-model-text-color font-bold text-[12px] truncate">
                  {event.title}
                </h4>
                <div className="mt-1 space-y-1">
                  <div className="flex items-center space-x-0.5">
                    <UsersIcon className="w-[13px] h-[13px]" />
                    <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[10px]">
                      {event.guests} guests
                    </span>
                  </div>
                  <div className="flex flex-row gap-2">
                    <div className="flex items-center space-x-0.5">
                      <DollarIcon className="w-[13px] h-[13px]" />
                      <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[10px]">
                        {event.price}
                      </span>
                    </div>
                    <div className="flex items-center space-x-0.5">
                      <ClockIcon className="w-[13px] h-[13px]" />
                      <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[10px]">
                        {event.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center z-10">
          <button
            onClick={() => handleScroll("right")}
            className="bg-app-arrow-bg rounded-full p-1 shadow-md right-8"
            aria-label="Scroll right"
          >
            <RightArrowIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtherEvents;
