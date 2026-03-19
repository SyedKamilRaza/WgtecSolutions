import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const VideoScreen = ({ videoSource, onVideoEnd, isAccessGranted }) => {
  const videoRef = useRef(null);
  
  console.log("VideoScreen rendered with:", { videoSource, isAccessGranted });
  
  useEffect(() => {
    // Auto navigate after 5 seconds
    const timer = setTimeout(() => {
      console.log("5 seconds completed, navigating...");
      onVideoEnd();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onVideoEnd]);
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        overflow: 'hidden',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={onVideoEnd}
        onError={(e) => {
          console.error("Video error:", e);
          console.error("Video source:", videoSource);
        }}
        onLoadStart={() => {
          console.log("Video load started:", videoSource);
        }}
        onCanPlay={() => {
          console.log("Video can play:", videoSource);
        }}
        onPlay={() => {
          console.log("Video started playing:", videoSource);
        }}
        style={{
          width: '100vw',
          height: '100%',
          objectFit: 'contain',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        controls={false}
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};

export default VideoScreen;
