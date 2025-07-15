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
  CloseIcon,
  DownArrowIcon,
  LocationIcon,
  ShareIcon,
  TwoTicketsIcon,
  UsersIcon,
  YingyangIcon,
} from "../../../public/svg-icons/icons";
import ClockGif from "../GifComponents/ClockGif/ClockGif";
import { useTheme } from "next-themes";
import { mockHostData } from "./data";
import HostInfo from "./hostInfo/HostInfo";
import OtherEvents from "./otherEvents/OtherEvents";
import { useAppContext } from "@/context/AppContext";
import RatingSection from "./otherEvents/RatingSection";

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
  isPlaceholder?: boolean;
};

// types for card
interface EventCardProps {
  index: number;
  event: Event;
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
  onOpenShareModal: () => void;
  isStackExtended: boolean;
  setIsStackExtended: Dispatch<SetStateAction<boolean>>;
  onOpenOtherEvent: (ev: Event) => void;
  isOverlay?: boolean;
  onCloseOverlayCard?: () => void;
}

const mockOtherEvents: Event[] = [
  {
    id: 101,
    category: "Live Music",
    imageSrc: "/bg-imgs/event1.jpg",
    title: "Acoustic Sunset",
    price: "$10",
    time: "6:00-8:00",
    guests: "25",
    startsIn: "Next Friday",
    location: "Central Park",
    subtitle:
      "🎶 Unwind with an evening of live acoustic music as the sun sets.",
    description:
      "Enjoy a relaxing and intimate musical performance in a beautiful outdoor setting. Perfect for a date night or a peaceful evening with friends.",
  },
  {
    id: 102,
    category: "Workshop",
    imageSrc: "/bg-imgs/event2.jpg",
    title: "DJing 101",
    price: "$25",
    time: "2:00-5:00",
    guests: "10",
    startsIn: "In 2 weeks",
    location: "Groove Studio",
    subtitle: "🎧 Learn the basics of DJing from a pro!",
    description:
      "This hands-on workshop covers everything from beat-matching to mixing. No experience necessary. All equipment is provided.",
  },
  {
    id: 103,
    category: "Rooftop Party",
    imageSrc: "/bg-imgs/event3.jpg",
    title: "City Lights",
    price: "$15",
    time: "9:00-12:00",
    guests: "40",
    startsIn: "In 3 weeks",
    location: "The Sky Lounge",
    subtitle: "🌆 Dance under the stars with breathtaking city views.",
    description:
      "Join us for a rooftop party with a live DJ, great drinks, and the best views in town. Let's make it a night to remember.",
  },
];

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
  isStackExtended,
  setIsStackExtended,
  onOpenOtherEvent,
  onCloseOverlayCard,
  isOverlay,
}: EventCardProps) {
  //identifying the theme
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  //calling app context to get the state of bottomnav bar fixed
  const setIsBottomNavBarFixed = useAppContext().setIsBottomNavBarFixed;
  const isBottomNavBarFixed = useAppContext().isBottomNavBarFixed;
  console.log("isBottomNavBarFixed is:", isBottomNavBarFixed);

  const isMoreOptionsOpen = useAppContext().moreOption;
  console.log("isMoreOptionsOpen is:", isMoreOptionsOpen);

  //variables for dragging animations and styles
  const x = useMotionValue(0);
  console.log("index isss", index);
  const depth = events.length - 1 - index;
  console.log("depth is:", depth);
  const isFront = depth === 0;
  const isHidden = depth > 3;

  //width calculation based on depth
  const width =
    depth === 0
      ? "clamp(18rem, 87vw, 30rem)"
      : depth === 1
      ? "clamp(17rem, 85vw, 29rem)"
      : depth === 2
      ? "clamp(14rem, 80vw, 27rem)"
      : depth === 3
      ? "clamp(13rem, 70vw, 26rem)"
      : "clamp(12rem, 67vw, 25rem)";

  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotate = useTransform(x, [-150, 150], [-18, 18]);

  //declaring placeholder background styles based on depth and isFront
  const placeholderBg = isFront
    ? ""
    : depth === 2
    ? "bg-app-bg-placeholder-firstcard w-full h-full pb-6 "
    : depth === 3
    ? "bg-app-bg-placeholder-secondcard w-full h-full pb-6"
    : "";

  //card dragging handle function
  const handleDragEnd = () => {
    if (event.isPlaceholder) return;
    if (Math.abs(x.get()) > 50) {
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

  const handleToggleDownArrow = () => {
    setIsStackExtended(!isStackExtended);
    setIsBottomNavBarFixed(!isBottomNavBarFixed);
  };

  return (
    <motion.div
      style={{
        position: isStackExtended && isFront ? "absolute" : "relative", //changeddd
        top: isStackExtended && isFront ? "0" : "auto", //chaned
        gridRow: 1,
        gridColumn: 1,
        x,
        width,
        opacity,
        rotate,
        transition: "0.125s transform",
        scale: isStackExtended ? 1 : 1 - depth * 0.02,
        y:
          isStackExtended && depth === 2
            ? depth * 18
            : isStackExtended && depth === 3
            ? depth * 18
            : isStackExtended && depth === 3 && isOverlay
            ? depth * 26
            : depth === 1
            ? depth * 0
            : depth === 2
            ? depth * 9
            : depth * 12,

        zIndex: events.length - depth, //change
        // zIndex: isStackExtended && isFront ? 50 : events.length - depth,
        height: isStackExtended
          ? "92vh"
          : events.length === 1
          ? "29rem"
          : "29rem",
      }}
      animate={{
        scale: isFront ? 1 : isStackExtended ? 0.98 : 0.92,
      }}
      className={`${placeholderBg} ${isHidden ? "hidden" : ""} ${
        isStackExtended ? "origin-top" : "origin-bottom"
      }  ${
        isOverlay
          ? "rounded-tl-4xl rounded-br-4xl rounded-bl-4xl"
          : "rounded-4xl"
      }
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
      {(depth === 0 || depth === 1) && (
        <div
          className={` ${
            isMoreOptionsOpen && isDark
              ? "bg-neutral-900"
              : isMoreOptionsOpen && !isDark
              ? "bg-gray-100"
              : "bg-app-background-tertiary"
          }  ${
            isOverlay
              ? "rounded-tl-4xl rounded-br-4xl rounded-bl-4xl rounded-tr-4xl"
              : "rounded-4xl"
          } w-full h-full flex flex-col ${
            isStackExtended && isFront
              ? "overflow-y-auto no-scrollbar"
              : "overflow-hidden"
          }`}
        >
          {(depth === 0 || depth === 1) && (
            <>
              <div
                className={`flex-1 ${
                  isStackExtended ? "overflow-y-auto no-scrollbar pb-0" : ""
                } ${
                  isOverlay
                    ? "rounded-tl-4xl rounded-br-4xl rounded-bl-4xl"
                    : "rounded-4xl"
                }`}
              >
                <div className="relative">
                  {isOverlay && (
                    <button
                      onClick={onCloseOverlayCard}
                      className=" absolute top-[1px] right-[1px] z-200 bg-app-background-secondary p-[6px]"
                      aria-label="Close"
                    >
                      <CloseIcon className="h-5 w-5" />
                    </button>
                  )}
                  <img
                    src={event.imageSrc}
                    alt={event.title}
                    draggable={false} //prevents browser default drag
                    className={`w-full h-70 object-cover pointer-events-none  ${
                      isOverlay ? "rounded-tl-4xl" : "rounded-t-4xl"
                    }`}
                  />
                  <div
                    className={`absolute ${
                      isOverlay ? "top-8 right-8" : "top-5 right-6"
                    }  bg-app-bg-preview-category-tag-bg text-white text-xs px-3 py-1 rounded-full flex items-center space-x-1.5`}
                  >
                    <YingyangIcon />
                    <span className="font-plusJakartaSans text-white font-normal text-[11px]">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start mb-4 mt-3 px-5">
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
                <div className="space-y-3 px-5 mt-8">
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
                      onClick={handleToggleDownArrow}
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
                      <div className="px-6 text-left">
                        <p className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[13px]">
                          {event.subtitle}
                        </p>
                        <p className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[13px] mt-1">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    {/* Event details section end */}

                    <div className="mt-15 px-5">
                      <HostInfo host={hostData} />
                    </div>

                    {isOverlay && (
                      <div className="mt-15 px-5">
                        <RatingSection />
                      </div>
                    )}

                    <div className="px-5 pb-4">
                      <OtherEvents
                        onSelect={onOpenOtherEvent}
                        events={otherEvents}
                        hostName={hostData.name}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="h-8 flex-shrink-0" />
            </>
          )}
          {!isFront && <div className="w-full h-full bg-transparent"></div>}
        </div>
      )}
    </motion.div>
  );
}
