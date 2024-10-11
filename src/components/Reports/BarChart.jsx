import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = ({ values }) => {
  console.log(values);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: ["Oidium", "Tuta Absoluta"], // Define labels for each bar
        datasets: [
          {
            data: [
              // values?.oidium ? values?.oidium : 0,
              // values?.tuta ? values?.tuta : 0,
              5, 2,
            ],
            backgroundColor: ["#FFA500", "#FF4A55"], // Same colors
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
        },
        scales: {
          y: {
            beginAtZero: true, // Makes sure the y-axis starts at 0
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [values]);

  return (
    <div className="w-full h-full pt-3">
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarChart;
