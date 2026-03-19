import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Avatar,
  Stack,
} from "@mui/material";
import { ArrowLeft, Calendar, FileText } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ImageDialog from "../../components/imageDialog";

const decodeHtml = (encoded) => {
  if (!encoded) return "";
  const txt = document.createElement("textarea");
  txt.innerHTML = encoded;
  return txt.value;
};

const ViewDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const stateItem = location.state?.item || null;
  const proposalDetails = location.state?.proposalDetails || null;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  const currentItem = stateItem;

  if (!currentItem) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h4" sx={{ color: "#FFFFFF" }}>
          Project not found
        </Typography>
        <IconButton
          onClick={() => navigate("/projects-progress")}
          sx={{ mt: 2, color: "#8CE600" }}
        >
          <ArrowLeft size={24} />
        </IconButton>
      </Box>
    );
  }

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsImageDialogOpen(true);
  };

  const handleCloseImageDialog = () => {
    setIsImageDialogOpen(false);
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? currentItem.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === currentItem.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Back Button */}
      <Box sx={{ mb: 3 }}>
        <IconButton
          onClick={() => navigate("/projects-progress")}
          sx={{
            color: "#8CE600",
            "&:hover": { backgroundColor: "rgba(140, 230, 0, 0.1)" },
          }}
        >
          <ArrowLeft size={24} />
        </IconButton>
      </Box>

      {/* Main Content */}
      <Paper
        sx={{
          backgroundColor: "#1A1A1A",
          borderRadius: "16px",
          border: "1px solid #333333",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 4,
            backgroundColor: "#2A2A2A",
            borderBottom: "1px solid #333333",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Calendar size={20} color="#8CE600" />
            <Typography
              variant="h6"
              sx={{ color: "#8CE600", fontWeight: 600, fontSize: "1.1rem" }}
            >
              {new Date(currentItem.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{ color: "#FFFFFF", fontWeight: 700, mb: 2, fontSize: "2rem" }}
          >
            {currentItem.title}
          </Typography>

          {currentItem.proposalId && proposalDetails && (
            <Typography
              variant="h6"
              sx={{ color: "#8CE600", fontSize: "1.2rem", fontWeight: 500 }}
            >
              Proposal #{currentItem.proposalId} - {proposalDetails.fullname} (
              {proposalDetails.company})
            </Typography>
          )}
        </Box>

        {/* Description */}

        {/* Image Gallery */}
        <Box sx={{ p: 4, backgroundColor: "#2A2A2A" }}>
          <Typography
            variant="h6"
            sx={{ color: "#FFFFFF", fontWeight: 600, mb: 3 }}
          >
            Project Images ({currentItem.images.length})
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 2,
            }}
          >
            {currentItem.images.map((image, index) => (
              <Box
                key={index}
                onClick={() => handleImageClick(index)}
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "2px solid #333333",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    borderColor: "#8CE600",
                    boxShadow: "0 8px 25px rgba(140, 230, 0, 0.15)",
                  },
                }}
              >
                <img
                  src={image}
                  alt={`${currentItem.title} - Image ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ p: 4 }}>
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <Avatar sx={{ backgroundColor: "#8CE600", width: 40, height: 40 }}>
              <FileText size={20} color="#000" />
            </Avatar>
            <Box
              sx={{
                color: "#B0B0B0",
                lineHeight: 1.8,
                fontSize: "16px",
                textAlign: "justify",
                flex: 1,
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
              }}
              dangerouslySetInnerHTML={{
                __html: decodeHtml(currentItem.description || ""),
              }}
            />
          </Stack>
        </Box>
      </Paper>

      {/* Full Screen Image Dialog */}
      <ImageDialog
        open={isImageDialogOpen}
        onClose={handleCloseImageDialog}
        images={currentItem.images}
        currentIndex={selectedImageIndex}
        onPrevious={handlePreviousImage}
        onNext={handleNextImage}
      />
    </Box>
  );
};

export default ViewDetails;
