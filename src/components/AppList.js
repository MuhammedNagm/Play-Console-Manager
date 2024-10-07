// src/components/AppList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function AppList({ token }) {
  const [apps, setApps] = useState([]);
  const [notifications, setNotifications] = useState({});

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
        setInterval(() => {
          fetchNotifications(response.data);
        }, 60000);
      } catch (error) {
        console.error("Error fetching apps:", error);
        window.alert("Failed to fetch apps. Please try again.");
      }
    };

    if (token) {
      fetchApps();
    }
  }, [token]);

  const fetchNotifications = async (apps) => {
    const notificationsData = {};
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/play-console/notifications`,
        { packages: apps.map((app) => app.packageName) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <div>
      <h2>Your Google Play Console Apps</h2>
      <ul>
        {apps.map((app) => (
          <li key={app.packageName}>
            <strong>{app.title}</strong> - {app.packageName}
            {notifications[app.packageName] && (
              <ul>
                {notifications[app.packageName].map((notification, index) => (
                  <li key={index}>{notification.message}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppList;
