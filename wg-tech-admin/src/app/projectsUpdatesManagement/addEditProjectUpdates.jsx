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
  Grid,
  Button,
  Avatar,
  MenuItem,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, FileText, Image as ImageIcon } from "lucide-react";
import CustomButton from "../../components/customButton";
import TextInput from "../../components/textInput";
import TextEditor from "../../components/textEditor";
import CustomSelect from "../../components/customSelect";
import { uploadImage } from "../../utils/upload";

const AddEditProjectUpdatesDialog = ({
  open,
  onClose,
  onSave,
  editData = null,
  isEdit = false,
  proposals = [], // <-- use parent data directly
  isLoading = false,
}) => {

  console.log(proposals, "proposals");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
    proposalId: "",
  });

  const [errors, setErrors] = useState({});
  const [uploadingImages, setUploadingImages] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");


  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  
  // Initialize form data when editData changes
  useEffect(() => {
    if (isEdit && editData) {
      setFormData({
        title: editData.title || "",
        description: decodeHTML(editData.description) || "",
        images: editData.images || [],
        proposalId: editData.proposalId._id || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        images: [],
        proposalId: "",
      });
    }
    setErrors({});
  }, [editData, isEdit, open]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    try {
      setUploadingImages(true);
      setImageUploadError("");

      // Upload multiple images using shared upload utility
      const uploadedUrls = await uploadImage(files);

      setFormData((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          ...(Array.isArray(uploadedUrls) ? uploadedUrls : [uploadedUrls]),
        ],
      }));
    } catch (error) {
      setImageUploadError(error.message || "Image upload failed");
    } finally {
      setUploadingImages(false);
      // reset input so same files can be selected again if needed
      if (event.target) {
        event.target.value = "";
      }
    }
  };


  
  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    // Strip HTML tags for validation
    const descriptionText = formData.description.replace(/<[^>]*>/g, "").trim();
    if (!descriptionText) {
      newErrors.description = "Description is required";
    }

    if (!formData.proposalId) {
      newErrors.proposalId = "Proposal selection is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      images: [],
      proposalId: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "#1A1A1A",
          color: "#FFFFFF",
          borderRadius: "20px",
          border: "1px solid #333333",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {/* Dialog Header */}
        <DialogTitle
          sx={{
            color: "#FFFFFF",
            borderBottom: "1px solid #333333",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
            background: "linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 100%)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                backgroundColor: "#8CE600",
                width: 40,
                height: 40,
              }}
            >
              <FileText size={20} color="#000" />
            </Avatar>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #8CE600 0%, #00D4AA 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {isEdit ? "Edit Project Update" : "Add New Project Update"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#B0B0B0", mt: 0.5 }}>
                {isEdit
                  ? "Update the project milestone details"
                  : "Create a new project milestone"}
              </Typography>
            </Box>
          </Box>

          <IconButton
            onClick={handleClose}
            sx={{
              color: "#B0B0B0",
              backgroundColor: "#333333",
              "&:hover": {
                backgroundColor: "#444444",
                color: "#FFFFFF",
              },
            }}
          >
            <X size={20} />
          </IconButton>
        </DialogTitle>

        {/* Dialog Content */}
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={3} mt={2}>
            {/* Title Field */}
            <Grid item size={{ xs: 12 }}>
              <TextInput
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                error={errors.title}
                helperText={errors.title}
                placeholder="Enter a descriptive title for this update"
                showLabel="Update Title *"
              />
            </Grid>

            {/* Proposals Selection Field */}
            <Grid item size={{ xs: 12 }}>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body2"
                  color="#FFFFFF"
                  sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
                >
                  Proposal *
                </Typography>
              </Box>
              <CustomSelect
                value={formData.proposalId}
                onChange={(e) =>
                  handleInputChange("proposalId", e.target.value)
                }
                error={errors.proposalId}
                height={"50px"}
                placeholder="Select a proposal"
              >
                {proposals.map((proposal) => (
                  <MenuItem
                    key={proposal.id}
                    value={proposal.id}
                  >
                    <Typography variant="body2" color="#FFFFFF">
                      #{proposal.proposalId} - {proposal.fullname}
                    </Typography>
                  </MenuItem>
                ))}
              </CustomSelect>

              {errors.proposalId && (
                <Typography
                  variant="caption"
                  sx={{ color: "#f44336", mt: 1, display: "block" }}
                >
                  {errors.proposalId}
                </Typography>
              )}
            </Grid>

            {/* Description Field */}
            <Grid item size={{ xs: 12 }}>
              <TextEditor
                value={formData.description}
                onChange={(value) => handleInputChange("description", value)}
                error={errors.description}
                helperText={errors.description}
                placeholder="Provide detailed information about this project update"
                label="Description"
                required={true}
              />
            </Grid>

            {/* Images Section */}
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body2"
                  color="#FFFFFF"
                  sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <ImageIcon size={18} color="#8CE600" />
                  Images *
                </Typography>
              </Box>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<Plus size={18} />}
                  sx={{
                    borderColor: "#8CE600",
                    color: "#8CE600",
                    mb: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: "#00D4AA",
                      color: "#00D4AA",
                      backgroundColor: "rgba(140, 230, 0, 0.1)",
                    },
                  }}
                >
                  Upload Images
                </Button>
              </label>

              {uploadingImages && (
                <Typography
                  variant="caption"
                  sx={{ color: "#8CE600", display: "block", mt: 1 }}
                >
                  Uploading images...
                </Typography>
              )}

              {imageUploadError && (
                <Typography
                  variant="caption"
                  sx={{ color: "#f44336", display: "block", mt: 1 }}
                >
                  {imageUploadError}
                </Typography>
              )}

              {formData.images.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
                  {formData.images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Box sx={{ position: "relative" }}>
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          style={{
                            width: 120,
                            height: 120,
                            objectFit: "cover",
                            borderRadius: "12px",
                            border: "2px solid #333333",
                            transition: "all 0.3s ease",
                          }}
                        />
                        <IconButton
                          onClick={() => removeImage(index)}
                          sx={{
                            position: "absolute",
                            top: -8,
                            right: -8,
                            backgroundColor: "#FF5050",
                            color: "#FFFFFF",
                            width: 28,
                            height: 28,
                            "&:hover": {
                              backgroundColor: "#FF3030",
                              transform: "scale(1.1)",
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          <X size={14} />
                        </IconButton>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>

        {/* Dialog Actions */}
        <DialogActions sx={{ p: 3, borderTop: "1px solid #333333", gap: 2 }}>
          <CustomButton
            variant="outlined"
            btnLabel="Cancel"
            handlePressBtn={handleClose}
            sx={{
              borderColor: "#333333",
              color: "#B0B0B0",
              "&:hover": {
                borderColor: "#555555",
                color: "#FFFFFF",
              },
            }}
          />
          <CustomButton
            variant="gradientbtn"
            btnLabel={isEdit ? "Update Project Update" : "Add Project Update"}
            handlePressBtn={handleSave}
            loading={isLoading}
            sx={{
              background: "linear-gradient(135deg, #8CE600 0%, #00D4AA 100%)",
              color: "#000000",
              fontWeight: 600,
              px: 4,
              py: 1.5,
            }}
          />
        </DialogActions>
      </motion.div>
    </Dialog>
  );
};

export default AddEditProjectUpdatesDialog;
