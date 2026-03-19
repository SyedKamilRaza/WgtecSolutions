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
  Rating,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Edit, Star, User, Mail, Image, Upload } from "lucide-react";
import TextInput from "../../components/textInput";
import CustomButton from "../../components/customButton";
import { uploadImage } from "../../utils/upload";

const AddEditReviewsDialog = ({
  open,
  onClose,
  onSave,
  editData = null,
  isEdit = false,
  loading,
}) => {
  const [formData, setFormData] = useState({
    userInfo: {
      name: "",
      email: "",
      image: "",
    },
    rating: 0,
    review: "",
  });
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      if (isEdit && editData) {
        setFormData({
          userInfo: {
            name: editData.userInfo?.name || "",
            email: editData.userInfo?.email || "",
            image: editData.userInfo?.image || "",
          },
          rating: editData.rating || 0,
          review: editData.review || "",
        });
      } else {
        setFormData({
          userInfo: {
            name: "",
            email: "",
            image: "",
          },
          rating: 0,
          review: "",
        });
      }
      setErrors({});
    }
  }, [open, isEdit, editData]);

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

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
    // update the nested field correctly
    handleInputChange("userInfo.image", imageUrl);

    if (errors["userInfo.image"]) {
      setErrors((prev) => ({ ...prev, "userInfo.image": "" }));
    }
  } catch (error) {
    setErrors((prev) => ({
      ...prev,
      "userInfo.image": error.message || "Upload failed",
    }));
    setImagePreview("");
  } finally {
    setUploading(false);
  }
};

  const handleRemoveImage = () => {
    handleInputChange("userInfo.image", "");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userInfo.name.trim()) {
      newErrors["userInfo.name"] = "User name is required";
    }

    if (!formData.userInfo.email.trim()) {
      newErrors["userInfo.email"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.userInfo.email)) {
      newErrors["userInfo.email"] = "Please enter a valid email";
    }

    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = "Please select a rating between 1-5 stars";
    }

    if (!formData.review.trim()) {
      newErrors.review = "Review text is required";
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
      userInfo: {
        name: "",
        email: "",
        image: "",
      },
      rating: 0,
      review: "",
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
                      {isEdit ? "Edit Review" : "Add New Review"}
                    </Typography>
                    <Typography variant="body2">
                      {isEdit
                        ? "Update review information"
                        : "Create a new customer review"}
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
                {/* User Information Section */}
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#fff",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <User size={20} />
                    User Information
                  </Typography>

                  <Box display="flex" gap={2} mb={2}>
                    {/* User Name */}
                    <Box flex={1}>
                      <TextInput
                        placeholder="Enter user name"
                        value={formData.userInfo.name}
                        onChange={(e) =>
                          handleInputChange("userInfo.name", e.target.value)
                        }
                        error={errors["userInfo.name"]}
                        helperText={errors["userInfo.name"]}
                        showLabel="User Name *"
                        inputBgColor="#2A2A2A"
                      />
                    </Box>

                    {/* User Email */}
                    <Box flex={1}>
                      <TextInput
                        placeholder="Enter user email"
                        value={formData.userInfo.email}
                        onChange={(e) =>
                          handleInputChange("userInfo.email", e.target.value)
                        }
                        error={errors["userInfo.email"]}
                        helperText={errors["userInfo.email"]}
                        showLabel="User Email *"
                        inputBgColor="#2A2A2A"
                        type="email"
                      />
                    </Box>
                  </Box>

                  {/* User Image Upload */}
                  <Box>
                    <Typography variant="body2" color="#FFFFFF" mb={1}>
                      User Photo (Optional)
                    </Typography>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="user-image-upload"
                      type="file"
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="user-image-upload">
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

                    {/* Display uploaded image */}
                    {formData.userInfo.image && (
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            display: "inline-block",
                            borderRadius: "8px",
                            overflow: "hidden",
                            border: "1px solid #333333",
                          }}
                        >
                          <Avatar
                            src={formData.userInfo.image}
                            alt="User Avatar"
                            sx={{
                              width: 80,
                              height: 80,
                              borderRadius: "8px",
                            }}
                          />
                          <IconButton
                            onClick={handleRemoveImage}
                            sx={{
                              position: "absolute",
                              top: -4,
                              right: -4,
                              backgroundColor: "#f44336",
                              color: "#FFFFFF",
                              width: 24,
                              height: 24,
                              "&:hover": {
                                backgroundColor: "#d32f2f",
                              },
                            }}
                          >
                            <X size={12} />
                          </IconButton>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>

                <Divider sx={{ borderColor: "#333" }} />

                {/* Rating Section */}
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#fff",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Star size={20} />
                    Rating
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Rating
                      value={formData.rating}
                      onChange={(event, newValue) => {
                        handleInputChange("rating", newValue);
                      }}
                      size="large"
                      sx={{
                        "& .MuiRating-iconFilled": {
                          color: "#ffd700",
                        },
                        "& .MuiRating-iconHover": {
                          color: "#ffd700",
                        },
                      }}
                    />
                    <Typography variant="body2" sx={{ color: "#ccc" }}>
                      {formData.rating > 0
                        ? `${formData.rating} star${
                            formData.rating > 1 ? "s" : ""
                          }`
                        : "No rating selected"}
                    </Typography>
                  </Box>
                  {errors.rating && (
                    <Typography
                      variant="caption"
                      sx={{ color: "#f44336", mt: 1, display: "block" }}
                    >
                      {errors.rating}
                    </Typography>
                  )}
                </Box>

                <Divider sx={{ borderColor: "#333" }} />

                {/* Review Text Section */}
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#fff",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Mail size={20} />
                    Review Text
                  </Typography>

                  <TextInput
                    placeholder="Enter review text"
                    value={formData.review}
                    onChange={(e) =>
                      handleInputChange("review", e.target.value)
                    }
                    error={errors.review}
                    helperText={errors.review}
                    showLabel="Review Text *"
                    multiline={true}
                    rows={4}
                    inputBgColor="#2A2A2A"
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
                    btnLabel={isEdit ? "Update Review" : "Add Review"}
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

export default AddEditReviewsDialog;
