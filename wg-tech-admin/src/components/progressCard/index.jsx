import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  IconButton,
} from "@mui/material";
import { Calendar, FileText, Eye } from "lucide-react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const decodeHtml = (encoded) => {
  if (!encoded) return "";
  const txt = document.createElement("textarea");
  txt.innerHTML = encoded;
  return txt.value;
};

const ProgressCard = ({ item, getProposalDetails }) => {

  console.log(item, "item");
  console.log(getProposalDetails, "getProposalDetails");
  const navigate = useNavigate();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    adaptiveHeight: true,
  };

  const handleViewDetails = () => {
    navigate(`/view-project-progress/${item.id}`, {
      state: {
        item,
      },
    });
  };

  return (
    <Card
      sx={{
        backgroundColor: "#1A1A1A",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #333333",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 25px rgba(140, 230, 0, 0.15)",
          borderColor: "#8CE600",
        },
      }}
    >
      {/* Header with Date, Title and View Details Button */}
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
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
          >
            <Calendar size={18} color="#8CE600" />
            <Chip
              label={new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              sx={{
                backgroundColor: "#333333",
                color: "#8CE600",
                fontWeight: 500,
                fontSize: "12px",
              }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: "1.3rem",
              mb: 0.5,
            }}
          >
            {item.title}
          </Typography>
          {item.proposalId && getProposalDetails(item.proposalId) && (
            <Typography
              variant="body2"
              sx={{
                color: "#8CE600",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              Proposal #{item.proposalId} - {getProposalDetails(item.proposalId).fullname}
            </Typography>
          )}
        </Box>
        
        {/* Eye Icon Button */}
        <IconButton
          onClick={handleViewDetails}
          sx={{
            backgroundColor: "#8CE600",
            color: "#000",
            ml: 2,
            "&:hover": {
              backgroundColor: "#7DD600",
              transform: "scale(1.05)",
            },
            transition: "all 0.2s ease",
          }}
        >
          <Eye size={20} />
        </IconButton>
      </Box>

      {/* Image Carousel */}
      <Box sx={{ backgroundColor: "#2A2A2A", p: 7 }}>
        <Slider {...sliderSettings}>
          {item.images.map((image, index) => (
            <Box key={index} sx={{ px: 1 }}>
              <CardMedia
                component="img"
                image={image}
                alt={`${item.title} - Image ${index + 1}`}
                sx={{
                  height: 300,
                  borderRadius: "12px",
                  objectFit: "cover",
                  border: "2px solid rgb(150, 147, 147)",
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Description (HTML) */}
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          <Avatar
            sx={{
              backgroundColor: "#8CE600",
              width: 32,
              height: 32,
              mt: 0.5,
            }}
          >
            <FileText size={18} color="#000" />
          </Avatar>
          <Box
            sx={{
              color: "#B0B0B0",
              lineHeight: 1.6,
              fontSize: "14px",
              textAlign: "justify",
              "& p": {
                margin: 0,
                marginBottom: "8px",
              },
              "& p:last-child": {
                marginBottom: 0,
              },
              "& strong": {
                color: "#FFFFFF",
                fontWeight: 600,
              },
              "& em": {
                fontStyle: "italic",
              },
              "& ul, & ol": {
                paddingLeft: "20px",
                marginBottom: "8px",
              },
              "& li": {
                marginBottom: "4px",
              },
              "& h2": {
                        margin:0,
                        padding:0
                      },
              maxHeight: 120,
              overflow: "hidden",
            }}
            dangerouslySetInnerHTML={{
              __html: decodeHtml(item.description || ""),
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
