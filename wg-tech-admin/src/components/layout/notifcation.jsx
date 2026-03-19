import React, { useState } from "react";
import {
  IconButton,
  Menu,
  Box,
  Typography,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import { Bell, Home } from "lucide-react";

const NotificationBell = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Dummy notification data
  // Dummy Food Order Notifications
  const notifications = [
    {
      id: 1,
      type: "order",
      avatar:
        "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=40&h=40&fit=crop",
      title: "🍔 Your order #1234 has been placed successfully",
      time: "Today - 10:15 AM",
    },
    {
      id: 2,
      type: "kitchen",
      avatar: null,
      title: "👨‍🍳 Order #1234 is being prepared",
      time: "Today - 10:25 AM",
      initials: "KP",
      bgColor: "#E3F2FD",
    },
    {
      id: 3,
      type: "delivery",
      icon: <Home size={20} color="#4CAF50" />,
      title: "🚴 Rider picked up your order #1234",
      time: "Today - 10:40 AM",
      bgColor: "#E8F5E8",
    },
    {
      id: 4,
      type: "delivered",
      avatar:
        "https://images.unsplash.com/photo-1600891964543-7e61f7b9c2a3?w=40&h=40&fit=crop",
      title: "✅ Order #1234 delivered successfully",
      time: "Today - 11:05 AM",
    },
    {
      id: 5,
      type: "cancelled",
      avatar: null,
      title: "❌ Order #1235 has been cancelled",
      time: "Today - 11:15 AM",
      initials: "CN",
      bgColor: "#FFEBEE",
    },
  ];

  const NotificationItem = ({ notification }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        padding: "12px 16px",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      {/* Avatar/Icon */}
      <Box sx={{ minWidth: 40 }}>
        {notification.type === "user" ? (
          <Avatar src={notification.avatar} sx={{ width: 40, height: 40 }} />
        ) : notification.type === "system" ? (
          <Avatar
            sx={{
              width: 40,
              height: 40,
              backgroundColor: notification.bgColor,
              color: notification.bgColor === "#E3F2FD" ? "#1976D2" : "#D32F2F",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {notification.initials}
          </Avatar>
        ) : (
          <Avatar
            sx={{
              width: 40,
              height: 40,
              backgroundColor: notification.bgColor,
            }}
          >
            {notification.icon}
          </Avatar>
        )}
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: "#333",
            mb: 0.5,
            lineHeight: 1.3,
          }}
        >
          {notification.title}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "#999",
            fontSize: "12px",
          }}
        >
          {notification.time}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ position: "relative" }}>
      {/* Icon with blinking dot */}
      <IconButton
        onClick={handleClick}
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          position: "relative",
        }}
      >
        <Bell size={20} color="gray" />
        {/* Blinking Dot */}
        <Box
          sx={{
            position: "absolute",
            top: 2,
            right: 3,
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "red",
            animation: "blink 1s infinite",
            "@keyframes blink": {
              "0%": { opacity: 1 },
              "50%": { opacity: 0 },
              "100%": { opacity: 1 },
            },
          }}
        />
      </IconButton>

      {/* Notification Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            borderRadius: 2,
            minWidth: 350,
            maxWidth: 400,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* Notifications List */}
        <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
          {notifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <NotificationItem notification={notification} />
              {index < notifications.length - 1 && <Divider sx={{ mx: 2 }} />}
            </React.Fragment>
          ))}
        </Box>

        {/* See All Button */}
        <Box sx={{ p: 2, borderTop: "1px solid #eee" }}>
          <Button
            fullWidth
            sx={{
              color: "#FF4081",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "#FFF0F5",
              },
            }}
            onClick={handleClose}
          >
            See all notifications →
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default NotificationBell;
