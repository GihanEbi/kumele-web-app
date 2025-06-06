import React from "react";

import Lottie from "lottie-react";
import animationData from "../../../../public/json_files/Man with a Candy final  blue.json";

interface animationProps {
  width?: number | string;
  height?: number | string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}
const HomePageGif: React.FC<animationProps> = ({
  width = "100%",
  height = "100%",
  loop = true,
  autoplay = true,
  className,
}) => {
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

export default HomePageGif;
