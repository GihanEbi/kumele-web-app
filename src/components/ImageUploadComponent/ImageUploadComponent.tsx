import React from "react";
import { ImageUploadIcon } from "../../../public/svg-icons/icons";

const ImageUploadComponent = () => {
  return (
    <div>
      <div 
  className="flex flex-col items-center py-5 px-2 custom-dotted-border">
        <ImageUploadIcon className="text-app-text-secondary "/>
        <p className="text-[10.59px] text-app-text-secondary text-center font-plusJakartaSans-400 mb-[10px]">
          Upload an image
        </p>
      </div>
    </div>
  );
};

export default ImageUploadComponent;
