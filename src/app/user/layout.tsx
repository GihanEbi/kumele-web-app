// app/dashboard/layout.tsx

import BottomNavBar from "@/components/BotomNavBar/BotomNavBar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <main className="mb-30">{children}</main>
      <footer className="fixed bottom-0 left-0 right-0">
        <BottomNavBar />
      </footer>
    </div>
  );
}
