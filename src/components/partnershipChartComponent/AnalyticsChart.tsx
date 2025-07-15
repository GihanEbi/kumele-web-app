// components/AnalyticsChart.tsx

"use client"; // This is a client component, because it uses event listeners and hooks

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceDot,
  Label,
} from "recharts";

// 1. DEFINE THE DATA STRUCTURE WITH TYPESCRIPT
// =================================================================

// This defines what a single data point on our chart looks like
interface DataPoint {
  name: string;
  amountSpent: number;
  reach: number;
  // Annotations are optional, so they might not exist on every data point
  annotation?: {
    value: string;
    type: "reach" | "spent";
  };
}

// This defines the props our component will accept
interface AnalyticsChartProps {
  data: DataPoint[];
}

// 2. CREATE A CUSTOM COMPONENT FOR THE ANNOTATION LABELS
// Recharts lets us pass custom components to render elements like labels.
// This gives us full control over the styling with Tailwind CSS.
// =================================================================

const CustomAnnotationLabel = (props: any) => {
  const { x, y, value, payload } = props;
  const annotation = payload.annotation;
  console.log("Annotation payload:", props);
  

  if (!annotation) return null;

  const isReach = annotation.type === "reach";
  const yOffset = isReach ? -70 : 60; // Position above for 'reach', below for 'spent'

  return (
    <g transform={`translate(${x},${y + yOffset})`}>
      {/* The floating box */}
      <foreignObject x={-50} y={-25} width={100} height={50}>
        <div className="flex justify-center items-center w-full h-full">
          <div className="bg-gray-100/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 text-center">
            <p
              className={`font-bold ${
                isReach ? "text-blue-500" : "text-gray-700"
              }`}
            >
              {annotation.value}
            </p>
          </div>
        </div>
      </foreignObject>

      {/* The dotted line connecting the box to the data point */}
      <foreignObject x={-1} y={isReach ? 25 : -25} width={2} height={25}>
        <div className={`w-full h-full flex justify-center`}>
          <div
            className={`w-px h-full ${
              isReach ? "bg-blue-400" : "bg-orange-400"
            } bg-dotted-line`}
          ></div>
        </div>
      </foreignObject>
    </g>
  );
};

// We need a little CSS for the dotted line effect
// Add this to your globals.css
/*
  .bg-dotted-line {
    background-image: linear-gradient(to bottom, currentColor 33%, transparent 0%);
    background-position: left;
    background-size: 1px 6px;
    background-repeat: repeat-y;
  }
*/

// 3. THE MAIN CHART COMPONENT
// =================================================================

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data }) => {
  // The Y-axis in your image has specific, non-linear ticks. We define them here.
  const yAxisTicks = [0, 1000, 2000, 5000, 10000, 15000];

  // A formatter to turn numbers like 2000 into "2k"
  const formatYAxisTick = (tick: number) => {
    if (tick === 0) return "0";
    return `${tick / 1000}k`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl shadow-lg font-sans">
      {/* Custom Legend */}
      <div className="flex flex-col items-start space-x-6 mb-4 px-6">
        <div className="flex items-center">
          <span className="w-4 h-4 bg-yellow-400 rounded-xs mr-2"></span>
          <span className="text-gray-600 font-medium">Amount Spent</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 bg-blue-500 rounded-xs mr-2"></span>
          <span className="text-gray-600 font-medium">Reach</span>
        </div>
      </div>

      {/* Chart Container - `ResponsiveContainer` makes the chart fit its parent */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ top: 20, right: 15, left: -10, bottom: 0 }}
          >
            {/* Define gradients for the area fills */}
            <defs>
              <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#facc15" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Grid, Axes, and Areas */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 14 }}
              dy={10} // pushes the labels down a bit
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              ticks={yAxisTicks}
              tickFormatter={formatYAxisTick}
              tick={{ fill: "#6b7280", fontSize: 14 }}
              domain={[0, 15000]}
            />

            <Area
              type="monotone"
              dataKey="amountSpent"
              stroke="#facc15"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorSpent)"
            />
            <Area
              type="monotone"
              dataKey="reach"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorReach)"
            />

            {/* Render the custom annotations */}
            {data.map((entry, index) => {
              if (entry.annotation) {
                const yValue =
                  entry.annotation.type === "reach"
                    ? entry.reach
                    : entry.amountSpent;
                return (
                  <ReferenceDot
                    key={`dot-${index}`}
                    x={entry.name}
                    y={yValue}
                    r={5} // radius of the dot
                    fill={
                      entry.annotation.type === "reach" ? "#3b82f6" : "#fb923c"
                    }
                    stroke="white"
                    strokeWidth={2}
                    label={<CustomAnnotationLabel payload={entry} x={entry.name} y={yValue} />}
                  >
                    {/* <Label
                      content={<CustomAnnotationLabel payload={entry} />}
                      className="text-center"
                    /> */}
                  </ReferenceDot>
                );
              }
              return null;
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
