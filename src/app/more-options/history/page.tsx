"use client";

import { useEffect, useState } from "react";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import {
  BackArrow,
  TermsAndConditionsIcon,
} from "../../../../public/svg-icons/icons";
import Image from "next/image";
import SelectComponent from "@/components/SelectComponent/SelectComponent";
import { authConstants } from "@/constants/auth-constants";
import BarChart from "@/components/BarChart/BarChart";
import DropDown from "@/components/DropDown/DropDown";
import { paddings } from "@/constants/layout-constants";
import GoldModel from "./models/GoldModel";
import SilverModel from "./models/SilverModel";
import BronzeModel from "./models/BronzeModel";
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

interface MonthStatDetail {
  title: string;
  amount: number;
  description: string;
  iconSymbol?: string;
}

interface BarDataPoint {
  month: string;
  value: number;
  stats?: MonthStatDetail[];
}

interface YearData {
  totalEarned: number;
  data: BarDataPoint[];
}

const yearlyMockData: {
  "2022": YearData;
} = {
  "2022": {
    totalEarned: 905,
    data: [
      {
        month: "Mar",
        value: 80,
        stats: [
          {
            title: "Spring Promo",
            amount: 200,
            description: "Campaign A",
            iconSymbol: "🌸",
          },
        ],
      },
      {
        month: "Apr",
        value: 50,
        stats: [
          {
            title: "Workshop Fees",
            amount: 450,
            description: "Spirituality",
            iconSymbol: "🛠️",
          },
        ],
      }, // No specific stats for April
      {
        month: "May",
        value: 90,
        stats: [
          {
            title: "Workshop Fees",
            amount: 350,
            description: "Advanced",
            iconSymbol: "🛠️",
          },
        ],
      },
      {
        month: "Jun",
        value: 70,
        stats: [
          {
            title: "Group meditation",
            amount: 305,
            description: "Spirituality",
            iconSymbol: "☯️",
          },
          {
            title: "90's Hip-Hop",
            amount: 100,
            description: "HouseF",
            iconSymbol: "🏠",
          },
        ],
      },
      {
        month: "Jul",
        value: 30,
        stats: [
          {
            title: "Workshop Fees",
            amount: 350,
            description: "Advanced",
            iconSymbol: "🛠️",
          },
        ],
      },
      {
        month: "Aug",
        value: 100,
        stats: [
          {
            title: "Summer Special",
            amount: 400,
            description: "Limited Time",
            iconSymbol: "☀️",
          },
        ],
      },
      {
        month: "Sep",
        value: 55,
        stats: [
          {
            title: "Group meditation",
            amount: 305,
            description: "Spirituality",
            iconSymbol: "☯️",
          },
          {
            title: "90's Hip-Hop",
            amount: 100,
            description: "HouseF",
            iconSymbol: "🏠",
          },
        ],
      },
      {
        month: "Oct",
        value: 85,
        stats: [
          {
            title: "Workshop Fees",
            amount: 350,
            description: "Advanced",
            iconSymbol: "🛠️",
          },
        ],
      },
      {
        month: "Nov",
        value: 65,
        stats: [
          {
            title: "Group meditation",
            amount: 305,
            description: "Spirituality",
            iconSymbol: "☯️",
          },
          {
            title: "90's Hip-Hop",
            amount: 100,
            description: "HouseF",
            iconSymbol: "🏠",
          },
        ],
      },
    ],
  },
};
type YearKey = keyof typeof yearlyMockData;
const page = () => {
  const [year, setYear] = useState("2022");
  const [selectedYear, setSelectedYear] = useState<YearKey>("2022");
  // Initial month is "Jun" for 2022 to match the image, otherwise null (overview)
  const [selectedMonth, setSelectedMonth] = useState<string | null>(
    selectedYear === "2022" ? "Jun" : null
  );
  const currentYearData: YearData = yearlyMockData[selectedYear] || {
    totalEarned: 0,
    data: [],
  };
  const [isDropdownSelected, setIsDropdownSelected] = useState<boolean>(false);
  //   loading state
  const [loading, setLoading] = useState(false);

  const currentData = yearlyData[year as keyof typeof yearlyData];
  const totalMedals = currentData.medals.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const [isGoldOpen, setIsGoldOpen] = useState(false);
  const [isSilverOpen, setIsSilverOpen] = useState(false);
  const [isBronzeOpen, setIsBronzeOpen] = useState(false);

  //lock background when modal opening
  useEffect(() => {
    if (isGoldOpen || isSilverOpen || isBronzeOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isGoldOpen, isSilverOpen, isBronzeOpen]);
  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <div className="min-h-screen bg-app-background-primary flex flex-col items-center pt-6 font-sans">
        <div className={`w-full max-w-md px-6 ${paddings.topMargin}`}>
          {/* Header */}
          <header className="flex items-center mb-10">
            <button
              aria-label="Go back"
              onClick={() => window.history.back()} // Simple back navigation
              className="p-2 -ml-2 mr-2" // Added padding for easier click and negative margin to align
            >
              <BackArrow className="text-app-icon" />
            </button>
            <h1 className="ml-5 text-[23px] font-semibold text-app-text-primary font-plusJakartaSans-700">
              History
            </h1>
          </header>
          {/* === REWARD RINGS CARD === */}
          <div className="flex item-center w-full mt-6">
            {/* title and pie chart */}
            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-[16px] text-app-text-primary font-plusJakartaSans-400">
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
              <div className="">
                <DropDown
                  dataArray={authConstants.yearList}
                  isOpen={(value: boolean) => {
                    setIsDropdownSelected(value);
                  }}
                  placeHolder="2022"
                  bgColor="bg-app-border"
                />
              </div>
              <div className="mt-4 flex">
                <div className="w-6 h-6 bg-yellow-500 rounded-full" />
                <div className="flex flex-col ml-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] text-app-text-primary font-plusJakartaSans-400">
                      Gold
                    </span>
                    <div onClick={() => setIsGoldOpen(true)}>
                      <TermsAndConditionsIcon className="text-app-icon w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-[13px] text-app-text-secondary font-plusJakartaSans-400">
                    Achieved 22 medals
                  </p>
                </div>
              </div>
              <div className="mt-4 flex">
                <div className="w-6 h-6 bg-gray-500 rounded-full" />
                <div className="flex flex-col ml-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] text-app-text-primary font-plusJakartaSans-400">
                      Silver
                    </span>
                    <div onClick={() => setIsSilverOpen(true)}>
                      <TermsAndConditionsIcon className="text-app-icon w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-[13px] text-app-text-secondary font-plusJakartaSans-400">
                    Achieved 1 medals
                  </p>
                </div>
              </div>
              <div className="mt-4 flex">
                <div className="w-6 h-6 bg-orange-500 rounded-full" />
                <div className="flex flex-col ml-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] text-app-text-primary font-plusJakartaSans-400">
                      Bronze
                    </span>

                    <div onClick={() => setIsBronzeOpen(true)}>
                      <TermsAndConditionsIcon className="text-app-icon w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-[13px] text-app-text-secondary font-plusJakartaSans-400">
                    Achieved 1 medals
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[16px] text-app-text-primary-400 font-plusJakartaSans mt-5 mb-[16px]">
            Money Earned USD $905
          </div>
          <div>
            <BarChart
              data={currentYearData.data}
              selectedMonth={selectedMonth}
            />
          </div>
        </div>
      </div>
      {/* Medal Details Modals */}
      <GoldModel isOpen={isGoldOpen} onClose={() => setIsGoldOpen(false)} />
      <SilverModel
        isOpen={isSilverOpen}
        onClose={() => setIsSilverOpen(false)}
      />
      <BronzeModel
        isOpen={isBronzeOpen}
        onClose={() => setIsBronzeOpen(false)}
      />
    </div>
  );
};

export default page;
