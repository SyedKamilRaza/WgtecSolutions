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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Plus, Edit, Package } from "lucide-react";
import CustomSwitch from "../../components/switch";
import TextInput from "../../components/textInput";
import CustomButton from "../../components/customButton";
import CustomSelect from "../../components/customSelect";
import { CustomInputLabel } from "../../components";
import { uploadImage } from "../../utils/upload";

const AddEditSubServiceDialog = ({
  open,
  onClose,
  onSave,
  editData = null,
  isEdit = false,
  services = [], // services list pass karni hogi parent se
  loading,
}) => {
  const [formData, setFormData] = useState({
    serviceId: "",
    title: "",
    description: "",
    image: "",
    status: "Active",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);


  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      if (isEdit && editData) {
        setFormData({
          serviceId: editData.serviceId || "",
          title: editData.title || "",
          description: editData.description || "",
          image: editData.image || "",
          status: editData.status || "Active",
        });
        setImagePreview(editData.image || "");
      } else {
        setFormData({
          serviceId: "",
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

    if (!formData.serviceId) {
      newErrors.serviceId = "Please select a service";
    }
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

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleClose = () => {
    setFormData({
      serviceId: "",
      title: "",
      description: "",
      image: "",
      status: "Active",
    });
    setImagePreview("");
    setErrors({});
    onClose();
  };

  console.log(services, "servicesservicesservicesservicesservices");

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
                      {isEdit ? "Edit Sub Service" : "Add New Sub Service"}
                    </Typography>
                    <Typography variant="body2">
                      {isEdit
                        ? "Update sub service information"
                        : "Create a new sub service under a service"}
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

            <DialogContent sx={{ p: 4 }}>
              <Box display={"flex"} flexDirection={"column"} gap={1} mt={2}>
                {/* Service Select */}
                <CustomInputLabel label="Services *" />
                <CustomSelect
                  value={formData.serviceId}
                  onChange={(e) =>
                    handleInputChange("serviceId", e.target.value)
                  }
                  sx={{
                    backgroundColor: "#2A2A2A",
                    color: "#fff",
                    borderRadius: "10px",
                  }}
                >
                  {services?.map((service) => (
                    <MenuItem
                      className="text-white"
                      key={service.id}
                      value={service.id}
                    >
                      {service.title}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {errors.serviceId && (
                  <Typography variant="caption" color="error">
                    {errors.serviceId}
                  </Typography>
                )}

                {/* Title */}
                <TextInput
                  placeholder="Enter sub service title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  error={errors.title}
                  helperText={errors.title}
                  showLabel="Sub Service Title *"
                  inputBgColor="#2A2A2A"
                />

                {/* Description */}
                <TextInput
                  placeholder="Enter sub service description"
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

                {/* Image Upload */}
                <Box>
                  <Typography variant="body2" color="#FFFFFF">
                    Sub Service Image *
                  </Typography>
                  <Box display={"flex"} gap={2} alignItems={"flex-start"}>
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
                            alt="Preview"
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
                    Sub Service Status
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
                    btnLabel={isEdit ? "Update Sub Service" : "Add Sub Service"}
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

export default AddEditSubServiceDialog;
