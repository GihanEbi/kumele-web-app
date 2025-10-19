"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import {
  AtmosphereIcon,
  BackArrow,
  MicrophoneIcon,
  RateEventIcon,
  SparkingIcon,
  SpeakerIcon,
  TypingIconNew,
  WalletIcon,
} from "../../../../public/svg-icons/icons";
import { paddings } from "@/constants/layout-constants";
import TextAreaComponent from "@/components/TextAreaComponent/TextAreaComponent";
import Image from "next/image";
import MemberModel from "@/components/Models/MemberModel/MemberModel";
import { get_event_by_event_id } from "@/routes/Events";
import SuccessModel from "@/components/Models/SuccessModel/SuccessModel";
import ErrorModel from "@/components/Models/ErrorModel/ErrorModel";
import { createEventHostRating } from "@/routes/event_and_host_rating";
import { fi } from "date-fns/locale";
import { createEventReport, getReportReasons } from "@/routes/event_report";
import { useRouter } from "next/navigation";
import { get_user_event_by_user_id } from "@/routes/profile";
import { userCheckInEvent } from "@/routes/user events";

type user_data = {
  id: string;
  username: string;
  profilePicture: string;
  status: string;
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
  host_details: user_data;
  logged_in_user_id: string;
  participants: user_data[];
  host: user_data; // Add this property to match the expected type in MemberModel
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

const ChatPagesClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [source, setSource] = useState<string | null>(null);
  // state for store the chat data
  const [eventData, setEventData] = useState<event | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedReportReason, setSelectedReportReason] = useState("");
  const [reportComment, setReportComment] = useState("");
  // --------- show member model ----------
  const [showMemberDetailModel, setShowMemberDetailModel] = useState(false);
  // state to store the event ratings
  const [eventRatings, setEventRatings] = useState<number>(0);
  // state to store the host ratings
  const [hostRatings, setHostRatings] = useState<number>(0);
  const [ratingComment, setRatingComment] = useState<string>("");
  const [reportReason, setReportReason] = useState<any[]>([]);

  // host id
  const [hostId, setHostId] = useState<string | null>(null);
  // logged in user id
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
  // guest id
  const [guestId, setGuestId] = useState<string | null>(null);
  // state for store the fetched user data
  const [userData, setUserData] = useState<profileData | null>(null);
  // event id
  const [eventId, setEventId] = useState<string | null>(null);

  // confirm user
  const [confirmUserId, setConfirmUserId] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams) {
      setSource(searchParams.get("source"));
      setEventId(searchParams.get("event_id"));
    }
    // check user in near location
    if (searchParams?.get("user_id")) {
      setGuestId(searchParams.get("user_id"));
      fetchUserData();
      setShowMemberDetailModel(true);
    }
    fetchEventData();
    getEventReportReasons();
  }, [searchParams]);

  // get event report reasons
  const getEventReportReasons = async () => {
    try {
      setLoading(true);
      const data = await getReportReasons();
      if (data.success) {
        setReportReason(data.data);
      }
    } catch (error) {
      console.error("Error fetching report reasons:", error);
    } finally {
      setLoading(false);
    }
  };

  // checked in user to event
  const checkInUserToEvent = async (eventID: string) => {
    setLoading(true);
    try {
      const data = await userCheckInEvent(eventID);
      if (data.success) {
        setSuccess("User checked in successfully");
        setShowSuccessModel(true);
        setTimeout(() => {
          setShowSuccessModel(false);
          setSuccess("");
        }, 3600);
      } else {
        setError("Failed to check in user");
        setShowErrorModel(true);
        setTimeout(() => {
          setShowErrorModel(false);
          setError("");
        }, 3600);
      }
    } catch (error) {
      console.error("Error checking in user:", error);
    } finally {
      setLoading(false);
    }
  };

  // function to fetch user data
  const fetchUserData = async () => {
    setLoading(true);

    try {
      if (searchParams) {
        const data = await get_user_event_by_user_id(
          searchParams!.get("user_id")!
        ); // Non-null assertion since we check above

        if (data.success) {
          setUserData(data.data);
        } else {
          console.error("Failed to fetch host data:", data.message);
        }
      }
    } catch (error) {
      console.error("Error fetching host data:", error);
    } finally {
      setLoading(false);
    }
  };

  // function to fetch event data
  const fetchEventData = async () => {
    setLoading(true);

    try {
      if (searchParams) {
        const data = await get_event_by_event_id(
          searchParams!.get("event_id")!
        ); // Non-null assertion since we check above

        if (data.success) {
          setEventData(data.data);
          setHostId(data.data.host_details.id);
          setLoggedInUserId(data.data.logged_in_user_id);
        } else {
          console.error("Failed to fetch event data:", data.message);
        }
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
    } finally {
      setLoading(false);
    }
  };
  //State to track the active tab
  const [activeTab, setActiveTab] = useState<"Ratings" | "Report" | "GestScan">(
    "Ratings"
  );

  // styles for active and inactive tabs to keep the JSX clean
  const activeTabStyles =
    "bg-app-background-primary shadow text-app-blog-card-author-text";
  const inactiveTabStyles = "bg-transparent text-app-search-bar-text";

  useEffect(() => {
    if (source === "rate-event") {
      setActiveTab("Ratings");
    } else if (source === "report-event") {
      setActiveTab("Report");
    } else if (source === "guest-scan") {
      setActiveTab("GestScan");
    }
  }, [source]);

  const handleSubmitRating = async () => {
    if (loading) return;

    // Validations
    if (eventRatings === 0) {
      setError("Please provide a rating for the event.");
      setShowErrorModel(true);
      setTimeout(() => {
        setShowErrorModel(false);
        setError("");
      }, 3600);
      return;
    }
    if (hostRatings === 0) {
      setError("Please provide a rating for the host.");
      setShowErrorModel(true);
      setTimeout(() => {
        setShowErrorModel(false);
        setError("");
      }, 3600);
      return;
    }

    try {
      setLoading(true);
      const data = await createEventHostRating({
        eventId: eventData?.id || "",
        hostId: eventData?.host_details.id || "",
        event_rating: eventRatings,
        host_rating: hostRatings,
        review: ratingComment,
      });
      if (data.success) {
        setSuccess("Rating submitted successfully");
        setShowSuccessModel(true);
        setTimeout(() => {
          setShowSuccessModel(false);
          setSuccess("");
        }, 3600);
        // reset form
        setEventRatings(0);
        setHostRatings(0);
        setRatingComment("");
      } else {
        setError(data.message || "Failed to submit rating");
        setShowErrorModel(true);
        setTimeout(() => {
          setShowErrorModel(false);
          setError("");
        }, 3600);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      setError("Error submitting rating");
      setShowErrorModel(true);
      setTimeout(() => {
        setShowErrorModel(false);
        setError("");
      }, 3600);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmitReport = async () => {
    if (loading) return;
    // Validations
    if (selectedReportReason === "") {
      setError("Please select a reason for reporting.");
      setShowErrorModel(true);
      setTimeout(() => {
        setShowErrorModel(false);
        setError("");
      }, 3600);
      return;
    }

    try {
      setLoading(true);
      const data = await createEventReport({
        event_id: eventData?.id || "",
        reason: selectedReportReason,
        comments: reportComment,
      });
      if (data.success) {
        setSuccess("Report submitted successfully");
        setShowSuccessModel(true);
        setTimeout(() => {
          setShowSuccessModel(false);
          setSuccess("");
        }, 3600);
        // reset form
        setSelectedReportReason("");
        setReportComment("");
      } else {
        setError(data.message || "Failed to submit report");
        setShowErrorModel(true);
        setTimeout(() => {
          setShowErrorModel(false);
          setError("");
        }, 3600);
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      setError("Error submitting report");
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
    <div>
      {/* Loading spinner */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}
      <div className="px-6 min-h-screen bg-app-background-primary flex flex-col pt-6">
        <div className={`w-full max-w-md ${paddings.topMargin}`}>
          <header className="">
            <button
              aria-label="Go back"
              onClick={() => window.history.back()} // Simple back navigation
              className="mr-2" // Added padding for easier click and negative margin to align
            >
              <BackArrow className="text-app-icon" />
            </button>
          </header>
        </div>
        <main className="mt-[12px]">
          {/* <TabComponent tabs={tabsData} /> */}
          <div className="bg-app-range-slider-track-active p-1 rounded-lg flex items-center mt-2">
            {/* Subscriptions Button */}
            <div
              className={` text-center flex-1 py-3 px-4 rounded-lg font-plusJakartaSans-500 font-medium text-[14px] transition-all duration-300 ${
                activeTab === "Ratings" ? activeTabStyles : inactiveTabStyles
              }`}
            >
              <button onClick={() => setActiveTab("Ratings")}>Ratings</button>
            </div>

            {/* Guest Tickets Button */}
            <button
              onClick={() => setActiveTab("Report")}
              className={`flex-1 py-3 px-4 rounded-lg font-plusJakartaSans-500 font-medium text-[14px] transition-all duration-300 ${
                activeTab === "Report" ? activeTabStyles : inactiveTabStyles
              }`}
            >
              Report
            </button>
            <button
              onClick={() => setActiveTab("GestScan")}
              className={`flex-1 py-3 px-4 rounded-lg font-plusJakartaSans-500 font-medium text-[14px] transition-all duration-300 ${
                activeTab === "GestScan" ? activeTabStyles : inactiveTabStyles
              }`}
            >
              Guest Scan
            </button>
          </div>
          {activeTab === "Ratings" && (
            <div className="mt-[21px]">
              <div>
                <h2 className="text-primary font-plusJakartaSans-700 font-bold text-[19px]">
                  Rate Event
                </h2>
                {/* <div className="flex gap-2 mt-[19px]">
                  <RateEventIcon
                    className={`${
                      eventRatings >= 1
                        ? "text-app-icon"
                        : "text-app-icon-muted"
                    }`}
                    onClick={() => {
                      setEventRatings(1);
                    }}
                  />
                  <RateEventIcon
                    className={`${
                      eventRatings >= 2
                        ? "text-app-icon"
                        : "text-app-icon-muted"
                    }`}
                    onClick={() => {
                      setEventRatings(2);
                    }}
                  />
                  <RateEventIcon
                    className={`${
                      eventRatings >= 3
                        ? "text-app-icon"
                        : "text-app-icon-muted"
                    }`}
                    onClick={() => {
                      setEventRatings(3);
                    }}
                  />
                  <RateEventIcon
                    className={`${
                      eventRatings >= 4
                        ? "text-app-icon"
                        : "text-app-icon-muted"
                    }`}
                    onClick={() => {
                      setEventRatings(4);
                    }}
                  />
                  <RateEventIcon
                    className={`${
                      eventRatings >= 5
                        ? "text-app-icon"
                        : "text-app-icon-muted"
                    }`}
                    onClick={() => {
                      setEventRatings(5);
                    }}
                  />
                </div> */}
                {/* <h2 className="text-primary font-plusJakartaSans-700 font-bold text-[19px] mt-[40px]">
                  Rate Host
                </h2> */}
                <div className="mt-5">
                  <p className="text-xs font-bold">Attendee Ratings (70%)</p>
                </div>
                <div className="flex items-center gap-2 mt-5">
                  <TypingIconNew className="text-app-icon w-[20px] h-[20px]" />
                  <p className="text-xs">Communication</p>
                  <div className="flex gap-2 ">
                    <RateEventIcon
                      className={`${
                        hostRatings >= 1
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(1);
                      }}
                    />
                    <RateEventIcon
                      className={`${
                        hostRatings >= 2
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(2);
                      }}
                    />
                    <RateEventIcon
                      className={`${
                        hostRatings >= 3
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(3);
                      }}
                    />
                    <RateEventIcon
                      className={`${
                        hostRatings >= 4
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(4);
                      }}
                    />
                    <RateEventIcon
                      className={`${
                        hostRatings >= 5
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(5);
                      }}
                    />
                  </div>
                  {/* <p className="text-xs">( 4.8 )</p> */}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <SparkingIcon className="text-app-icon w-[20px] h-[20px]" />
                  <p className="text-xs">Respect</p>
                  <div className="flex gap-2 ">
                    <RateEventIcon
                      className={`${
                        hostRatings >= 1
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(1);
                      }}
                    />
                    <RateEventIcon
                      className={`${
                        hostRatings >= 2
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(2);
                      }}
                    />
                    <RateEventIcon
                      className={`${
                        hostRatings >= 3
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(3);
                      }}
                    />
                    <RateEventIcon
                      className={`${
                        hostRatings >= 4
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(4);
                      }}
                    />
                    <RateEventIcon
                      className={`${
                        hostRatings >= 5
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(5);
                      }}
                    />
                  </div>
                  {/* <p className="text-xs">( 4.2 )</p> */}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <MicrophoneIcon className="text-app-icon w-[20px] h-[20px]" />
                  <p className="text-xs">Professionalism</p>
                  <div className="flex gap-2 ">
                    <RateEventIcon
                      className={`${
                        hostRatings >= 1
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(1);
                      }}
                    />
                    <RateEventIcon
                      className={`${
                        hostRatings >= 2
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(2);
                      }}
                    />
                    <RateEventIcon
                      className={`${
                        hostRatings >= 3
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(3);
                      }}
                    />
                    <RateEventIcon
                      className={`${
                        hostRatings >= 4
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(4);
                      }}
                    />
                    <RateEventIcon
                      className={`${
                        hostRatings >= 5
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(5);
                      }}
                    />
                  </div>
                  {/* <p className="text-xs">( 5.0 )</p> */}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <AtmosphereIcon className="text-app-icon w-[20px] h-[20px]" />
                  <p className="text-xs">Atmosphere</p>
                  <div className="flex gap-2 ">
                    <RateEventIcon
                      className={`${
                        hostRatings >= 1
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(1);
                      }}
                    />
                    <RateEventIcon
                      className={`${
                        hostRatings >= 2
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(2);
                      }}
                    />
                    <RateEventIcon
                      className={`${
                        hostRatings >= 3
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(3);
                      }}
                    />
                    <RateEventIcon
                      className={`${
                        hostRatings >= 4
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(4);
                      }}
                    />
                    <RateEventIcon
                      className={`${
                        hostRatings >= 5
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(5);
                      }}
                    />
                  </div>
                  {/* <p className="text-xs">( 5.0 )</p> */}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <WalletIcon className="text-app-icon w-[20px] h-[20px]" />
                  <p className="text-xs">Value for money</p>
                  <div className="flex gap-2 ">
                    <RateEventIcon
                      className={`${
                        hostRatings >= 1
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(1);
                      }}
                    />
                    <RateEventIcon
                      className={`${
                        hostRatings >= 2
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(2);
                      }}
                    />
                    <RateEventIcon
                      className={`${
                        hostRatings >= 3
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(3);
                      }}
                    />
                    <RateEventIcon
                      className={`${
                        hostRatings >= 4
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(4);
                      }}
                    />
                    <RateEventIcon
                      className={`${
                        hostRatings >= 5
                          ? "text-app-icon"
                          : "text-app-icon-muted"
                      } w-[20px] h-[20px]`}
                      onClick={() => {
                        setHostRatings(5);
                      }}
                    />
                  </div>
                  {/* <p className="text-xs">( 5.0 )</p> */}
                </div>
                <h2 className="text-primary font-plusJakartaSans-700 font-bold text-[19px] mt-[40px]">
                  Comment
                </h2>
                <TextAreaComponent
                  placeholder="Your comment"
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                />
                <div className=" w-full mt-[40px]">
                  <button
                    onClick={() => {
                      handleSubmitRating();
                    }}
                    className="w-full text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === "Report" && (
            <div className="mt-[25px]">
              <div className="flex flex-col">
                <p className="text-[19px] font-plusJakartaSans-700 text-app-text-primary mb-[16px]">
                  Choose a reason
                </p>
                <div>
                  {reportReason.map((item, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-2 cursor-pointer mb-3"
                      onClick={() => {
                        setSelectedReportReason(item.value);
                      }}
                    >
                      <input
                        type="radio"
                        name={""}
                        value={item.value}
                        className="peer hidden"
                      />

                      <div
                        className={`w-5 h-5 rounded-full border-2 ${
                          item.value !== selectedReportReason
                            ? "border-app-button-radio"
                            : "border-app-button-blue"
                        } flex items-center justify-center`}
                      >
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${
                            item.value !== selectedReportReason
                              ? ""
                              : "bg-app-button-blue"
                          } transition-all`}
                        />
                      </div>
                      <p className="text-sm text-app-text-profile-tabs font-plusJakartaSans">
                        {item.label}
                      </p>
                    </label>
                  ))}
                </div>
                <h2 className="text-primary font-plusJakartaSans-700 font-bold text-[19px] mt-[40px]">
                  Comment
                </h2>
                <TextAreaComponent
                  placeholder="Your comment"
                  value={reportComment}
                  onChange={(e) => setReportComment(e.target.value)}
                />
                <div className=" w-full mt-[40px]">
                  <button
                    onClick={() => {
                      handleSubmitReport();
                    }}
                    className="w-full text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === "GestScan" && (
            <div className="mt-[25px]">
              {eventData?.participants.map((follower, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between space-x-3 mb-[24px] ${
                    follower.status === "CHECKED_IN"
                      ? ""
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-[44px] h-[44px] ">
                      {follower.status === "CHECKED_IN" && (
                        <span className="z-1000 absolute top-0 right-0 bg-green-600 text-black text-[10px] font-bold rounded-full w-3 h-3 flex items-center justify-center"></span>
                      )}

                      <Image
                        src={`${follower.profilePicture}`}
                        alt={follower.username}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <span className="text-[16px] text-app-text-primary font-plusJakartaSans-400">
                      {follower.username}
                    </span>
                  </div>
                  <div
                    className={`${
                      follower.status === "CHECKED_IN" ? "hidden" : ""
                    }`}
                  >
                    <button
                      // onClick={() => {
                      //   // handleSubmitReport();

                      //   router.push(
                      //     "/more-options/chat-pages/scan-qr?event_id=" +
                      //       eventData?.id +
                      //       "&eventCategoryId=" +
                      //       eventData?.category_id +
                      //       "&host_id=US00002"
                      //       // +
                      //       // eventData?.host_details.id
                      //   );
                      // }}

                      onClick={() => {
                        setGuestId(follower.id);
                        // setShowMemberDetailModel(true);
                      }}
                      className={`w-full text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg ${
                        follower.status !== "CHECKED_IN"
                          ? ""
                          : "opacity-50 cursor-not-allowed"
                      }`}
                      disabled={
                        hostId === loggedInUserId ||
                        follower.status !== "CHECKED_IN"
                          ? false
                          : true
                      }
                    >
                      Self-check
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      <MemberModel
        userId={guestId || ""}
        eventData={eventData}
        isOpen={showMemberDetailModel}
        onClose={() => setShowMemberDetailModel(false)}
        onConfirm={() => {
          setConfirmUserId(guestId);
          checkInUserToEvent(eventId || "");
          setShowMemberDetailModel(false);
          setSuccess("User confirmed successfully");
          setShowSuccessModel(true);
          setTimeout(() => {
            setShowSuccessModel(false);
            setSuccess("");
          }, 3600);
        }}
      />
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
    </div>
  );
};

export default ChatPagesClient;
