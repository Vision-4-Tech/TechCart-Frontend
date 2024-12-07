import React from 'react'
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
          maxWidth: 400,
          padding: 3,
          textAlign: "center",
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            Coming Soon!
          </Typography>
          <Typography variant="body1" color="textSecondary">
            We are working hard to bring this feature to you. Stay tuned!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LiveDemo