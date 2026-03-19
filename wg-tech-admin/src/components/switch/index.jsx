import { FormControlLabel, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 36,
  height: 19,
  padding: 0,
  margin: 0, // Remove margin for table usage
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#4CAF50", // Green when ON
        opacity: 1,
        border: 0,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.5,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 15,
    height: 15,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#f44336", // Red when OFF
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function CustomSwitch({ label, onChange, checked = false, showLabel = false }) {
  if (showLabel && label) {
    return (
      <FormControlLabel
        control={<IOSSwitch size="small" checked={checked} onChange={onChange} />}
        label={label}
      />
    );
  }
  
  // Return just the switch without label for table usage
  return <IOSSwitch size="small" checked={checked} onChange={onChange} />;
}
