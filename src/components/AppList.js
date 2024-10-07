// src/components/AppList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function AppList({ token }) {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    // Fetch apps from backend API
    const fetchApps = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/play-console/apps`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setApps(response.data);
        // Poll every (100000 milliseconds)
        setInterval(pollNotifications, 100000);
      } catch (error) {
        console.error("Error fetching apps:", error);
        window.alert("Failed to fetch apps. Please try again.");
      }
    };

    if (token) {
      fetchApps();
    }
  }, [token]);

  function pollNotifications() {
    const packages = [
      "com.example.app1",
      "com.example.app2",
      "com.example.app3",
    ];

    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/play-console/notifications`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ packages }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Process and display the notifications for each package
        data.forEach((packageData) => {
          console.log(
            `Notifications for ${packageData.packageName}:`,
            packageData.data
          );
        });
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }

  return (
    <div>
      <h2>Your Google Play Console Apps</h2>
      <ul>
        {apps.map((app) => (
          <li key={app.packageName}>
            <strong>{app.title}</strong> - {app.packageName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppList;
