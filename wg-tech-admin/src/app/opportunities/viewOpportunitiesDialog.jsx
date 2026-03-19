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
  Chip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, Briefcase } from "lucide-react";
import CustomButton from "../../components/customButton";

const ViewOpportunitiesDialog = ({
  open,
  onClose,
  opportunityData = null,
}) => {
  if (!opportunityData) return null;

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
                      {opportunityData.name || "Opportunity"}
                    </Typography>
                    <Typography variant="body2" color="#B0B0B0">
                      View all job opportunities in this category
                    </Typography>
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

            {/* Dialog Content */}
            <DialogContent sx={{ p: 4 }}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <Briefcase size={20} color="#8CE600" />
                  <Typography variant="h6" color="#FFFFFF">
                    Available Positions
                  </Typography>
                  <Chip
                    label={`${opportunityData.opportunity?.length || 0} positions`}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(140, 230, 0, 0.1)",
                      color: "#8CE600",
                      border: "1px solid rgba(140, 230, 0, 0.3)",
                    }}
                  />
                </Box>
              </Box>

              {/* Opportunities List */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {opportunityData.opportunity?.map((opportunity, index) => (
                  <motion.div
                    key={opportunity._id || `opp-${index}`}
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
                        <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
                          {/* Job Image */}
                          <Box
                            sx={{
                              width: 80,
                              height: 80,
                              borderRadius: "12px",
                              overflow: "hidden",
                              flexShrink: 0,
                              border: "2px solid #333333",
                            }}
                          >
                            {opportunity.image ? (
                              <Box
                                component="img"
                                src={opportunity.image}
                                alt={opportunity.title || "Opportunity"}
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: "10px",
                                }}
                              />
                            ) : (
                              <Box
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  backgroundColor: "#1A1A1A",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Briefcase size={32} color="#666666" />
                              </Box>
                            )}
                          </Box>

                          {/* Job Details */}
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              color="#FFFFFF"
                              sx={{
                                fontWeight: 600,
                                mb: 1,
                                background: "linear-gradient(135deg, #8CE600 0%, #00D4AA 100%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                              }}
                            >
                              {opportunity.title || "Untitled Opportunity"}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="#B0B0B0"
                              sx={{
                                lineHeight: 1.6,
                                fontSize: "14px",
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                              }}
                            >
                              {opportunity.description || "No description available"}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {(!opportunityData.opportunity || opportunityData.opportunity.length === 0) && (
                  <Box
                    sx={{
                      textAlign: "center",
                      py: 6,
                      color: "#666666",
                    }}
                  >
                    <Briefcase size={48} style={{ marginBottom: 16 }} />
                    <Typography variant="h6" color="#666666">
                      No opportunities available
                    </Typography>
                    <Typography variant="body2" color="#666666">
                      This category doesn't have any job opportunities yet.
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

export default ViewOpportunitiesDialog;