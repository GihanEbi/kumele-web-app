// app/dashboard/layout.tsx

import BottomNavBar from "@/components/BotomNavBar/BotomNavBar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <main className="overflow-y-scroll hide-scrollbar h-screen">
        {children}
      </main>
      {/* <footer className="fixed z-11 bottom-0 left-0 right-0">
        <BottomNavBar />
      </footer> */}
      <footer className="fixed z-40 bottom-0 left-0 right-0">
        <BottomNavBar />
      </footer>
    </div>
  );
}
