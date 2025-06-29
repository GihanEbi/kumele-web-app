"use client";

import { useEffect, useState } from "react";

import EventCard from "./EventCard";
import InviteModal from "./ShareModal/ShareModal";
import ModalPortal from "../ModalPortal/ModalPortal";
//import TestEventCard from "./EventCard";

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
    category: "test category",
    imageSrc: "/bg-imgs/preview-event.jpg",
    title: "Family Party",
    price: "Free",
    time: "7:45-9:30",
    guests: "100",
    startsIn: "Starts in 6 hrs",
    location: "25563 london",
    subtitle:
      "🌟 Invitation to a Transformative Yoga Experience: Kundalini Awakening Gathering",
    description:
      "Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakeninwith our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This",
  },
  {
    id: 2,
    category: "Spirituality",
    imageSrc: "/bg-imgs/test-event-3.jpg",
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
    imageSrc: "/bg-imgs/test-event-1.jpg",
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
    imageSrc: "/bg-imgs/test-event-1.jpg",
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
    imageSrc: "/bg-imgs/test-event-3.jpg",
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

  console.log("events length is", events.length);

  useEffect(() => {
    if (events.length === 0) {
      onStackFinished();
    }
  }, [events, onStackFinished]);

  return (
    <>
      <div className="min-h-screen grid place-items-center">
        {events.map((item, idx) => {
          return (
            <EventCard
              index={idx}
              onOpenShareModal={() => setInviteModalOpen(true)}
              key={item.id}
              event={item}
              events={events}
              setEvents={setEvents}
              {...item}
            />
          );
        })}
      </div>
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
