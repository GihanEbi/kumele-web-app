"use client";
import { use, useCallback, useEffect, useRef, useState } from "react";
import EventCard, { HostData } from "./EventCard";
import InviteModal from "./ShareModal/ShareModal";
import ModalPortal from "../ModalPortal/ModalPortal";
import { useScrollLock } from "@/utils/useScrollHook";
import { RateIcon } from "../../../public/svg-icons/icons";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { get_all_event_list } from "@/routes/Events";
import { get_hobbies_list } from "@/routes/permissions_and_hobbies";
import InlineSvg from "../InlineSVG/InlineSVG";

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
  hostData?: HostData;
  categoryIcon?: React.ReactNode;
};


interface SwipeCardProps {
  onStackFinished: () => void;
  loading?: boolean;
  setLoading?: () => void;
}

export type FetchedCategory = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

export default function SwipeEventCards({ onStackFinished }: SwipeCardProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventHostData, setEventHostData] = useState<HostData[]>([]);
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [isStackExtended, setIsStackExtended] = useState(false); //test bug fix step 1
  const [overlayEvent, setOverlayEvent] = useState<Event | null>(null);
  const [matchedCategory, setMatchedCategory] =
    useState<FetchedCategory | null>(null);

  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasFetchedRef = useRef(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


  //lock parent component when a modal is open
  useScrollLock(isInviteModalOpen);

  useEffect(() => {
    if (!loading && hasFetchedRef.current && events.length === 0) {
      onStackFinished();
    }
  }, [events, onStackFinished, loading]);

  const fetchCategory = useCallback(async () => {
    try {
      const res = await get_hobbies_list();
      const mapped: FetchedCategory[] = (res?.data ?? []).map((item: any) => ({
        id: item.id,
        name: item.name,
        icon: (
          <InlineSvg
            svg={item.svg_code}
            title={item.name}
            className="w-[20px] h-[20px]"
          />
        ),
      }));
      //setCategories(mapped);
      return mapped;
    } catch (error) {
      console.error("Error fetching interests:", error);
      return [];
    }
  }, []);

  const fetchEventDetails = async () => {
    setLoading(true);
    try {
      const res = await get_all_event_list();
      const fetchedCategories = await fetchCategory();

      const categoryMap: Record<string, FetchedCategory> = {};
      fetchedCategories.forEach((cat) => {
        categoryMap[cat.id] = cat;
      });

      if (res && res.data) {
        const mappedEvents: Event[] = (res.data ?? []).map((item: any) => {
          const categoryData = categoryMap[item.category_id] || {
            name: "General",
            icon: null,
          };
          return {
            id: item.id,
            imageSrc:
              `${API_BASE_URL}${item.event_image_url}` ||
              "/bg-imgs/preview-event.jpg",
            title: item.event_name,
            category: categoryData.name, // ✅ use category name
            price: item.price ? `$${item.price}` : "Free",
            time: `${item.event_start_time.split(" ")[0]} - ${
              item.event_end_time.split(" ")[0]
            }`,
            guests: item.max_guests ? item.max_guests.toString() : "0",
            startsIn: item.event_start_in,
            location: `${item.home_number} ${item.street_address}` || "Unknown",
            subtitle: item.subtitle || "",
            description: item.description || "",
            hostData: {
              name: item.user?.fullName || "Host Name",
              avatarSrc:
                item.user?.profilePicture !== ""
                  ? `${API_BASE_URL}${item.user?.profilePicture}`
                  : "/avatar-img/user-preview.png",
              followers: item.host_followers || 0,
              rating: item.host_rating || 0,
              level: item.host_level || "",
              levelIcon: item.host_level_icon || "25",
              aboutTitle: item.user?.about_title || "",
              aboutBio:
                item.user?.about_me !== ""
                  ? item.user?.about_me
                  : "Welcome to my world of innovation and rhythm! I'm Alkesh, an engineer by profession and a connoisseur of life's eclectic experiences.",
            },

            categoryIcon: categoryData.icon,
          };
        });

        setEvents(mappedEvents);
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
      setLoading(false);
    } finally {
      hasFetchedRef.current = true;
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventDetails();
    console.log("fetching event in mount details", events);
  }, []);

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

  if (loading) {
    return (
      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <>
      {!overlayEvent && displayEvents.length > 0 && (
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
                onOpenRating={() => setIsRatingOpen(true)}
                hostData={item.hostData}
              />
            );
          })}
        </div>
      )}
      {overlayEvent && displayEvents.length > 0 && (
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
            onOpenRating={() => setIsRatingOpen(true)}
            // hostData={item.hostData}
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

      {isRatingOpen && (
        <ModalPortal>
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[2000] flex items-end justify-center bg-black/50"
            onClick={() => setIsRatingOpen(false)}
          >
            <div
              className="bg-app-background-primary w-full max-w-md pt-6 pb-20  rounded-t-4xl shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-[20px]">
                  <RateIcon />
                </div>
                <h2 className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[23px]">
                  Please rate your last event
                </h2>
                <p className="mt-2 font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                  Your ratings help improve the community experience.
                </p>
                <p className="mt-2 font-plusJakartaSans text-app-button-model-text-color font-normal text-[16px]">
                  -Thank you!
                </p>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  );
}
