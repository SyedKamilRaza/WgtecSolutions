import { InputLabel } from "@mui/material";
import React from "react";

function CustomInputLabel({ label }) {
  return (
    <InputLabel
      sx={{ fontFamily: "Poppins", mb: 1, color: "#fff", fontWeight: 500 , fontSize: "12px" }}
    >
      {label}
    </InputLabel>
  );
}

export default CustomInputLabel;
