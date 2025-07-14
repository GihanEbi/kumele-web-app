"use client";
import React, { useEffect, useState } from "react";
import {
  CloseIcon,
  DownArrowIcon,
} from "../../../../../public/svg-icons/icons";
import Image from "next/image";
import { useTheme } from "next-themes";

type AdvertisePreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const slides = [
  "/common-gifs/advert-preview.gif",
  "/images/advert-preview-2.png",
  "/images/advert-preview-3.png",
];

const PreviewAdvertise = ({ isOpen, onClose }: AdvertisePreviewModalProps) => {
  const [isExtendedPreviewOpen, setIsExtentedPreviewOpen] =
    useState<boolean>(false);

  //state to manage the current slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 3000);
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
            <img
              src={slides[currentIndex]}
              alt={`Advertisement ${currentIndex + 1}`}
              className="w-[319px] h-[279px] object-cover rounded-t-2xl"
            />
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
                Get spotify for free
              </h1>
              <button className="bg-app-button-primary text-app-button-text-color font-plusJakartaSans font-semibold py-[8px] px-[16px] rounded-[5px] text-[14px]">
                Install Now
              </button>
            </div>

            {!isExtendedPreviewOpen ? (
              <p className="mt-2 font-plusJakartaSans text-app-button-model-text-color font-normal text-[14px]  text-sm">
                Get spotify premium for just 9,99 USD
              </p>
            ) : (
              <div className="mt-4 overflow-y-auto max-h-32 pr-2 text-sm leading-relaxed [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <p className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[13px]">
                  Spotify makes it easy to find the right music or podcast for
                  every moment - on your phone, computer, tablet and other
                  devices. You can find millions of songs and episodes on
                  Spotify. Whether you're behind the wheel, working out, going
                  out or just relaxing, you'll find just the right music or
                  podcast in no time.
                </p>
                <p
                  style={{ color: "#004DFF" }}
                  className="font-plusJakartaSans font-bold text-[13px] underline mt-2"
                >
                  Get spotify now
                </p>
                {/* <div className="h-8 flex-shrink-0" /> */}
              </div>
            )}

            {!isExtendedPreviewOpen && (
              <div className="flex justify-end mt-3">
                <button
                  onClick={() =>
                    setIsExtentedPreviewOpen(!isExtendedPreviewOpen)
                  }
                   className={`${
                    isDark ? "bg-gray-500" : "bg-app-range-slider-track-active"
                  } dark:bg-zinc-700 rounded-full p-1 self-end`}
                >
                  <DownArrowIcon
                    className={`w-6 h-6 text-neutral-300 transition-transform duration-300 ${
                      isExtendedPreviewOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewAdvertise;
