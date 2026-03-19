import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VideoScreen from "../../components/videoScreen";
import accessDeniedVideo from "../../assets/access-denied.mp4";
import accessDeniedImage from "../../assets/accessDenied.gif";
import { Box } from "@mui/material";

const AccessDenied = () => {
  const navigate = useNavigate();

  const handleVideoEnd = () => {
    // Navigate back to login after video ends
    navigate("/login");
  };

  useEffect(() => {
    // Auto navigate after 5 seconds if video doesn't end naturally
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    // <VideoScreen
    //   videoSource={accessDeniedVideo}
    //   onVideoEnd={handleVideoEnd}
    //   isAccessGranted={false}
    // />
    <>
      <Box sx={{ width: "100%", height: "100vh" ,overflow: "hidden" }}>
        <img
          src={accessDeniedImage}
          alt="access denied"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>
    </>
  );
};

export default AccessDenied;
