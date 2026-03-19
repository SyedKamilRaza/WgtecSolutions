import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, MenuItem } from "@mui/material";
import DateRangeFilter from "../../components/dateRangeFilter";
import CustomSelect from "../../components/customSelect";
import ProgressCard from "../../components/progressCard";
import { getProposal } from "../../api/module/proposal";
import { fetchProjectProgressByProposalId } from "../../api/module/projectProgress";
import { useSnackbar } from "notistack";
import useUserStore from "../../zustand/useUserStore";
import ProgressCardSkeleton from "../../components/skeleton/progressCardSkeleton";

const STORAGE_KEY = "projectProgressFilters";

const ProjectsProgressManagement = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useUserStore();

  // State management
  const [projectsProgressData, setProjectsProgressData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState("");
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState({
    startDate: null,
    endDate: null,
    hasRange: false,
  });

  // Load filters from localStorage on mount
  useEffect(() => {
    try {
      const savedFilters = localStorage.getItem(STORAGE_KEY);
      if (savedFilters) {
        const parsed = JSON.parse(savedFilters);

        if (parsed.selectedProposal) {
          setSelectedProposal(parsed.selectedProposal);
        }

        if (parsed.dateFilter) {
          setDateFilter({
            startDate: parsed.dateFilter.startDate ? new Date(parsed.dateFilter.startDate) : null,
            endDate: parsed.dateFilter.endDate ? new Date(parsed.dateFilter.endDate) : null,
            hasRange: parsed.dateFilter.hasRange || false,
          });
        }
      }
    } catch (error) {
      console.error("Error loading saved filters:", error);
    }
  }, []);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    try {
      const filtersToSave = {
        selectedProposal,
        dateFilter: {
          startDate: dateFilter.startDate ? dateFilter.startDate.toISOString() : null,
          endDate: dateFilter.endDate ? dateFilter.endDate.toISOString() : null,
          hasRange: dateFilter.hasRange,
        },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtersToSave));
    } catch (error) {
      console.error("Error saving filters:", error);
    }
  }, [selectedProposal, dateFilter]);

  // Initial proposals fetch
  useEffect(() => {
    if (user?.email) {
      fetchProposals();
    }
  }, [user?.email]);

  // Fetch project progress when proposal is selected
  useEffect(() => {
    if (selectedProposal) {
      fetchProjectProgress(selectedProposal);
    } else {
      setProjectsProgressData([]);
      setFilteredData([]);
    }
  }, [selectedProposal]);

  // Apply filters whenever data or date filter changes
  useEffect(() => {
    applyFilters();
  }, [projectsProgressData, dateFilter]);

  // Fetch all proposals
  const fetchProposals = async () => {
    setIsLoading(true);
    try {
      const response = await getProposal();
      if (response.status === 200 || response.status === 201) {
        const proposalsList = response.data?.data?.proposals || [];
        const formatted = proposalsList.map((p) => ({
          id: p._id,
          proposalId: p.proposalId,
          email: p.email,
          fullname: p.fullname,
          company: p.company,
        }));

        // Filter proposals based on user role
        const userEmail = user?.email?.toLowerCase();
        const isAdmin = userEmail === "admin@admin.com";
        const filteredProposals = isAdmin
          ? formatted
          : userEmail
            ? formatted.filter((p) => p.email?.toLowerCase() === userEmail)
            : [];

        setProposals(filteredProposals);
      } else {
        enqueueSnackbar(response.data.message || "Failed to fetch proposals", {
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error fetching proposals:", error);
      enqueueSnackbar("Something went wrong while fetching proposals", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch project progress phases for selected proposal
  const fetchProjectProgress = async (proposalId) => {
    setIsLoading(true);
    try {
      const response = await fetchProjectProgressByProposalId(proposalId);
      const phases = response?.data?.data || [];

      // Format and sort phases by createdAt (newest first)
      const formatted = phases
        .map((phase) => ({
          id: phase._id,
          date: phase.createdAt || new Date().toISOString(),
          title: phase.title || "Untitled Phase",
          description: phase.description || "",
          images: Array.isArray(phase.images) ? phase.images : [],
          proposalId: phase.proposalId?.proposalId || phase.proposalId?._id,
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by newest first

      setProjectsProgressData(formatted);
    } catch (error) {
      console.error("Error fetching project progress:", error);
      enqueueSnackbar("Failed to fetch project progress", {
        variant: "error",
      });
      setProjectsProgressData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Get proposal details by ID
  const getProposalDetails = (proposalId) => {
    if (!proposals || proposals.length === 0) return null;
    const found = proposals.find(
      (p) => String(p.id) === String(proposalId) || String(p.proposalId) === String(proposalId)
    );
    if (!found) return null;
    return {
      fullname: found.fullname || "-",
      company: found.company || "N/A",
      proposalId: found.proposalId,
    };
  };

  // Apply all active filters
  const applyFilters = () => {
    let filtered = [...projectsProgressData];

    // Apply date range filter
    const { startDate, endDate, hasRange } = dateFilter;
    if (hasRange && (startDate || endDate)) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date);
        if (startDate && endDate) {
          return itemDate >= startDate && itemDate <= endDate;
        } else if (startDate) {
          return itemDate >= startDate;
        } else if (endDate) {
          return itemDate <= endDate;
        }
        return true;
      });
    }

    setFilteredData(filtered);
  };

  // Event handlers
  const handleDateRangeChange = ({ startDate, endDate, hasRange }) => {
    setDateFilter({ startDate, endDate, hasRange });
  };

  const handleProposalChange = (proposalId) => {
    setSelectedProposal(proposalId);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedProposal("");
    setDateFilter({
      startDate: null,
      endDate: null,
      hasRange: false,
    });
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Main Heading */}
      <Box sx={{ mb: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box sx={{ textAlign: "left", mb: 4 }}>
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
              Projects Progress Management
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#B0B0B0", fontSize: "16px" }}
            >
              Track and monitor project milestones and achievements
            </Typography>
          </Box>
        </Stack>

        {/* Filters */}
        <Box sx={{ mb: 4, display: "flex", gap: 2, alignItems: "center", justifyContent: "flex-end" }}>
          <Box sx={{ minWidth: 300 }}>
            <CustomSelect
              value={selectedProposal}
              onChange={(e) => handleProposalChange(e.target.value)}
              placeholder="Select a proposal"
              height={"50px"}
              disabled={isLoading && proposals.length === 0}
            >
              {proposals.map((proposal) => (
                <MenuItem key={proposal.id} value={proposal.id}>
                  <Typography variant="body2" color="#FFFFFF">
                    #{proposal.proposalId} - {proposal.fullname}
                  </Typography>
                </MenuItem>
              ))}
            </CustomSelect>
          </Box>
          <DateRangeFilter
            onDateRangeChange={handleDateRangeChange}
            placeholder="Filter by date range"
            initialStartDate={dateFilter.startDate}
            initialEndDate={dateFilter.endDate}
          />

          {/* Clear Filters Button */}
          {(selectedProposal || dateFilter.hasRange) && (
            <Box
              onClick={handleClearFilters}
              sx={{
                cursor: "pointer",
                px: 2,
                py: 1,
                borderRadius: 1,
                border: "1px solid #8CE600",
                color: "#8CE600",
                fontSize: "14px",
                fontWeight: 500,
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "rgba(140, 230, 0, 0.1)",
                },
              }}
            >
              Clear Filters
            </Box>
          )}
        </Box>

        {/* Progress Cards */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <ProgressCardSkeleton key={index} />
            ))
          ) : filteredData.length === 0 ? (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", color: "text.secondary" }}
            >
              No Project Progress Found
            </Typography>
          ) : (
            filteredData.map((item) => (
              <ProgressCard
                key={item.id}
                item={item}
                getProposalDetails={getProposalDetails}
              />
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectsProgressManagement;