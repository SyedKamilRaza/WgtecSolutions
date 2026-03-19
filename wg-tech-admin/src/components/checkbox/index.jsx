import React from "react";
import PropTypes from "prop-types";
import { Checkbox, FormControlLabel, useTheme } from "@mui/material";

function CustomCheckbox({
  label,
  labelPlacement = "end",
  disabled = false,
  defaultStyle = true,
  style,
  onChange,
  checked,
  ...props
}) {
  const { palette } = useTheme();

  const useStyle = {
    "& .MuiCheckbox-root": {
      color: palette.customColor?.coolGrey || "#9E9E9E",
      marginRight: "2px", 
      marginLeft: "2px",
      "&.Mui-checked": {
        color: palette.primary?.main || "#1976d2",
      },
      "&.Mui-disabled": {
        color: palette.action?.disabled || "#BDBDBD",
      },
    },
    "& .MuiFormControlLabel-label": {
      fontSize: "1rem",
      color: palette.text?.primary || "#000000",
      "&.Mui-disabled": {
        color: palette.action?.disabled || "#BDBDBD",
      },
    },
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
      }
      label={label}
      labelPlacement={labelPlacement}
      disabled={disabled}
      sx={defaultStyle ? useStyle : style}
    />
  );
}

CustomCheckbox.propTypes = {
  label: PropTypes.string,
  labelPlacement: PropTypes.oneOf(["top", "start", "bottom", "end"]),
  disabled: PropTypes.bool,
  defaultStyle: PropTypes.bool,
  style: PropTypes.object,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

CustomCheckbox.defaultProps = {
  labelPlacement: "end",
  disabled: false,
  defaultStyle: true,
};

export default CustomCheckbox;
