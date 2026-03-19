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
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Plus, Edit, Delete, Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import CustomButton from "../../../components/customButton";
import TextEditor from "../../../components/textEditor";
import TextInput from "../../../components/textInput";
import { uploadImage, uploadVideo } from "../../../utils/upload";

const AddEditEventDialog = ({
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
    video: [],
    shortDescription: "",
    longDescription: "",
    location: "",
    eventDate: null,
  });
  const [errors, setErrors] = useState({});

  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [videoPreview, setVideoPreview] = useState("");

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      if (isEdit && editData) {
        setFormData({
          title: editData.title || "",
          subTitle: editData.subTitle || "",
          image: editData.image || [],
          video: editData.video || [],
          shortDescription: editData.shortDescription || "",
          longDescription: editData.longDescription || "",
          location: editData.location || "",
          eventDate: editData.eventDate
            ? moment(editData.eventDate).toDate()
            : null,
        });
      } else {
        setFormData({
          title: "",
          subTitle: "",
          image: [],
          video: [],
          shortDescription: "",
          longDescription: "",
          location: "",
          eventDate: null,
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

      // Ensure image is stored as an array
      setFormData((prev) => ({
        ...prev,
        image: [...prev.image, { name: file.name, url: imageUrl }],
      }));

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

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Optional: preview
    const reader = new FileReader();
    reader.onload = (e) => setVideoPreview(e.target.result);
    reader.readAsDataURL(file);

    try {
      setUploadingVideo(true); // separate loading state for videos
      const videoUrl = await uploadVideo(file); // your backend upload function

      // Ensure video is stored as an array like images
      setFormData((prev) => ({
        ...prev,
        video: [...prev.video, { name: file.name, url: videoUrl }],
      }));

      if (errors.video) setErrors((prev) => ({ ...prev, video: "" }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        video: error.message || "Upload failed",
      }));
      setVideoPreview("");
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleRemoveVideo = (index) => {
    setFormData((prev) => ({
      ...prev,
      video: prev.video.filter((_, i) => i !== index),
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

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    setImagePreview("");
    setVideoPreview("");
    if (validateForm()) {
      const formattedData = {
        ...formData,
        eventDate: formData.eventDate
          ? moment(formData.eventDate).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
          : null,
      };
      onSave(formattedData);
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      subTitle: "",
      image: [],
      video: [],
      shortDescription: "",
      longDescription: "",
      location: "",
      eventDate: null,
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
                      {isEdit ? "Edit Event" : "Add New Event"}
                    </Typography>
                    <Typography variant="body2">
                      {isEdit
                        ? "Update event information"
                        : "Create a new event entry"}
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
                    placeholder="Enter event title"
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
                    placeholder="Enter event subtitle"
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

                {/* Location and Date Row */}
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ width:"100%" }}>
                    <TextInput
                      placeholder="Enter event location"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      error={errors.location}
                      helperText={errors.location}
                      showLabel="Location *"
                      inputBgColor="#2A2A2A"
                    />
                  </Box>

                  <Box sx={{ width:"100%" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#FFFFFF",
                        mb: 1,
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      Event Date
                    </Typography>
                    <DatePicker
                      selected={formData.eventDate}
                      onChange={(date) => {
                        handleInputChange("eventDate", date);
                        if (errors.eventDate) {
                          setErrors((prev) => ({
                            ...prev,
                            eventDate: "",
                          }));
                        }
                      }}
                      placeholderText="Select event date"
                      dateFormat="dd/MM/yyyy"
                      customInput={
                        <input
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            backgroundColor: "#2A2A2A",
                            border: errors.eventDate
                              ? "1px solid #f44336"
                              : "1px solid #333333",
                            borderRadius: "8px",
                            color: "#FFFFFF",
                            fontSize: "14px",
                            outline: "none",
                            fontFamily: "inherit",
                          }}
                        />
                      }
                      calendarClassName="custom-datepicker"
                    />
                    {errors.eventDate && (
                      <Typography
                        variant="caption"
                        sx={{ color: "#f44336", mt: 0.5, display: "block" }}
                      >
                        {errors.eventDate}
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* Image Upload */}
                <Box>
                  <Box>
                    <Typography variant="body2" color="#FFFFFF">
                      Images *
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
                      {formData.image.map((image, index) => (
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
                            src={image.url}
                            alt={image.name}
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

                    {errors.image && (
                      <Typography variant="caption" color="error">
                        {errors.image}
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* Video Upload */}
                <Box>
                  <Typography variant="body2" color="#FFFFFF">
                    Video *
                  </Typography>

                  <Box display={"flex"} gap={2} alignItems={"flex-start"}>
                    <label htmlFor="video-upload">
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
                        {uploadingVideo ? (
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
                        ) : videoPreview ? (
                          <video
                            src={videoPreview}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "10px",
                              objectFit: "cover",
                            }}
                            muted
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
                      accept="video/*"
                      style={{ display: "none" }}
                      id="video-upload"
                      type="file"
                      onChange={handleVideoUpload}
                    />
                  </Box>

                  {errors.video && (
                    <Typography variant="caption" color="error">
                      {errors.video}
                    </Typography>
                  )}

                  {/* MULTIPLE VIDEO PREVIEW LIST */}
                  {formData.video.length > 0 && (
                    <Box
                      sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}
                    >
                      {formData.video.map((vid, index) => (
                        <Box
                          key={index}
                          sx={{
                            position: "relative",
                            display: "inline-block",
                            borderRadius: "8px",
                            overflow: "hidden",
                            border: "1px solid #333333",
                          }}
                        >
                          <video
                            src={vid.url}
                            style={{
                              width: 60,
                              height: 60,
                              borderRadius: "8px",
                              objectFit: "cover",
                            }}
                            muted
                          />

                          <IconButton
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                video: prev.video.filter((_, i) => i !== index),
                              }))
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
                      ))}
                    </Box>
                  )}
                </Box>

                {/* Long Description with TextEditor */}
                <Box>
                  <TextEditor
                    label="Long Description"
                    required={true}
                    value={formData.longDescription}
                    onChange={(value) =>
                      handleInputChange("longDescription", value)
                    }
                    placeholder="Enter detailed description..."
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
                    btnLabel={isEdit ? "Update Event" : "Add Event"}
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

export default AddEditEventDialog;
