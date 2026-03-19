import { IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { Settings2, LogOutIcon } from "lucide-react";

const MotionIconButton = motion(IconButton);

export default function ActionButtons({ handleNavigation, handleLogout }) {
  return (
    <div
      style={{
        display: "flex",
        padding: "16px",
        borderRadius: "12px",
        alignItems: "center",
        justifyContent: "center",
        gap: "22px",

      }}
    >
      {/* Settings Button */}
      <MotionIconButton
        whileHover={{ scale: 1.15, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        sx={{
          backgroundColor: "#1A1A1A",
          boxShadow: "0 4px 20px rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          padding: "10px",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "#262626",
            boxShadow: "0 6px 25px rgba(255, 255, 255, 0.15)",
          },
        }}
        onClick={() => handleNavigation("/settings")}
      >
        <Settings2 size={22} color="#9CA3AF" />
      </MotionIconButton>

      {/* Logout Button */}
      <MotionIconButton
        whileHover={{ scale: 1.15, rotate: -10 }}
        whileTap={{ scale: 0.9 }}
        sx={{
          backgroundColor: "#1A1A1A",
          boxShadow: "0 4px 20px rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          padding: "10px",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "#262626",
            boxShadow: "0 6px 25px rgba(255, 255, 255, 0.15)",
          },
        }}
        onClick={handleLogout}
      >
        <LogOutIcon size={22} color="#9CA3AF" />
      </MotionIconButton>
    </div>
  );
}
