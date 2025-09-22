"use client";

import { useEffect, useState } from "react";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import ChatCard from "@/components/ChatCard/ChatCard";
import { userConfirmedEvent } from "@/routes/user events";


type user_event = {
  id: string;
  status: string;
  user_id: string;
  event_id: string;
  registered_at: string;
};

type user_data = {
  id: string;
  email: string;
  about_me: string;
  username: string;
  qr_code_url: string;
  profilepicture: string;
  my_referral_code: string;
};

type category = {
  id: string;
  name: string;
  svg_code: string;
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
  category: category;
  participants: user_data[];
};

type confirmedEventProps = {
  user_event: user_event;
  event: event;
};

const page = () => {
  //   loading state
  const [loading, setLoading] = useState(false);
  // state for store the chat data
  const [chatData, setChatData] = useState<confirmedEventProps[] | null>(null);

  useEffect(() => {
    fetchChatData();
  }, []);

  // function to fetch chat data
  const fetchChatData = async () => {
    setLoading(true);
    try {
      const data = await userConfirmedEvent();

      if (data.success) {
        setChatData(data.data);
      } else {
        console.error("Failed to fetch chat data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
    } finally {
      setLoading(false);
    }
  };
  function getDateDifference(dateString: string) {
  const givenDate = new Date(dateString);
  const now = new Date();

  // Difference in milliseconds
  const diffMs = now.getTime() - givenDate.getTime();

  // Convert to units
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return {
    milliseconds: diffMs,
    seconds: diffSeconds,
    minutes: diffMinutes,
    hours: diffHours,
    days: diffDays,
  };
}

function formatDate(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  // Add ordinal suffix (st, nd, rd, th)
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${day}${suffix} ${month} ${year}`;
}




  return (
    <div className="overflow-y-auto max-h-screen no-scrollbar">
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <div className="min-h-screen bg-app-background-primary flex flex-col">
        <div className="w-full max-w-md px-4 top-0 left-0 right-0 ">
          <header className="fixed w-full pt-[64px] pb-5 bg-app-background-primary flex items-center mb-10">
            <h1 className="text-xl font-bold text-app-text-primary font-plusJakartaSans">
              Chats
            </h1>
          </header>
          <div className="mt-[130px]">
            {chatData &&
              chatData.map((item, index) => (
                <div key={index} className="mt-5">
                  <ChatCard
                    icon={item.event.category.svg_code}
                    category={item.event.category.name}
                    title={item.event.event_name}
                    leftDays={getDateDifference(item.event.event_date).days.toString()}
                    hostBy={item.event.host.username}
                    date={formatDate(new Date(item.event.event_date))}
                    review={"60%"}
                    scannedList={item.event.participants.length.toString()}
                    eventStatus={"Chat"}
                    isActive={true}
                    event_id={item.event.id}
                    host_id={item.event.user_id}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
