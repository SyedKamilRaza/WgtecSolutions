import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Divider,
  Card,
  CardContent,
  Avatar,
  Chip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, Code, ExternalLink } from "lucide-react";
import CustomButton from "../../components/customButton";

const ViewWorkDialog = ({
  open,
  onClose,
  workData = null,
}) => {
  if (!workData) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
                  p: 1,
                  borderRadius: "20px 20px 0 0",
                  position: "relative",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    width={36}
                    height={36}
                    borderRadius={"8px"}
                    backgroundColor={"rgba(0,0,0,0.2)"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Eye size={20} color="#fff" />
                  </Box>
                  <Box>
                    <Typography variant="h6" color="#FFFFFF">
                      {workData.workCategory}
                    </Typography>
                    <Typography variant="body2" color="#B0B0B0">
                      View all projects in this category
                    </Typography>
                    {workData.categoryDescription && (
                      <Typography 
                        variant="body2" 
                        color="#B0B0B0" 
                        sx={{ mt: 1, fontStyle: "italic" }}
                      >
                        {workData.categoryDescription}
                      </Typography>
                    )}
                  </Box>
                </Box>

                <IconButton
                  onClick={onClose}
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

            <DialogContent sx={{ p: 4 }}>
              {/* Category Description */}
              {workData.categoryDescription && (
                <Box sx={{ my: 3 }}>
                  <Card
                    sx={{
                      backgroundColor: "#2A2A2A",
                      border: "1px solid #333333",
                      borderRadius: "12px",
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="body2" color="#B0B0B0" sx={{ mb: 1 }}>
                        Category Description:
                      </Typography>
                      <Typography variant="body1" color="#FFFFFF">
                        {workData.categoryDescription}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              )}

              {/* Projects Section */}
              <Box sx={{ my: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <Code size={20} color="#8CE600" />
                  <Typography variant="h6" color="#FFFFFF">
                    Projects & Works
                  </Typography>
                  <Chip
                    label={`${workData.works?.length || 0} projects`}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(140, 230, 0, 0.1)",
                      color: "#8CE600",
                      border: "1px solid rgba(140, 230, 0, 0.3)",
                    }}
                  />
                </Box>
              </Box>

              {/* Works List */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {workData.works?.map((work, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        backgroundColor: "#2A2A2A",
                        border: "1px solid #333333",
                        borderRadius: "16px",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: "#8CE600",
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 25px rgba(140, 230, 0, 0.1)",
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        {/* Work Images - Multiple */}
                        {(() => {
                          const images = Array.isArray(work.image) 
                            ? work.image 
                            : work.image 
                              ? [work.image] 
                              : [];
                          
                          if (images.length > 0) {
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 2,
                                  mb: 3,
                                }}
                              >
                                {images.map((imgUrl, imgIndex) => (
                                  <Box
                                    key={imgIndex}
                                    sx={{
                                      width: 100,
                                      height: 100,
                                      borderRadius: "12px",
                                      overflow: "hidden",
                                      border: "2px solid #333333",
                                      transition: "all 0.3s ease",
                                      "&:hover": {
                                        borderColor: "#8CE600",
                                        transform: "scale(1.05)",
                                      },
                                    }}
                                  >
                                    <Avatar
                                      src={imgUrl}
                                      alt={`${work.title} - Image ${imgIndex + 1}`}
                                      sx={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "10px",
                                      }}
                                    />
                                  </Box>
                                ))}
                              </Box>
                            );
                          }
                          return null;
                        })()}

                        <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
                          {/* Work Details */}
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                              <Typography
                                variant="h6"
                                color="#FFFFFF"
                                sx={{
                                  fontWeight: 600,
                                  background: "linear-gradient(135deg, #8CE600 0%, #00D4AA 100%)",
                                  backgroundClip: "text",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                }}
                              >
                                {work.title}
                              </Typography>
                              {work.url && (
                                <IconButton
                                  size="small"
                                  onClick={() => window.open(work.url, "_blank")}
                                  sx={{
                                    color: "#8CE600",
                                    "&:hover": {
                                      backgroundColor: "rgba(140, 230, 0, 0.1)",
                                    },
                                  }}
                                >
                                  <ExternalLink size={16} />
                                </IconButton>
                              )}
                            </Box>
                            <Typography
                              variant="body2"
                              color="#B0B0B0"
                              sx={{
                                lineHeight: 1.6,
                                fontSize: "14px",
                              }}
                            >
                              {work.description}
                            </Typography>
                            {work.url && (
                              <Typography
                                variant="caption"
                                color="#8CE600"
                                sx={{
                                  display: "block",
                                  mt: 1,
                                  fontSize: "12px",
                                  wordBreak: "break-all",
                                }}
                              >
                                {work.url}
                              </Typography>
                            )}
                            <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #333333" }}>
                              <Typography
                                variant="body2"
                                color="#8CE600"
                                sx={{ mb: 1, fontWeight: 600 }}
                              >
                                Purpose:
                              </Typography>
                              <Typography
                                variant="body2"
                                color="#FFFFFF"
                                sx={{
                                  lineHeight: 1.6,
                                  fontSize: "14px",
                                }}
                              >
                                {work.purpose || "N/A"}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {(!workData.works || workData.works.length === 0) && (
                  <Box
                    sx={{
                      textAlign: "center",
                      py: 6,
                      color: "#666666",
                    }}
                  >
                    <Code size={48} style={{ marginBottom: 16 }} />
                    <Typography variant="h6" color="#666666">
                      No projects available
                    </Typography>
                    <Typography variant="body2" color="#666666">
                      This category doesn't have any projects yet.
                    </Typography>
                  </Box>
                )}
              </Box>
            </DialogContent>

            {/* Dialog Actions */}
            <DialogActions sx={{ p: 4, pt: 0 }}>
              <Box
                display={"flex"}
                gap={2}
                width={"100%"}
                justifyContent={"flex-end"}
              >
                <CustomButton
                  variant="gradientbtn"
                  btnLabel="Close"
                  handlePressBtn={onClose}
                />
              </Box>
            </DialogActions>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default ViewWorkDialog;
