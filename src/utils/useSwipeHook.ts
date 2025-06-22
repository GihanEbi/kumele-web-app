"use client";

import { useMotionValue, useTransform } from "framer-motion";
import type { PanInfo } from "framer-motion";

// Configuration for the swipe gesture
interface SwipeToDismissOptions {
  onClose: () => void;
  dragThreshold?: number;
  rotationFactor?: number;
}

const DRAG_THRESHOLD = 150;
const ROTATION_FACTOR = 20;

/**
 * A custom hook to enable swipe-to-dismiss functionality on a Framer Motion component.
 *
 * @param {SwipeToDismissOptions} options - Configuration for the swipe gesture.
 * @returns An object with motion values and an event handler to apply to a motion component.
 */
export const useSwipeToDismiss = ({
  onClose,
  dragThreshold = DRAG_THRESHOLD,
  rotationFactor = ROTATION_FACTOR,
}: SwipeToDismissOptions) => {
  // Motion value to track the horizontal drag position
  const x = useMotionValue(0);

  // Transform the x position into a rotation value for a card-like effect
  const rotate = useTransform(
    x,
    [-dragThreshold * 2, dragThreshold * 2],
    [-rotationFactor, rotationFactor]
  );

  // Event handler for when the drag gesture ends
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // If the component is dragged past the threshold, trigger the onClose callback
    if (Math.abs(info.offset.x) > dragThreshold) {
      onClose();
    }
  };

  return {
    x,
    rotate,
    handleDragEnd,
  };
};