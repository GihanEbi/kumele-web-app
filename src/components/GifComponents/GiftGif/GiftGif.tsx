"use client";

import React, { useState, useEffect, FC } from "react";
import Lottie from "lottie-react";
import { useTheme } from "next-themes";
import originalAnimationData from "../../../../public/json_files/icons8-gift.json";

type LottieAnimationData = Record<string, any>;

// Helper function to deep-clone the JSON object.
const cloneJson = (obj: LottieAnimationData): LottieAnimationData => {
  return JSON.parse(JSON.stringify(obj));
};

// Function to find and update colors in the Lottie JSON, now with types.
const updateLottieColor = (
  animationData: LottieAnimationData,
  newColor: number[]
): LottieAnimationData => {
  const updatedData = cloneJson(animationData);

  updatedData.layers.forEach((layer: any) => {
    if (layer.shapes) {
      layer.shapes.forEach((shape: any) => {
        if (shape.it) {
          shape.it.forEach((item: any) => {
            // 'fl' stands for 'fill'
            if (item.ty === "fl" && item.c?.k) {
              // Replace the color value. Lottie uses [R, G, B, A] from 0 to 1.
              item.c.k = [...newColor, 1];
            }
          });
        }
      });
    }
  });
  return updatedData;
};

interface animationProps {
  width?: number | string;
  height?: number | string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}
const GiftGif: React.FC<animationProps> = ({
  width = 100,
  height = 100,
  loop = true,
  autoplay = true,
  className,
}) => {
  const { theme } = useTheme();
  const [animationData, setAnimationData] = useState<LottieAnimationData>(
    originalAnimationData
  );
  useEffect(() => {
    // theme can be undefined on initial render, so we check for it.
    if (theme) {
      // Lottie colors are normalized from 0-255 to 0-1.
      const lightColor = [0, 0, 0]; // Black: R=0, G=0, B=0
      const darkColor = [1, 1, 1]; // White: R=1, G=1, B=1

      const newColor = theme === "dark" ? darkColor : lightColor;

      const updatedData = updateLottieColor(originalAnimationData, newColor);
      setAnimationData(updatedData);
    }
  }, [theme]);

  return (
    <div>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ width, height }}
        className={className}
      />
    </div>
  );
};

export default GiftGif;
