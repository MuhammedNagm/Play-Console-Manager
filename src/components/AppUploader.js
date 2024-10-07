// src/components/UploadApp.js
import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  LinearProgress,
  TextField,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

function AppUploader({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [appDetails, setAppDetails] = useState({
    title: "",
    packageName: "",
    description: "",
    shortDescription: "",
    versionCode: "",
    versionName: "",
    releaseNotes: "",
    category: "",
    contentRating: "",
    price: "",
  });

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append(
      "apkFile",
      document.getElementById("raised-button-file").files[0]
    );

    // Append all app details to formData
    Object.keys(appDetails).forEach((key) => {
      formData.append(key, appDetails[key]);
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/play-console/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store the token in localStorage
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      setUploading(false);
      onUploadSuccess(response.data);
    } catch (error) {
      console.error("Error uploading app:", error);
      setUploading(false);
      // Handle error (e.g., show an error message to the user)
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 3 }}
      encType="multipart/form-data"
    >
      <Typography variant="h4" gutterBottom>
        Upload New App
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          App Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="App Title"
              value={appDetails.title}
              onChange={(e) =>
                setAppDetails({ ...appDetails, title: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Package Name"
              value={appDetails.packageName}
              onChange={(e) =>
                setAppDetails({ ...appDetails, packageName: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Full Description"
              value={appDetails.description}
              onChange={(e) =>
                setAppDetails({ ...appDetails, description: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Short Description"
              value={appDetails.shortDescription}
              onChange={(e) =>
                setAppDetails({
                  ...appDetails,
                  shortDescription: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          App Version
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Version Code"
              value={appDetails.versionCode}
              onChange={(e) =>
                setAppDetails({ ...appDetails, versionCode: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Version Name"
              value={appDetails.versionName}
              onChange={(e) =>
                setAppDetails({ ...appDetails, versionName: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Release Notes"
              value={appDetails.releaseNotes}
              onChange={(e) =>
                setAppDetails({ ...appDetails, releaseNotes: e.target.value })
              }
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Store Listing
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={appDetails.category}
                onChange={(e) =>
                  setAppDetails({ ...appDetails, category: e.target.value })
                }
              >
                <MenuItem value="GAME">Game</MenuItem>
                <MenuItem value="PRODUCTIVITY">Productivity</MenuItem>
                {/* Add more categories as needed */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Content Rating</InputLabel>
              <Select
                value={appDetails.contentRating}
                onChange={(e) =>
                  setAppDetails({
                    ...appDetails,
                    contentRating: e.target.value,
                  })
                }
              >
                <MenuItem value="EVERYONE">Everyone</MenuItem>
                <MenuItem value="TEEN">Teen</MenuItem>
                <MenuItem value="MATURE">Mature</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price (leave empty for free)"
              value={appDetails.price}
              onChange={(e) =>
                setAppDetails({ ...appDetails, price: e.target.value })
              }
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          App Bundle / APK
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
      </Paper>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={uploading}
      >
        Upload App
      </Button>

      {uploading && (
        <Box sx={{ width: "100%", mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      )}
    </Box>
  );
}

export default AppUploader;
