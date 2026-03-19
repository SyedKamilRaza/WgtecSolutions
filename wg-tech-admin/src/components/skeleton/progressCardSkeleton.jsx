import React from "react";
import { Box, Card, Skeleton } from "@mui/material";

const ProgressCardSkeleton = () => {
  return (
    <Card
      sx={{
        backgroundColor: "#1A1A1A",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #333333",
      }}
    >
      {/* Header Skeleton */}
      <Box
        sx={{
          p: 3,
          backgroundColor: "#2A2A2A",
          borderBottom: "1px solid #333333",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ flex: 1 }}>
          {/* Date Chip Skeleton */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Skeleton
              variant="circular"
              width={18}
              height={18}
              sx={{ bgcolor: "#333333" }}
            />
            <Skeleton
              variant="rectangular"
              width={150}
              height={24}
              sx={{ bgcolor: "#333333", borderRadius: "12px" }}
            />
          </Box>

          {/* Title Skeleton */}
          <Skeleton
            variant="text"
            width="60%"
            height={32}
            sx={{ bgcolor: "#333333", mb: 0.5 }}
          />

          {/* Proposal Info Skeleton */}
          <Skeleton
            variant="text"
            width="40%"
            height={20}
            sx={{ bgcolor: "#333333" }}
          />
        </Box>

        {/* Eye Icon Button Skeleton */}
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ bgcolor: "#333333", ml: 2 }}
        />
      </Box>

      {/* Image Carousel Skeleton */}
      <Box sx={{ backgroundColor: "#2A2A2A", p: 7 }}>
        <Skeleton
          variant="rectangular"
          height={300}
          sx={{
            bgcolor: "#333333",
            borderRadius: "12px",
            border: "2px solid rgb(150, 147, 147)",
          }}
        />

        {/* Carousel Dots Skeleton */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            mt: 2,
          }}
        >
          {[1, 2, 3].map((dot) => (
            <Skeleton
              key={dot}
              variant="circular"
              width={10}
              height={10}
              sx={{ bgcolor: "#333333" }}
            />
          ))}
        </Box>
      </Box>

      {/* Description Skeleton */}
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          {/* Avatar Skeleton */}
          <Skeleton
            variant="circular"
            width={32}
            height={32}
            sx={{ bgcolor: "#333333", mt: 0.5 }}
          />

          {/* Text Lines Skeleton */}
          <Box sx={{ flex: 1 }}>
            <Skeleton
              variant="text"
              width="100%"
              height={20}
              sx={{ bgcolor: "#333333", mb: 1 }}
            />
            <Skeleton
              variant="text"
              width="95%"
              height={20}
              sx={{ bgcolor: "#333333", mb: 1 }}
            />
            <Skeleton
              variant="text"
              width="85%"
              height={20}
              sx={{ bgcolor: "#333333", mb: 1 }}
            />
            <Skeleton
              variant="text"
              width="75%"
              height={20}
              sx={{ bgcolor: "#333333" }}
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ProgressCardSkeleton;