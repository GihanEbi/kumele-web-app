"use client";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  ClockIcon,
  DownArrowIcon,
  LocationIcon,
  ShareIcon,
  TwoTicketsIcon,
  UsersIcon,
  YingyangIcon,
} from "../../../public/svg-icons/icons";
import ClockGif from "../GifComponents/ClockGif/ClockGif";
import { useTheme } from "next-themes";
import { mockHostData, mockOtherEvents } from "./data";
import HostInfo from "./hostInfo/HostInfo";
import OtherEvents from "./otherEvents/OtherEvents";

//types of a event
type Event = {
  id: number;
  imageSrc: string;
  title: string;
  category: string;
  price: string;
  time: string;
  guests: string;
  startsIn: string;
  location: string;
  subtitle: string;
  description: string;
};

// types for card
interface EventCardProps {
  index: number;
  event: Event;
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
  onOpenShareModal: () => void;

  // +++ ADD THESE NEW PROP TYPES +++
  isStackExtended: boolean;
  setIsStackExtended: Dispatch<SetStateAction<boolean>>;
}

//destructing data for hostcard and other events components
const { hostData, otherEvents } = {
  hostData: mockHostData,
  otherEvents: mockOtherEvents,
};

export default function EventCard({
  event,
  events,
  setEvents,
  onOpenShareModal,
  index,
  // +++ DESTRUCTURE THE NEW PROPS +++
  isStackExtended,
  setIsStackExtended,
}: EventCardProps) {
  //state for extend the card
  const [isExtendedPreviewOpen, setIsExtentedPreviewOpen] =
    useState<boolean>(false);

  //identifying the them
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  //variables for dragging animations and styles
  const x = useMotionValue(0);
  console.log("index isss", index);
  const depth = events.length - 1 - index;
  console.log("depth is:", depth);
  const isFront = depth === 0;
  const isHidden = depth > 2;

  const width =
    depth === 0
      ? "clamp(16rem, 80vw, 20rem)" // front card
      : depth === 1
      ? "clamp(14rem, 70vw, 17rem)" // 1st under-card
      : "clamp(12rem, 60vw, 15rem)"; // 2nd under-card

  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotate = useTransform(x, [-150, 150], [-18, 18]);
  const placeholderBg = isFront
    ? "" // Front card gets its background from the inner div
    : depth === 1
    ? "bg-app-bg-placeholder-firstcard w-full h-full pb-6 "
    : depth === 2
    ? "bg-app-bg-placeholder-secondcard w-full h-full pb-6"
    : "";

  //card dragging handle function
  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 50) {
      // +++ ADD THIS LINE TO COLLAPSE THE STACK ON SWIPE +++
      setIsStackExtended(false);
      setEvents((pv) => pv.filter((v) => v.id !== event.id));
    }
  };

  //debugging
  useEffect(() => {
    console.log(x);
  }, [x]);

  //debugging
  useMotionValueEvent(x, "change", (latest) => console.log(latest));

  return (
    <motion.div
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        width,
        opacity,
        rotate,
        transition: "0.125s transform",
        scale: isStackExtended ? 1 : 1 - depth * 0.02,
        y:
          isStackExtended && depth === 1
            ? depth * 24
            : isStackExtended && depth === 2
            ? depth * 16
            : depth * 12,

        zIndex: events.length - depth,
        height: isStackExtended
          ? "92vh"
          : events.length === 1
          ? "26rem"
          : "26rem",
      }}
      animate={{
        scale: isFront ? 1 : 0.98,
      }}
      className={` ${placeholderBg} ${isHidden ? "hidden" : ""} ${
        isStackExtended ? "origin-top" : "origin-bottom"
      } rounded-4xl
            overflow-hidden  ${
              isStackExtended ? "" : "hover:cursor-grab active:cursor-grabbing"
            }`}
      drag={isStackExtended ? false : isFront ? "x" : false}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    >
      {depth === 0 && (
        <div
          className={`bg-app-background-tertiary rounded-4xl w-full h-full flex flex-col ${
            isStackExtended && isFront
              ? "overflow-y-auto no-scrollbar"
              : "overflow-hidden" //change
          }pb-6  `}
        >
          {isFront && (
            <>
              <div
                className={`flex-1 ${
                  isStackExtended ? "overflow-y-auto no-scrollbar" : ""
                } rounded-4xl`}
              >
                <div className="relative">
                  <img
                    src={event.imageSrc}
                    alt={event.title}
                    draggable={false} //prevents browser default drag
                    className="w-full h-64 object-cover pointer-events-none rounded-t-4xl"
                  />
                  <div className="absolute top-5 right-6 bg-app-bg-preview-category-tag-bg text-white text-xs px-3 py-1 rounded-full flex items-center space-x-1.5">
                    <YingyangIcon />
                    <span className="font-plusJakartaSans text-white font-normal text-[11px]">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start mb-4 mt-3 px-3">
                  <h1 className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[22px]">
                    {event.title}
                  </h1>
                  <button
                    onClick={onOpenShareModal}
                    className={`${
                      isDark ? "bg-white" : "bg-black"
                    }  p-1 rounded-md`}
                  >
                    <ShareIcon
                      className={`${
                        isDark ? "text-black" : "text-white"
                      } w-[18.07px] h-[18.07px]`}
                    />
                  </button>
                </div>

                {/* DETAILS SECTION */}
                <div className="space-y-3 px-3">
                  <div className="flex items-center gap-2 text-sm ">
                    <div className="flex items-center space-x-0.5">
                      <TwoTicketsIcon className="h-[20px] w-[20px]" />{" "}
                      <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[14px]">
                        {event.price}
                      </span>
                    </div>
                    <div className="flex items-center space-x-0.5">
                      <ClockIcon className="h-[20px] w-[20px]" />{" "}
                      <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[14px]">
                        {event.time}
                      </span>
                    </div>
                    <div className="flex items-center space-x-0.5">
                      <UsersIcon className="h-[20px] w-[20px]" />{" "}
                      <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[14px]">
                        {event.guests} guests
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <div className="flex items-center space-x-0.5">
                        <ClockGif width={19} height={19} />
                        <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[14px]">
                          {event.startsIn}
                        </span>
                      </div>
                      <div className="flex items-center space-x-0.5 mt-2">
                        <LocationIcon className="h-[20px] w-[20px]" />{" "}
                        <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[14px]">
                          {event.location}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsStackExtended(!isStackExtended)}
                      className={`${
                        isDark
                          ? "bg-gray-500"
                          : "bg-app-range-slider-track-active"
                      } dark:bg-zinc-700 rounded-full p-1 self-end`}
                    >
                      <DownArrowIcon
                        className={`${
                          isStackExtended ? "rotate-180" : ""
                        } w-6 h-6`}
                      />
                    </button>
                  </div>
                </div>

                {/* scrollable area:for further reference styles */}
                {isStackExtended && isFront && (
                  <>
                    {/* Outer container for scrolling and height */}
                    <div className="mt-6 overflow-y-auto max-h-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      {/* Inner container for padding AND explicit left alignment */}
                      <div className="px-4 text-left">
                        <p className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[13px]">
                          {event.subtitle}
                        </p>
                        <p className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[13px] mt-1">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    {/* Event details section end */}

                    <div className="mt-15 px-3">
                      <HostInfo host={hostData} />
                    </div>
                    <div className="px-3 pb-4">
                      <OtherEvents
                        events={otherEvents}
                        hostName={hostData.name}
                      />
                    </div>
                  </>
                )}
              </div>
            </>
          )}
          {!isFront && <div className="w-full h-full bg-transparent"></div>}
        </div>
      )}
    </motion.div>
  );
}
