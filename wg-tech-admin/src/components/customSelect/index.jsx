import {
  FormControl,
  InputAdornment,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import { ChevronDown } from "lucide-react";
const CustomSelect = ({
  icon = null,
  placeholder = "Select",
  value,
  isDisabled = false,
  children,
  onChange,
  height,
  ...props
}) => {
  // Extract label from children based on current value
  const getSelectedLabel = () => {
    const childArray = React.Children.toArray(children);
    const selectedChild = childArray.find(
      (child) => child?.props?.value === value
    );
    return selectedChild?.props?.children || placeholder;
  };

  return (
    <FormControl
      fullWidth
      sx={{
        backgroundColor: "#2A2A2A",
        borderRadius: "8px",
        border: "1px solid #2A2A2A",
        "& .MuiOutlinedInput-input": {
          color: "#fff",
          padding: "12px 12px",
        },
        "&:hover": { borderColor: "#D1D5DB" },
        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
      }}
    >
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
        // IconComponent={<ChevronDown size={20} color="#000" />}
        disabled={isDisabled}
        startAdornment={
          icon && <InputAdornment position="start">{icon}</InputAdornment>
        }
        renderValue={() => (
          <Typography
            variant="body2"
            color={value ? "textPrimary" : "textSecondary"}
          >
            {getSelectedLabel()}
          </Typography>
        )}
        sx={{
          padding: "0px 12px",
          height: height ? height : "36px",
          color: "#374151",
          "& .MuiOutlinedInput-input": {
            color: "#fff",
            padding: "0px 12px",
          },
        }}
        {...props}
      >
        <MenuItem value="" disabled>
          <span style={{ color: "#fff", fontSize: "12px" }}>{placeholder}</span>
        </MenuItem>
        {children}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
