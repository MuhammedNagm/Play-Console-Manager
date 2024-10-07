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
      } catch (error) {
        console.error("Error fetching apps:", error);
        window.alert("Failed to fetch apps. Please try again.");
      }
    };

    if (token) {
      fetchApps();
    }
  }, [token]);

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
