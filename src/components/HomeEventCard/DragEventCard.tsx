"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

import HomeEventCard from "./HomeEventCard";
import InviteModal from "./ShareModal/ShareModal";

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
type DraggableEventCardProps = {
  event: EventType;
  removeCard: () => void;
  isTopCard: boolean;
};

const DraggableEventCard = ({
  event,
  removeCard,
  isTopCard,
}: DraggableEventCardProps) => {
  const [isExtended, setIsExtended] = useState(false);
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);

  const x = useMotionValue(0);

  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);
  const rotate = useTransform(x, [-150, 150], [-18, 18]);

  const handleDragEnd = (e: any, info: { offset: { x: number } }) => {
    // If dragged far enough, trigger the remove function
    if (Math.abs(info.offset.x) > 10) {
      removeCard();
    }
  };

  const canDrag = isTopCard && !isExtended;

  return (
    <>
      <motion.div
        style={{
          gridRow: 1,
          gridColumn: 1,
          x,
          opacity: isTopCard ? opacity : 1,
          rotate,
          transition: "0.125s transform",
          // boxShadow: isTopCard
          //   ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          //   : undefined,
        }}
        drag={canDrag ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        //whileTap={{ scale: 1, cursor: canDrag ? "grabbing" : "auto" }}
        className="w-full h-full"
        animate={{
          scale: isTopCard ? 1.1 : 1,
        }}
      >
        <HomeEventCard
          event={event}
          isExtended={isExtended}
          onToggleExtend={() => setIsExtended(!isExtended)}
          onRemove={removeCard}
          isTopCard={isTopCard}
          onOpenShareModal={() => setInviteModalOpen(true)}
        />
      </motion.div>
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
      />
    </>
  );
};

export default DraggableEventCard;
