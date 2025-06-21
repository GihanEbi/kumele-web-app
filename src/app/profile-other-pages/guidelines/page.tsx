"use client";

import React from "react";
import Head from "next/head";
import { useState } from "react";
import { BackArrow } from "../../../../public/svg-icons/icons";
import TabComponent from "@/components/TabComponent/TabComponent";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { paddings } from "@/constants/layout-constants";


const Guidelines = () => {
  // state for loading state
  const [loading, setLoading] = useState<boolean>(false);
  //State to track the active tab
  const [activeTab, setActiveTab] = useState<
    "C. Guidelines" | "How to" | "Popular"
  >("C. Guidelines");

  // styles for active and inactive tabs to keep the JSX clean
  const activeTabStyles =
    "bg-app-background-primary shadow text-app-blog-card-author-text";
  const inactiveTabStyles = "bg-transparent text-app-search-bar-text";

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
            <button
              onClick={() => setActiveTab("C. Guidelines")}
              className={`flex-1 py-3 px-4 rounded-lg font-plusJakartaSans-500 font-medium text-[14px] transition-all duration-300 ${
                activeTab === "C. Guidelines"
                  ? activeTabStyles
                  : inactiveTabStyles
              }`}
            >
              C. Guidelines
            </button>

            {/* Guest Tickets Button */}
            <button
              onClick={() => setActiveTab("How to")}
              className={`flex-1 py-3 px-4 rounded-lg font-plusJakartaSans-500 font-medium text-[14px] transition-all duration-300 ${
                activeTab === "How to" ? activeTabStyles : inactiveTabStyles
              }`}
            >
              How to
            </button>
            <button
              onClick={() => setActiveTab("Popular")}
              className={`flex-1 py-3 px-4 rounded-lg font-plusJakartaSans-500 font-medium text-[14px] transition-all duration-300 ${
                activeTab === "Popular" ? activeTabStyles : inactiveTabStyles
              }`}
            >
              Popular
            </button>
          </div>
          {activeTab === "C. Guidelines" && (
            <div className="mt-[25px]">
              {" "}
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Assumenda ipsam soluta quae numquam minima! Autem ab sunt minima
              in cumque, eveniet voluptas tempora perspiciatis. Possimus quia
              rem quae alias aliquam? Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Assumenda ipsam soluta quae numquam minima!
              Autem ab sunt minima in cumque, eveniet voluptas tempora
              perspiciatis. Possimus quia rem quae alias aliquam?
              <br />
              <br />
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Assumenda ipsam soluta quae numquam minima! Autem ab sunt minima
              in cumque, eveniet voluptas tempora perspiciatis. Possimus quia
              rem quae alias aliquam?
              <br />
              <br />
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Assumenda ipsam soluta quae numquam minima! Autem ab sunt minima
              in cumque, eveniet voluptas tempora perspiciatis. Possimus quia
              rem quae alias aliquam?
              <br />
            </div>
          )}
          {activeTab === "How to" && (
            <div className="mt-[25px]">
              {" "}
              dolor sit, amet consectetur adipisicing elit. Assumenda ipsam
              soluta quae numquam minima! Autem ab sunt minima in cumque,
              eveniet voluptas tempora perspiciatis. Possimus quia rem quae
              alias aliquam?
              <br />
              <br />
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Assumenda ipsam soluta quae numquam minima! Autem ab sunt minima
              in cumque, eveniet voluptas tempora perspiciatis. Possimus quia
              rem quae alias aliquam? Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Assumenda ipsam soluta quae numquam minima!
              Autem ab sunt minima in cumque, eveniet voluptas tempora
              perspiciatis. Possimus quia rem quae alias aliquam? Lorem ipsum
              <br />
              <br />
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Assumenda ipsam soluta quae numquam minima! Autem ab sunt minima
              in cumque, eveniet voluptas tempora perspiciatis. Possimus quia
              rem quae alias aliquam?
              <br />
            </div>
          )}
          {activeTab === "Popular" && (
            <div className="mt-[25px]">
              {" "}
              eveniet voluptas tempora perspiciatis. Possimus quia rem quae
              alias aliquam?
              <br />
              <br />
              dolor sit, amet consectetur adipisicing elit. Assumenda ipsam
              soluta quae numquam minima! Autem ab sunt minima in cumque,
              eveniet voluptas tempora perspiciatis. Possimus quia rem quae
              alias aliquam?
              <br />
              <br />
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Assumenda ipsam soluta quae numquam minima! Autem ab sunt minima
              in cumque, eveniet voluptas tempora perspiciatis. Possimus quia
              rem quae alias aliquam? Lorem ipsum
              <br />
              <br />
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Assumenda ipsam soluta quae numquam minima! Autem ab sunt minima
              in cumque, eveniet voluptas tempora perspiciatis. Possimus quia
              rem quae alias aliquam?Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Assumenda ipsam soluta quae numquam minima!
              Autem ab sunt minima in cumque, eveniet voluptas tempora
              perspiciatis. Possimus quia rem quae alias aliquam?
              <br />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Guidelines;
