"use client";

import React, { useState } from "react";
import { BackArrow } from "../../../../public/svg-icons/icons";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { paddings } from "@/constants/layout-constants";

type TabKey = "C. Guidelines" | "How to" | "Popular" | "Knowledge Base";

const tabs: { key: TabKey; label: string; content: React.ReactNode }[] = [
  {
    key: "C. Guidelines",
    label: "Community Guidelines",
    content: (
      <div className="mt-[25px] font-plusJakartaSans-400 font-regular text-[13px]">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
        ipsam soluta quae numquam minima! Autem ab sunt minima in cumque,
        eveniet voluptas tempora perspiciatis. Possimus quia rem quae alias
        aliquam? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Assumenda ipsam soluta quae numquam minima! Autem ab sunt minima in
        cumque, eveniet voluptas tempora perspiciatis. Possimus quia rem quae
        alias aliquam?
        <br />
        <br />
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
        ipsam soluta quae numquam minima! Autem ab sunt minima in cumque,
        eveniet voluptas tempora perspiciatis. Possimus quia rem quae alias
        aliquam?
        <br />
        <br />
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
        ipsam soluta quae numquam minima! Autem ab sunt minima in cumque,
        eveniet voluptas tempora perspiciatis. Possimus quia rem quae alias
        aliquam?
        <br />
      </div>
    ),
  },
  {
    key: "How to",
    label: "How to",
    content: (
      <div className="mt-[25px] font-plusJakartaSans-400 font-regular text-[13px]">
        dolor sit, amet consectetur adipisicing elit. Assumenda ipsam soluta
        quae numquam minima! Autem ab sunt minima in cumque, eveniet voluptas
        tempora perspiciatis. Possimus quia rem quae alias aliquam?
        <br />
        <br />
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
        ipsam soluta quae numquam minima! Autem ab sunt minima in cumque,
        eveniet voluptas tempora perspiciatis. Possimus quia rem quae alias
        aliquam? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Assumenda ipsam soluta quae numquam minima! Autem ab sunt minima in
        cumque, eveniet voluptas tempora perspiciatis. Possimus quia rem quae
        alias aliquam? Lorem ipsum
        <br />
        <br />
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
        ipsam soluta quae numquam minima! Autem ab sunt minima in cumque,
        eveniet voluptas tempora perspiciatis. Possimus quia rem quae alias
        aliquam?
        <br />
      </div>
    ),
  },
  {
    key: "Popular",
    label: "Popular",
    content: (
      <div className="mt-[25px] font-plusJakartaSans-400 font-regular text-[13px]">
        eveniet voluptas tempora perspiciatis. Possimus quia rem quae alias
        aliquam?
        <br />
        <br />
        dolor sit, amet consectetur adipisicing elit. Assumenda ipsam soluta
        quae numquam minima! Autem ab sunt minima in cumque, eveniet voluptas
        tempora perspiciatis. Possimus quia rem quae alias aliquam?
        <br />
        <br />
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
        ipsam soluta quae numquam minima! Autem ab sunt minima in cumque,
        eveniet voluptas tempora perspiciatis. Possimus quia rem quae alias
        aliquam? Lorem ipsum
        <br />
        <br />
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
        ipsam soluta quae numquam minima! Autem ab sunt minima in cumque,
        eveniet voluptas tempora perspiciatis. Possimus quia rem quae alias
        aliquam? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Assumenda ipsam soluta quae numquam minima! Autem ab sunt minima in
        cumque, eveniet voluptas tempora perspiciatis. Possimus quia rem quae
        alias aliquam?
        <br />
      </div>
    ),
  },
  {
    key: "Knowledge Base",
    label: "Knowledge Base",
    content: (
      <div className="mt-[25px] text-[13px]">(Knowledge Base guidelines.)</div>
    ),
  },
];

const Guidelines = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // active tab
  const [activeTab, setActiveTab] = useState<TabKey>("C. Guidelines");

  // styles for active and inactive tabs
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
          <header>
            <button
              aria-label="Go back"
              onClick={() => window.history.back()}
              className="mr-2"
            >
              <BackArrow className="text-app-icon" />
            </button>
          </header>
        </div>

        <main className="mt-[12px]">
          {/* Scrollable Tabbar */}

          <div
            style={{ scrollPaddingLeft: 5, scrollPaddingRight: 5 }}
            role="tablist"
            aria-label="Guidelines tabs"
            className="bg-app-range-slider-track-active p-1 rounded-lg flex items-center mt-2 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap gap-1 snap-x snap-mandatory"
          >
            <span aria-hidden className="shrink-0 w-0 md:w-2 snap-start" />
            {tabs.map((tab) => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={activeTab === tab.key}
                aria-controls={`panel-${tab.key}`}
                onClick={() => setActiveTab(tab.key)}
                className={`shrink-0 py-3 px-4 rounded-lg font-plusJakartaSans-500 font-medium text-[14px] transition-all duration-300 whitespace-nowrap snap-start ${
                  activeTab === tab.key ? activeTabStyles : inactiveTabStyles
                }`}
                title={tab.label}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active panel */}
          {tabs.map((tab) => (
            <section
              key={tab.key}
              id={`panel-${tab.key}`}
              role="tabpanel"
              aria-labelledby={tab.key}
              hidden={activeTab !== tab.key}
            >
              {activeTab === tab.key && tab.content}
            </section>
          ))}
        </main>
        <style jsx global>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Guidelines;
