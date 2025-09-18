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

const slides = [
  { type: "image", src: "/common-gifs/advert-preview.gif" },
  { type: "video", src: "/videos/short-video.mp4" },
  { type: "video", src: "/videos/event-video-sounds.mp4" },
  // { type: "video", src: "https://www.youtube.com/watch?v=MlRRruoNccw" },
  { type: "image", src: "/images/advert-preview-3.png" },
];

const PreviewAdvertise = ({
  isOpen,
  onClose,
  advertData,
}: AdvertisePreviewModalProps) => {
  const [isExtendedPreviewOpen, setIsExtentedPreviewOpen] =
    useState<boolean>(false);

  //state to manage the current slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen, currentIndex]);

  useEffect(() => {
    if (isOpen) {
      setIsExtentedPreviewOpen(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <>
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
            <Image
              src="/images/spotify.png"
              alt="Spotify Logo"
              width={35}
              height={35}
              className="absolute top-4 left-4 z-10"
            />
            <button
              onClick={onClose}
              className="absolute -top-1 -right-1 z-20 bg-app-background-tertiary p-1"
              aria-label="Close"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            {slides[currentIndex].type === "image" ? (
              <img
                src={slides[currentIndex].src}
                alt={`Advertisement ${currentIndex + 1}`}
                className="w-[319px] h-[279px] object-cover rounded-t-2xl"
              />
            ) : (
              <video
                src={slides[currentIndex].src}
                autoPlay
                //muted
                loop
                playsInline
                className="w-[319px] h-[279px] object-cover rounded-t-2xl"
              />
            )}

            <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center gap-x-[32px] z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-[8px] h-[8px] rounded-full transition-colors duration-300 ${
                    currentIndex === index ? "bg-app-text-yellow" : "bg-white"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center">
              <h1 className="font-plusJakartaSans font-bold text-[19px]">
                {advertData?.campaign_name || "Advert name"}
              </h1>
              {/* <button className="bg-app-button-primary text-app-button-text-color font-plusJakartaSans font-semibold py-[8px] px-[16px] rounded-[5px] text-[14px]">
                {advertData.call_to_action || "Call to action"}
              </button> */}
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
              <p className="mt-2 font-plusJakartaSans text-app-button-model-text-color font-normal text-[14px]  text-sm">
                {advertData?.title || "Advert title"}
              </p>
            ) : (
              <div className="mt-4 overflow-y-auto max-h-32 pr-2 text-sm leading-relaxed [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <p className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[13px]">
                  {advertData?.description ||
                    "This is a detailed description of the advertisement. It provides more information about the product or service being advertised, its features, benefits, and any other relevant details that might interest potential customers."}
                </p>
                {/* <p
                  style={{ color: "#004DFF" }}
                  className="font-plusJakartaSans font-bold text-[13px] underline mt-2"
                >
                  {advertData.second_call_to_action || "Second call to action"}
                </p> */}
                <a
                  href={advertData?.second_call_to_action_link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#004DFF" }}
                  className="font-plusJakartaSans font-bold text-[13px] underline mt-2"
                >
                  {advertData?.second_call_to_action || "Second call to action"}
                </a>

                {/* <div className="h-8 flex-shrink-0" /> */}
              </div>
            )}

            <div
              className={`flex justify-end mt-3 ${
                isExtendedPreviewOpen ? "" : ""
              }`}
            >
              <button
                onClick={() => setIsExtentedPreviewOpen(!isExtendedPreviewOpen)}
                className={`${
                  isDark ? "bg-gray-500" : "bg-app-range-slider-track-active"
                } dark:bg-zinc-700 rounded-full p-1 self-end`}
              >
                <DownArrowIcon
                  className={`w-6 h-6  transition-transform duration-300 ${
                    isExtendedPreviewOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewAdvertise;
