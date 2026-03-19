import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Camera, Mail, RefreshCw, Save, User } from "lucide-react";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { updateUser, getUserById } from "../../api/module/user";
import CustomButton from "../../components/customButton";
import TextInput from "../../components/textInput";
import { uploadImage } from "../../utils/upload";
import useUserStore from "../../zustand/useUserStore";

const PersonalSettings = () => {
  const { user, setUserData } = useUserStore();
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profileImage: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // Fetch user data using getUserById
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?._id) return;
      
      setFetching(true);
      try {
        const response = await getUserById(user._id);
        if (response.status === 200 || response.status === 201) {
          const userData = response.data?.data?.user || response.data?.data || {};
          setFormData({
            username: userData.username || "",
            email: userData.email || "",
            profileImage: userData.profileImage || userData.profileImageUrl || "",
          });
          setImagePreview(userData.profileImage || userData.profileImageUrl || "");
          // Update user store with latest data
          if (userData._id) {
            setUserData(userData);
          }
        } else {
          enqueueSnackbar("Failed to fetch user data", { variant: "error" });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        enqueueSnackbar("Something went wrong while fetching user data", { variant: "error" });
      } finally {
        setFetching(false);
      }
    };

    fetchUserData();
  }, [user?._id, setUserData, enqueueSnackbar]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
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
      handleInputChange("profileImage", imageUrl);
      if (errors.profileImage) setErrors((prev) => ({ ...prev, profileImage: "" }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        profileImage: error.message || "Upload failed",
      }));
      setImagePreview("");
    } finally {
      setUploading(false);
    }
  };

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     if (!file.type.startsWith("image/")) {
  //       enqueueSnackbar("Please select a valid image file", {
  //         variant: "error",
  //       });
  //       return;
  //     }
  //     if (file.size > 5 * 1024 * 1024) {
  //       enqueueSnackbar("Image size should be less than 5MB", {
  //         variant: "error",
  //       });
  //       return;
  //     }
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setFormData((prev) => ({ ...prev, profileImageUrl: e.target.result }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSave = async () => {
  //   if (!validateForm()) return;

  //   setIsLoading(true);
  //   try {
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //     const updatedUser = { ...user, ...formData };
  //     setUserData(updatedUser);
  //     enqueueSnackbar("Profile updated successfully!", { variant: "success" });
  //   } catch (error) {
  //     enqueueSnackbar("Failed to update profile", { variant: "error" });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const payload = {
        username: formData.username,
        profileImage: formData.profileImage,
      };

      const response = await updateUser(user?._id, payload);

      if (response.status === 200 || response.status === 201) {
        const updatedUser = response.data?.data?.user || response.data?.data || {};
        enqueueSnackbar("Profile updated successfully!", { variant: "success" });
        setUserData(updatedUser);
        // Update form data with response
        setFormData((prev) => ({
          ...prev,
          username: updatedUser.username || prev.username,
          profileImage: updatedUser.profileImage || updatedUser.profileImageUrl || prev.profileImage,
        }));
        setImagePreview(updatedUser.profileImage || updatedUser.profileImageUrl || "");
      } else {
        enqueueSnackbar(response.data?.message || "Failed to update profile", {
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Update User Error:", error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    if (!user?._id) return;
    
    setFetching(true);
    try {
      const response = await getUserById(user._id);
      if (response.status === 200 || response.status === 201) {
        const userData = response.data?.data?.user || response.data?.data || {};
        setFormData({
          username: userData.username || "",
          email: userData.email || "",
          profileImage: userData.profileImage || userData.profileImageUrl || "",
        });
        setImagePreview(userData.profileImage || userData.profileImageUrl || "");
      }
    } catch (error) {
      console.error("Error resetting form:", error);
    } finally {
      setFetching(false);
      setErrors({});
    }
  };

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
          Personal Settings
        </Typography>
        <Typography variant="body1" sx={{ color: "#B0B0B0", fontSize: "16px" }}>
          Manage your personal information and profile settings
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
          position: "relative",
        }}
      >
        {fetching && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(26, 26, 26, 0.8)",
              zIndex: 10,
              borderRadius: "20px",
            }}
          >
            <CircularProgress sx={{ color: "#8CE600" }} />
          </Box>
        )}
        <Box sx={{ p: 4 }}>
          {/* Profile Image Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            {uploading ? (
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                gap={1}
              >
                <CircularProgress size={24} sx={{ color: "#8CE600" }} />
                <Typography variant="caption" color="#8CE600">
                  Uploading...
                </Typography>
              </Box>
            ) : (
              <>
                <Box sx={{ position: "relative", mb: 2 }}>
                  <Avatar
                    src={
                      imagePreview ||
                      formData.profileImage ||
                      "/default-avatar.png"
                    }
                    sx={{
                      width: 120,
                      height: 120,
                      border: "4px solid #8CE600",
                      boxShadow: "0 8px 32px rgba(140, 230, 0, 0.3)",
                    }}
                  />

                  <IconButton
                    component="label"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      backgroundColor: "#8CE600",
                      color: "#000",
                      width: 40,
                      height: 40,
                      "&:hover": {
                        backgroundColor: "#7DD500",
                      },
                    }}
                  >
                    <Camera size={20} />
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageUpload}
                    />
                  </IconButton>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#B0B0B0",
                    textAlign: "center",
                    maxWidth: 300,
                  }}
                >
                  Click the camera icon to upload a new profile picture. Maximum
                  file size: 5MB
                </Typography>
              </>
            )}
          </Box>

          <Divider sx={{ borderColor: "#333333", mb: 4 }} />

          {/* Form Fields */}
          <Box display="flex" flexDirection="column" gap={3}>
            <TextInput
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              error={errors.username}
              helperText={errors.username}
              showLabel="Username *"
              inputBgColor="#2A2A2A"
              InputStartIcon={<User size={20} color="#8CE600" />}
            />

            <TextInput
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              error={errors.email}
              helperText={errors.email}
              showLabel="Email Address *"
              inputBgColor="#2A2A2A"
              type="email"
              disabled={true}
              InputStartIcon={<Mail size={20} color="#8CE600" />}
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

export default PersonalSettings;
