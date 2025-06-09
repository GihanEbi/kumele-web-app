"use client";

import React from "react";
import Head from "next/head";
import { useState } from "react";
import { BackArrow } from "../../../../../public/svg-icons/icons";
import TabComponent from "@/components/TabComponent/TabComponent";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

type TabId = "guidelines" | "howto" | "popular";

interface TabInfo {
  id: TabId;
  label: string;
  content: string; // Array of paragraphs
}

const Guidelines = () => {
  // state for loading state
  const [loading, setLoading] = useState<boolean>(false);

  const tabsData: TabInfo[] = [
    {
      id: "guidelines",
      label: "C. Guidelines",
      content:
        "amet consectetur adipisicing elit. Molestiae hic animi temporibus culpa sit facere, sapiente in suscipit maxime, quod facilis dolor? Est ab dolorum optio at quae beatae non!",
    },
    {
      id: "howto",
      label: "How to",
      content:
        "eget tortor aliquam, nec tincidunt nunc commodo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.",
    },
    {
      id: "popular",
      label: "Popular",
      content:
        "This is the 'Popular' section. Phasellus accumsan purus eget tortor aliquam, nec tincidunt nunc commodo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.",
    },
  ];

  return (
    <div>
      {/* Loading spinner */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}
      <div className="min-h-screen bg-app-background-primary flex flex-col items-center pt-6 font-sans">
        <div className="w-full max-w-md px-4">
          {/* Header */}
          <header className="flex items-center">
            <button
              aria-label="Go back"
              onClick={() => window.history.back()} // Simple back navigation
              className="p-2 -ml-2 mr-2" // Added padding for easier click and negative margin to align
            >
              <BackArrow className="text-app-icon" />
            </button>
          </header>
        </div>
        <main className="flex-grow p-5 md:p-8">
          <TabComponent tabs={tabsData} />
        </main>
      </div>
    </div>
  );
};

export default Guidelines;
