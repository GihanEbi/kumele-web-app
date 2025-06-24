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
  UserIcon,
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
  event: Event;
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
  onOpenShareModal: ()=>void;
}

const { hostData, otherEvents } = {
  hostData: mockHostData,
  otherEvents: mockOtherEvents,
};

export default function EventCard({
  event,
  events,
  setEvents,
  onOpenShareModal
}: EventCardProps) {
  const [isExtendedPreviewOpen, setIsExtentedPreviewOpen] =
    useState<boolean>(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const x = useMotionValue(0);
  const zIndex = events.findIndex((e) => e.id === event.id);

  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);

  const isFront = event.id === events[events.length - 1].id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : event.id % 2 ? 6 : -6;
    return `${rotateRaw.get()}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 50) {
      // TODO: Get rid on frontcard
      setEvents((pv) => pv.filter((v) => v.id !== event.id));
    }
  };

  useEffect(() => {
    console.log(x);
  }, [x]);

  useMotionValueEvent(x, "change", (latest) => console.log(latest));
  return (
    <motion.div
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        zIndex,
        opacity,
        rotate,
        transition: "0.125s transform",
        // boxShadow: isFront
        //   ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
        //   : undefined,
        scale: isFront ? 1 : 0.98,
      }}
      animate={{
        scale: isFront ? 1 : 0.98,
      }}
      className={`flex justify-center items-center z-50 h-origin-bottom hover:cursor-grab active:cursor-grabbing max-w-sm  p-4 ${
        isExtendedPreviewOpen ? "fixed inset-0 " : ""
      }`}
      drag="x"
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    >
      <div
        className={`bg-app-background-tertiary rounded-4xl w-full max-w-sm max-h-[70vh] shadow-lg flex flex-col ${
          isExtendedPreviewOpen ? "overflow-y-auto no-scrollbar" : ""
        }pb-6  `}
      >
        <div
          className={`flex-1 ${
            isExtendedPreviewOpen ? "overflow-y-auto no-scrollbar" : ""
          } `}
        >
          <div className="relative">
            <img
              src={event.imageSrc}
              alt={event.title}
              draggable={false} // 👈 prevents browser default drag
              className="w-full h-75 object-cover pointer-events-none rounded-t-4xl"
            />
            <div className="absolute top-5 right-6 bg-app-bg-preview-category-tag-bg text-white text-xs px-3 py-1.5 rounded-full flex items-center space-x-1.5">
              <YingyangIcon />
              <span className="font-plusJakartaSans text-white font-normal text-[13px]">
                {event.category}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-start mb-4 mt-3 px-3">
            <h1 className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[25px]">
              {event.title}
            </h1>
            <button
              onClick={onOpenShareModal}
              className={`${isDark ? "bg-white" : "bg-black"}  p-2 rounded-lg`}
            >
              <ShareIcon
                className={`${isDark ? "text-black" : "text-white"} `}
              />
            </button>
          </div>
          <div className="space-y-3 px-3">
            <div className="flex items-center justify-between text-sm ">
              <div className="flex items-center space-x-2">
                <TwoTicketsIcon className="h-[20px] w-[20px]" />{" "}
                <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                  {event.price}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-[20px] w-[20px]" />{" "}
                <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                  {event.time}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <UsersIcon className="h-[20px] w-[20px]" />{" "}
                <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                  {event.guests} guests
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div>
                <div className="flex items-center space-x-2">
                  <ClockGif width={19} height={19} />
                  <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                    {event.startsIn}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <LocationIcon className="h-[20px] w-[20px]" />{" "}
                  <span className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                    {event.location}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsExtentedPreviewOpen(!isExtendedPreviewOpen)}
                className={`${
                  isDark ? "bg-gray-500" : "bg-app-range-slider-track-active"
                } dark:bg-zinc-700 rounded-full p-1 self-end`}
              >
                <DownArrowIcon
                  className={`${
                    !isExtendedPreviewOpen ? "rotate-180" : ""
                  } w-6 h-6`}
                />
              </button>
            </div>
          </div>

          {/* scrollable area:for further reference styles */}
          {isExtendedPreviewOpen && (
            <>
              <div className="mt-6 overflow-y-auto max-h-24 px-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="flex items-start space-x-2">
                  <p className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[13px]">
                    {event.subtitle}
                  </p>
                </div>
                <p className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[13px] mt-1">
                  {event.description}
                </p>
              </div>

              {/* Event details section end */}

              <div className="mt-6 px-3">
                <HostInfo host={hostData} />
              </div>
              <div className="px-3">
                <OtherEvents events={otherEvents} hostName={hostData.name} />
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
