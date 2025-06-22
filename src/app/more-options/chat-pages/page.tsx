"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { BackArrow, RateEventIcon } from "../../../../public/svg-icons/icons";
import { paddings } from "@/constants/layout-constants";
import TextAreaComponent from "@/components/TextAreaComponent/TextAreaComponent";
import Image from "next/image";
import MemberModel from "@/components/Models/MemberModel/MemberModel";
import ChatPagesClient from "./ChatPagesClient";

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

const page = () => {
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

  useEffect(() => {
    if (source === "rate-event") {
      setActiveTab("Ratings");
    } else if (source === "report-event") {
      setActiveTab("Report");
    } else if (source === "guest-scan") {
      setActiveTab("GestScan");
    }
  }, [source]);

  // styles for active and inactive tabs to keep the JSX clean
  const activeTabStyles =
    "bg-app-background-primary shadow text-app-blog-card-author-text";
  const inactiveTabStyles = "bg-transparent text-app-search-bar-text";

  return (
    <Suspense>
      {/* Loading spinner */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}
      <ChatPagesClient />
    </Suspense>
  );
};

export default page;
