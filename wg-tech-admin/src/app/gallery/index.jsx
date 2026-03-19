import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, Paper } from "@mui/material";
import Blog from "./blog";
import Article from "./article";
import Event from "./event";
import UpcommingEvent from "./upcommingEvent";
import Product from "./product";

const Gallery = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            color: "#FFFFFF",
            fontWeight: 700,
            mb: 1,
            background: "linear-gradient(135deg, #8CE600 0%, #00D4AA 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Gallery Management
        </Typography>
        <Typography variant="body1" sx={{ color: "#B0B0B0", fontSize: "16px" }}>
          Manage blog posts, articles, events, upcoming events, and products
        </Typography>
      </Box>

      {/* Tabs Container */}
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#1A1A1A",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #333333",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              "& .MuiTab-root": {
                color: "#B0B0B0",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 500,
                minHeight: 60,
                "&.Mui-selected": {
                  color: "#8CE600",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#8CE600",
                height: 3,
              },
            }}
          >
            <Tab label="Blog" />
            <Tab label="Article" />
            <Tab label="Archived Event" />
            <Tab label="Upcoming Event" />
            <Tab label="Product" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ p: 0 }}>
          {activeTab === 0 && <Blog />}
          {activeTab === 1 && <Article />}
          {activeTab === 2 && <Event />}
          {activeTab === 3 && <UpcommingEvent />}
          {activeTab === 4 && <Product />}
        </Box>
      </Paper>
    </Box>
  );
};

export default Gallery;
