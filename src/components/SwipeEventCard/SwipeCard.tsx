"use client";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import InviteModal from "./ShareModal/ShareModal";
import ModalPortal from "../ModalPortal/ModalPortal";
import { useScrollLock } from "@/utils/useScrollHook";

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

const eventsData: Event[] = [
  {
    id: 1,
    category: "House Party",
    imageSrc: "/bg-imgs/preview-event.jpg",
    title: "90's Hip-Hop",
    price: "Free",
    time: "7:45-9:30",
    guests: "12",
    startsIn: "Starts in 7 hrs",
    location: "22414 Indore",
    subtitle: "🌟 Step Back into the Golden Era: 90 Hip-Hop Extravaganza!",
    description:
      "Dust off those sneakers and get ready to groove at our 90's Hip-Hop House Party! Join us for a night of nostalgia, where the beats are fresh, the vibes are electric, and the memories come flooding back. Whether you were breakdancing in your living room or rocking out to your favorite mixtapes, this is the ultimate throwback experience. Bring your friends, your best dance moves, and let's make this a night to remember!",
  },
  {
    id: 2,
    category: "Spirituality",
    imageSrc: "/bg-imgs/preview-event.jpg",
    title: "Birthday Celebration",
    price: "Free",
    time: "7:45-9:30",
    guests: "15",
    startsIn: "Starts in 09 hrs",
    location: "45960 India",
    subtitle:
      "🌟 Invitation to a Transformative Yoga Experience: Kundalini Awakening Gathering",
    description:
      "Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakeninwith our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This",
  },
  {
    id: 3,
    category: "family party",
    imageSrc: "/bg-imgs/preview-event.jpg",
    title: "Group meditation",
    price: "Free",
    time: "7:45-9:30",
    guests: "10",
    startsIn: "Starts in 3 hrs",
    location: "22414 Indore",
    subtitle:
      "🌟 Invitation to a Transformative Yoga Experience: Kundalini Awakening Gathering",
    description:
      "Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakeninwith our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This",
  },
  {
    id: 4,
    category: "party",
    imageSrc: "/bg-imgs/preview-event.jpg",
    title: "Friends Gathering",
    price: "Free",
    time: "7:45-9:30",
    guests: "12",
    startsIn: "Starts in 7 hrs",
    location: "22414 Indore",
    subtitle:
      "🌟 Invitation to a Transformative Yoga Experience: Kundalini Awakening Gathering",
    description:
      "Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakeninwith our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This",
  },
  {
    id: 5,
    category: "Spirituality",
    imageSrc: "/bg-imgs/preview-event.jpg",
    title: "Family Party",
    price: "Free",
    time: "7:45-9:30",
    guests: "12",
    startsIn: "Starts in 0000 hrs",
    location: "22414 Indore",
    subtitle:
      "🌟Invitation to a Transformative Yoga Experience: Kundalini Awakening Gathering",
    description:
      "Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakeninwith our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This",
  },
  {
    id: 6,
    category: "first event",
    imageSrc: "/bg-imgs/preview-event.jpg",
    title: "First event",
    price: "Free",
    time: "7:45-9:30",
    guests: "12",
    startsIn: "Starts in 5 hrs",
    location: "New York",
    subtitle:
      "🌟 Invitation to a Transformative Yoga Experience: Kundalini Awakening Gathering",
    description:
      "Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakeninwith our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This",
  },
  {
    id: 7,
    category: "party",
    imageSrc: "/bg-imgs/preview-event.jpg",
    title: "Friends Gathering",
    price: "Free",
    time: "7:45-9:30",
    guests: "12",
    startsIn: "Starts in 7 hrs",
    location: "22414 Indore",
    subtitle:
      "🌟 Invitation to a Transformative Yoga Experience: Kundalini Awakening Gathering",
    description:
      "Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakeninwith our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This",
  },
  {
    id: 8,
    category: "Spirituality",
    imageSrc: "/bg-imgs/preview-event.jpg",
    title: "Birthday Celebration",
    price: "Free",
    time: "7:45-9:30",
    guests: "15",
    startsIn: "Starts in 09 hrs",
    location: "45960 India",
    subtitle:
      "🌟 Invitation to a Transformative Yoga Experience: Kundalini Awakening Gathering",
    description:
      "Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakeninwith our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This",
  },
];

interface SwipeCardProps {
  onStackFinished: () => void;
}

export default function SwipeEventCards({ onStackFinished }: SwipeCardProps) {
  const [events, setEvents] = useState<Event[]>(eventsData);
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [isStackExtended, setIsStackExtended] = useState(false); //test bug fix step 1
  const [overlayEvent, setOverlayEvent] = useState<Event | null>(null);
  console.log("events length is", events.length);

  //lock parent component when a modal is open
  useScrollLock(isInviteModalOpen);

  useEffect(() => {
    if (events.length === 0) {
      onStackFinished();
    }
  }, [events, onStackFinished]);

  const extraCount = events.length >= 4 || events.length === 1 ? 0 : 1;

  const placeholders: Event[] = Array.from({ length: extraCount }, (_, i) => ({
    id: -(i + 1),
    imageSrc: "",
    title: "",
    category: "",
    price: "",
    time: "",
    guests: "",
    startsIn: "",
    location: "",
    subtitle: "",
    description: "",
    isPlaceholder: true,
  }));

  const displayEvents = [...placeholders, ...events];
  const handleOpenOtherEvent = (ev: Event) => {
    setOverlayEvent(ev);
  };

  const handleCloseOverlay = () => {
    setOverlayEvent(null);
  };

  return (
    <>
      {!overlayEvent && (
        <div className="relative w-full h-[464px] grid place-items-center">
          {displayEvents.map((item, idx) => {
            return (
              <EventCard
                index={idx}
                onOpenShareModal={() => setInviteModalOpen(true)}
                key={item.id}
                event={item}
                events={displayEvents}
                setEvents={setEvents}
              //bug fix-best practise
              //{...item}
                isStackExtended={isStackExtended}
                setIsStackExtended={setIsStackExtended}
                onOpenOtherEvent={handleOpenOtherEvent}
              />
            );
          })}
        </div>
      )}
      {overlayEvent && (
        <div className="relative w-full h-[464px] grid place-items-center">
          <EventCard
            key={overlayEvent.id}
            index={0}
            event={overlayEvent}
            events={[overlayEvent]}
            setEvents={() => {}}
            isStackExtended={true}
            setIsStackExtended={() => setOverlayEvent(null)}
            onOpenShareModal={() => setInviteModalOpen(true)}
            onOpenOtherEvent={handleOpenOtherEvent}
            isOverlay={true}
            onCloseOverlayCard={handleCloseOverlay}
          />
          {/* <button
            onClick={() => setOverlayEvent(null)}
            className="absolute top-4 right-4 z-50 rounded-full bg-black/60 p-1 text-white hover:bg-black/80 transition-colors"
            aria-label="Close event details"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button> */}
        </div>
      )}
      <div className="z-13">
        <ModalPortal>
          <InviteModal
            isOpen={isInviteModalOpen}
            onClose={() => setInviteModalOpen(false)}
          />
        </ModalPortal>
      </div>
    </>
  );
}
