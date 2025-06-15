// components/EventPreviewModal/OtherEvents.tsx
"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Event } from "../data";
import { ArrowLeftIcon, ArrowRightIcon, HousePartyIcon, TicketIcon, ClockIcon, UsersIcon } from "../Icon";

type OtherEventsProps = {
  events: Event[];
  hostName: string;
};

const OtherEvents = ({ events, hostName }: OtherEventsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // State for drag-to-scroll functionality
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // --- Handlers for Arrow Buttons ---
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      // Each card is w-48 (192px) + space-x-4 (16px) = 208px.
      // We scroll a bit more than one card's width for a nice effect.
      const scrollAmount = direction === 'left' ? -210 : 210;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // --- Handlers for Mouse Drag-to-Scroll ---
  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    // Start position of the mouse
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    // Current scroll position of the container
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = 'grabbing';
  };

  const onMouseLeave = () => {
    if (!scrollContainerRef.current) return;
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = 'grab';
  };

  const onMouseUp = () => {
    if (!scrollContainerRef.current) return;
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = 'grab';
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    // Calculate the distance dragged
    const walk = (x - startX) * 1.5; // Multiply for faster scrolling feel
    // Update scroll position
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-4 text-zinc-800 dark:text-zinc-200">Other Events from {hostName}</h3>
      <div className="relative group"> {/* Add group for hover effects on arrows if needed */}
        {/* Left Arrow */}
        <div className="absolute inset-y-0 left-0 flex items-center z-10">
          <button 
            onClick={() => handleScroll('left')}
            className="bg-white dark:bg-zinc-800 rounded-full p-1 shadow-md -ml-3 transition opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <ArrowLeftIcon className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          className="flex space-x-4 overflow-x-auto pb-2 -mx-2 px-2 no-scrollbar cursor-grab"
        >
          {events.map((event) => (
            <div key={event.id} className="flex-shrink-0 w-48 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden select-none">
              <div className="relative h-24 pointer-events-none"> {/* Prevent image dragging */}
                <Image src={event.imageSrc} alt={event.title} layout="fill" objectFit="cover" />
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                  <HousePartyIcon className="w-3 h-3" />
                  <span>{event.category}</span>
                </div>
              </div>
              <div className="p-3 pointer-events-none"> {/* Prevent text selection */}
                <h4 className="font-bold text-sm truncate text-zinc-800 dark:text-zinc-200">{event.title}</h4>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 space-y-1">
                  <div className="flex items-center space-x-1.5"><UsersIcon className="w-3.5 h-3.5" /><span>{event.guests} guests</span></div>
                  <div className="flex items-center space-x-1.5"><TicketIcon className="w-3.5 h-3.5" /><span>{event.price}</span></div>
                  <div className="flex items-center space-x-1.5"><ClockIcon className="w-3.5 h-3.5" /><span>{event.time}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center z-10">
          <button 
            onClick={() => handleScroll('right')}
            className="bg-white dark:bg-zinc-800 rounded-full p-1 shadow-md -mr-3 transition opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
          >
            <ArrowRightIcon className="w-5 h-5 text-zinc-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtherEvents;