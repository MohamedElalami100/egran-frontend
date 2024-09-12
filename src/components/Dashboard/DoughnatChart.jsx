import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DoughnatChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [23, 14, 56],
            backgroundColor: ["#FFA500", "#FF4A55", "#30D887"],
            hoverOffset: 4,
          },
        ],
      },
    });
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full h-full">
      <canvas ref={chartRef} />
    </div>
  );
};

export default DoughnatChart;
