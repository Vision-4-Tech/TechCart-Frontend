import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

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
            Your browser does not support the video tag.
          </video>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LiveDemo;
