import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Avatar,
  Button,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image, Video } from "lucide-react";
import Slider from "react-slick";
import CustomButton from "../../components/customButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom styles for slick carousel
const customSlickStyles = `
  .slick-prev,
  .slick-next {
    z-index: 1;
    width: 40px;
    height: 40px;
  }
  
  .slick-prev:before,
  .slick-next:before {
    font-size: 24px;
    color: #8CE600;
  }
  
  .slick-prev {
    left: 10px;
  }
  
  .slick-next {
    right: 10px;
  }
  
  .slick-dots {
    bottom: -50px;
  }
  
  .slick-dots li button:before {
    font-size: 12px;
    color: #8CE600;
  }
  
  .slick-dots li.slick-active button:before {
    color: #8CE600;
  }
`;

const ViewImageAndVideoDialog = ({
  open,
  onClose,
  images = [],
  videos = [],
  title = "Media",
  }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleClose = () => {
    setActiveTab(0);
    onClose();
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    adaptiveHeight: true,
    customPaging: (i) => (
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: activeTab === 0 ? "#8CE600" : "#333333",
          margin: "0 4px",
        }}
      />
    ),
  };

  if ((!images || images.length === 0) && (!videos || videos.length === 0)) {
    return null;
  }

  return (
    <>
      <style>{customSlickStyles}</style>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#1A1A1A",
            borderRadius: "20px",
            border: "1px solid #333333",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          },
        }}
      >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Dialog Header */}
            <DialogTitle sx={{ p: 0 }}>
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg,rgb(49, 46, 46) 0%,rgb(45, 45, 45) 100%)",
                  p: 2,
                  borderRadius: "20px 20px 0 0",
                  position: "relative",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    width={40}
                    height={40}
                    borderRadius={"8px"}
                    backgroundColor={"rgba(0,0,0,0.2)"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Typography variant="h6" color="#fff">
                      {images.length + videos.length}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6">
                      {title} ({images.length + videos.length} media files)
                    </Typography>
                    <Typography variant="body2">
                      {images.length} Images • {videos.length} Videos
                    </Typography>
                  </Box>
                </Box>

                <IconButton
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    color: "#fff",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <X size={18} />
                </IconButton>
              </Box>
              <Divider />
            </DialogTitle>

            {/* Dialog Content */}
            <DialogContent sx={{ p: 0 }}>
              {/* Tabs */}
              <Box sx={{ borderBottom: 1, borderColor: "divider", px: 3, pt: 2 }}>
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  aria-label="media tabs"
                  sx={{
                    "& .MuiTab-root": {
                      color: "#B0B0B0",
                      textTransform: "none",
                      fontWeight: 600,
                      minHeight: 48,
                    },
                    "& .Mui-selected": {
                      color: "#8CE600",
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#8CE600",
                    },
                  }}
                >
                  <Tab
                    icon={<Image size={20} />}
                    label={`Images (${images.length})`}
                    iconPosition="start"
                    disabled={images.length === 0}
                  />
                  <Tab
                    icon={<Video size={20} />}
                    label={`Videos (${videos.length})`}
                    iconPosition="start"
                    disabled={videos.length === 0}
                  />
                </Tabs>
              </Box>

              {/* Content Area */}
              <Box sx={{ p: 3 }}>
                {/* Images Section */}
                {activeTab === 0 && images.length > 0 && (
                  <Box>
                    <Slider {...carouselSettings}>
                      {images.map((image, index) => (
                        <Box key={index} sx={{ textAlign: "center" }}>
                          <Avatar
                            src={image.url}
                            alt={`Image ${index + 1}`}
                            sx={{
                              width: "100%",
                              height: "60vh",
                              maxHeight: "500px",
                              borderRadius: "12px",
                              objectFit: "contain",
                              mx: "auto",
                            }}
                          />
                          <Typography
                            variant="body2"
                            color="#B0B0B0"
                            sx={{ mt: 2 }}
                          >
                            {image.name}
                          </Typography>
                        </Box>
                      ))}
                    </Slider>
                  </Box>
                )}

                {/* Videos Section */}
                {activeTab === 1 && videos.length > 0 && (
                  <Box>
                    <Slider {...carouselSettings}>
                      {videos.map((video, index) => (
                        <Box key={index} sx={{ textAlign: "center" }}>
                          <video
                            src={video.url}
                            controls
                            style={{
                              width: "100%",
                              height: "60vh",
                              maxHeight: "500px",
                              borderRadius: "12px",
                              objectFit: "contain",
                            }}
                          />
                          <Typography
                            variant="body2"
                            color="#B0B0B0"
                            sx={{ mt: 2 }}
                          >
                            {video.name}
                          </Typography>
                        </Box>
                      ))}
                    </Slider>
                  </Box>
                )}

                {/* Empty State */}
                {((activeTab === 0 && images.length === 0) || 
                  (activeTab === 1 && videos.length === 0)) && (
                  <Box
                    sx={{
                      textAlign: "center",
                      py: 8,
                      color: "#B0B0B0",
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      No {activeTab === 0 ? "Images" : "Videos"} Available
                    </Typography>
                    <Typography variant="body2">
                      {activeTab === 0 
                        ? "No images have been uploaded for this item."
                        : "No videos have been uploaded for this item."
                      }
                    </Typography>
                  </Box>
                )}
              </Box>
            </DialogContent>

            {/* Dialog Actions */}
            <Box sx={{ p: 3, pt: 0, textAlign: "center" }}>
              <CustomButton
                variant="gradientbtn"
                btnLabel="Close"
                handlePressBtn={handleClose}
              />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
      </Dialog>
    </>
  );
};

export default ViewImageAndVideoDialog;
