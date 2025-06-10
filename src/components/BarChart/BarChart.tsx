import React from "react";

// Define the shape of our data
interface ChartDataItem {
  month: string;
  value: number; // Value from 0 to 100
}

const BarChart: React.FC<{ chartData: ChartDataItem[] }> = ({ chartData }) => {
  const maxValue = 100;
  return (
    <div className="flex gap-2">
      {chartData.map((item, index) => (
        <div key={index}>
            <div className={`w-full bg-blue-500 rounded-t-md h-${item.value}`}></div>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
