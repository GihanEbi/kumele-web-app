import React from "react";

import Lottie from "lottie-react";
import animationData from "../../../../public/json_files/icons8-hot-chocolate-with-marshmallows.json";

interface animationProps {
  width?: number | string;
  height?: number | string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}
const HotChocolateGif: React.FC<animationProps> = ({
  width = 100,
  height = 100,
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

export default HotChocolateGif;