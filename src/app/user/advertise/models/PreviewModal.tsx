"use client";
import React, { useEffect, useState } from "react";
import {
  CloseIcon,
  DownArrowIcon,
} from "../../../../../public/svg-icons/icons";
import Image from "next/image";
import { useTheme } from "next-themes";

type AdvertProps = {
  category_id: string;
  advert_image_type: string;
  advert_image_url_1: File | string;
  advert_image_url_2?: File | string;
  advert_image_url_3?: File | string;
  call_to_action: string;
  call_to_action_link: string;
  second_call_to_action: string;
  second_call_to_action_link: string;
  campaign_name: string;
  title: string;
  description: string;
  audience_min_age: number;
  audience_max_age: number;
  gender: string[];
  region: string;
  advert_location: string[];
  language: string;
  advert_placement: string;
  platform: string[];
  daily_budget_type: string;
  daily_budget: number;
  advert_duration: number;
  save_template?: boolean;
};

type AdvertisePreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  advertData: AdvertProps | undefined;
};

// ✅ Helper: detect if file or URL is video
function isVideoFile(fileOrUrl: File | string | undefined): boolean {
  if (!fileOrUrl) return false;

  // File type detection
  if (fileOrUrl instanceof File) {
    return fileOrUrl.type.startsWith("video/");
  }

  // URL extension detection
  const ext = fileOrUrl.split(".").pop()?.toLowerCase();
  return ["mp4", "webm", "mov", "avi", "mkv"].includes(ext || "");
}

const PreviewAdvertise = ({
  isOpen,
  onClose,
  advertData,
}: AdvertisePreviewModalProps) => {
  const [isExtendedPreviewOpen, setIsExtentedPreviewOpen] =
    useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Auto-slide if not static type
  useEffect(() => {
    if (isOpen && advertData?.advert_image_type !== "static") {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // Reset preview toggle when opened
  useEffect(() => {
    if (isOpen) {
      setIsExtentedPreviewOpen(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // ✅ Compute which image/video to show
  const getCurrentFileOrUrl = (): File | string | undefined => {
    if (currentIndex === 0) return advertData?.advert_image_url_1;
    if (currentIndex === 1) return advertData?.advert_image_url_2;
    return advertData?.advert_image_url_3;
  };

  const currentFileOrUrl = getCurrentFileOrUrl();

  const previewUrl =
    currentFileOrUrl instanceof File
      ? URL.createObjectURL(currentFileOrUrl)
      : currentFileOrUrl || "/images/advert-preview-3.png";

  const isVideo = isVideoFile(currentFileOrUrl);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-center items-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-app-background-tertiary rounded-4xl w-full max-w-sm max-h-[85vh] shadow-lg flex flex-col overflow-y-auto no-scrollbar p-4 ${
          isExtendedPreviewOpen ? "pb-20" : "pb-8"
        } sm:p-5`}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute -top-1 -right-1 z-20 bg-app-background-tertiary p-1"
            aria-label="Close"
          >
            <CloseIcon className="h-5 w-5" />
          </button>

          {/* ✅ Preview: Image or Video */}
          <div className="w-full h-[279px] rounded-t-2xl overflow-hidden">
            {isVideo ? (
              <video
                src={previewUrl}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <Image
                src={previewUrl}
                alt="Advertisement Preview"
                width={319}
                height={279}
                className="w-full h-[279px] object-cover rounded-t-2xl"
              />
            )}
          </div>

          {/* ✅ Dots for dynamic slides */}
          {advertData?.advert_image_type !== "static" && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center gap-x-[32px] z-10">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-[8px] h-[8px] rounded-full transition-colors duration-300 ${
                    currentIndex === index
                      ? "bg-app-text-yellow"
                      : "bg-white/70"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ✅ Content Section */}
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h1 className="font-plusJakartaSans font-bold text-[19px]">
              {advertData?.campaign_name || "Advert name"}
            </h1>

            <button
              onClick={() =>
                window.open(advertData?.call_to_action_link || "#", "_blank")
              }
              className="bg-app-button-primary text-app-button-text-color font-plusJakartaSans font-semibold py-[8px] px-[16px] rounded-[5px] text-[14px]"
            >
              {advertData?.call_to_action || "Call to action"}
            </button>
          </div>

          {!isExtendedPreviewOpen ? (
            <p className="mt-2 font-plusJakartaSans text-app-button-model-text-color font-normal text-[14px] text-sm">
              {advertData?.title || "Advert title"}
            </p>
          ) : (
            <div className="mt-4 overflow-y-auto max-h-32 pr-2 text-sm leading-relaxed [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <p className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[13px]">
                {advertData?.description ||
                  "This is a detailed description of the advertisement. It provides more information about the product or service being advertised, its features, benefits, and any other relevant details that might interest potential customers."}
              </p>

              <a
                href={advertData?.second_call_to_action_link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#004DFF" }}
                className="font-plusJakartaSans font-bold text-[13px] underline mt-2 block"
              >
                {advertData?.second_call_to_action || "Second call to action"}
              </a>
            </div>
          )}

          <div className="flex justify-end mt-3">
            <button
              onClick={() => setIsExtentedPreviewOpen(!isExtendedPreviewOpen)}
              className={`${
                isDark ? "bg-gray-500" : "bg-app-range-slider-track-active"
              } dark:bg-zinc-700 rounded-full p-1`}
            >
              <DownArrowIcon
                className={`w-6 h-6 transition-transform duration-300 ${
                  isExtendedPreviewOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewAdvertise;
