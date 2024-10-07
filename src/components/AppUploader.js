// src/components/UploadApp.js
import React, { useState } from "react";
import { Button, Typography, Box, LinearProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function AppUploader({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      // Simulating upload progress
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            setUploading(false);
            onUploadSuccess();
            return 100;
          }
          return prevProgress + 10;
        });
      }, 500);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Upload New App
      </Typography>
      <input
        accept=".apk,.aab"
        style={{ display: "none" }}
        id="raised-button-file"
        type="file"
        onChange={handleFileUpload}
      />
      <label htmlFor="raised-button-file">
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
          disabled={uploading}
        >
          Choose APK/AAB File
        </Button>
      </label>
      {uploading && (
        <Box sx={{ width: "100%", mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      )}
    </Box>
  );
}

export default AppUploader;
