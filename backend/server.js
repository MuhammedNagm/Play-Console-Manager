const express = require("express");
const { google } = require("googleapis");
const multer = require("multer");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const playdeveloper = google.androidpublisher("v3");

// Endpoint for listing apps
app.get("/api/play-console/apps", async (req, res) => {
  const authToken = req.headers.authorization.split("Bearer ")[1];

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: authToken });

  try {
    const response = await playdeveloper.inappproducts.list({
      auth,
      packageName: "com.example.app",
    });
    res.json(response.data.applications);
  } catch (error) {
    res.status(500).json({ errorMessage: "Failed to fetch apps", error });
  }
});
// Updated endpoint for uploading APK
app.post(
  "/api/play-console/upload",
  upload.single("apkFile"),
  async (req, res) => {
    const authToken = req.headers.authorization.split("Bearer ")[1];
    const { packageName } = req.body;

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: authToken });

    try {
      // Create a new edit
      const edit = await playdeveloper.edits.insert({
        auth,
        packageName,
      });

      const editId = edit.data.id;

      // Upload the APK
      const apk = await playdeveloper.edits.apks.upload({
        auth,
        editId,
        packageName,
        media: {
          mimeType: "application/vnd.android.package-archive",
          body: fs.createReadStream(req.file.path),
        },
      });

      // Commit the changes
      await playdeveloper.edits.commit({
        auth,
        editId,
        packageName,
      });

      // Clean up the uploaded file
      fs.unlinkSync(req.file.path);

      res.json({
        message: "APK uploaded successfully",
        versionCode: apk.data.versionCode,
      });
    } catch (error) {
      console.error("Error uploading APK:", error);
      res.status(500).json({ error: "Failed to upload APK" });
    }
  }
);

app.post("/api/play-console/notifications", async (req, res) => {
  const authToken = req.headers.authorization.split("Bearer ")[1];
  const { packages } = req.body;

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: authToken });

  try {
    const notifications = [];

    for (const packageName of packages) {
      const response = await playdeveloper.reviews.list({
        auth,
        packageName,
        // Add other parameters as needed
      });

      notifications.push({
        packageName,
        data: response.data,
      });
    }

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
