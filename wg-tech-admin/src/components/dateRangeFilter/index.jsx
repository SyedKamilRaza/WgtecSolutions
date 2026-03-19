import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Box, Typography, Button, Paper } from "@mui/material";
import { Calendar, X, Filter } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

const DateRangeFilter = ({ 
  onDateRangeChange, 
  placeholder = "Select Date Range",
  showClearButton = true,
  showFilterButton = true 
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date && endDate && date > endDate) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleApplyFilter = () => {
    if (onDateRangeChange) {
      onDateRangeChange({
        startDate,
        endDate,
        hasRange: !!(startDate && endDate)
      });
    }
    setIsOpen(false);
  };

  const handleClearFilter = () => {
    setStartDate(null);
    setEndDate(null);
    if (onDateRangeChange) {
      onDateRangeChange({
        startDate: null,
        endDate: null,
        hasRange: false
      });
    }
  };

  const formatDateRange = () => {
    if (startDate && endDate) {
      return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    } else if (startDate) {
      return `From ${startDate.toLocaleDateString()}`;
    } else if (endDate) {
      return `Until ${endDate.toLocaleDateString()}`;
    }
    return placeholder;
  };

  return (
    <Box sx={{ position: "relative" }}>
      {/* Custom Input Button */}
      <Button
        variant="outlined"
        startIcon={<Calendar size={16} />}
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          backgroundColor: "#1A1A1A",
          border: "1px solid #333333",
          borderRadius: "12px",
          color: "#FFFFFF",
          px: 3,
          py: 1.5,
          minWidth: "280px",
          justifyContent: "flex-start",
          textTransform: "none",
          fontSize: "14px",
          fontWeight: 500,
          "&:hover": {
            backgroundColor: "#2A2A2A",
            borderColor: "#8CE600",
          },
          "&:focus": {
            borderColor: "#8CE600",
            boxShadow: "0 0 0 2px rgba(140, 230, 0, 0.2)",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Typography
            sx={{
              color: startDate || endDate ? "#FFFFFF" : "#B0B0B0",
              fontSize: "14px",
              flex: 1,
              textAlign: "left",
            }}
          >
            {formatDateRange()}
          </Typography>
          {showClearButton && (startDate || endDate) && (
            <X
              size={16}
              onClick={(e) => {
                e.stopPropagation();
                handleClearFilter();
              }}
              style={{
                color: "#B0B0B0",
                cursor: "pointer",
                marginLeft: "8px",
              }}
            />
          )}
        </Box>
      </Button>

      {/* Date Picker Dropdown */}
      {isOpen && (
        <Paper
          sx={{
            position: "absolute",
            top: "100%",
            left: -200,
            zIndex: 1000,
            mt: 1,
            backgroundColor: "#1A1A1A",
            border: "1px solid #333333",
            borderRadius: "16px",
            p: 3,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            minWidth: "400px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#FFFFFF",
              fontWeight: 600,
              mb: 2,
              fontSize: "16px",
            }}
          >
            Select Date Range
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            {/* Start Date */}
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  color: "#B0B0B0",
                  fontSize: "12px",
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                Start Date
              </Typography>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                maxDate={endDate || new Date()}
                placeholderText="Select start date"
                customInput={
                  <input
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      backgroundColor: "#2A2A2A",
                      border: "1px solid #333333",
                      borderRadius: "8px",
                      color: "#FFFFFF",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                }
                calendarClassName="custom-datepicker"
                dayClassName={(date) => {
                  if (startDate && date.getTime() === startDate.getTime()) {
                    return "start-date";
                  }
                  if (endDate && date.getTime() === endDate.getTime()) {
                    return "end-date";
                  }
                  if (startDate && endDate && date > startDate && date < endDate) {
                    return "in-range";
                  }
                  return "";
                }}
              />
            </Box>

            {/* End Date */}
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  color: "#B0B0B0",
                  fontSize: "12px",
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                End Date
              </Typography>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={new Date()}
                placeholderText="Select end date"
                customInput={
                  <input
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      backgroundColor: "#2A2A2A",
                      border: "1px solid #333333",
                      borderRadius: "8px",
                      color: "#FFFFFF",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                }
                calendarClassName="custom-datepicker"
                dayClassName={(date) => {
                  if (startDate && date.getTime() === startDate.getTime()) {
                    return "start-date";
                  }
                  if (endDate && date.getTime() === endDate.getTime()) {
                    return "end-date";
                  }
                  if (startDate && endDate && date > startDate && date < endDate) {
                    return "in-range";
                  }
                  return "";
                }}
              />
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={() => setIsOpen(false)}
              sx={{
                borderColor: "#333333",
                color: "#B0B0B0",
                textTransform: "none",
                px: 3,
                py: 1,
                "&:hover": {
                  borderColor: "#555555",
                  backgroundColor: "#2A2A2A",
                },
              }}
            >
              Cancel
            </Button>
            {showFilterButton && (
              <Button
                variant="contained"
                startIcon={<Filter size={16} />}
                onClick={handleApplyFilter}
                disabled={!startDate && !endDate}
                sx={{
                  backgroundColor: "#8CE600",
                  color: "#000000",
                  textTransform: "none",
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#7BD600",
                  },
                  "&:disabled": {
                    backgroundColor: "#333333",
                    color: "#666666",
                  },
                }}
              >
                Apply Filter
              </Button>
            )}
          </Box>
        </Paper>
      )}

      {/* Custom CSS for DatePicker */}
      <style jsx global>{`
        .custom-datepicker {
          background-color: #1A1A1A !important;
          border: 1px solid #333333 !important;
          border-radius: 12px !important;
          color: #FFFFFF !important;
        }

        .custom-datepicker .react-datepicker__header {
          background-color: #2A2A2A !important;
          border-bottom: 1px solid #333333 !important;
          border-radius: 12px 12px 0 0 !important;
        }

        .custom-datepicker .react-datepicker__current-month,
        .custom-datepicker .react-datepicker__day-name {
          color: #FFFFFF !important;
        }

        .custom-datepicker .react-datepicker__day {
          color: #FFFFFF !important;
        }

        .custom-datepicker .react-datepicker__day:hover {
          background-color: #333333 !important;
          color: #8CE600 !important;
        }

        .custom-datepicker .react-datepicker__day--selected {
          background-color: #8CE600 !important;
          color: #000000 !important;
        }

        .custom-datepicker .react-datepicker__day--in-selecting-range {
          background-color: rgba(140, 230, 0, 0.3) !important;
          color: #FFFFFF !important;
        }

        .custom-datepicker .react-datepicker__day--in-range {
          background-color: rgba(140, 230, 0, 0.2) !important;
          color: #FFFFFF !important;
        }

        .custom-datepicker .react-datepicker__day--range-start {
          background-color: #8CE600 !important;
          color: #000000 !important;
        }

        .custom-datepicker .react-datepicker__day--range-end {
          background-color: #8CE600 !important;
          color: #000000 !important;
        }

        .custom-datepicker .react-datepicker__day--disabled {
          color: #666666 !important;
        }

        .custom-datepicker .react-datepicker__navigation {
          color: #FFFFFF !important;
        }

        .custom-datepicker .react-datepicker__navigation:hover {
          color: #8CE600 !important;
        }
      `}</style>
    </Box>
  );
};

export default DateRangeFilter;
