import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import AppList from "./AppList";
import AppUploader from "./AppUploader";

function PlayConsoleManager() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Play Console Manager
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <AppUploader
            onUploadSuccess={() => {
              /* Refresh app list */
            }}
          />
        </Paper>
        <Paper elevation={3} sx={{ p: 3 }}>
          <AppList />
        </Paper>
      </Box>
    </Container>
  );
}

export default PlayConsoleManager;
