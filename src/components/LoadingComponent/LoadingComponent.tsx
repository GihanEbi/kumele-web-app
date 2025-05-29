import Image from "next/image";
import React from "react";

const LoadingComponent = () => {
  return (
    <div>
      <Image
        src="/common-gifs/loading.gif"
        alt="Loading"
        width={100}
        height={100}
        className="mx-auto my-10 animate-spin"
      />
    </div>
  );
};

export default LoadingComponent;
