// components/TimeDigitScroller.tsx
"use client";

import { useEffect, useRef } from "react";

 export const TimeDigitScroller = ({
    items,
    value,
    setValue,
    className,
  }: {
    items: string[];
    value: string;
    setValue: (v: string) => void;
    className?: string;
  }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // This effect now correctly depends on `value` to re-center when state changes
    useEffect(() => {
      const scroller = scrollRef.current;
      if (scroller) {
        const selectedItem = Array.from(scroller.children).find(
          (child) => child.textContent === value
        ) as HTMLElement;
        if (selectedItem) {
          const scrollerHeight = scroller.offsetHeight;
          const itemHeight = selectedItem.offsetHeight;
          const scrollTop =
            selectedItem.offsetTop - scrollerHeight / 2 + itemHeight / 2;
          scroller.scrollTo({ top: scrollTop, behavior: "smooth" }); // Changed to smooth for better UX
        }
      }
    }, [value]); // Dependency array updated to [value]

    return (
      <div
        ref={scrollRef}
        className={`h-[150px] overflow-y-scroll no-scrollbar text-4xl ${className}`}
        style={{ scrollSnapType: "y mandatory" }}
      >
        <div className="h-[50px]" />
        {items.map((item) => (
          <div
            key={item}
            onClick={() => setValue(item)}
            className={`model-texts h-12 flex items-center justify-center cursor-pointer scroll-snap-align-center ${
              value === item
                ? "font-plusJakartaSans text-app-button-model-text-color font-semibold  font-normal" // Updated styles to match image
                : "font-plusJakartaSans font-semibold text-app-search-bar-text text-[13.89px]"
            }`}
          >
            {item}
          </div>
        ))}
        <div className="h-[50px]" />
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