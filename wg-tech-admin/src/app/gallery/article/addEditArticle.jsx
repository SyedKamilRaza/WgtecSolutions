import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Avatar,
  Button,
  Divider,
  Chip,
  CircularProgress,
  TextField,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Plus, Edit, Delete, Cross } from "lucide-react";
import CustomButton from "../../../components/customButton";
import TextEditor from "../../../components/textEditor";
import TextInput from "../../../components/textInput";
import { uploadImage } from "../../../utils/upload";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const AddEditArticleDialog = ({
  open,
  onClose,
  onSave,
  editData = null,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    image: [],
    shortDescription: "",
    longDescription: "",
    postedOn: null,
  });
  const [errors, setErrors] = useState({});

  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      if (isEdit && editData) {
        setFormData({
          title: editData.title || "",
          subTitle: editData.subTitle || "",
          image: editData.image || [],
          shortDescription: editData.shortDescription || "",
          longDescription: editData.longDescription || "",
          postedOn: editData.postedOn ? dayjs(editData.postedOn) : null,
        });
      } else {
        setFormData({
          title: "",
          subTitle: "",
          image: [],
          shortDescription: "",
          longDescription: "",
          postedOn: null,
        });
      }
      setErrors({});
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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      const imageUrl = await uploadImage(file);
      setImagePreview(imageUrl);
      handleInputChange("image", imageUrl);
      if (errors.image) setErrors((prev) => ({ ...prev, image: "" }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        image: error.message || "Upload failed",
      }));
      setImagePreview("");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.subTitle.trim()) {
      newErrors.subTitle = "Sub title is required";
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = "Short description is required";
    }

    if (!formData.longDescription.trim()) {
      newErrors.longDescription = "Long description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setImagePreview("");
      onSave(formData);
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      subTitle: "",
      image: [],
      shortDescription: "",
      longDescription: "",
      postedOn: null,
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
                      {isEdit ? "Edit Article" : "Add New Article"}
                    </Typography>
                    <Typography variant="body2">
                      {isEdit
                        ? "Update article information"
                        : "Create a new article entry"}
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
                {/* Title */}
                <Box>
                  <TextInput
                    placeholder="Enter article title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    error={errors.title}
                    helperText={errors.title}
                    showLabel="Title *"
                    inputBgColor="#2A2A2A"
                  />
                </Box>

                {/* Sub Title */}
                <Box>
                  <TextInput
                    placeholder="Enter article subtitle"
                    value={formData.subTitle}
                    onChange={(e) =>
                      handleInputChange("subTitle", e.target.value)
                    }
                    error={errors.subTitle}
                    helperText={errors.subTitle}
                    showLabel="Sub Title *"
                    inputBgColor="#2A2A2A"
                  />
                </Box>

                {/* Posted On Date Picker */}
                <Box>
                  <Typography variant="body2" color="#FFFFFF" mb={1}>
                    Posted On
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={formData.postedOn}
                      onChange={(newValue) =>
                        handleInputChange("postedOn", newValue)
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          sx: {
                            backgroundColor: "#2A2A2A",
                            borderRadius: "12px",
                            "& .MuiOutlinedInput-root": {
                              color: "#FFFFFF",
                              "& fieldset": {
                                borderColor: "#333333",
                              },
                              "&:hover fieldset": {
                                borderColor: "#8CE600",
                                borderRadius: "12px",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#8CE600",
                                borderRadius: "12px",
                              },
                            },
                            "& .MuiSvgIcon-root": {
                              color: "#8CE600",
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>

                {/* Short Description */}
                <Box>
                  <TextInput
                    placeholder="Enter short description"
                    value={formData.shortDescription}
                    onChange={(e) =>
                      handleInputChange("shortDescription", e.target.value)
                    }
                    error={errors.shortDescription}
                    helperText={errors.shortDescription}
                    showLabel="Short Description *"
                    multiline={true}
                    rows={3}
                    inputBgColor="#2A2A2A"
                  />
                </Box>

                {/* Image Upload */}
                <Box>
                  <Typography variant="body2" color="#FFFFFF" mb={1}>
                    Insert Image
                  </Typography>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="image-upload"
                    multiple
                    type="file"
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="image-upload">
                    <Box
                      sx={{
                        border: "2px dashed #333333",
                        borderRadius: "12px",
                        p: 2,
                        textAlign: "center",
                        backgroundColor: "#2A2A2A",
                        cursor: "pointer",
                        "&:hover": {
                          borderColor: "#8CE600",
                        },
                      }}
                    >
                      {uploading ? (
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
                          <Typography variant="caption" color="#8CE600">
                            Uploading...
                          </Typography>
                        </Box>
                      ) : imagePreview ? (
                        <Avatar
                          src={imagePreview}
                          alt="About Us Preview"
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
                          <Upload size={24} color="#666666" />
                          <Typography variant="caption" color="#666666">
                            Click to Upload
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </label>

                  {/* Display uploaded images */}
                  {/* Display uploaded image */}
                  {formData.image && (
                    <Box
                      sx={{
                        mt: 2,
                        position: "relative",
                        display: "inline-block",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: "1px solid #333333",
                      }}
                    >
                      <Avatar
                        src={formData.image} // single image URL
                        alt="Blog Image"
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "8px",
                        }}
                      />
                      <IconButton
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, image: "" }))
                        }
                        sx={{
                          position: "absolute",
                          top: -4,
                          right: -4,
                          backgroundColor: "#f44336",
                          color: "#FFFFFF",
                          "&:hover": {
                            backgroundColor: "#d32f2f",
                          },
                        }}
                      >
                        <X size={12} />
                      </IconButton>
                    </Box>
                  )}
                </Box>

                {/* Long Description with TextEditor */}
                <Box>
                  <TextEditor
                    label="Type Article "
                    required={true}
                    value={formData.longDescription}
                    onChange={(value) =>
                      handleInputChange("longDescription", value)
                    }
                    placeholder="Type Article..."
                    error={!!errors.longDescription}
                    helperText={errors.longDescription}
                  />
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
                />

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CustomButton
                    variant="gradientbtn"
                    btnLabel={isEdit ? "Update Article" : "Add Article"}
                    handlePressBtn={handleSave}
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

export default AddEditArticleDialog;
