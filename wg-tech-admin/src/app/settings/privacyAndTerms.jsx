import {
  Box,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { RefreshCw, Save } from "lucide-react";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { fetchSettings, updateSettings } from "../../api/module/settings";
import CustomButton from "../../components/customButton";
import TextEditor from "../../components/textEditor";

const PrivacyAndTerms = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    privacyPolicy: "",
    termsCondition: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [settingsId, setSettingsId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const response = await fetchSettings();
      if (response.status === 200 || response.status === 201) {
        const data = response.data?.data || response.data;
        if (data) {
          // Assuming the API returns an object with privacyPolicy and termsAndConditions fields
          // If the structure is different, adjust accordingly
          setFormData({
            privacyPolicy: data.privacyPolicy || "",
            termsCondition: data.termsCondition || "",
          });
          setSettingsId(data._id || data.id);
        }
      }
    } catch (error) {
      console.error("Fetch Settings Error:", error);
      enqueueSnackbar("Failed to fetch privacy & terms data", {
        variant: "error",
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.privacyPolicy.trim()) {
      newErrors.privacyPolicy = "Privacy Policy is required";
    }
    if (!formData.termsCondition.trim()) {
      newErrors.termsCondition = "Terms and Conditions is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      enqueueSnackbar("Please fill in all required fields", {
        variant: "error",
      });
      return;
    }

    if (!settingsId) {
      enqueueSnackbar("Settings ID not found. Please refresh the page.", {
        variant: "error",
      });
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        privacyPolicy: formData.privacyPolicy,
        termsCondition: formData.termsCondition,
      };

      const response = await updateSettings(payload);

      if (response.status === 200 || response.status === 201) {
        enqueueSnackbar("Privacy & Terms updated successfully!", {
          variant: "success",
        });
        // Optionally update the settingsId if it's returned in response
        if (response.data?.data?._id) {
          setSettingsId(response.data.data._id);
        }
      } else {
        enqueueSnackbar(
          response.data?.message || "Failed to update privacy & terms",
          {
            variant: "error",
          }
        );
      }
    } catch (error) {
      console.error("Update Privacy & Terms Error:", error);
      enqueueSnackbar(
        error.response?.data?.message || "Something went wrong",
        {
          variant: "error",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    fetchData();
    setErrors({});
  };

  if (isFetching) {
    return (
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress sx={{ color: "#8CE600" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            color: "#FFFFFF",
            fontWeight: 700,
            mb: 1,
            background: "linear-gradient(135deg, #8CE600 0%, #00D4AA 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Privacy & Terms
        </Typography>
        <Typography variant="body1" sx={{ color: "#B0B0B0", fontSize: "16px" }}>
          Manage privacy policy and terms & conditions content
        </Typography>
      </Box>

      {/* Main Content */}
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#1A1A1A",
          borderRadius: "20px",
          border: "1px solid #333333",
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 4 }}>
          {/* Privacy Policy Section */}
          <Box sx={{ mb: 4 }}>
            <TextEditor
              label="Privacy Policy"
              required={true}
              value={formData.privacyPolicy}
              onChange={(value) => handleInputChange("privacyPolicy", value)}
              placeholder="Enter Privacy Policy content..."
              error={!!errors.privacyPolicy}
              helperText={errors.privacyPolicy}
            />
          </Box>

          <Divider sx={{ borderColor: "#333333", my: 4 }} />

          {/* Terms and Conditions Section */}
          <Box sx={{ mb: 4 }}>
            <TextEditor
              label="Terms and Conditions"
              required={true}
              value={formData.termsCondition}
              onChange={(value) =>
                handleInputChange("termsCondition", value)
              }
              placeholder="Enter Terms and Conditions content..."
              error={!!errors.termsCondition}
              helperText={errors.termsCondition}
            />
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
              mt: 4,
              pt: 3,
              borderTop: "1px solid #333333",
            }}
          >
            <CustomButton
              variant="gradientbtn"
              btnLabel="Reset"
              handlePressBtn={handleReset}
              startIcon={<RefreshCw size={18} />}
            />

            <CustomButton
              variant="gradientbtn"
              btnLabel={isLoading ? "Saving..." : "Save Changes"}
              handlePressBtn={handleSave}
              startIcon={!isLoading ? <Save size={18} /> : null}
              disabled={isLoading}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default PrivacyAndTerms;

