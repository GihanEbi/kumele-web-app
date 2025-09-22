"use client";

import { useState, useRef, useEffect } from "react";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import {
  BackArrow,
  HousePartyNotificationIcon,
  LiveMusicNotificationIcon,
  NewSpiritualityNotificationIcon,
  SpiritualityNotificationIcon,
  TermsAndConditionsIcon,
} from "../../../../public/svg-icons/icons";
import { useRouter } from "next/navigation";
import NotificationCard from "@/components/NotificationCard/NotificationCard";
import Image from "next/image";
import SuccessModel from "@/components/Models/SuccessModel/SuccessModel";
import ErrorModel from "@/components/Models/ErrorModel/ErrorModel";
import {
  getAllCreateHobbiesNotifications,
  getAllFollowerEventCreationHobbiesNotifications,
  getAllMatchHobbiesNotifications,
} from "@/routes/notifications";
import CreatedHobbiesNotificationCard from "@/components/NotificationCard/CreatedHobbiesNotificationCard";
import EventNotificationCard from "@/components/NotificationCard/EventNotificationCard";

const matchedHobbies = [
  {
    userImg: "/images/notification img3.jpg",
    title: "Group meditation",
    icon: <SpiritualityNotificationIcon className="text-app-icon" />,
    time: "12.33 PM",
    category: "Spirituality",
    userName: "Akesh kumar",
    description: "You are following this event host. Be the first to join.",
    isShowCancelled: false,
    isCancelled: false,
    isJoinNow: false,
  },
  {
    userImg: "/images/notification img1.jpg",
    title: "Psychedelic jazz",
    icon: <HousePartyNotificationIcon className="text-app-icon" />,
    time: "12.33 PM",
    category: "House party",
    userName: "Riya Sharma",
    description: "You are following this event host. Be the first to join.",
    isCancelled: false,
    isShowCancelled: false,
    isJoinNow: false,
  },
];

const createdHobbies = [
  {
    userImg: "/avatar-img/gihan.jpeg",
    title: "Test Event",
    icon: <LiveMusicNotificationIcon className="text-app-icon" />,
    time: "05.45 PM", // set current time
    category: "Live show",
    userName: "Gihan",
    description: "Your created event under review.",
    isShowCancelled: true,
    isCancelled: false,
    isJoinNow: false,
  },
  // {
  //   userImg: "/images/notification img1.jpg",
  //   title: "Psychedelic jazz",
  //   icon: <LiveMusicNotificationIcon className="text-app-icon" />,
  //   time: "12.33 PM",
  //   category: "House party",
  //   userName: "Riya Sharma",
  //   description: "You are following this event host. Be the first to join.",
  //   isCancelled: true,
  //   isShowCancelled: true,
  //   isJoinNow: false,
  // },
];

const otherNotifications = [
  {
    userImg: "/images/notification img1.jpg",
    title: "Psychedelic jazz",
    icon: <HousePartyNotificationIcon className="text-app-icon" />,
    time: "12.33 PM",
    category: "House party",
    userName: "Riya Sharma",
    description: "You are following this event host. Be the first to join.",
    isCancelled: false,
    isShowCancelled: false,
    isJoinNow: true,
  },
  {
    userImg: "/images/cancel-img.png",
    title: "Event Cancelled",
    time: "12.33 PM",
    description:
      "The host unfortunately cancelled the event.We apologize for the inconvenience...",
    isShowCancelled: false,
    isCancelled: false,
    isJoinNow: false,
  },
  {
    userImg: "/images/notification img1.jpg",
    title: "Blog Comments",
    icon: <HousePartyNotificationIcon className="text-app-icon" />,
    time: "12.33 PM",
    category: "House party",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    isCancelled: false,
    isShowCancelled: false,
    isJoinNow: false,
    isBlogComment: true,
  },
  {
    userImg: "/images/cancel-img.png",
    title: "Event Cancelled",
    time: "12.33 PM",
    description:
      "The host unfortunately cancelled the event.We apologize for the inconvenience...",
    isShowCancelled: false,
    isCancelled: false,
    isJoinNow: false,
  },
  {
    userImg: "/images/cancel-img.png",
    title: "Hobby Event Reminder",
    time: "12.33 PM",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    isShowCancelled: false,
    isCancelled: false,
    isJoinNow: false,
    isEventCancelled: true,
  },
];

const imageList = [
  "/images/notification img1.jpg",
  "/images/notification img2.jpg",
  "/images/notification img3.jpg",
];

interface eventData {
  id: string;
  user_id: string;
  category_id: string;
  event_image_url: string;
  event_name: string;
  subtitle: string;
  description: string;
  event_start_in: string;
  event_date: string;
  event_start_time: string;
  event_end_time: string;
  street_address: string;
  home_number: string;
  district: string;
  postal_zip_code: string;
  state: string;
  age_range_min: string;
  age_range_max: string;
  max_guests: string;
  payment_type: string;
  price: string;
  created_at: string;
  host: {
    username: string;
    profilePicture: string;
  };
}

interface hobbyNotification {
  notification_id: string;
  user_id: string;
  status: string;
  type: string;
  title: string;
  message: string;
  event_id: string;
  event: eventData;
  notification_created_at: string;
}

const page = () => {
  // routing
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [openEventCard, setOpenEventCard] = useState(false);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);

  const [createNotificationList, setCreateNotificationList] = useState<
    hobbyNotification[]
  >([]);
  const [
    followerEventCreationNotificationList,
    setFollowerEventCreateNotificationList,
  ] = useState<hobbyNotification[]>([]);
  const [matchNotificationList, setMatchNotificationList] = useState<
    hobbyNotification[]
  >([]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  const onMouseLeave = () => {
    if (!scrollContainerRef.current) return;
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = "grab";
  };

  const onMouseUp = () => {
    if (!scrollContainerRef.current) return;
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = "grab";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    getAllMatchHobbiesNotificationsList();
    getCreateHobbiesNotificationList();
    getFollowerEventCreationHobbiesNotificationList();
  }, []);

  const getCreateHobbiesNotificationList = async () => {
    try {
      setLoading(true);
      const data = await getAllCreateHobbiesNotifications();
      if (data.success) {
        setCreateNotificationList(data.data);
      }
    } catch (error) {
      console.error("Error fetching following list:", error);
      setError("Error fetching following list");
      setShowErrorModel(true);
      setTimeout(() => {
        setShowErrorModel(false);
        setError("");
      }, 3600);
    } finally {
      setLoading(false);
    }
  };

  const getFollowerEventCreationHobbiesNotificationList = async () => {
    try {
      setLoading(true);
      const data = await getAllFollowerEventCreationHobbiesNotifications();
      if (data.success) {
        setFollowerEventCreateNotificationList(data.data);
      }
    } catch (error) {
      console.error("Error fetching following list:", error);
      setError("Error fetching following list");
      setShowErrorModel(true);
      setTimeout(() => {
        setShowErrorModel(false);
        setError("");
      }, 3600);
    } finally {
      setLoading(false);
    }
  };

  const getAllMatchHobbiesNotificationsList = async () => {
    try {
      setLoading(true);
      const data = await getAllMatchHobbiesNotifications();
      if (data.success) {
        setMatchNotificationList(data.data);
      }
    } catch (error) {
      console.error("Error fetching following list:", error);
      setError("Error fetching following list");
      setShowErrorModel(true);
      setTimeout(() => {
        setShowErrorModel(false);
        setError("");
      }, 3600);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-y-auto max-h-screen no-scrollbar">
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <div className="min-h-screen bg-app-background-primary flex flex-col">
        <div className="w-full max-w-md px-4 top-0 left-0 right-0">
          {/* Header */}
          <header className="fixed w-full pt-[64px] bg-app-background-primary flex items-center mb-10 z-200">
            <button
              aria-label="Go back"
              onClick={() => window.history.back()} // Simple back navigation
              className="p-2 -ml-2 mr-2" // Added padding for easier click and negative margin to align
            >
              <BackArrow className="text-app-icon" />
            </button>
            <h1 className="text-xl font-semibold text-app-text-primary font-plusJakartaSans">
              Notifications
            </h1>
          </header>
          <div className="border-t border-0.5 border-app-border space-y-1 mt-[130px]">
            {/* Notification items go here */}
          </div>
          {matchNotificationList.length !== 0 && (
            <div className="mt-[12px]">
              <h1 className="text-[16px] font-semibold text-app-text-primary font-plusJakartaSans-400">
                Matched Hobby(ies)
              </h1>
              <div>
                {matchNotificationList.map((item, index) => (
                  <div key={index} className="border-b border-app-border">
                    <CreatedHobbiesNotificationCard
                      hostImage={item.event.host.profilePicture}
                      hostName={item.event.host.username}
                      title={item.title}
                      category_id={item.event.category_id}
                      notification_created_at={item.notification_created_at}
                      message={item.message}
                      eventStatus={"ACTIVE"}
                      notificationType={item.type}
                      viewEvent={() => {
                        setActiveEventId(item.event.id);
                        setOpenEventCard(true);
                      }}
                      event_id={item.event.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {createNotificationList.length !== 0 && (
            <div className="mt-3">
              <h1 className="text-sm font-semibold text-app-text-primary font-plusJakartaSans">
                Created Hobby(ies)
              </h1>
              <div>
                {createNotificationList.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-app-border"
                    onClick={() => {
                      setActiveEventId(item.event.id);
                      setOpenEventCard(true);
                    }}
                  >
                    <CreatedHobbiesNotificationCard
                      hostImage={item.event.host.profilePicture}
                      hostName={item.event.host.username}
                      title={item.title}
                      category_id={item.event.category_id}
                      notification_created_at={item.notification_created_at}
                      message={item.message}
                      eventStatus={"ACTIVE"}
                      notificationType={item.type}
                      viewEvent={() => {
                        setActiveEventId(item.event.id);
                        setOpenEventCard(true);
                      }}
                      event_id={item.event.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center justify-center">
            <div className="mt-[12px] mb-[12px] rounded-xl bg-app-background-add w-full h-[240px] flex items-center justify-center">
              <div
                ref={scrollContainerRef}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                className="flex space-x-4 overflow-x-auto pb-2 -mx-0 px-2 no-scrollbar cursor-grab"
              >
                {imageList.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Notification Image ${index + 1}`}
                    width={144}
                    height={120}
                    className="rp-5"
                  />
                ))}
              </div>
            </div>
          </div>
          {followerEventCreationNotificationList.length !== 0 && (
            <div className="mt-3">
              <h1 className="text-sm font-semibold text-app-text-primary font-plusJakartaSans">
                Other Notifications
              </h1>
              <div>
                {followerEventCreationNotificationList.map((item, index) => (
                  <div key={index} className="border-b border-app-border">
                    <CreatedHobbiesNotificationCard
                      hostImage={item.event.host.profilePicture}
                      hostName={item.event.host.username}
                      title={item.title}
                      category_id={item.event.category_id}
                      notification_created_at={item.notification_created_at}
                      message={item.message}
                      eventStatus={"ACTIVE"}
                      notificationType={item.type}
                      viewEvent={() => {
                        setActiveEventId(item.event.id);
                        setOpenEventCard(true);
                      }}
                      event_id={item.event.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <SuccessModel
        isOpen={showSuccessModel}
        onClose={() => {
          setShowSuccessModel(false);
          setSuccess("");
        }}
        successMessage={success || ""}
      />
      <ErrorModel
        isOpen={showErrorModel}
        onClose={() => {
          setShowErrorModel(false);
          setError("");
        }}
        errorMessage={error || ""}
      />
      <EventNotificationCard
        event_id={activeEventId ?? ""}
        isOpen={openEventCard}
        onClose={() => setOpenEventCard(false)}
      />
    </div>
  );
};

export default page;
