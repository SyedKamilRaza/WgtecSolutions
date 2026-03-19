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
  Chip,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Plus, Edit } from "lucide-react";
import CustomSwitch from "../../components/switch";
import TextInput from "../../components/textInput";
import CustomButton from "../../components/customButton";
import { createService, updateService } from "../../api/module/service";
import { uploadImage } from "../../utils/upload";
const AddEditServicesDialog = ({
  open,
  onClose,
  onSave,
  editData = null,
  isEdit = false,
  loading,
}) => {
  const [formData, setFormData] = useState({
    description: "",
    image: "",
    status: "Active",
    title: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      if (isEdit && editData) {
        setFormData({
          title: editData.title || "",
          description: editData.description || "",
          image: editData.image || "",
          status: editData.status || "Active",
          _id: editData._id,
        });
        setImagePreview(editData.image || "");
      } else {
        setFormData({
          title: "",
          description: "",
          image: "",
          status: "Active",
        });
        setImagePreview("");
      }
      setErrors({});
    }
  }, [open, isEdit, editData]);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.image) {
      newErrors.image = "Image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const addService = async () => {
  //   try {
  //     setLoading(true);
  //     let payload = {
  //       title: formData.title,
  //       description: formData.description,
  //       image: formData.image,
  //       status: formData.status,
  //     };
  //     const response = await createService(payload);
  //     if (response.status === 200 || response.status === 201) {
  //       setServicesData(response.data.data.services);
  //       console.log(response.data.data, "sldjfsdlfksd");
  //     } else {
  //       console.log(response.message || "Failed to Create Service", "error");
  //     }
  //   } catch (error) {
  //     console.log(error.message || "Failed to Create Service", "error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleSave = async () => {
  //   if (!validateForm()) return;

  //   setLoading(true);
  //   const payload = {
  //     title: formData.title,
  //     description: formData.description,
  //     image: formData.image,
  //     status: formData.status,
  //   };

  //   try {
  //     const response =
  //       isEdit && editData
  //         ? await updateService(editData._id, payload)
  //         : await createService(payload);

  //     console.log("success", response.data.message);
  //     onClose();
  //   } catch (error) {
  //     console.log(
  //       "error",
  //       error?.response?.data?.message || "Something went wrong"
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      status: "Active",
    });
    setImagePreview("");
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
                      {isEdit ? "Edit Service" : "Add New Service"}
                    </Typography>
                    <Typography variant="body2">
                      {isEdit
                        ? "Update service information"
                        : "Create a new service for your platform"}
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
                {/* Title Field */}
                <Box>
                  <TextInput
                    placeholder="Enter service title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    error={errors.title}
                    helperText={errors.title}
                    showLabel="Service Title *"
                    inputBgColor="#2A2A2A"
                  />
                </Box>

                {/* Description Field */}
                <Box>
                  <TextInput
                    placeholder="Enter service description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    error={errors.description}
                    helperText={errors.description}
                    showLabel="Description *"
                    multiline={true}
                    rows={3}
                    inputBgColor="#2A2A2A"
                  />
                </Box>

                {/* Image Upload */}
                <Box>
                  <Typography variant="body2" color="#FFFFFF">
                    Service Image *
                  </Typography>

                  <Box display={"flex"} gap={2} alignItems={"flex-start"}>
                    {/* Image Preview Box with upload trigger */}
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
                        ) : imagePreview ? (
                          <Avatar
                            src={imagePreview}
                            alt="Service Preview"
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

                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="image-upload"
                      type="file"
                      onChange={handleImageUpload}
                    />
                  </Box>

                  {errors.image && (
                    <Typography variant="caption" color="error">
                      {errors.image}
                    </Typography>
                  )}
                </Box>

                {/* Status Switch */}
                <Box>
                  <Typography variant="body2" color="#FFFFFF">
                    Service Status
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mt: 1,
                    }}
                  >
                    <CustomSwitch
                      checked={formData.status === "Active"}
                      onChange={(e) =>
                        handleInputChange(
                          "status",
                          e.target.checked ? "Active" : "Inactive"
                        )
                      }
                      showLabel={false}
                    />
                    <Chip
                      label={formData.status}
                      sx={{
                        backgroundColor:
                          formData.status === "Active" ? "#8CE600" : "#FF5050",
                        color: formData.status === "Active" ? "#000" : "#FFF",
                        fontWeight: 600,
                        fontSize: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    />
                  </Box>
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
                    btnLabel={isEdit ? "Update Service" : "Add Service"}
                    handlePressBtn={handleSave}
                    loading={loading}
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

export default AddEditServicesDialog;
