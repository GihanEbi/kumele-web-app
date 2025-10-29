"use client";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
import {
  AtmosphereIcon,
  ClockIcon,
  CloseIcon,
  DownArrowIcon,
  HandShakeIcon,
  LocationIcon,
  MicrophoneIcon,
  RateEventIcon,
  RateIcon,
  ShareIcon,
  SparkingIcon,
  TranslateIcon,
  TwoTicketsIcon,
  TypingIconNew,
  UsersIcon,
  WalletIcon,
  YingyangIcon,
} from "../../../public/svg-icons/icons";
import ClockGif from "../GifComponents/ClockGif/ClockGif";
import { useTheme } from "next-themes";
import { mockHostData } from "./data";
import HostInfo from "./hostInfo/HostInfo";
import OtherEvents from "./otherEvents/OtherEvents";
import { useAppContext } from "@/context/AppContext";
import RatingSection from "./otherEvents/RatingSection";
import { useRouter } from "next/navigation";
import HobbyTagIcon from "../HobbyTagIcon/HobbyTagIcon";
import CommentList from "../CommentList/CommentList";
import StarRating from "../StarRating/StarRating";
import { PercentageRateIcon } from "../PercentageRateIcon/PercentageRateIcon";
import Head from "next/head";
import GoogleTranslate from "../LanguageSelector/LanguageSelector";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

//types of a event
type Event = {
  id: number;
  imageSrc: string;
  title: string;
  category: string;
  categoryIcon?: React.ReactNode;
  price: string;
  time: string;
  guests: string;
  startsIn: string;
  location: string;
  subtitle: string;
  description: string;
  isPlaceholder?: boolean;
};

export type HostData = {
  name: string;
  avatarSrc: string;
  followers: number;
  rating: number;
  level: string;
  levelIcon: string;
  aboutTitle: string;
  aboutBio: string;
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
  onOpenRating: () => void;
  hostData?: HostData;
  otherEvents?: Event[];
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
/*
const { hostData, otherEvents } = {
  hostData: mockHostData,
  otherEvents: mockOtherEvents,
};*/
const { otherEvents } = {
  otherEvents: mockOtherEvents,
};

// Removed ': Comment[]' to avoid conflict with DOM 'Comment' interface.
const MockComments = [
  {
    id: 1,
    author: "Josh Durrant",
    date: "25 April 2022",
    content:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    isOwner: true,
    avatarUrl: "/avatar-img/joshdurrant.png",
    replies: [
      {
        id: 101,
        author: "Alkesh Sharma",
        date: "23 August 2022",
        content: "What a display dsn cdn zxnc",
        avatarUrl: "/avatar-img/user-preview.png",
        replies: [
          {
            id: 103,
            author: "Josh Durrant",
            date: "23 August 2022",
            content: "I also agree with this assessment.",
            avatarUrl: "/avatar-img/joshdurrant.png",
          },
          {
            id: 104,
            author: "Simon Pears",
            date: "23 August 2022",
            content: "I also agree with this assessment.",
            avatarUrl: "/avatar-img/simon.png",
          },
        ],
      },
      {
        id: 102,
        author: "Josh Durrant",
        date: "23 August 2022",
        content: "Replying to Alkesh, great point!",
        isOwner: true,
        avatarUrl: "/avatar-img/joshdurrant.png",
      },
      {
        id: 103,
        author: "Simon Pears",
        date: "23 August 2022",
        content: "I also agree with this assessment.",
        avatarUrl: "/avatar-img/simon.png",
      },
    ],
  },
  {
    id: 2,
    author: "Jakob Hoffman",
    date: "23 August 2022",
    content:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    avatarUrl: "/avatar-img/jakob.png",
    replies: [
      {
        id: 101,
        author: "Alkesh Sharma",
        date: "23 August 2022",
        content: "What a display dsn cdn zxnc",
        avatarUrl: "/avatar-img/user-preview.png", // Use different avatar for clarity
      },
    ],
  },
];

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
  onOpenRating,
  hostData,
}: EventCardProps) {
  //identifying the theme
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [showLeftBadge, setShowLeftBadge] = useState<boolean>(false);
  const [showRightBadge, setShowRightBadge] = useState<boolean>(false);
  // inside EventCard component, near your other useState hooks

  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const openRating = () => setIsRatingOpen(true);
  const closeRating = () => setIsRatingOpen(false);

  //calling app context to get the state of bottomnav bar fixed
  const setIsBottomNavBarFixed = useAppContext().setIsBottomNavBarFixed;
  const isBottomNavBarFixed = useAppContext().isBottomNavBarFixed;

  const isMoreOptionsOpen = useAppContext().moreOption;
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const router = useRouter();

  //variables for dragging animations and styles
  const x = useMotionValue(0);
  const depth = events.length - 1 - index;
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
  const handleDragEnd = (
    eventDrag?: MouseEvent | TouchEvent | PointerEvent,
    info?: {
      offset: { x: number; y: number };
      velocity: { x: number; y: number };
    }
  ) => {
    if (event.isPlaceholder) return;
    const swipeX = info?.offset.x ?? x.get();
    if (Math.abs(swipeX) > 50) {
      if (swipeX < 0) {
        onOpenRating();
      } else {
        // router.push("/more-options/event-matched");
      }
    }
    if (Math.abs(x.get()) > 50) {
      setIsStackExtended(false);
      setEvents((pv) => pv.filter((v) => v.id !== event.id));
    }
  };

  const handleToggleDownArrow = () => {
    setIsStackExtended(!isStackExtended);
    setIsBottomNavBarFixed(!isBottomNavBarFixed);
  };

  // Callback function to update the state
  const handleReplyOpen = (isOpen: boolean) => {
    setIsReplyOpen(isOpen);
  };

  // useEffect(() => {
  //   // Create the global callback for Google Translate
  //   (window as any).googleTranslateElementInit = function () {
  //     new (window as any).google.translate.TranslateElement(
  //       {
  //         pageLanguage: "gr", // your page's original language
  //         includedLanguages: "en", // optional: restrict available languages
  //         layout: (window as any).google.translate.TranslateElement.InlineLayout
  //           .SIMPLE,
  //       },
  //       "google_translate_element"
  //     );
  //   };

  //   // Dynamically load the Google Translate script
  //   const script = document.createElement("script");
  //   script.src =
  //     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //   document.body.appendChild(script);

  //   return () => {
  //     // Cleanup if the component unmounts
  //     document.body.removeChild(script);
  //   };
  // }, []);

  const handleTranslate = async () => {
    // const url = `https://translate.google.com/?sl=auto&tl=en&text=${encodeURIComponent(
    //   event.description
    // )}&op=translate`;
    // window.open(url, "_blank");
    // const res = await fetch("https://libretranslate.com/translate", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     q: event.description,
    //     source: "auto",
    //     target: "en",
    //   }),
    // });
    // const data = await res.json();
    // console.log(data.translatedText);

    const text = encodeURIComponent(event.description);
    const url = `https://translate.google.com/m/translate?sl=auto&tl=en&q=${text}`;
    window.open(url, "_blank");
  };
  const handleTranslateOld = () => {
    // Trigger Google Translate dropdown manually
    const gtEl = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (gtEl) {
      gtEl.value = "en"; // change to English
      gtEl.dispatchEvent(new Event("change"));
    }
  };

  // useEffect(() => {
  //   (window as any).googleTranslateElementInit = function () {
  //     new (window as any).google.translate.TranslateElement(
  //       { pageLanguage: "auto" },
  //       "google_translate_element"
  //     );
  //   };

  //   const script = document.createElement("script");
  //   script.src =
  //     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //   document.body.appendChild(script);
  // }, []);

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
        overflow: "visible",
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
                    {/* <YingyangIcon /> */}
                    {/* <event.categoryIcon/> */}
                    {event.categoryIcon}
                    <span className="font-plusJakartaSans text-white font-normal text-[11px]">
                      {event.category}
                    </span>
                  </div>
                  <div>{/* <HobbyTagIcon hobbyId={event.category} /> */}</div>
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
                        <div className="flex items-center justify-between">
                          <p className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[13px]">
                            {event.subtitle}
                          </p>
                          {/* <div id="google_translate_element" className="mb-5">
                            {" "}
                          </div> */}
                          {/* <div
                            id="google_translate_element"
                            className=""
                          ></div> */}
                          {/* <TranslateIcon
                            onClick={() => {
                              handleTranslate();
                            }}
                          /> */}
                          {/* ✅ Add container for translator widget */}
                          {/* <div
                            id="google_translate_container"
                            style={{ position: "fixed", bottom: 20, right: 20 }}
                          /> */}

                          {/* ✅ Add Google Translate widget */}
                          <GoogleTranslate />

                          {/* 🟢 Icon to trigger translation */}
                          {/* <button
                            onClick={handleTranslateOld}
                            className="cursor-pointer hover:opacity-80"
                            title="Translate to English"
                          >
                            <TranslateIcon />
                          </button> */}
                        </div>
                        {/* <div className="partial-translate-section">
                          <p
                            className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[13px] mt-1"
                            // lang="gr"
                          >
                            {event.description}
                          </p>
                        </div> */}
                        {/* <LanguageSelector /> */}
                        <div className="auto-translate" translate="yes">
                          <p className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[13px] mt-1">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Event details section end */}

                    {hostData && (
                      <div className="mt-15 px-5">
                        <HostInfo host={hostData} />
                      </div>
                    )}
                    {isOverlay && (
                      <div className="mt-10 px-5">
                        <RatingSection />
                      </div>
                    )}

                    <div className="px-5 pb-4 mt-4">
                      <div className="flex items-center gap-5">
                        <p className="text-md font-bold text-app-new-blue">
                          90's Hip-Hop
                        </p>
                        <div>
                          {/* <HobbyTagIcon hobbyId={"EC00001"} /> */}{" "}
                          <div
                            className={`bg-app-bg-preview-category-tag-bg text-white text-xs px-3 py-1 rounded-full flex items-center space-x-1.5`}
                          >
                            {/* <YingyangIcon /> */}
                            {/* <event.categoryIcon/> */}
                            {event.categoryIcon}
                            <span className="font-plusJakartaSans text-white font-normal text-[11px]">
                              {event.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* <StarRating label="Communication" rating={4} /> */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center mt-3 gap-2">
                          <RateEventIcon className={"text-app-icon"} />
                          <RateEventIcon className={"text-app-icon"} />
                          <RateEventIcon className={"text-app-icon"} />
                          <RateEventIcon className={"text-app-icon"} />
                          {/* <RateEventIcon className={"text-app-icon-muted"} /> */}

                          <PercentageRateIcon percentage={70} />
                        </div>
                        <div className="flex items-center">
                          <p className="text-md mt-2 font-bold text-primary text-start">
                            4.5
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-md font-bold text-secondary text-start">
                        3.6 out of 5
                      </p>
                      <p className="mt-3 text-md font-semibold text-primary text-start">
                        6 Guest ratings
                      </p>
                      <div className="mt-3">
                        <p className="text-xs font-bold text-start">
                          Attendee Ratings (70%)
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-5">
                        <TypingIconNew className="text-app-icon w-[20px] h-[20px]" />
                        <p className="text-xs">Communication</p>
                        <div className="flex gap-2 ">
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                        </div>
                        <p className="text-xs">( 4.8 )</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <HandShakeIcon className="text-app-icon w-[20px] h-[20px]" />
                        <p className="text-xs">Respect</p>
                        <div className="flex gap-2 ">
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                        </div>
                        <p className="text-xs">( 4.2 )</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <MicrophoneIcon className="text-app-icon w-[20px] h-[20px]" />
                        <p className="text-xs">Professionalism</p>
                        <div className="flex gap-2 ">
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                        </div>
                        <p className="text-xs">( 5.0 )</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <AtmosphereIcon className="text-app-icon w-[20px] h-[20px]" />
                        <p className="text-xs">Atmosphere</p>
                        <div className="flex gap-2 ">
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                        </div>
                        <p className="text-xs">( 5.0 )</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <WalletIcon className="text-app-icon w-[20px] h-[20px]" />
                        <p className="text-xs">Value for money</p>
                        <div className="flex gap-2 ">
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                          <RateEventIcon
                            className={"text-app-icon w-[20px] h-[20px]"}
                          />
                        </div>
                        <p className="text-xs">( 5.0 )</p>
                      </div>
                    </div>
                    <div className="px-5">
                      <CommentList
                        comments={MockComments}
                        onReplyOpen={handleReplyOpen}
                      />
                    </div>
                    {otherEvents && (
                      <div className="px-5 pb-4">
                        <OtherEvents
                          onSelect={onOpenOtherEvent}
                          events={otherEvents}
                          hostName={hostData?.name}
                        />
                      </div>
                    )}
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
