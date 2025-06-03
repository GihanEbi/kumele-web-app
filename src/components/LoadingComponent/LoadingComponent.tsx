import Image from "next/image";
import React from "react";

const LoadingComponent = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Image
        src="/common-gifs/loading.gif"
        alt="Loading"
        width={50}
        height={50}
        className="mx-auto my-10 animate-spin"
      />
    </div>
  );
};

export default LoadingComponent;
