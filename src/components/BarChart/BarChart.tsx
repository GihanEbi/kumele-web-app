import React from "react";

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
interface BarChartProps {
  data: BarDataPoint[];
  selectedMonth: string | null; // New prop
}

interface YearData {
  totalEarned: number;
  data: BarDataPoint[];
}

const BarChart: React.FC<BarChartProps> = ({ data, selectedMonth }) => {
  const maxValue = Math.max(100, ...data.map((d) => d.value)); // Dynamically set maxValue or keep it 100 if preferred
  const chartAreaHeightPx = 160; // Base height for the bars
  const statsDisplayHeightBuffer = 60; // Extra space reserved for stats display above bars

  if (!data || data.length === 0) {
    return (
      <div
        className={`h-[${
          chartAreaHeightPx + statsDisplayHeightBuffer + 28
        }px] flex items-center justify-center text-gray-500`}
      >
        No data available for selected period.
      </div>
    );
  }
  return (
    <div className="mt-6">
      {/* Container for bars and potential stats, includes buffer for stats */}
      <div
        className={`flex items-end justify-around h-[${
          chartAreaHeightPx + statsDisplayHeightBuffer
        }px] space-x-1 sm:space-x-2 px-1 relative`}
      >
        {data.map((barData, index) => {
          const isMonthSelected = barData.month === selectedMonth;
          const barHeight = Math.max(
            0,
            (barData.value / maxValue) * chartAreaHeightPx
          );
          const hasStats =
            isMonthSelected && barData.stats && barData.stats.length > 0;

          // Calculate how many stat cards to show for centering. Max 2 for this layout.
          const numStatCards = hasStats
            ? Math.min(barData.stats!.length, 2)
            : 0;
          // Adjust horizontal positioning based on number of cards for better centering over the bar
          const statCardsHorizontalOffset =
            numStatCards === 1
              ? "-50%" // Center single card
              : numStatCards === 2
              ? `calc(-50% - ${(100 + 4) / 2}px + 50%)` // Center two cards (approx 100px width + 4px space)
              : "-50%";

          return (
            <div
              key={`${barData.month}-${index}`} // Using index for key safety if months can repeat (though unlikely here)
              className="flex-1 flex flex-col justify-end items-center h-full relative"
            >
              {/* The bar itself */}
              <div
                className={`w-full max-w-[28px] sm:max-w-[36px] rounded-t-md transition-all duration-300 ease-out
                  bg-app-text-blue`}
                style={{
                  height: `${barHeight}px`,
                }}
                title={`${barData.month}: Value ${barData.value}`} // Tooltip for accessibility
              ></div>
            </div>
          );
        })}
      </div>

      {/* Month labels below the chart */}
      <div className="flex justify-around mt-2 px-1">
        {data.map((barData, index) => (
          <span
            key={`${barData.month}-label-${index}`}
            className="flex-1 text-center text-[13.45px] font-plusJakartaSans-400 text-app-text-primary"
          >
            {barData.month}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
