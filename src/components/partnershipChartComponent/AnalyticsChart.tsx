// components/AnalyticsChart.tsx

"use client";

import React, { useRef, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceDot,
  Tooltip,
} from "recharts";

// Interfaces and CustomAnnotationLabel component remain the same...
interface DataPoint {
  name: string;
  amountSpent: number;
  reach: number;
  annotation?: { value: string; type: "reach" | "spent" };
}
interface AnalyticsChartProps {
  data: DataPoint[];
}

const CustomAnnotationLabel = (props: any) => {
  const { x, y, value, payload } = props;
  const annotation = payload.annotation;
  if (!annotation) return null;
  const isReach = annotation.type === "reach";
  const yOffset = isReach ? -70 : 60;
  return (
    <g transform={`translate(${x},${y + yOffset})`}>
      <foreignObject x={-50} y={-25} width={100} height={50}>
        <div className="flex justify-center items-center w-full h-full">
          <div className="bg-gray-100/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 text-center">
            <p
              className={`font-bold ${
                isReach ? "text-blue-500" : "text-orange-400"
              }`}
            >
              {annotation.value}
            </p>
          </div>
        </div>
      </foreignObject>
      <foreignObject x={-1} y={isReach ? 25 : -25} width={2} height={25}>
        <div className="w-full h-full flex justify-center">
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

// 3. THE MAIN CHART COMPONENT (FINAL VERSION)
// =================================================================

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data }) => {
  const yAxisTicks = [0, 1000, 2000, 5000, 10000, 15000];
  const formatYAxisTick = (tick: number) => {
    if (tick === 0) return "0";
    return `${tick / 1000}k`;
  };

  const yAxisDomain = [0, 15000];
  const syncId = "analyticsSync";
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Check if the ref is connected to an element
    if (scrollContainerRef.current) {
      // Set the initial horizontal scroll position. Adjust the value as needed.
      const initialScrollAmount = 50; // pixels

      // Use scrollTo for a smooth, animated effect
      scrollContainerRef.current.scrollTo({
        left: initialScrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    // Remove all horizontal padding from the main container
    <div className="w-full max-w-4xl mx-auto rounded-xl shadow-lg font-sans">
      {/* Add padding only to the legend container */}
      <div className="flex flex-col items-start px-2">
        <div className="flex items-center">
          <span className="w-4 h-4 bg-yellow-400 rounded-xs mr-2"></span>
          <span className="text-app-text-primary">Amount Spent</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 bg-blue-700 rounded-xs mr-2"></span>
          <span className="text-app-text-secondary">Reach</span>
        </div>
      </div>

      <div className="flex w-full">
        {/* --- CHART 1: FIXED Y-AXIS --- */}
        {/* This container is narrow, just wide enough for the labels */}
        {/* <div style={{ width: "200px", height: "300px" }} className="left-0">
          <ResponsiveContainer>
            <AreaChart
              data={data}
              syncId={syncId}
              margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
            >
              <YAxis
                axisLine={false}
                tickLine={false}
                ticks={yAxisTicks}
                tickFormatter={formatYAxisTick}
                // Align labels to the start (left) and add a small margin
                tick={{ fill: "#6b7280", fontSize: 14, textAnchor: "start" }}
                tickMargin={5}
                domain={yAxisDomain}
              />
              <XAxis dataKey="name" hide={true} />
            </AreaChart>
          </ResponsiveContainer>
        </div> */}

        {/* --- CHART 2: SCROLLABLE CONTENT --- */}
        <div className="flex-grow overflow-x-auto" ref={scrollContainerRef}>
          <div style={{ width: "1000px", height: "300px" }}>
            <ResponsiveContainer>
              <AreaChart
                data={data}
                syncId={syncId}
                margin={{ top: 20, right: 30, left: 5, bottom: 0 }}
              >
                {/* Dummy YAxis for horizontal grid line alignment */}
                {/* <YAxis hide={true} ticks={yAxisTicks} domain={yAxisDomain} /> */}
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  ticks={yAxisTicks}
                  tickFormatter={formatYAxisTick}
                  // Align labels to the start (left) and add a small margin
                  tick={{ fill: "#6b7280", fontSize: 14, textAnchor: "start" }}
                  tickMargin={5}
                  domain={yAxisDomain}
                />
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
                  dy={10}
                  // Small left padding to ensure first label is fully visible
                  padding={{ left: 10, right: 10 }}
                />
                <Tooltip
                  content={<></>}
                  cursor={{
                    stroke: "#d1d5db",
                    strokeWidth: 1,
                    strokeDasharray: "3 3",
                  }}
                />
                <defs>
                  <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#004DFF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#004DFF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFC000" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FFC000" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                {/* {data.map((entry, index) => {
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
                        r={5}
                        fill={
                          entry.annotation.type === "reach"
                            ? "#3b82f6"
                            : "#fb923c"
                        }
                        stroke="white"
                        strokeWidth={2}
                        label={
                          <CustomAnnotationLabel
                            payload={entry}
                            x={entry.name}
                            y={yValue}
                          />
                        }
                      />
                    );
                  }
                  return null;
                })} */}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
