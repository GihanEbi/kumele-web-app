import React, { useRef, useState } from "react";
import {
  ImageUploadIcon,
  UploadImageIcon,
} from "../../../public/svg-icons/icons";
import Image from "next/image";

type ImageUploadComponentProps = {
  onChange?: (file: File) => void;
  isDisabled?: boolean;
  value?: string | null;
};

const ImageUploadComponent = ({
  onChange,
  isDisabled,
  value,
}: ImageUploadComponentProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    value || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  // Image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      onClick={triggerFileInput}
      className={`${
        !value
          ? "border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-5 text-center cursor-pointer transition-colors"
          : ""
      } `}
    >
      {imagePreview ? (
        <div className="relative w-full h-40 rounded-md overflow-hidden">
          <Image
            src={imagePreview}
            alt="Event preview"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      ) : (
        <>
          <div className="mx-auto h-[19.46px] w-[19.46px] text-gray-400">
            <UploadImageIcon />
          </div>

          <p className="font-plusJakartaSans font-normal text-[10.54px] text-gray-500 mt-2">
            Upload an image
          </p>
        </>
      )}
      <input
        type="file"
        ref={fileInputRef}
        disabled={true}
        onChange={(e: any) => {
          handleImageUpload(e);
          // setImagePreview(URL.createObjectURL(e.target.files[0]));
          // handleInputChange(e.target.files[0], "event_image");
          // onChange?.(e.target.files[0]);
        }}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ImageUploadComponent;
