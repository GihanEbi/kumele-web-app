"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Medal, Info } from "lucide-react";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import {
  BackArrow,
  TermsAndConditionsIcon,
} from "../../../../../public/svg-icons/icons";
import Image from "next/image";
import SelectComponent from "@/components/SelectComponent/SelectComponent";
import { authConstants } from "@/constants/auth-constants";
import BarChart from "@/components/BarChart/BarChart";
// Mock data for the medal icon GIF
const MOCK_MEDAL_ICON_SRC = "/common-gifs/badge.gif";

// --- DATA ---
// We'll store data for different years in this object.
// You can fetch this from an API in a real application.
const yearlyData = {
  "2022": {
    medals: [
      { name: "Gold", value: 22, color: "hsl(var(--chart-gold))" },
      { name: "Silver", value: 1, color: "hsl(var(--chart-silver))" },
      { name: "Bronze", value: 1, color: "hsl(var(--chart-bronze))" },
    ],
    earnings: {
      total: 905,
      monthly: [
        { month: "Mar", value: 180 },
        { month: "Apr", value: 100 },
        { month: "May", value: 210 },
        { month: "Jun", value: 150 },
        { month: "Jul", value: 50 },
        { month: "Aug", value: 230 },
        { month: "Sep", value: 110 },
        { month: "Oct", value: 220 },
      ],
    },
  },
  "2023": {
    // Example data for another year
    medals: [
      { name: "Gold", value: 30, color: "hsl(var(--chart-gold))" },
      { name: "Silver", value: 5, color: "hsl(var(--chart-silver))" },
      { name: "Bronze", value: 8, color: "hsl(var(--chart-bronze))" },
    ],
    earnings: {
      total: 1250,
      monthly: [
        { month: "Jan", value: 150 },
        { month: "Feb", value: 200 },
        { month: "Mar", value: 180 },
        { month: "Apr", value: 220 },
        { month: "May", value: 130 },
        { month: "Jun", value: 190 },
        { month: "Jul", value: 210 },
        { month: "Aug", value: 240 },
      ],
    },
  },
};
// Define the shape of our data
interface ChartDataItem {
  month: string;
  value: number; // Value from 0 to 100
}

// Sample data that mimics the image
const chartData: ChartDataItem[] = [
  { month: 'Mar', value: 85 },
  { month: 'Apr', value: 50 },
  { month: 'May', value: 95 },
  { month: 'Jun', value: 75 },
  { month: 'Jul', value: 30 },
  { month: 'Aug', value: 100 },
  { month: 'Sep', value: 50 },
  { month: 'Oct', value: 98 },
];

const PieChart = () => {
  const goldColorPie = "#eab308";
  const bronzeColorPie = "#d97706";
  const silverColorPie = "#9ca3af";

  const gradientStyle = {
    backgroundImage: `conic-gradient(
      ${goldColorPie} 0deg 90deg,
      ${bronzeColorPie} 90deg 210deg,
      ${silverColorPie} 210deg 330deg,
      ${goldColorPie} 330deg 360deg
    )`,
  };

  return (
    <div
      className="w-36 h-36 sm:w-56 sm:h-56 rounded-full"
      style={gradientStyle}
      role="img"
      aria-label="Reward medals pie chart showing Gold, Bronze, and Silver segments"
    ></div>
  );
};
const page = () => {
  const [year, setYear] = useState("2022");
  //   loading state
  const [loading, setLoading] = useState(false);

  const currentData = yearlyData[year as keyof typeof yearlyData];
  const totalMedals = currentData.medals.reduce(
    (sum, item) => sum + item.value,
    0
  );
  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <div className="min-h-screen bg-app-background-primary flex flex-col items-center pt-6 font-sans">
        <div className="w-full max-w-md px-4">
          {/* Header */}
          <header className="flex items-center mb-10">
            <button
              aria-label="Go back"
              onClick={() => window.history.back()} // Simple back navigation
              className="p-2 -ml-2 mr-2" // Added padding for easier click and negative margin to align
            >
              <BackArrow className="text-app-icon" />
            </button>
            <h1 className="text-3xl font-bold text-app-text-primary font-plusJakartaSans">
              History
            </h1>
          </header>
          {/* === REWARD RINGS CARD === */}
          <div className="flex item-center w-full mt-6">
            {/* title and pie chart */}
            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-md text-app-text-primary font-plusJakartaSans">
                  Reward Rings
                </h2>
                <div className="ml-2">
                  <Image
                    src={MOCK_MEDAL_ICON_SRC}
                    alt={`Medal icon`}
                    width={24} // Adjust size as needed
                    height={24} // Adjust size as needed
                    className="object-contain" // object-contain if your GIF isn't perfectly square
                    unoptimized={true} // GIFs are often better unoptimized with next/image
                  />
                </div>
              </div>
              <div className="mt-5">
                <PieChart />
              </div>
            </div>
            {/* drop down and medals */}
            <div className="flex flex-col items-center ml-8">
              <div className="w-1/2">
                <SelectComponent
                  handleChange={(e) => {}}
                  items={authConstants.yearList}
                  placeholder=""
                />
              </div>
              <div className="mt-4 flex">
                <div className="w-6 h-6 bg-yellow-500 rounded-full" />
                <div className="flex flex-col ml-3">
                  <div className="flex items-center gap-2">
                    <span className="text-md text-app-text-primary font-plusJakartaSans">
                      Gold
                    </span>
                    <TermsAndConditionsIcon className="text-app-icon w-4 h-4" />
                  </div>
                  <p className="text-xs text-app-text-secondary font-plusJakartaSans">
                    Achieved 22 medals
                  </p>
                </div>
              </div>
              <div className="mt-4 flex">
                <div className="w-6 h-6 bg-gray-500 rounded-full" />
                <div className="flex flex-col ml-3">
                  <div className="flex items-center gap-2">
                    <span className="text-md text-app-text-primary font-plusJakartaSans">
                      Silver
                    </span>
                    <TermsAndConditionsIcon className="text-app-icon w-4 h-4" />
                  </div>
                  <p className="text-xs text-app-text-secondary font-plusJakartaSans">
                    Achieved 1 medals
                  </p>
                </div>
              </div>
              <div className="mt-4 flex">
                <div className="w-6 h-6 bg-orange-500 rounded-full" />
                <div className="flex flex-col ml-3">
                  <div className="flex items-center gap-2">
                    <span className="text-md text-app-text-primary font-plusJakartaSans">
                      Bronze
                    </span>
                    <TermsAndConditionsIcon className="text-app-icon w-4 h-4" />
                  </div>
                  <p className="text-xs text-app-text-secondary font-plusJakartaSans">
                    Achieved 1 medals
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-md text-app-text-primary font-plusJakartaSans mt-5">
            Money Earned USD $905
          </div>
          <div>
            <BarChart chartData={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
