import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";


const TextEditor = ({
  value = "",
  onChange,
  placeholder = "Enter text...",
  error = false,
  helperText = "",
  label = "",
  required = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Box>
      {label && (
        <Typography
          variant="body2"
          color="#FFFFFF"
          mb={1}
          sx={{ fontWeight: 500 }}
        >
          {label} {required && "*"}
        </Typography>
      )}

      <Box
        sx={{
          borderRadius: "8px",
          border: `1px solid ${
            error ? "#f44336" : isFocused ? "#1976d2" : "#444"
          }`,
          background: "#2A2A2A",
          "& .ql-toolbar": {
            border: "none",
            background: "#1E1E1E",
            borderBottom: "1px solid #444",
          },
          "& .ql-container": {
            border: "none",
            background: "#2A2A2A",
            color: "#fff",
            minHeight: "150px",
          },
          "& .ql-editor": {
            color: "#fff",
            minHeight: "120px",
          },
          "& .ql-editor.ql-blank::before": {
            color: "#aaa",
          },
        }}
      >
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          {...props}
        />
      </Box>

      {error && helperText && (
        <Typography
          variant="caption"
          color="error"
          sx={{ mt: 0.5, display: "block" }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default TextEditor;
