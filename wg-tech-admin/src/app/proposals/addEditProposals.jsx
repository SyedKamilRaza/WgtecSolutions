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
  Chip,
  Slider,
  Avatar,
  FormControl,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Edit,
  User,
  DollarSign,
  MessageSquare,
  Package,
} from "lucide-react";
import TextInput from "../../components/textInput";
import CustomSelect from "../../components/customSelect";
import { MenuItem } from "@mui/material";
import CustomButton from "../../components/customButton";
import { optionGetWorkSubServiceById } from "../../api/module/work";

const AddEditProposalsDialog = ({
  open,
  onClose,
  onSave,
  editData = null,
  isEdit = false,
  services,
}) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    company: "",
    services: [],
    subServices: [],
    budget: 15000,
    messages: "",
    status: "Pending",
  });
  const [errors, setErrors] = useState({});
  const [availableSubServices, setAvailableSubServices] = useState([]);
  // staged selection state
  const [currentServiceId, setCurrentServiceId] = useState("");
  const [currentSubServiceId, setCurrentSubServiceId] = useState("");
  const [selectedPairs, setSelectedPairs] = useState([]); // [{serviceId, subServiceId}]
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [subDropdownOpen, setSubDropdownOpen] = useState(false);
  const [subServiceMap, setSubServiceMap] = useState({}); // id -> { title }

  // Budget range for slider
  const minBudget = 1000;
  const maxBudget = 100000;

  // Status options
  const statusOptions = [
    { label: "Pending", value: "Pending" },
    { label: "In Progress", value: "In Progress" },
    { label: "Locked", value: "Locked" },
    { label: "Completed", value: "Completed" },
  ];

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      if (isEdit && editData) {
        setFormData({
          fullname: editData.fullname || "",
          email: editData.email || "",
          phone: editData.phone || "",
          company: editData.company || "",
          services: Array.isArray(editData.services) ? editData.services.map(String) : [],
          subServices: Array.isArray(editData.subServices) ? editData.subServices.map(String) : [],
          budget:
            typeof editData.budget === "number"
              ? editData.budget
              : Number(String(editData.budget || "0").replace(/[^0-9.-]/g, "")) || 15000,
          messages: editData.messages || "",
          status: editData.status || "Pending",
        });
      } else {
        setFormData({
          fullname: "",
          email: "",
          phone: "",
          company: "",
          services: [],
          subServices: [],
          budget: 15000,
          messages: "",
          status: "Pending",
        });
      }
      setErrors({});
    }
  }, [open, isEdit, editData]);
  useEffect(() => {
    if (!open || !currentServiceId) {
      setAvailableSubServices([]);
      return;
    }
    fetchSubServicesForService(currentServiceId);
  }, [open, currentServiceId]);

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
  const clearFieldError = (field) => {
    if (!errors[field]) return;
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    clearFieldError(field);
  };
  const fetchSubServicesForService = async (serviceId) => {
    try {
      const response = await optionGetWorkSubServiceById(String(serviceId));
      if (response.status === 200 || response.status === 201) {
        const rawData = response.data?.data;
        const subServiceList = Array.isArray(rawData)
          ? rawData
          : Array.isArray(rawData?.subServices)
          ? rawData.subServices
          : [];
        const formatted = subServiceList.map((item) => ({
          id: String(item._id),
          title: item.title || "",
          serviceId: String(item.serviceId?._id || item.serviceId || serviceId),
        }));
        setAvailableSubServices(formatted);
        setSubServiceMap((prev) => {
          const next = { ...prev };
          formatted.forEach((f) => {
            next[f.id] = { title: f.title };
          });
          return next;
        });
      } else {
        setAvailableSubServices([]);
      }
    } catch (error) {
      console.error("Error fetching sub-services:", error);
      setAvailableSubServices([]);
    }
  };
  const handleSelectService = (serviceId) => {
    setCurrentServiceId(String(serviceId));
    setCurrentSubServiceId("");
    clearFieldError("services");
    clearFieldError("subServices");
    setServiceDropdownOpen(false);
    setSubDropdownOpen(true);
  };
  const handleSubServiceChange = (event) => {
    const value = String(event.target.value || "");
    setCurrentSubServiceId(value);
    clearFieldError("subServices");
    // Auto-add pair on selection
    if (currentServiceId && value) {
      // persist title for this sub-service immediately
      const picked = availableSubServices.find((s) => String(s.id) === String(value));
      if (picked) {
        setSubServiceMap((prev) => ({ ...prev, [picked.id]: { title: picked.title } }));
      }
      const newPair = { serviceId: String(currentServiceId), subServiceId: value };
      setSelectedPairs((prev) => {
        const exists = prev.some(
          (p) => p.serviceId === newPair.serviceId && p.subServiceId === newPair.subServiceId
        );
        if (exists) return prev;
        return [...prev, newPair];
      });
      // reset sub-service select for quick next add
      setTimeout(() => setCurrentSubServiceId(""), 0);
      setSubDropdownOpen(false);
    }
  };
  const removePair = (serviceId, subServiceId) => {
    setSelectedPairs((prev) =>
      prev.filter((p) => !(p.serviceId === serviceId && p.subServiceId === subServiceId))
    );
  };
  // keep formData arrays in sync with selectedPairs
  useEffect(() => {
    const services = Array.from(new Set(selectedPairs.map((p) => p.serviceId)));
    const subServices = Array.from(new Set(selectedPairs.map((p) => p.subServiceId)));
    setFormData((prev) => ({ ...prev, services, subServices }));
  }, [selectedPairs]);
  // prefill pairs on edit
  useEffect(() => {
    const prefill = async () => {
      if (!open || !isEdit || !editData) return;
      const svcIds = Array.isArray(editData.services) ? editData.services.map(String) : [];
      const subIds = Array.isArray(editData.subServices) ? editData.subServices.map(String) : [];
      if (!svcIds.length || !subIds.length) {
        setSelectedPairs([]);
        return;
      }
      // For each service, fetch its subs then intersect with subIds
      try {
        const results = await Promise.all(
          svcIds.map((sid) => optionGetWorkSubServiceById(String(sid)))
        );
        const pairs = [];
        results.forEach((resp, idx) => {
          if (resp.status === 200 || resp.status === 201) {
            const raw = resp.data?.data;
            const list = Array.isArray(raw) ? raw : raw?.subServices || [];
            // cache titles for all returned subs
            setSubServiceMap((prev) => {
              const next = { ...prev };
              list.forEach((s) => {
                next[String(s._id)] = { title: s.title || "" };
              });
              return next;
            });
            const mapped = list.map((s) => String(s._id));
            const intersect = subIds.filter((id) => mapped.includes(String(id)));
            intersect.forEach((sid) =>
              pairs.push({ serviceId: String(svcIds[idx]), subServiceId: String(sid) })
            );
          }
        });
        setSelectedPairs(pairs);
      } catch {
        setSelectedPairs([]);
      }
    };
    prefill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isEdit, editData]);
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Client name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!Array.isArray(formData.services) || formData.services.length === 0) {
      newErrors.services = "At least one service is required";
    }


        if (!Array.isArray(formData.subServices) || formData.subServices.length === 0) {
      newErrors.subServices = "At least one sub-service is required";
    }


    if (!formData.budget || formData.budget < 1000) {
      newErrors.budget = "Budget is required (minimum $1,000)";
    }

    if (!formData.messages.trim()) {
      newErrors.messages = "Project description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        ...formData,
        budget: String(formData.budget),
      });
    }
  };

  const handleClose = () => {
    setFormData({
      fullname: "",
      email: "",
      phone: "",
      company: "",
      services: [],
      subServices: [],
      budget: 15000,
      messages: "",
      status: "Pending",
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
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
                      {isEdit ? "Edit Proposal" : "Add New Proposal"}
                    </Typography>
                    <Typography variant="body2">
                      {isEdit
                        ? "Update proposal information"
                        : "Create a new client proposal"}
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
                {/* Client Information Section */}
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
                    Client Information
                  </Typography>

                  <Box display="flex" gap={2} mb={2}>
                    {/* Client Name */}
                    <Box flex={1}>
                      <TextInput
                        placeholder="Enter client full name"
                        value={formData.fullname}
                        onChange={(e) =>
                          handleInputChange("fullname", e.target.value)
                        }
                        error={errors.fullname}
                        helperText={errors.fullname}
                        showLabel="Client Name *"
                        inputBgColor="#2A2A2A"
                      />
                    </Box>

                    {/* Client Email */}
                    <Box flex={1}>
                      <TextInput
                        placeholder="Enter client email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        error={errors.email}
                        helperText={errors.email}
                        showLabel="Client Email *"
                        inputBgColor="#2A2A2A"
                        type="email"
                      />
                    </Box>
                  </Box>

                  <Box display="flex" gap={2}>
                    {/* Phone Number */}
                    <Box flex={1}>
                      <TextInput
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        error={errors.phone}
                        helperText={errors.phone}
                        showLabel="Phone Number *"
                        inputBgColor="#2A2A2A"
                      />
                    </Box>

                    {/* Company */}
                    <Box flex={1}>
                      <TextInput
                        placeholder="Enter company name"
                        value={formData.company}
                        onChange={(e) =>
                          handleInputChange("company", e.target.value)
                        }
                        showLabel="Company Name"
                        inputBgColor="#2A2A2A"
                      />
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ borderColor: "#333" }} />

                {/* Step 1: Pick a Service */}
                <Box>
                  <Typography variant="body2" color="#FFFFFF" sx={{ mb: 1 }}>
                    Service *
                  </Typography>
                  <CustomSelect
                    value={currentServiceId || ""}
                    onChange={(event) => handleSelectService(event.target.value)}
                    placeholder="Select a service"
                    error={!!errors.services}
                    disabled={services?.length === 0}
                    open={serviceDropdownOpen}
                    onOpen={() => setServiceDropdownOpen(true)}
                    onClose={() => setServiceDropdownOpen(false)}
                  >
                    {services?.map((service) => (
                      <MenuItem key={service.id} value={service.id}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Avatar
                            src={service.image}
                            alt={service.title}
                            sx={{ width: 24, height: 24 }}
                          />
                          <Typography variant="body2" color="#FFFFFF">
                            {service.title}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </CustomSelect>
                  {errors.services && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mt: 1, display: "block" }}
                    >
                      {errors.services}
                    </Typography>
                  )}
                </Box>

                {/* Step 2: Pick Sub-Service for selected Service (auto-add) */}
                {currentServiceId && (
                  <Box>
                    <Typography variant="body2" color="#FFFFFF" sx={{ mb: 1 }}>
                      Sub-Service for selected service
                    </Typography>
                    <FormControl
                      fullWidth
                      error={!!errors.subServices}
                      sx={{
                        backgroundColor: "#2A2A2A",
                        borderRadius: "8px",
                        border: "1px solid #2A2A2A",
                        "& .MuiOutlinedInput-input": {
                          color: "#fff",
                        },
                        "&:hover": { borderColor: "#D1D5DB" },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                      }}
                    >
                      <Select
                        value={currentSubServiceId}
                        onChange={handleSubServiceChange}
                        input={<OutlinedInput />}
                        open={subDropdownOpen}
                        onOpen={() => setSubDropdownOpen(true)}
                        onClose={() => setSubDropdownOpen(false)}
                        sx={{
                          color: "#fff",
                          "& .MuiOutlinedInput-input": {
                            color: "#fff",
                          },
                        }}
                      >
                        {availableSubServices.map((subService) => (
                          <MenuItem key={subService.id} value={subService.id}>
                            <ListItemText primary={subService.title} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {errors.subServices && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ mt: 1, display: "block" }}
                      >
                        {errors.subServices}
                      </Typography>
                    )}
                  </Box>
                )}

                {/* Step 3: Selected (Service - Sub-Service) chips */}
                {selectedPairs.length > 0 && (
                  <Box>
                    <Divider sx={{ borderColor: "#333", my: 2 }} />
                    <Typography variant="body2" color="#FFFFFF" sx={{ mb: 1 }}>
                      Selected
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {selectedPairs.map((pair, idx) => {
                        const svc = (services || []).find(
                          (s) => String(s.id) === String(pair.serviceId)
                        );
                        const sub = subServiceMap[pair.subServiceId];
                        const label = `${svc?.title || ""} - ${sub?.title || ""}`.trim();
                        return (
                          <Chip
                            key={`${pair.serviceId}-${pair.subServiceId}-${idx}`}
                            label={label}
                            onDelete={() => removePair(pair.serviceId, pair.subServiceId)}
                            sx={{
                              backgroundColor: "#8CE600",
                              color: "#000",
                              fontWeight: 600,
                            }}
                          />
                        );
                      })}
                    </Box>
                  </Box>
                )}

                <Divider sx={{ borderColor: "#333" }} />

                {/* Budget and Status Section */}
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
                    <DollarSign size={20} />
                    Budget & Status
                  </Typography>

                  <Box display="flex" gap={2}>
                    {/* Budget Slider */}
                    <Box flex={1}>
                      <Typography variant="body2" sx={{ color: "#ccc", mb: 2 }}>
                        Budget: ${formData.budget?.toLocaleString()}
                      </Typography>
                      <Slider
                        value={formData.budget}
                        onChange={(e, newValue) =>
                          handleInputChange("budget", newValue)
                        }
                        valueLabelDisplay="auto"
                        min={minBudget}
                        max={maxBudget}
                        step={1000}
                        valueLabelFormat={(value) =>
                          `$${value.toLocaleString()}`
                        }
                        sx={{
                          color: "#8CE600",
                          "& .MuiSlider-thumb": {
                            backgroundColor: "#8CE600",
                            border: "2px solid #fff",
                            "&:hover": {
                              boxShadow: "0 0 0 8px rgba(140, 230, 0, 0.16)",
                            },
                          },
                          "& .MuiSlider-track": {
                            backgroundColor: "#8CE600",
                            border: "none",
                          },
                          "& .MuiSlider-rail": {
                            backgroundColor: "#333",
                          },
                          "& .MuiSlider-valueLabel": {
                            backgroundColor: "#8CE600",
                            color: "#000",
                            fontWeight: 600,
                          },
                        }}
                      />
                      {errors.budget && (
                        <Typography
                          variant="caption"
                          sx={{ color: "#f44336", mt: 1, display: "block" }}
                        >
                          {errors.budget}
                        </Typography>
                      )}
                    </Box>

                    {/* Status */}
                    <Box flex={1}>
                      <CustomSelect
                        placeholder="Select status"
                        value={formData.status}
                        onChange={(e) =>
                          handleInputChange("status", e.target.value)
                        }
                      >
                        {statusOptions.map((status) => (
                          <MenuItem key={status.value} value={status.value}>
                            {status.label}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ borderColor: "#333" }} />

                {/* Project Description Section */}
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
                    <MessageSquare size={20} />
                    Project Description
                  </Typography>

                  <TextInput
                    placeholder="Enter detailed project description"
                    value={formData.messages}
                    onChange={(e) =>
                      handleInputChange("messages", e.target.value)
                    }
                    error={errors.messages}
                    helperText={errors.messages}
                    showLabel="Project Description *"
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
                    btnLabel={isEdit ? "Update Proposal" : "Add Proposal"}
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

export default AddEditProposalsDialog;
