import React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ImageDialog = ({
  open,
  onClose,
  images,
  currentIndex,
  onPrevious,
  onNext,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "rgba(0, 0, 0, 0.95)",
          maxWidth: "95vw",
          maxHeight: "95vh",
          borderRadius: "12px",
          width: "95vw",
          height: "95vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        },
      }}
    >
      <DialogContent
        sx={{
          p: 0,
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 10,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.9)",
            },
          }}
        >
          <X size={24} />
        </IconButton>

        {/* Previous Button */}
        {images.length > 1 && (
          <IconButton
            onClick={onPrevious}
            sx={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.9)",
              },
            }}
          >
            <ChevronLeft size={32} />
          </IconButton>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <IconButton
            onClick={onNext}
            sx={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.9)",
              },
            }}
          >
            <ChevronRight size={32} />
          </IconButton>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "#FFFFFF",
              px: 2,
              py: 1,
              borderRadius: "20px",
            }}
          >
            <Typography variant="body2">
              {currentIndex + 1} / {images.length}
            </Typography>
          </Box>
        )}

        {/* Main Image */}
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            borderRadius: "8px",
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
