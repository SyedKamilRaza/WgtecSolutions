import {
  Box,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { RefreshCw, Save, Mail } from "lucide-react";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { fetchSettings, updateSettings } from "../../api/module/settings";
import CustomButton from "../../components/customButton";
import TextEditor from "../../components/textEditor";

const EmailTemplates = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    senderEmail: "", // ✅ NAYA
    proposalEmailTemplate: "",
    applicationEmailTemplate: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

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
          setFormData({
            senderEmail: data.senderEmail || "", // ✅ NAYA
            proposalEmailTemplate: data.proposalEmailTemplate || "",
            applicationEmailTemplate: data.applicationEmailTemplate || "",
          });
        }
      }
    } catch (error) {
      enqueueSnackbar("Failed to fetch email templates", { variant: "error" });
    } finally {
      setIsFetching(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await updateSettings(formData);
      if (response.status === 200 || response.status === 201) {
        enqueueSnackbar("Email templates saved successfully!", {
          variant: "success",
        });
      } else {
        enqueueSnackbar(response.data?.message || "Failed to save", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
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
          Email Templates
        </Typography>
        <Typography variant="body1" sx={{ color: "#B0B0B0" }}>
          Customize email templates. Use {`{{fullname}}`}, {`{{email}}`},{" "}
          {`{{password}}`}, {`{{budget}}`}, {`{{adminLink}}`} as variables.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#1A1A1A",
          borderRadius: "20px",
          border: "1px solid #333333",
          overflow: "hidden",
        }}
      >
        {/* Sender Email */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Mail size={20} color="#8CE600" />
            <Typography variant="h6" sx={{ color: "#8CE600", fontWeight: 600 }}>
              Email Sender Address
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: "#B0B0B0", mb: 2 }}>
            Emails will be sent FROM this address (e.g. info@wgtecsol.com)
          </Typography>
          <input
            type="email"
            value={formData.senderEmail}
            onChange={(e) => handleInputChange("senderEmail", e.target.value)}
            placeholder="info@wgtecsol.com"
            style={{
              width: "100%",
              padding: "12px 16px",
              backgroundColor: "#2A2A2A",
              border: "1px solid #444",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "15px",
              outline: "none",
            }}
          />
        </Box>

        <Divider sx={{ borderColor: "#333333", my: 4 }} />

        {/* Proposal Email Template */}
        <Box sx={{ p: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Mail size={20} color="#8CE600" />
              <Typography
                variant="h6"
                sx={{ color: "#8CE600", fontWeight: 600 }}
              >
                Proposal Confirmation Email
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "#B0B0B0", mb: 2 }}>
              Sent to client when they submit a proposal form.
            </Typography>
            <TextEditor
              label="Proposal Email Template"
              value={formData.proposalEmailTemplate}
              onChange={(value) =>
                handleInputChange("proposalEmailTemplate", value)
              }
              placeholder="Enter proposal email template... Use {{fullname}}, {{email}}, {{password}}, {{budget}}, {{adminLink}}"
              error={!!errors.proposalEmailTemplate}
              helperText={errors.proposalEmailTemplate}
            />
          </Box>

          <Divider sx={{ borderColor: "#333333", my: 4 }} />

          {/* Application Email Template */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Mail size={20} color="#00D4AA" />
              <Typography
                variant="h6"
                sx={{ color: "#00D4AA", fontWeight: 600 }}
              >
                Career Application Confirmation Email
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "#B0B0B0", mb: 2 }}>
              Sent to applicant when they submit a career application.
            </Typography>
            <TextEditor
              label="Application Email Template"
              value={formData.applicationEmailTemplate}
              onChange={(value) =>
                handleInputChange("applicationEmailTemplate", value)
              }
              placeholder="Enter application email template... Use {{fullname}}, {{email}}, {{position}}"
              error={!!errors.applicationEmailTemplate}
              helperText={errors.applicationEmailTemplate}
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
              handlePressBtn={() => {
                fetchData();
                setErrors({});
              }}
              startIcon={<RefreshCw size={18} />}
            />
            <CustomButton
              variant="gradientbtn"
              btnLabel={isLoading ? "Saving..." : "Save Templates"}
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

export default EmailTemplates;
