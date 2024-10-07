import React, { useState } from "react";
import "./App.css";
import PlayConsoleManager from "./components/PlayConsoleManager";
import UserLogin from "./components/UserLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = (response) => {
    console.log("Google login success:", response);
    setIsLoggedIn(true);
  };

  const handleLoginFailure = (error) => {
    console.error("Google login failed:", error);
  };

  return (
    <div className="App bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg">
              <div className="card-body">
                <h1 className="text-center mb-4">Play Console Manager</h1>
                {isLoggedIn ? (
                  <PlayConsoleManager />
                ) : (
                  <div className="text-center">
                    <p className="mb-4">Please log in to continue</p>
                    <GoogleOAuthProvider
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    >
                      <UserLogin
                        onSuccess={handleLoginSuccess}
                        onFailure={handleLoginFailure}
                      />
                    </GoogleOAuthProvider>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
