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
    <div className="bg-app-background-primary min-h-screen flex justify-center p-4">
      <div className="w-full">
        <Tabs defaultValue={tabs[0].id} className="bg-app-background-primary">
          <TabsList className="bg-app-input-primary rounded-lg p-2 mb-4 w-full ">
            {tabs.map((tab, index) => (
              <TabsTrigger key={tab.id} value={tab.id} className="">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab, index) => (
            <TabsContent key={tab.id} value={tab.id}>
              <div className="font-sm">{tab.content}</div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default TabComponent;
