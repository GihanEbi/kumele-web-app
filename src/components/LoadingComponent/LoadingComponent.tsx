import React from "react";

import Lottie from "lottie-react";
import animationData from "../../../public/json_files/icons8-dots-loading.json";

interface DotsLoadingAnimationProps {
  width?: number | string;
  height?: number | string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

const LoadingComponent: React.FC<DotsLoadingAnimationProps> = ({
  width = 100,
  height = 100,
  loop = true,
  autoplay = true,
  className,
}) => {
  const defaultOptions = {
    loop: loop,
    autoplay: autoplay,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Lottie
      animationData={animationData} // This is the direct way with lottie-react
      loop={loop}
      autoplay={autoplay}
      style={{ width, height }}
      className={className}
    />
  );
};

export default LoadingComponent;
