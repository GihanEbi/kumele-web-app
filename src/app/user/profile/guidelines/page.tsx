"use client";

import React from "react";
import Head from "next/head";
import { useState } from "react";
import { BackArrow } from "../../../../../public/svg-icons/icons";
import TabComponent from "@/components/TabComponent/TabComponent";

type TabId = "guidelines" | "howto" | "popular";

interface TabInfo {
  id: TabId;
  label: string;
  content: string; // Array of paragraphs
}

const Guidelines = () => {
  
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
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        {/* Header with Back Arrow and Tabs */}
        <header className="sticky top-0 bg-white z-10 p-4 flex items-center border-b border-gray-200">
          {/* Back Button */}
          <button
            onClick={() =>
              typeof window !== "undefined" && window.history.back()
            }
            className="p-2 -ml-2 text-gray-700 hover:text-gray-900 mr-2" // Added mr-2 for spacing
            aria-label="Go back"
          >
            <BackArrow />
          </button>
        </header>
        <main className="flex-grow p-5 md:p-8">
          <TabComponent tabs={tabsData} />
        </main>
      </div>
    </div>
  );
};

export default Guidelines;
