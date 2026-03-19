import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  CandlestickController,
  CandlestickElement
);

// Theme colors
const themeColors = {
  primary: "#8CE600",
  primaryLight: "#9DFF00",
  primaryDark: "#6BB314",
  secondary: "#00D4AA",
  background: "#1A1A1A",
  backgroundDark: "#0D0D0D",
  text: "#FFFFFF",
  textSecondary: "#B0B0B0",
  textDisabled: "#666666",
  card: "#2A2A2A",
  border: "#333333",
};

const ContactEmailsChart = ({ data = null }) => {
  const [timeRange, setTimeRange] = useState("1 Week");

  // Default data if none provided
  const defaultData = [
    { date: "2025-09-01", count: 5 },
    { date: "2025-09-02", count: 3 },
    { date: "2025-09-03", count: 8 },
    { date: "2025-09-04", count: 2 },
    { date: "2025-09-05", count: 6 },
    { date: "2025-09-06", count: 10 },
    { date: "2025-09-07", count: 4 },
  ];

  const chartData = data || defaultData;

  // Chart labels me date ko format karna
  const chartConfig = {
    labels: chartData.map((item) =>
      new Date(item.date).toLocaleDateString("en-US", {
        month: "short", // Sep
        day: "2-digit", // 01
      })
    ),
    datasets: [
      {
        label: "Contact Emails",
        data: chartData.map((item) => item.count),
        borderColor: themeColors.primary,
        backgroundColor: `rgba(140, 230, 0, 0.1)`,
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: themeColors.primary,
        pointBorderColor: themeColors.text,
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: themeColors.primaryLight,
        pointHoverBorderColor: themeColors.text,
        pointHoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: `rgba(26, 26, 26, 0.95)`,
        titleColor: themeColors.text,
        bodyColor: themeColors.text,
        borderColor: themeColors.primary,
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: false,
        titleFont: { family: "Poppins", size: 14, weight: 600 },
        bodyFont: { family: "Poppins", size: 13 },
        callbacks: {
          label: function (context) {
            return `${context.parsed.y} emails`;
          },
        },
      },
    },
    scales: {
      x: {
        border: { display: false },
        grid: { display: false },
        ticks: {
          color: themeColors.textSecondary,
          font: { family: "Poppins", size: 12, weight: 500 },
        },
      },
      y: {
        border: { display: false },
        grid: {
          color: `rgba(176, 176, 176, 0.1)`,
          drawBorder: false,
          lineWidth: 1,
        },
        ticks: {
          color: themeColors.textSecondary,
          font: { family: "Poppins", size: 12, weight: 500 },
          callback: function (value) {
            return value + " emails";
          },
        },
      },
    },
    interaction: { intersect: false, mode: "index" },
    elements: {
      point: {
        hoverBackgroundColor: themeColors.primaryLight,
        hoverBorderColor: themeColors.text,
        hoverBorderWidth: 3,
      },
    },
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        backgroundColor: themeColors.card,
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <h3
          style={{
            fontFamily: "Poppins",
            color: themeColors.text,
            fontWeight: 600,
            fontSize: "20px",
            margin: 0,
          }}
        >
          Contact Emails Overview
        </h3>

        {/* <div style={{ position: "relative" }}>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            style={{
              backgroundColor: themeColors.backgroundDark,
              color: themeColors.text,
              padding: "8px 16px",
              paddingRight: "32px",
              borderRadius: "8px",
              border: `1px solid ${themeColors.border}`,
              fontSize: "14px",
              fontFamily: "Poppins",
              appearance: "none",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option>1 Week</option>
            <option>1 Month</option>
            <option>3 Months</option>
            <option>6 Months</option>
            <option>1 Year</option>
          </select>
        </div> */}
      </div>

      {/* Chart */}
      <div style={{ height: "300px" }}>
        <Line data={chartConfig} options={options} />
      </div>
    </motion.div>
  );
};

// Candlestick Chart Component
const CandlestickChart = ({ data = null }) => {
  const [timeRange, setTimeRange] = useState("1 Week");

  // Generate realistic candlestick data for email contacts
  const generateCandlestickData = () => {
    const data = [];
    let baseCount = 5;
    const labels = [];

    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - 30 + i);
      
      // Generate OHLC data for email contact counts
      const open = Math.max(0, baseCount + (Math.random() - 0.5) * 4);
      const close = Math.max(0, open + (Math.random() - 0.5) * 6);
      const high = Math.max(open, close) + Math.random() * 3;
      const low = Math.max(0, Math.min(open, close) - Math.random() * 2);
      
      data.push({
        x: i,
        o: Math.round(open),
        h: Math.round(high),
        l: Math.round(low),
        c: Math.round(close)
      });
      
      labels.push(date.toLocaleDateString("en-US", { month: "short", day: "2-digit" }));
      baseCount = close; // Next day starts from previous close
    }
    
    return { data, labels };
  };

  const { data: candlestickData, labels: chartLabels } = data || generateCandlestickData();

  const chartConfig = {
    labels: chartLabels,
    datasets: [
      {
        label: "Price",
        data: candlestickData,
        type: "candlestick",
        upColor: "#004225", // Very dark green for bullish candles
        downColor: "#660000", // Very dark red for bearish candles
        borderColor: "#333333", // Border color for all candles
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: `rgba(26, 26, 26, 0.95)`,
        titleColor: themeColors.text,
        bodyColor: themeColors.text,
        borderColor: themeColors.primary,
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: false,
        titleFont: { family: "Poppins", size: 14, weight: 600 },
        bodyFont: { family: "Poppins", size: 13 },
        callbacks: {
          label: function (context) {
            const data = context.parsed;
            return [
              `Open: ${data.o} emails`,
              `High: ${data.h} emails`,
              `Low: ${data.l} emails`,
              `Close: ${data.c} emails`
            ];
          },
        },
      },
    },
    scales: {
      x: {
        type: "category",
        border: { display: false },
        grid: { 
          display: true,
          color: `rgba(176, 176, 176, 0.1)`,
          drawBorder: false,
          lineWidth: 1,
        },
        ticks: {
          color: themeColors.textSecondary,
          font: { family: "Poppins", size: 12, weight: 500 },
          maxTicksLimit: 8,
        },
      },
      y: {
        border: { display: false },
        grid: {
          color: `rgba(176, 176, 176, 0.1)`,
          drawBorder: false,
          lineWidth: 1,
        },
        ticks: {
          color: themeColors.textSecondary,
          font: { family: "Poppins", size: 12, weight: 500 },
          callback: function (value) {
            return value + " emails";
          },
        },
      },
    },
    interaction: { intersect: false, mode: "index" },
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        backgroundColor: "rgba(18, 18, 18, 0.87)",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(10, 10, 10, 0.3)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <h3
          style={{
            fontFamily: "Poppins",
            color: themeColors.text,
            fontWeight: 600,
            fontSize: "20px",
            margin: 0,
          }}
        >
          Email Contacts Chart
        </h3>

        {/* <div style={{ position: "relative" }}>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            style={{
              backgroundColor: themeColors.backgroundDark,
              color: themeColors.text,
              padding: "8px 16px",
              paddingRight: "32px",
              borderRadius: "8px",
              border: `1px solid ${themeColors.border}`,
              fontSize: "14px",
              fontFamily: "Poppins",
              appearance: "none",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option>1 Week</option>
            <option>1 Month</option>
            <option>3 Months</option>
            <option>6 Months</option>
            <option>1 Year</option>
          </select>
        </div> */}
      </div>

      {/* Chart */}
      <div style={{ height: "400px" }}>
        <Chart type="candlestick" data={chartConfig} options={options} />
      </div>
    </motion.div>
  );
};

export { ContactEmailsChart, CandlestickChart };
export { default as DynamicLineChart } from "./lineCharts";
export default ContactEmailsChart;
