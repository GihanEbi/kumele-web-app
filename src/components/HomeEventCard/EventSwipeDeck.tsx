"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import DraggableEventCard from "./DragEventCard";

export type EventType = {
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

const eventsData = [
  {
    id: 1,
    category: "Spirituality",
    imageSrc: "/bg-imgs/preview-event.jpg",
    title: "Family Party",
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
    id: 2,
    category: "Spirituality",
    imageSrc: "/bg-imgs/test-event-3.jpg",
    title: "Birthday Celebration",
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
    id: 3,
    category: "Spirituality",
    imageSrc: "/bg-imgs/test-event-1.jpg",
    title: "Group meditation",
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
    id: 4,
    category: "Spirituality",
    imageSrc: "/bg-imgs/test-event-4.jpg",
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
    id: 1,
    category: "Spirituality",
    imageSrc: "/bg-imgs/preview-event.jpg",
    title: "Family Party",
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
    id: 3,
    category: "Spirituality",
    imageSrc: "/bg-imgs/test-event-1.jpg",
    title: "Group meditation",
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
];

const EventSwipeDeck = () => {
  const [cards, setCards] = useState<EventType[]>(eventsData);

  const removeTopCard = () => {
    setCards((prev) => prev.slice(1));
  };
  //const isFront = id === cards[cards.length - 1].id;

  return (
    <div className="grid min-h-screen w-full place-items-center p-4">
      <div className="relative w-full max-w-sm h-[85vh] max-h-[700px]">
        <AnimatePresence>
          {cards.length > 0 ? (
            cards
              .map((card, index) => {
                if (index < 3) {
                  return (
                    <motion.div
                      key={card.id}
                      initial={{
                        scale: 1 - index * 0.05,
                        y: index * -20,
                        opacity: 0,
                      }}
                      animate={{
                        scale: 1 - index * 0.05,
                        y: index * -20,
                        opacity: 1,
                        zIndex: -index,
                      }}
                      exit={{
                        y: -50,
                        opacity: 0,
                        transition: { duration: 0.2 },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="absolute inset-0"
                    >
                      <DraggableEventCard
                        event={card}
                        isTopCard={index === 0}
                        removeCard={removeTopCard}
                      />
                    </motion.div>
                  );
                }

                if (index > 2) {
                  return null;
                }
                const placeholderColor =
                  index === 1 ? "bg-neutral-600" : "bg-neutral-700";
                return (
                  <motion.div
                    key={card.id}
                    className={`absolute inset-0 ${placeholderColor} rounded-4xl pointer-events-none`}
                    style={{
                      zIndex: -index, // Position behind the main card
                    }}
                    animate={{
                      y: -index * 12,
                      scale: 1 - index * 0.05,
                    }}
                  />
                );
              })
              .reverse()
          ) : (
            <div className="text-center text-gray-500">
              <h2 className="text-2xl font-bold">All caught up!</h2>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EventSwipeDeck;
