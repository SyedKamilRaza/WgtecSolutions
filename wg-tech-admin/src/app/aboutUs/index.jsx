import {
  Avatar,
  Box,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import CustomButton from "../../components/customButton";
import TextEditor from "../../components/textEditor";
import { uploadImage } from "../../utils/upload";
import { getAllAboutUS, updateAboutUs } from "../../api/module/aboutUs";
import he from "he";

const AboutUsManagement = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({ description: "", image: "" });
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAboutUs();
  }, []);

  const fetchAboutUs = async () => {
    setIsLoading(true);
    try {
      const res = await getAllAboutUS();
      if (res?.status === 200 || res?.status === 201) {
        const data = res?.data?.data;
        if (data) {
          const decodedDesc = he.decode(data.description || "");
          setFormData({
            description: decodedDesc,
            image: data.image || "",
          });
          setEditId(data._id);
        }
      } else {
        enqueueSnackbar(res.data?.message || "Failed to fetch data", {
          variant: "error",
        });
      }
    } catch (err) {
      enqueueSnackbar("Error fetching About Us", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadImage(file);
      handleInputChange("image", url);
      enqueueSnackbar("Image uploaded successfully", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Image upload failed", { variant: "error" });
    } finally {
      setUploading(false);
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.description.trim())
      errs.description = "About Us text is required";
    if (!formData.image) errs.image = "Image is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    try {
      const payload = {
        description: formData.description,
        image: formData.image,
      };
      const res = await updateAboutUs(editId, payload);
      if (res?.status === 200 || res?.status === 201) {
        enqueueSnackbar(res?.data?.message || "Saved successfully", {
          variant: "success",
        });
        fetchAboutUs();
      } else {
        enqueueSnackbar(res.data?.message || "Save failed", {
          variant: "error",
        });
      }
    } catch (err) {
      enqueueSnackbar("Error saving About Us", { variant: "error" });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontWeight: 700,
            mb: 1,
            background: "linear-gradient(135deg, #8CE600 0%, #00D4AA 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          About Us Management
        </Typography>
        <Typography variant="body1" sx={{ color: "#B0B0B0", fontSize: 16 }}>
          Manage and update About Us content
        </Typography>
      </Box>

      <Paper
        sx={{
          backgroundColor: "#1A1A1A",
          borderRadius: 2,
          border: "1px solid #333",
          p: 3,
        }}
      >
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={200}
          >
            <CircularProgress sx={{ color: "#8CE600" }} />
          </Box>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Box display="flex" flexDirection="column" gap={3}>
              {/* ✅ About Us Description */}
              <TextEditor
                label="About Us"
                required
                value={formData.description}
                onChange={(val) => handleInputChange("description", val)}
                placeholder="Enter About Us text..."
                rows={5}
                error={!!errors.description}
                helperText={errors.description}
              />

              {/* ✅ Image Upload */}
              <Box>
                <Typography variant="body2" color="#fff" mb={1}>
                  About Us Image *
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <label htmlFor="image-upload">
                    <Box
                      width={120}
                      height={120}
                      borderRadius={2}
                      border="2px dashed #333"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bgcolor="#2A2A2A"
                      sx={{ cursor: "pointer" }}
                    >
                      {uploading ? (
                        <CircularProgress size={28} sx={{ color: "#8CE600" }} />
                      ) : formData.image ? (
                        <Avatar
                          src={formData.image}
                          sx={{ width: 120, height: 120, borderRadius: 2 }}
                        />
                      ) : (
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          gap={1}
                        >
                          <Upload size={24} color="#666" />
                          <Typography variant="caption" color="#666">
                            Upload
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageUpload}
                  />
                </Box>
                {errors.image && (
                  <Typography variant="caption" color="error">
                    {errors.image}
                  </Typography>
                )}
              </Box>

              {/* ✅ Save Button */}
              <Box display="flex" justifyContent="flex-end">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <CustomButton
                    variant="gradientbtn"
                    btnLabel="Save About Us"
                    handlePressBtn={handleSave}
                  />
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        )}
      </Paper>
    </Box>
  );
};

export default AboutUsManagement;
