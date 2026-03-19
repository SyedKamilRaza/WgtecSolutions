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
  Divider,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Plus, Edit } from "lucide-react";
import CustomButton from "../../../components/customButton";
import TextInput from "../../../components/textInput";
import { uploadImage } from "../../../utils/upload";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const AddEditProductDialog = ({
  open,
  onClose,
  onSave,
  editData = null,
  isEdit = false,
}) => {
  const getInitialFormData = () => ({
    heading: "",
    subTitle: "",
    productLink: "",
    productImages: [],
    shortDescription: "",
    postedOn: null,
  });

  const [formData, setFormData] = useState(getInitialFormData());
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (open) {
      if (isEdit && editData) {
        setFormData({
          heading: editData.title || "",
          subTitle: editData.subTitle || "",
          productLink: editData.productLink || "",
          productImages: editData.productImages || editData.image || [],
          shortDescription: editData.shortDescription || "",
          postedOn: editData.postedOn ? dayjs(editData.postedOn) : null,
        });
      } else {
        setFormData(getInitialFormData());
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
    const files = Array.from(event.target.files);
    if (!files.length) return;

    try {
      setUploading(true);
      const uploadPromises = files.map((file) => uploadImage(file));
      const imageUrls = await Promise.all(uploadPromises);
      
      setFormData((prev) => ({
        ...prev,
        productImages: [...prev.productImages, ...imageUrls],
      }));
      
      if (errors.productImages) setErrors((prev) => ({ ...prev, productImages: "" }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        productImages: error.message || "Upload failed",
      }));
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      productImages: prev.productImages.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.heading.trim()) {
      newErrors.heading = "Heading is required";
    }

    if (formData.productLink && formData.productLink.trim()) {
      // Basic URL validation
      const urlPattern =
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(formData.productLink)) {
        newErrors.productLink = "Please enter a valid URL";
      }
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = "Short description is required";
    }

    if (formData.productImages.length === 0) {
      newErrors.productImages = "At least one image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const handleClose = () => {
    setFormData(getInitialFormData());
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
                      {isEdit ? "Edit Product" : "Add New Product"}
                    </Typography>
                    <Typography variant="body2">
                      {isEdit
                        ? "Update product information"
                        : "Create a new product entry"}
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
                {/* Heading */}
                <Box>
                  <TextInput
                    placeholder="Enter product heading"
                    value={formData.heading}
                    onChange={(e) =>
                      handleInputChange("heading", e.target.value)
                    }
                    error={errors.heading}
                    helperText={errors.heading}
                    showLabel="Heading *"
                    inputBgColor="#2A2A2A"
                  />
                </Box>

                {/* Sub Title */}
                <Box>
                  <TextInput
                    placeholder="Enter product sub title"
                    value={formData.subTitle}
                    onChange={(e) =>
                      handleInputChange("subTitle", e.target.value)
                    }
                    error={errors.subTitle}
                    helperText={errors.subTitle}
                    showLabel="Sub Title"
                    inputBgColor="#2A2A2A"
                  />
                </Box>

                {/* Product Link */}
                <Box>
                  <TextInput
                    placeholder="Enter product link (e.g., https://example.com/product)"
                    value={formData.productLink}
                    onChange={(e) =>
                      handleInputChange("productLink", e.target.value)
                    }
                    error={errors.productLink}
                    helperText={errors.productLink}
                    showLabel="Product Link"
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
                      onChange={(newValue) => handleInputChange("postedOn", newValue)}
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
                  <Typography variant="body2" color="#FFFFFF">
                      Insert Image
                  </Typography>

                  <label htmlFor="image-upload">
                    <Box
                      width={120}
                      height={120}
                      borderRadius="12px"
                      border={"2px dashed #333333"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      backgroundColor="#2A2A2A"
                      overflow={"hidden"}
                      position={"relative"}
                      mt={1}
                      sx={{ cursor: "pointer" }}
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

                  <input
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                    id="image-upload"
                    type="file"
                    onChange={handleImageUpload}
                  />

                  {/* MULTIPLE IMAGES PREVIEW */}
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1.5,
                    }}
                  >
                    {formData.productImages.map((imageUrl, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "8px",
                          overflow: "hidden",
                          position: "relative",
                          border: "1px solid #333333",
                        }}
                      >
                        <Avatar
                          src={imageUrl}
                          alt={`Product image ${index + 1}`}
                          sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "8px",
                          }}
                        />

                        <IconButton
                          onClick={() => handleRemoveImage(index)}
                          sx={{
                            position: "absolute",
                            top: -5,
                            right: -5,
                            backgroundColor: "#f44336",
                            color: "#FFFFFF",
                            width: 18,
                            height: 18,
                            "&:hover": {
                              backgroundColor: "#d32f2f",
                            },
                          }}
                        >
                          <X size={10} />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>

                  {errors.productImages && (
                    <Typography variant="caption" color="error">
                      {errors.productImages}
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
                />

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CustomButton
                    variant="gradientbtn"
                    btnLabel={isEdit ? "Update Product" : "Add Product"}
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

export default AddEditProductDialog;
