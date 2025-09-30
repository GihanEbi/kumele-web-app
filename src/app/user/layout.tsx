// app/dashboard/layout.tsx
"use client";

import BottomNavBar from "@/components/BotomNavBar/BotomNavBar";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import { getToken } from "@/utils/authUtils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // use the appContext to get the more option state
  const { isBottomNavBarFixed } = useAppContext();
  // check the login token
    const isLoggedIn = getToken() ? true : false;

  return (
    <div className="">
      <main className="overflow-y-scroll hide-scrollbar h-screen bg-k-background-secondary">
        {children}
      </main>
      {/* <footer className="fixed z-11 bottom-0 left-0 right-0">
        <BottomNavBar />
      </footer> */}
      {isLoggedIn && (
        <footer
          className={`${
            isBottomNavBarFixed ? "fixed" : ""
          } z-40 bottom-0 left-0 right-0`}
        >
          <BottomNavBar />
        </footer>
      )}
    </div>
  );
}
