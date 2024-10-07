import React, { useState } from "react";
import "./App.css";
import PlayConsoleManager from "./components/PlayConsoleManager";
import UserLogin from "./components/UserLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const handleLoginSuccess = (response) => {
    console.log("Google login success:", response);
    setIsLoggedIn(true);
    setToken(response.credential);
  };

  const handleLoginFailure = (error) => {
    console.error("Google login failed:", error);
  };

  return (
    <div className="App bg-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-lg rounded-lg overflow-hidden">
              <div className="card-header bg-primary text-white text-center py-4">
                <h2 className="mb-0">Play Console Manager</h2>
              </div>
              <div className="card-body p-5">
                {isLoggedIn ? (
                  <PlayConsoleManager token={token} />
                ) : (
                  <div className="text-center">
                    <p className="lead mb-4">Please log in to continue</p>
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
