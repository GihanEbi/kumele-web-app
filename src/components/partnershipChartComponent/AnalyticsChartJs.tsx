"use client";

import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartEvent,
  ActiveElement,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { useTheme } from "next-themes";

// REGISTER CHART.JS MODULES AND PLUGINS

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  annotationPlugin
);

// DEFINE DATA STRUCTURES

interface DataPoint {
  name: string;
  amountSpent: number;
  reach: number;
}

interface AnalyticsChartProps {
  data: DataPoint[];
}

interface ActiveAnnotation {
  index: number;
  value: number;
  type: "reach" | "spent";
}

// THE MAIN CHART COMPONENT

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data }) => {
  // --- STATE for managing the clicked annotation ---
  const [activeAnnotation, setActiveAnnotation] =
    useState<ActiveAnnotation | null>(null);

  // --- THEME DETECTION ---
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // --- Data Preparation ---
  const labels = data.map((d) => d.name);
  const reachData = data.map((d) => d.reach);
  const spentData = data.map((d) => d.amountSpent);

  // --- HELPER FUNCTIONS ---

  const createDynamicAnnotations = () => {
    if (!activeAnnotation) return {};

    const annotations: any = {};
    const { index, value, type } = activeAnnotation;
    const isReach = type === "reach";

    // --- Define Styling and Pixel Offsets ---
    const dotColor = isReach ? "#004DFF" : "#FFC000";
    const boxColor = isReach ? "#004DFF" : "#F7B40B";
    const boxYOffset = -50;
    const dot1YOffset = -12;
    const dot2YOffset = -20;
    const dot3YOffset = -28;

    // 1. The Value Box Label
    annotations["dynamicLabel"] = {
      type: "label",
      xValue: index,
      yValue: value,
      content: [String(value)],
      font: { size: 14, weight: "bold" },
      color: boxColor,
      backgroundColor: "#F4F4F4",
      borderRadius: 5.73,
      padding: { top: 6, bottom: 6, left: 20, right: 20 },
      yAdjust: boxYOffset,
      callout: { display: false },
      shadow: { display: true, color: "rgba(0,0,0,0.05)", blur: 6, offsetY: 2 },
    };

    annotations["dynamicPointOnLine"] = {
      type: "point",
      xValue: index,
      yValue: value,
      radius: 3,
      backgroundColor: dotColor,
      borderWidth: 0,
    };

    annotations["dynamicPoint1"] = {
      type: "point",
      xValue: index,
      yValue: value,
      yAdjust: dot1YOffset,
      radius: 3,
      backgroundColor: dotColor,
      borderWidth: 0,
    };
    annotations["dynamicPoint2"] = {
      type: "point",
      xValue: index,
      yValue: value,
      yAdjust: dot2YOffset,
      radius: 3,
      backgroundColor: dotColor,
      borderWidth: 0,
    };
    annotations["dynamicPoint3"] = {
      type: "point",
      xValue: index,
      yValue: value,
      yAdjust: dot3YOffset,
      radius: 3,
      backgroundColor: dotColor,
      borderWidth: 0,
    };

    return annotations;
  };

  const createGradient = (
    ctx: CanvasRenderingContext2D,
    area: any,
    colorStops: any[]
  ) => {
    const gradient = ctx.createLinearGradient(0, area.top, 0, area.bottom);
    colorStops.forEach((stop) =>
      gradient.addColorStop(stop.offset, stop.color)
    );
    return gradient;
  };

  const handleChartClick = (
    event: ChartEvent,
    elements: ActiveElement[],
    chart: ChartJS
  ) => {
    if (!event.y) return;
    if (elements.length === 0) {
      setActiveAnnotation(null);
      return;
    }
    const clickY = event.y;
    const index = elements[0].index;
    const reachValue = reachData[index];
    const spentValue = spentData[index];
    const reachY = chart.scales.y.getPixelForValue(reachValue);
    const spentY = chart.scales.y.getPixelForValue(spentValue);
    const distToReach = Math.abs(clickY - reachY);
    const distToSpent = Math.abs(clickY - spentY);
    const type = distToReach < distToSpent ? "reach" : "spent";
    const value = type === "reach" ? reachValue : spentValue;
    if (
      activeAnnotation &&
      activeAnnotation.index === index &&
      activeAnnotation.type === type
    ) {
      setActiveAnnotation(null);
    } else {
      setActiveAnnotation({ index, value, type });
    }
  };

  // --- CHART DATA AND OPTIONS ---

  const chartData = {
    labels,
    datasets: [
      {
        label: "Amount Spent",
        data: spentData,
        borderColor: "#F7B40B",

        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }

          const maxSpentValue = Math.max(
            ...spentData.filter((v) => v !== null)
          );

          const yStart = chart.scales.y.getPixelForValue(maxSpentValue);
          const yEnd = chart.scales.y.getPixelForValue(0);

          const gradient = ctx.createLinearGradient(0, yStart, 0, yEnd);

          gradient.addColorStop(0, "rgba(247, 180, 11, 0.8)");
          gradient.addColorStop(
            1,
            isDark ? "rgba(0, 0, 0, 0)" : "rgba(251, 249, 165, 0.8)"
          );

          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
        order: 1,
      },
      {
        label: "Reach",
        data: reachData,
        borderColor: "#3b82f6",
        backgroundColor: (context: any) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return null;
          return createGradient(ctx, chartArea, [
            { offset: 0, color: "rgba(0, 77, 255, 0.4)" },
            // { offset: 1, color: "rgba(59, 130, 246, 0)" },
            { offset: 1, color: "rgba(59, 130, 246, 0.1)" },
          ]);
        },
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
        order: 2,
      },
    ],
  };

  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: handleChartClick,
    events: ["click", "mousemove"],

    scales: {
      y: {
        min: 0,
        max: 14000,
        ticks: {
          values: [0, 2000, 5000, 10000, 15000],
          callback: (value: any) => (value === 0 ? "0" : `${value / 1000}k`),
          color: isDark ? "#FFFFFF" : "#000000",
          font: { size: 14 },
        },
        border: {
          display: true,
          color: isDark ? "#E8E8E8" : "#000000",
          width: 1,
          dash: (context: any) => {
            if (context.tick.value === 0) {
              return [];
            }
            return [4, 6];
          },
        },
        grid: {
          // color: "#E8E8E8",
          color: (context: any) => {
            if (context.tick.value === 0) {
              return isDark ? "transparent" : "transparent";
            }

            return isDark ? "#E8E8E8" : "#000000";
          },
          drawTicks: false,
          borderDash: [2, 6],
          lineWidth: (context: any) => {
            if (context.tick.value === 0) {
              return 0;
            } else if (isDark) {
              return 0.5;
            }
            return 0.2;
          },
          borderDashOffset: 0,
        },
      },
      x: {
        ticks: { color: isDark ? "#FFFFFF" : "#000000", font: { size: 14 } },
        grid: { display: false },
        border: {
          display: true,
          color: isDark ? "#E8E8E8" : "#000000",
          width: 1,
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      annotation: {
        drawTime: "afterDatasetsDraw",
        annotations: createDynamicAnnotations(),
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <div className="analytics-chart w-full max-w-4xl mx-auto rounded-xl font-sans">
      <div className="flex flex-col items-start mb-4 px-2">
        <div className="flex items-center">
          <span
            className="w-[17.15px] h-[17.45px] rounded-[3.01px] mr-2"
            style={{ backgroundColor: "#FFC000" }}
          ></span>
          <span className="text-black dark:text-white font-plusJakartaSans font-normal text-[13.54px]">
            Amount Spent
          </span>
        </div>
        <div className="flex items-center mt-1">
          <span
            className="w-[17.15px] h-[17.45px] rounded-[3.01px] mr-2"
            style={{ backgroundColor: "#004DFF" }}
          ></span>
          <span className="text-black dark:text-white font-plusJakartaSans font-normal text-[13.54px]">
            Reach
          </span>
        </div>
      </div>

      <div
        className="w-full overflow-x-auto hide-scrollbar"
        style={{ minWidth: 0 }}
      >
        <div style={{ width: "1000px", height: "300px" }}>
          <Line options={chartOptions} data={chartData as any} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
