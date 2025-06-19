import React from "react";

import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

// Define the shape of our data
interface ChartDataItem {
  month: string;
  value: number; // Value from 0 to 100
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

const BarChart: React.FC<{ chartData: ChartDataItem[] }> = ({ chartData }) => {
  const maxValue = 100;
  return (
     <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <RechartsBarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <Bar dataKey="desktop" fill={chartConfig.desktop.color} radius={4} />
        <Bar dataKey="mobile" fill={chartConfig.mobile.color} radius={4} />
      </RechartsBarChart>
    </ChartContainer>
  );
};

export default BarChart;
