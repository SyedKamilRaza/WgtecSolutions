import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Edit, Trash2, Upload } from "lucide-react";
import { useSnackbar } from "notistack";
import TextInput from "../../components/textInput";
import CustomButton from "../../components/customButton";
import { uploadImage } from "../../utils/upload";

const AddEditOpportunitiesDialog = ({
  open,
  onClose,
  onSave,
  editData = null,
  isEdit = false,
  saving = false,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    oppurtunityName: "",
    oppurtunities: [{ image: "", title: "", description: "" }],
  });
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState({});

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      if (isEdit && editData) {
        setFormData({
          oppurtunityName: editData.name || "",
          oppurtunities:
            editData.opportunity && editData.opportunity.length > 0
              ? editData.opportunity
              : [{ image: "", title: "", description: "" }],
        });
      } else {
        setFormData({
          oppurtunityName: "",
          oppurtunities: [{ image: "", title: "", description: "" }],
        });
      }
      setErrors({});
      setUploading({});
    }
  }, [open, isEdit, editData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleOpportunityChange = (index, field, value) => {
    const newOpportunities = [...formData.oppurtunities];
    newOpportunities[index] = {
      ...newOpportunities[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      oppurtunities: newOpportunities,
    }));
  };

  const handleImageUpload = async (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploading((prev) => ({ ...prev, [index]: true }));
      const imageUrl = await uploadImage(file);
      handleOpportunityChange(index, "image", imageUrl);
      enqueueSnackbar("Image uploaded successfully", { variant: "success" });
      if (errors[`opp_${index}_image`]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[`opp_${index}_image`];
          return newErrors;
        });
      }
    } catch (error) {
      enqueueSnackbar(error.message || "Image upload failed", {
        variant: "error",
      });
      setErrors((prev) => ({
        ...prev,
        [`opp_${index}_image`]: error.message || "Upload failed",
      }));
    } finally {
      setUploading((prev) => ({ ...prev, [index]: false }));
    }
  };
  const addOpportunity = () => {
    setFormData((prev) => ({
      ...prev,
      oppurtunities: [
        ...prev.oppurtunities,
        { image: "", title: "", description: "" },
      ],
    }));
  };

  const removeOpportunity = (index) => {
    if (formData.oppurtunities.length > 1) {
      const newOpportunities = formData.oppurtunities.filter(
        (_, i) => i !== index
      );
      setFormData((prev) => ({
        ...prev,
        oppurtunities: newOpportunities,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.oppurtunityName.trim()) {
      newErrors.oppurtunityName = "Opportunity name is required";
    }

    // Validate opportunities array
    const hasValidOpportunity = formData.oppurtunities.some(
      (opp) => opp.title?.trim() && opp.description?.trim()
    );
    if (!hasValidOpportunity) {
      newErrors.oppurtunities = "At least one valid opportunity is required";
    }

    // Validate each opportunity
    formData.oppurtunities.forEach((opp, index) => {
      if (opp.title?.trim() && !opp.description?.trim()) {
        newErrors[`opp_${index}_description`] = "Description is required";
      }
      if (opp.description?.trim() && !opp.title?.trim()) {
        newErrors[`opp_${index}_title`] = "Title is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      // Filter out empty opportunities before saving
      const filteredOpportunities = formData.oppurtunities.filter(
        (opp) => opp.title?.trim() && opp.description?.trim()
      );
      const dataToSave = {
        ...formData,
        oppurtunities: filteredOpportunities,
      };
      // onSave is async and will handle dialog closing on success
      await onSave(dataToSave);
    }
  };

  const handleClose = () => {
    // Don't allow closing if saving is in progress
    if (saving) {
      return;
    }
    setFormData({
      oppurtunityName: "",
      oppurtunities: [{ image: "", title: "", description: "" }],
    });
    setErrors({});
    setUploading({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={saving ? undefined : handleClose}
      maxWidth="lg"
      fullWidth
      disableEscapeKeyDown={saving}
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
                    {isEdit ? (
                      <Edit size={20} color="#fff" />
                    ) : (
                      <Plus size={24} color="#fff" />
                    )}
                  </Box>
                  <Box>
                    <Typography variant="h6">
                      {isEdit ? "Edit Opportunity" : "Add New Opportunity"}
                    </Typography>
                    <Typography variant="body2">
                      {isEdit
                        ? "Update opportunity information"
                        : "Create a new opportunity category"}
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
            <DialogContent sx={{ p: 4 }}>
              <Box display={"flex"} flexDirection={"column"} gap={3} mt={2}>
                {/* Opportunity Name Field */}
                <Box>
                  <TextInput
                    placeholder="Enter opportunity name (e.g., Design Job Openings)"
                    value={formData.oppurtunityName}
                    onChange={(e) =>
                      handleInputChange("oppurtunityName", e.target.value)
                    }
                    error={errors.oppurtunityName}
                    helperText={errors.oppurtunityName}
                    showLabel="Opportunity Name *"
                    inputBgColor="#2A2A2A"
                  />
                </Box>

                {/* Opportunities Section */}
                <Box>
                  <Typography variant="body2" color="#FFFFFF" sx={{ mb: 2 }}>
                    Job Opportunities *
                  </Typography>

                  {formData.oppurtunities.map((opportunity, index) => (
                    <Box
                      key={index}
                      sx={{
                        border: "1px solid #333333",
                        borderRadius: "12px",
                        p: 3,
                        mb: 2,
                        backgroundColor: "#2A2A2A",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Typography variant="subtitle2" color="#FFFFFF">
                          Opportunity {index + 1}
                        </Typography>
                        {formData.oppurtunities.length > 1 && (
                          <Button
                            onClick={() => removeOpportunity(index)}
                            sx={{
                              minWidth: "auto",
                              p: 1,
                              color: "#ff4444",
                              "&:hover": {
                                backgroundColor: "rgba(255, 68, 68, 0.1)",
                              },
                            }}
                          >
                            <Trash2 size={20} />
                          </Button>
                        )}
                      </Box>

                      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        {/* Image Upload */}
                        <Box>
                          <Typography
                            variant="body2"
                            color="#FFFFFF"
                            sx={{ mb: 1 }}
                          >
                            Image
                          </Typography>
                          <label htmlFor={`image-upload-${index}`}>
                            <Box
                              width={80}
                              height={80}
                              borderRadius="12px"
                              border={"2px dashed #333333"}
                              display={"flex"}
                              alignItems={"center"}
                              justifyContent={"center"}
                              backgroundColor="#1A1A1A"
                              overflow={"hidden"}
                              position={"relative"}
                              sx={{ cursor: "pointer" }}
                            >
                              {uploading[index] ? (
                                <Box
                                  display={"flex"}
                                  flexDirection={"column"}
                                  alignItems={"center"}
                                  gap={1}
                                >
                                  <CircularProgress
                                    size={24}
                                    sx={{ color: "#8CE600" }}
                                  />
                                  <Typography
                                    variant="caption"
                                    color="#8CE600"
                                    fontSize="10px"
                                  >
                                    Uploading...
                                  </Typography>
                                </Box>
                              ) : opportunity.image ? (
                                <Avatar
                                  src={opportunity.image}
                                  alt="Opportunity Preview"
                                  sx={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "10px",
                                  }}
                                />
                              ) : (
                                <Box
                                  display={"flex"}
                                  flexDirection={"column"}
                                  alignItems={"center"}
                                  gap={1}
                                >
                                  <Upload size={20} color="#666666" />
                                  <Typography
                                    variant="caption"
                                    color="#666666"
                                    fontSize="10px"
                                  >
                                    Upload
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          </label>

                          <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id={`image-upload-${index}`}
                            type="file"
                            onChange={(e) => handleImageUpload(index, e)}
                          />
                        </Box>

                        {/* Title and Description */}
                        <Box sx={{ flex: 1 }}>
                          <TextInput
                            placeholder="Enter job title"
                            value={opportunity.title}
                            onChange={(e) =>
                              handleOpportunityChange(
                                index,
                                "title",
                                e.target.value
                              )
                            }
                            error={errors[`opp_${index}_title`]}
                            helperText={errors[`opp_${index}_title`]}
                            showLabel="Job Title *"
                            inputBgColor="#1A1A1A"
                            sx={{ mb: 2 }}
                          />

                          <TextInput
                            placeholder="Enter job description"
                            value={opportunity.description || ""}
                            onChange={(e) =>
                              handleOpportunityChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            error={errors[`opp_${index}_description`]}
                            helperText={errors[`opp_${index}_description`]}
                            showLabel="Job Description *"
                            multiline={true}
                            rows={3}
                            inputBgColor="#1A1A1A"
                          />
                        </Box>
                      </Box>
                    </Box>
                  ))}

                  <Button
                    onClick={addOpportunity}
                    startIcon={<Plus size={16} />}
                    sx={{
                      color: "#8CE600",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "rgba(140, 230, 0, 0.1)",
                      },
                    }}
                  >
                    Add Another Opportunity
                  </Button>

                  {errors.oppurtunities && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mt: 1, display: "block" }}
                    >
                      {errors.oppurtunities}
                    </Typography>
                  )}
                </Box>
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
                  btnLabel="Cancel"
                  handlePressBtn={handleClose}
                  disabled={saving}
                />

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CustomButton
                    variant="gradientbtn"
                    btnLabel={isEdit ? "Update Opportunity" : "Add Opportunity"}
                    handlePressBtn={handleSave}
                    loading={saving}
                    disabled={saving}
                  />
                </motion.div>
              </Box>
            </DialogActions>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default AddEditOpportunitiesDialog;
