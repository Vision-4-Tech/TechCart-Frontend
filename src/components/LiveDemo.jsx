import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
// import video from '../components/assets/Video/VN20241208_175309.mp4'
const LiveDemo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Card
        sx={{
          maxWidth: 800,
          padding: 3,
          textAlign: "center",
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Live Demo
          </Typography>
          <video
            controls
            style={{
              width: "100%",
              borderRadius: "8px",
            }}
          >
{/*             <source src={video} type="video/mp4" /> */}
            Your browser does not support the video tag.
          </video>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LiveDemo;
