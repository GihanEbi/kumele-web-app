"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  BackArrow,
  GestScanIcon,
  LocationIcon,
  TwoTicketsIcon,
} from "../../../../../public/svg-icons/icons";
import InboxMessageCard from "@/components/InboxMessageCard/InboxMessageCard";
import ChatInput from "@/components/ChatInput/ChatInput";
import { useRouter, useSearchParams } from "next/navigation";
import { useChat } from "@/hooks/useChat";
import { getToken } from "@/utils/authUtils";
import { getAllUserData } from "@/routes/profile";
import { userConfirmedEvent } from "@/routes/user events";
import { get_event_by_event_id } from "@/routes/Events";
// mock data for avatars
// should be replaced with actual user data

type user_data = {
  id: string;
  username: string;
  profilePicture: string;
};

type event = {
  id: string;
  price: string;
  state: string;
  user_id: string;
  district: string;
  subtitle: string;
  event_date: string;
  event_name: string;
  max_guests: string;
  category_id: string;
  description: string;
  home_number: string;
  payment_type: string;
  age_range_max: string;
  age_range_min: string;
  event_end_time: string;
  event_start_time: string;
  street_address: string;
  event_image_url: string;
  postal_zip_code: string;
  host: user_data;
  participants: user_data[];
};

// ---------- interface ----------
interface profileData {
  id: string;
  username: string;
  fullname: string;
  email: string;
  gender: string;
  language: string;
  dateofbirth: string;
  referralcode: string;
  abovelegalage: boolean;
  termsandconditionsaccepted: boolean;
  subscribedtonewsletter: boolean;
  profilepicture: string;
  about_me: string;
  to_tp_secret: string;
  is_2fa_enabled: boolean;
  my_referral_code: string;
  qr_code_url: string;
}
const DUMMY_AUTH_TOKEN = getToken() || "";
const imgUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const Chat = () => {
  const searchParams = useSearchParams();
  //   loading state
  const [pageLoading, setPageLoading] = useState(false);
  const [event_id, setEventId] = useState<string | null>(null);
  const [newMessageText, setNewMessageText] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for auto-scrolling
  //   loading state
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const router = useRouter();
  // state for store the fetched user data
  const [userData, setUserData] = useState<profileData | null>(null);

  // Use the custom chat hook
  const { messages, loading, error, sendMessage } = useChat({
    eventId: event_id as string, // Cast eventId to string
    token: DUMMY_AUTH_TOKEN,
  });
  // state for store the chat data
  const [eventData, setEventData] = useState<event | null>(null);

  useEffect(() => {
    if (searchParams) {
      setEventId(searchParams.get("event_id"));
    }
  }, [searchParams]);
  // Scroll to the bottom of the chat whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetchUserData();
    fetchEventData();
  }, []);

  // function to fetch event data
  const fetchEventData = async () => {
    setPageLoading(true);

    try {
      if (searchParams) {
        const data = await get_event_by_event_id(searchParams.get("event_id")!); // Non-null assertion since we check above

        if (data.success) {
          console.log("Fetched event data successfully:", data.data);
          setEventData(data.data);
        } else {
          console.error("Failed to fetch event data:", data.message);
        }
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
    } finally {
      setPageLoading(false);
    }
  };

  // Simulate fetching user data
  const fetchUserData = async () => {
    setUserLoading(true);
    try {
      const data = await getAllUserData();

      if (data.success) {
        setUserData(data.data);
      } else {
        console.error("Failed to fetch user data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setUserLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (newMessageText.trim() && event_id) {
      try {
        await sendMessage(newMessageText, userData?.profilepicture || ""); // Send the message using the hook
        setNewMessageText(""); // Clear input after sending
      } catch (err) {
        // Error handling for sending message (e.g., show a toast notification)
        console.error("Failed to send message:", err);
        alert("Failed to send message. Please try again.");
      }
    }
  };

  if (!event_id) {
    return <div>Loading event ID...</div>;
  }

  if (loading) {
    return <div>Loading chat...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <p>Please ensure your backend is running and you have a valid token.</p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto max-h-screen no-scrollbar">
      {(loading || pageLoading) && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <div className=" min-h-screen bg-app-background-primary flex flex-col ">
        <div className="w-full max-w-md top-0 left-0 right-0 ">
          {/* Header */}
          <header className="z-100 px-4 fixed w-full pt-[64px] bg-app-background-primary items-center mb-10">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center w-full">
                <button
                  aria-label="Go back"
                  onClick={() => window.history.back()} // Simple back navigation
                  className="mr-2 mt-4" // Added padding for easier click and negative margin to align
                >
                  <BackArrow className="text-app-icon" />
                </button>
                <h1 className="mt-4 text-[23px] font-semibold text-app-text-primary font-plusJakartaSans-700">
                  {eventData ? eventData.event_name : "Event Name"}
                </h1>
              </div>
              <div
                className="mr-10"
                onClick={() => {
                  router.push(
                    "/more-options/chat-pages/scan-qr?event_id=" +
                      eventData?.id +
                      "&eventCategoryId=" +
                      eventData?.category_id +
                      "&host_id=" +
                      eventData?.user_id
                  );
                  console.log("Scan QR clicked");
                }}
              >
                <GestScanIcon className="text-app-icon mt-4" />
              </div>
            </div>

            <div className="space-y-1 mt-[0px] px-6">
              <p className="text-[13px] text-app-text-profile-tabs font-plusJakartaSans-400">
                {eventData ? eventData.participants.length : 0} Guests
              </p>
              <div className="w-full">
                <div className="flex">
                  {eventData &&
                    eventData.participants.map((pic, index) => (
                      <div
                        key={pic.id}
                        className="flex flex-col items-center mx-[-6px]"
                      >
                        <div
                          className={`relative w-[31px] h-[31px] rounded-full ${"border-blue-500"} border-2 overflow-hidden`}
                          style={{ zIndex: 4 - 1 - index }}
                        >
                          {/* <div>{pic.username}</div> */}
                          <Image
                            src={`${pic.profilePicture}`}
                            alt={pic.username}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  <div className="flex flex-col items-center ml-[-6px]">
                    <div className="bg-app-background-card-secondary text-app-text-tertiary text-[14px] px-3 rounded-full font-plusJakartaSans-700 flex items-center h-7">
                      {eventData ? eventData.participants.length : 0} Guests
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex mt-[10px ] items-center gap-1">
                <TwoTicketsIcon
                  className="text-app-icon"
                  width={17}
                  height={17}
                />
                <p className="text-[13px] text-app-text-profile-tabs font-plusJakartaSans-400">
                  Price: {eventData ? eventData.payment_type : ""}{" "}
                  {eventData ? eventData.price : 0} USD
                </p>
              </div>
              <div className="flex mt-[10px ] items-center gap-1">
                <LocationIcon
                  className="text-app-icon"
                  width={17}
                  height={17}
                />
                <p className="text-[13px] text-app-text-profile-tabs font-plusJakartaSans-400">
                  Event Address:{" "}
                  {eventData
                    ? eventData.home_number + " " + eventData.street_address
                    : ""}
                </p>
              </div>
              <div className="my-2">
                <Separator className="bg-app-text-secondary p-0.4" />
              </div>
            </div>
          </header>
        </div>
        {/* chat section */}
        <div className="space-y-1 mt-60 px-6 mb-32">
          <p className="text-[13px] text-center text-app-text-profile-tabs font-plusJakartaSans-400">
            Today
          </p>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mt-5`} // No change needed here, the alignment is now handled inside InboxMessageCard
            >
              <InboxMessageCard
                img={msg.profilepicture ?? "/avatar-img/default-avatar.jpg"}
                name={msg.username}
                date={
                  msg.created_at
                    ? new Date(msg.created_at).toLocaleTimeString()
                    : ""
                }
                message={msg.message_text}
                isLoggedInUser={msg.user_id === userData?.id} // This prop is crucial
                sentUserProfilePic={userData?.profilepicture || ""}
              />
              {/* <div>msg : {msg.user_id}</div>
              <div>msg : {userData?.id}</div> */}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="w-full max-w-md px-5 fixed bottom-0 left-0 pb-10 bg-app-background-primary">
          <div className="z-200 w-full">
            <ChatInput
              onChange={(value: string) => setNewMessageText(value)}
              value={newMessageText}
              onSend={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
