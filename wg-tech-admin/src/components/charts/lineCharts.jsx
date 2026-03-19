import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";
import { motion } from "framer-motion";

// Theme colors (project ke theme se match karta hai)
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

/**
 * Dynamic Line Chart Component using amCharts5
 * @param {Object} props
 * @param {Array} props.data - Chart data array [{date: "2025-01-01", value: 100, budget: 5000}, ...]
 * @param {string} props.title - Chart title
 * @param {string} props.seriesName - Series name for legend (single series ke liye)
 * @param {Array} props.series - Multiple series configuration [{name: "Proposals", field: "value", color: "#8CE600"}, ...]
 * @param {string} props.height - Chart height (default: "400px")
 * @param {string} props.valueField - Value field name in data (default: "value") - single series ke liye
 * @param {string} props.categoryField - Category field name in data (default: "date")
 * @param {string} props.valueLabel - Label for Y-axis (default: "Value")
 * @param {boolean} props.showBudget - Budget line show karna hai ya nahi (default: false)
 */
const DynamicLineChart = ({
  data = null,
  title = "Line Chart",
  seriesName = "Data Series",
  series = null,
  height = "400px",
  valueField = "value",
  categoryField = "date",
  valueLabel = "Value",
  showBudget = false,
}) => {
  const chartRef = useRef(null);
  const rootRef = useRef(null);

  // Default data agar koi data nahi diya gaya
  const defaultData = [
    { date: "2025-01-01", value: 45, budget: 4500 },
    { date: "2025-01-02", value: 52, budget: 5200 },
    { date: "2025-01-03", value: 38, budget: 3800 },
    { date: "2025-01-04", value: 61, budget: 6100 },
    { date: "2025-01-05", value: 55, budget: 5500 },
    { date: "2025-01-06", value: 48, budget: 4800 },
    { date: "2025-01-07", value: 67, budget: 6700 },
    { date: "2025-01-08", value: 42, budget: 4200 },
    { date: "2025-01-09", value: 58, budget: 5800 },
    { date: "2025-01-10", value: 63, budget: 6300 },
  ];

  const chartData = data || defaultData;

  // Series configuration - agar series prop diya gaya hai to use karo, warna default series create karo
  const seriesConfig = series || [
    {
      name: seriesName,
      field: valueField,
      color: themeColors.primary,
      fillColor: themeColors.primary,
    },
    ...(showBudget && chartData[0]?.budget !== undefined
      ? [
          {
            name: "Budget",
            field: "budget",
            color: themeColors.secondary,
            fillColor: themeColors.secondary,
          },
        ]
      : []),
  ];

  useEffect(() => {
    // Root element create karo
    rootRef.current = am5.Root.new(chartRef.current);

    // Dark theme apply karo
    rootRef.current.setThemes([am5themes_Dark.new(rootRef.current)]);

    // Chart create karo
    const chart = rootRef.current.container.children.push(
      am5xy.XYChart.new(rootRef.current, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        layout: rootRef.current.verticalLayout,
      })
    );

    // X-axis aur Y-axis create karo (pehle se hi)
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(rootRef.current, {
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(rootRef.current, {
          cellStartLocation: 0.1,
          cellEndLocation: 0.9,
        }),
        dateFormats: {
          day: "MMM dd",
          week: "MMM dd",
          month: "MMM",
          year: "yyyy",
        },
      })
    );

    // Y-axis create karo (pehli series ke liye)
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(rootRef.current, {
        renderer: am5xy.AxisRendererY.new(rootRef.current, {}),
      })
    );

    // Budget ke liye alag Y-axis (right side pe) - agar budget show karna hai
    let yAxisRight = null;
    if (showBudget && chartData[0]?.budget !== undefined) {
      yAxisRight = chart.yAxes.push(
        am5xy.ValueAxis.new(rootRef.current, {
          renderer: am5xy.AxisRendererY.new(rootRef.current, {
            opposite: true, // Right side pe show karo
          }),
        })
      );
    }

    // Data parse karo (date string ko Date object me convert)
    const parsedData = chartData.map((item) => ({
      ...item,
      [categoryField]: new Date(item[categoryField]).getTime(),
    }));

    const root = rootRef.current;
    const allSeries = [];

    // Har series ke liye line series create karo
    seriesConfig.forEach((seriesItem, index) => {
      const lineSeries = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: seriesItem.name,
          xAxis: xAxis,
          yAxis: seriesItem.field === "budget" && yAxisRight ? yAxisRight : yAxis,
          valueYField: seriesItem.field,
          valueXField: categoryField,
          tooltip: am5.Tooltip.new(root, {
            labelText: `${seriesItem.name}: {valueY}`,
            pointerOrientation: "horizontal",
          }),
        })
      );

      lineSeries.data.setAll(parsedData);

      // Line styling - har series ka apna color
      lineSeries.strokes.template.setAll({
        stroke: am5.color(seriesItem.color),
        strokeWidth: 3,
      });

      lineSeries.fills.template.setAll({
        fill: am5.color(seriesItem.fillColor),
        fillOpacity: 0.2,
        visible: true,
      });

      // Bullets (points) add karo
      lineSeries.bullets.push(() => {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 6,
            fill: am5.color(seriesItem.color),
            stroke: am5.color(themeColors.text),
            strokeWidth: 2,
          }),
        });
      });

      // Hover effect
      lineSeries.bullets.push(() => {
        const circle = am5.Circle.new(root, {
          radius: 8,
          fill: am5.color(seriesItem.color),
          stroke: am5.color(themeColors.text),
          strokeWidth: 3,
        });
        return am5.Bullet.new(root, {
          sprite: circle,
          locationY: 0.5,
        });
      });

      allSeries.push(lineSeries);
    });

    // Legend add karo
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 20,
        marginBottom: 20,
      })
    );

    // Sabhi series ko legend mein add karo
    allSeries.forEach((s) => {
      legend.data.push(s);
    });

    // Chart colors dark theme ke liye adjust karo
    chart.get("colors").set("colors", [
      am5.color(themeColors.primary),
      am5.color(themeColors.secondary),
      am5.color(themeColors.primaryLight),
    ]);

    // X-axis labels styling
    chart.xAxes.getIndex(0).get("renderer").labels.template.setAll({
      fill: am5.color(themeColors.textSecondary),
      fontSize: 12,
      fontFamily: "Poppins",
    });

    // Y-axis labels styling (left axis)
    yAxis.get("renderer").labels.template.setAll({
      fill: am5.color(themeColors.textSecondary),
      fontSize: 12,
      fontFamily: "Poppins",
    });

    // Y-axis right labels styling (budget ke liye agar hai)
    if (yAxisRight) {
      yAxisRight.get("renderer").labels.template.setAll({
        fill: am5.color(themeColors.secondary),
        fontSize: 12,
        fontFamily: "Poppins",
      });
    }

    // Grid lines styling
    yAxis.get("renderer").grid.template.setAll({
      stroke: am5.color(themeColors.border),
      strokeOpacity: 0.1,
    });

    if (yAxisRight) {
      yAxisRight.get("renderer").grid.template.setAll({
        stroke: am5.color(themeColors.border),
        strokeOpacity: 0.05,
      });
    }

    xAxis.get("renderer").grid.template.setAll({
      stroke: am5.color(themeColors.border),
      strokeOpacity: 0.1,
    });

    // Cursor add karo for better interaction
    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomX",
        xAxis: xAxis,
      })
    );

    // Scrollbar add karo
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
        marginBottom: 20,
      })
    );

    // Cleanup function
    return () => {
      rootRef.current.dispose();
    };
  }, [chartData, seriesConfig, categoryField, showBudget]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        backgroundColor: "#000",
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
          {title}
        </h3>
      </div>

      {/* Chart Container */}
      <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "400px",
          borderRadius: "8px",
        }}
      />
    </motion.div>
  );
};

export default DynamicLineChart;

