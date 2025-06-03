"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabInfo {
  id: string;
  label: string;
  content: string;
}

const TabComponent: React.FC<{ tabs: TabInfo[] }> = ({ tabs }) => {
  return (
    <div>
      <Tabs defaultValue={tabs[0].label} className="w-full">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.label} value={tab.label}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.label} value={tab.label}>
            <div className="space-y-6 text-base text-gray-700 leading-relaxed">
              {tab.content}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TabComponent;
