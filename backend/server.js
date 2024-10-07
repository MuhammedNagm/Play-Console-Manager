const express = require("express");
const { google } = require("googleapis");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

const playdeveloper = google.androidpublisher("v3");

// Endpoint for listing apps
app.get("/api/play-console/apps", async (req, res) => {
  const authToken = req.headers.authorization.split("Bearer ")[1];

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: authToken });

  try {
    const response = await playdeveloper.edits.list({
      auth,
      packageName: "your-package-name", // Specify the package name here
    });
    res.json(response.data.apps);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch apps" });
  }
});

// Endpoint for uploading APK
app.post(
  "/api/play-console/upload",
  upload.single("apkFile"),
  async (req, res) => {
    const authToken = req.headers.authorization.split("Bearer ")[1];

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: authToken });

    try {
      // Logic to upload APK file
      res.json({ message: "APK uploaded successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to upload APK" });
    }
  }
);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
