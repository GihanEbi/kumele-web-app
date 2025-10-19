// src/components/icons/PercentageRateIcon.tsx

import { useId, type SVGProps } from "react";

// Define the path data separately so we can reuse it
const starPathData =
  "M10.7023 2.781C10.9573 2.301 11.4563 2 12.0003 2C12.5443 2 13.0433 2.301 13.2983 2.781L15.7613 7.426C15.7893 7.48 15.8303 7.526 15.8793 7.562C15.9283 7.598 15.9853 7.622 16.0453 7.632L21.2233 8.539C21.7593 8.633 22.1983 9.015 22.3673 9.532C22.5353 10.049 22.4043 10.617 22.0253 11.008L18.3693 14.786C18.3273 14.83 18.2953 14.883 18.2763 14.94C18.2573 14.998 18.2523 15.059 18.2603 15.12L18.9973 20.325C19.0733 20.863 18.8463 21.4 18.4063 21.72C17.9663 22.04 17.3863 22.09 16.8973 21.851L12.1753 19.541C12.1213 19.514 12.0613 19.5 12.0003 19.5C11.9393 19.5 11.8793 19.514 11.8243 19.54L7.10234 21.85C6.61334 22.089 6.03334 22.038 5.59334 21.719C5.15334 21.399 4.92634 20.863 5.00234 20.324L5.73934 15.119C5.74834 15.059 5.74234 14.997 5.72334 14.939C5.70434 14.881 5.67334 14.828 5.63034 14.785L1.97434 11.007C1.59634 10.616 1.46434 10.048 1.63234 9.531C1.80034 9.014 2.24034 8.632 2.77634 8.538L7.95434 7.631C8.01434 7.62 8.07134 7.596 8.12034 7.561C8.16934 7.525 8.21034 7.479 8.23834 7.425L10.7023 2.781Z";

interface PercentageRateIconProps extends SVGProps<SVGSVGElement> {
  /**
   * The percentage (0-100) of the icon to be filled with the primary color.
   */
  percentage: number;
  /**
   * The Tailwind CSS class for the filled part of the icon.
   */
  filledClassName?: string;
  /**
   * The Tailwind CSS class for the unfilled/background part of the icon.
   */
  unfilledClassName?: string;
}

export function PercentageRateIcon({
  percentage,
  filledClassName = "text-app-icon", // Default filled color
  unfilledClassName = "text-app-icon-muted", // Default unfilled color
  ...props
}: PercentageRateIconProps) {
  // Generate a unique ID for the clip path to avoid conflicts
  const clipId = useId();

  // Clamp the percentage between 0 and 100 to prevent visual bugs
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  // The SVG viewBox is "0 0 24 24", so its width is 24 units.
  // We calculate the width of our clipping rectangle based on the percentage.
  const clipWidth = (24 * clampedPercentage) / 100;

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Define the clipping path. It's a rectangle that will only show what's inside it. */}
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width={clipWidth} height="24" />
        </clipPath>
      </defs>

      {/* 1. The background star. Always fully visible. */}
      {/* It uses the `unfilledClassName` and `fill="currentColor"` to get its color. */}
      <path
        className={unfilledClassName}
        fillRule="evenodd"
        clipRule="evenodd"
        d={starPathData}
        fill="currentColor"
      />

      {/* 2. The foreground star. This one is clipped. */}
      {/* It uses the `filledClassName` and is only visible within the area of the clipPath. */}
      <path
        className={filledClassName}
        fillRule="evenodd"
        clipRule="evenodd"
        d={starPathData}
        fill="currentColor"
        clipPath={`url(#${clipId})`} // Apply the clipping path here
      />
    </svg>
  );
}