"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { BackArrow, RateEventIcon } from "../../../../public/svg-icons/icons";
import { paddings } from "@/constants/layout-constants";
import TextAreaComponent from "@/components/TextAreaComponent/TextAreaComponent";
import Image from "next/image";
import MemberModel from "@/components/Models/MemberModel/MemberModel";

const reportReasons = [
  { id: 1, label: "Racist", value: "Racist" },
  { id: 2, label: "Scam", value: "Scam" },
  { id: 3, label: "Physical assault", value: "Physical assault" },
  { id: 4, label: "Other", value: "Other" },
];

const followingList = [
  {
    name: "Franklin",
    img: "/followers/9.png",
  },
  {
    name: "Peppermint Patty",
    img: "/followers/8.png",
  },
  {
    name: "Franklin",
    img: "/followers/6.png",
  },
  {
    name: "Marcie",
    img: "/followers/10.png",
  },
  {
    name: "Linus van Pelt",
    img: "/followers/3.png",
  },
  {
    name: "Snoopy",
    img: "/followers/4.png",
  },
  {
    name: "Peppermint Patty",
    img: "/followers/5.png",
  },
  {
    name: "Marcie",
    img: "/followers/7.png",
  },
];

const ChatPagesClient = () => {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  const [loading, setLoading] = useState<boolean>(false);
  //State to track the active tab
  const [activeTab, setActiveTab] = useState<"Ratings" | "Report" | "GestScan">(
    "Ratings"
  );

  const [rateEvent1, setRateEvent1] = useState<boolean>(true);
  const [rateEvent2, setRateEvent2] = useState<boolean>(true);
  const [rateEvent3, setRateEvent3] = useState<boolean>(true);
  const [rateEvent4, setRateEvent4] = useState<boolean>(false);
  const [rateEvent5, setRateEvent5] = useState<boolean>(false);

  const [rateHost1, setRateHost1] = useState<boolean>(true);
  const [rateHost2, setRateHost2] = useState<boolean>(true);
  const [rateHost3, setRateHost3] = useState<boolean>(true);
  const [rateHost4, setRateHost4] = useState<boolean>(false);
  const [rateHost5, setRateHost5] = useState<boolean>(false);
  const [value, setValue] = useState("");
  // --------- show member model ----------
  const [showMemberDetailModel, setShowMemberDetailModel] = useState(false);

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
  return (
    <div>
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
              {/* <div className="mr-10 rounded-2xl bg-app-input-yellow text-app-text-black py-1 px-2">
                      <p className="text-[7.52px]">8</p>
                    </div> */}
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
                <div className="flex gap-2 mt-[19px]">
                  <RateEventIcon
                    className={`${
                      rateEvent1 ? "text-app-icon" : "text-app-icon-muted"
                    }`}
                    onClick={() => {
                      setRateEvent1(!rateEvent1);
                    }}
                  />
                  <RateEventIcon
                    className={`${
                      rateEvent2 ? "text-app-icon" : "text-app-icon-muted"
                    }`}
                    onClick={() => {
                      setRateEvent2(!rateEvent2);
                    }}
                  />
                  <RateEventIcon
                    className={`${
                      rateEvent3 ? "text-app-icon" : "text-app-icon-muted"
                    }`}
                    onClick={() => {
                      setRateEvent3(!rateEvent3);
                    }}
                  />
                  <RateEventIcon
                    className={`${
                      rateEvent4 ? "text-app-icon" : "text-app-icon-muted"
                    }`}
                    onClick={() => {
                      setRateEvent4(!rateEvent4);
                    }}
                  />
                  <RateEventIcon
                    className={`${
                      rateEvent5 ? "text-app-icon" : "text-app-icon-muted"
                    }`}
                    onClick={() => {
                      setRateEvent5(!rateEvent5);
                    }}
                  />
                </div>
                <h2 className="text-primary font-plusJakartaSans-700 font-bold text-[19px] mt-[40px]">
                  Rate Host
                </h2>
                <div className="flex gap-2 mt-[19px]">
                  <RateEventIcon
                    className={`${
                      rateHost1 ? "text-app-icon" : "text-app-icon-muted"
                    }`}
                    onClick={() => {
                      setRateHost1(!rateHost1);
                    }}
                  />
                  <RateEventIcon
                    className={`${
                      rateHost2 ? "text-app-icon" : "text-app-icon-muted"
                    }`}
                    onClick={() => {
                      setRateHost2(!rateHost2);
                    }}
                  />
                  <RateEventIcon
                    className={`${
                      rateHost3 ? "text-app-icon" : "text-app-icon-muted"
                    }`}
                    onClick={() => {
                      setRateHost3(!rateHost3);
                    }}
                  />
                  <RateEventIcon
                    className={`${
                      rateHost4 ? "text-app-icon" : "text-app-icon-muted"
                    }`}
                    onClick={() => {
                      setRateHost4(!rateHost4);
                    }}
                  />
                  <RateEventIcon
                    className={`${
                      rateHost5 ? "text-app-icon" : "text-app-icon-muted"
                    }`}
                    onClick={() => {
                      setRateHost5(!rateHost5);
                    }}
                  />
                </div>
                <h2 className="text-primary font-plusJakartaSans-700 font-bold text-[19px] mt-[40px]">
                  Comment
                </h2>
                <TextAreaComponent placeholder="Your comment" />
                <div className=" w-full mt-[40px]">
                  <button
                    onClick={() => {}}
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
                  {reportReasons.map((item, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-2 cursor-pointer mb-3"
                      onClick={() => {
                        setValue(item.value);
                        console.log("Selectedsss value:", item.value);
                      }}
                    >
                      <input
                        type="radio"
                        name={""}
                        value={value}
                        className="peer hidden"
                      />

                      <div
                        className={`w-5 h-5 rounded-full border-2 ${
                          item.value !== value
                            ? "border-app-button-radio"
                            : "border-app-button-blue"
                        } flex items-center justify-center`}
                      >
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${
                            item.value !== value ? "" : "bg-app-button-blue"
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
                <TextAreaComponent placeholder="Your comment" />
                <div className=" w-full mt-[40px]">
                  <button
                    onClick={() => {}}
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
              {followingList.map((follower, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 mb-[24px]"
                  onClick={() => {
                    setShowMemberDetailModel(true);
                  }}
                >
                  <Image
                    src={follower.img}
                    alt={follower.name}
                    width={44}
                    height={44}
                    className="rounded-full"
                  />
                  <span className="text-[16px] text-app-text-primary font-plusJakartaSans-400">
                    {follower.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      <MemberModel
        isOpen={showMemberDetailModel}
        onClose={() => setShowMemberDetailModel(false)}
      />
    </div>
  );
};

export default ChatPagesClient;
