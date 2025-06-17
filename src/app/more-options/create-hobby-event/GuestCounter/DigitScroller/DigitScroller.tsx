// components/DigitScroller/DigitScroller.tsx
"use client";

import React, { useRef, useEffect } from 'react';

// --- PROPS INTERFACE ---
interface DigitScrollerProps {
  // The currently selected value to display
  value: string;
  // The function to call when the user selects a new value
  setValue: (newValue: string) => void;
  // The list of items to display in the scroller. Defaults to 0-9.
  items?: string[];
  // Optional className for custom styling from the parent
  className?: string;
}

// Default items if none are provided
const DEFAULT_DIGITS = Array.from({ length: 10 }, (_, i) => String(i));

// --- THE REUSABLE COMPONENT ---
const DigitScroller: React.FC<DigitScrollerProps> = ({
  value,
  setValue,
  items = DEFAULT_DIGITS,
  className = '',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Ref to prevent the onScroll handler from firing during a programmatic scroll
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Effect to programmatically scroll to the correct item when `value` prop changes
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const selectedItem = Array.from(scroller.children).find(
      (child) => child.textContent === value
    ) as HTMLElement;

    if (selectedItem) {
      isProgrammaticScroll.current = true;
      const scrollerHeight = scroller.offsetHeight;
      const itemHeight = selectedItem.offsetHeight;
      const scrollTop = selectedItem.offsetTop - scrollerHeight / 2 + itemHeight / 2;

      scroller.scrollTo({ top: scrollTop, behavior: 'smooth' });

      // After the scroll animation, allow the user scroll handler to work again
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 300); // 300ms is a safe duration for smooth scroll
    }
  }, [value, items]); // Re-run if the value or the entire item list changes

  const handleScroll = () => {
    if (isProgrammaticScroll.current) return;

    // Clear any existing timeout to "debounce" the scroll event
    if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
    }
    
    // Set a timeout to run after scrolling has stopped
    scrollTimeout.current = setTimeout(() => {
        const scroller = scrollRef.current;
        if (!scroller) return;

        const itemHeight = (scroller.children[1] as HTMLElement)?.offsetHeight || 44; // Fallback height
        const currentScrollTop = scroller.scrollTop;

        // Calculate the index of the item that is nearest to the center
        const newIndex = Math.round(currentScrollTop / itemHeight);
        const newValue = items[newIndex];
        
        // If the calculated new value is different, update the parent state
        if (newValue && newValue !== value) {
            setValue(newValue);
        } else {
            // If the user scrolls but lands on the same item, snap it back to the perfect center
            const scrollerHeight = scroller.offsetHeight;
            const scrollTop = newIndex * itemHeight - scrollerHeight / 2 + itemHeight / 2;
            scroller.scrollTo({ top: scrollTop, behavior: 'smooth' });
        }
    }, 150); // 150ms delay to detect scroll end
  };

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className={`h-[150px] overflow-y-scroll no-scrollbar ${className}`}
      style={{ scrollSnapType: "y mandatory" }}
    >
      {/* Top padding to allow the first item to be centered */}
      <div className="h-[52px] flex-shrink-0" />

      {items.map((item) => (
        <div
          key={item}
          className={`h-11 flex items-center justify-center cursor-pointer text-4xl scroll-snap-align-center`}
        >
          {/* Apply styles based on whether the item is the selected one */}
          <span
            className={`transition-all duration-200 ${
              value === item
                ? "font-bold text-gray-900 scale-100"
                : "font-normal text-gray-400 scale-90"
            }`}
          >
            {item}
          </span>
        </div>
      ))}

      {/* Bottom padding to allow the last item to be centered */}
      <div className="h-[52px] flex-shrink-0" />

      {/* JSX styles to hide the scrollbar, making this component fully self-contained */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scroll-snap-align-center {
          scroll-snap-align: center;
        }
      `}</style>
    </div>
  );
};

export default DigitScroller;