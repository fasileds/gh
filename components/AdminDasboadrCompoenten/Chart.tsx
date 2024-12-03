"use client";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import ReactApexChart to disable SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ChartOne: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set to true once the component is mounted on the client
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return null or a loader until the component is mounted on the client
    return null;
  }

  const series = [
    {
      name: "Received Amount",
      data: [0, 20, 35, 45, 35, 55, 65, 50, 65, 75, 60, 75],
    },
    {
      name: "Due Amount",
      data: [15, 9, 17, 32, 25, 68, 80, 68, 84, 94, 74, 62],
    },
  ];

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
      labels: {
        colors: "#4f4f4f",
      },
    },
    colors: ["#4CAF50", "#FF5722"], // Green and Red for received and due amounts
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 350,
      type: "area",
      background: "#fff", // Removed background color to keep it clean
      toolbar: {
        show: false,
      },
    },
    fill: {
      gradient: {
        shade: "light",
        type: "vertical",
        gradientToColors: ["#2e7d32", "#e64a19"], // Matching gradient to colors
        opacityFrom: 0.7,
        opacityTo: 0,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 4,
      colors: ["#ffffff", "#ffffff"],
      strokeColors: ["#FF5722", "#4CAF50"],
      strokeWidth: 2,
    },
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => `$${value.toFixed(2)}`,
      },
    },
    xaxis: {
      categories: [
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#333333",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  return (
    <div className="col-span-12 rounded-xl shadow-xl p-6 dark:shadow-2xl dark:shadow-xl xl:col-span-8 ml-4">
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-xl font-bold text-gray-800 ">
            Payments Overview
          </h4>
        </div>
        <div className="flex items-center gap-2.5">
          <p className="font-medium text-gray-600 dark:text-gray-600">
            Short by:
          </p>
        </div>
      </div>

      <div className="-mx-5">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </div>

      <div className="flex flex-col gap-4 text-center sm:flex-row sm:gap-0">
        <div className="border-b sm:border-r sm:border-b-0 sm:border-stroke dark:border-dark-3 sm:w-1/2 p-4">
          <p className="font-medium text-gray-500">Received Amount</p>
          <h4 className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
            $45,070.00
          </h4>
        </div>
        <div className="sm:w-1/2 p-4">
          <p className="font-medium text-gray-500">Due Amount</p>
          <h4 className="mt-2 text-2xl font-bold text-red-600 dark:text-red-400">
            $32,400.00
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
