import React from "react";
import { ImageUploadIcon } from "../../../public/svg-icons/icons";

const ImageUploadComponent = () => {
  return (
    <div>
      <div className="flex flex-col items-center border-2 border-app-text-secondary border-dotted rounded-lg py-5 px-2">
        <ImageUploadIcon />
        <p className="text-[10.59px] text-app-text-secondary text-center font-plusJakartaSans-400 mb-[10px]">
          Upload an image
        </p>
      </div>
    </div>
  );
};

export default ImageUploadComponent;
