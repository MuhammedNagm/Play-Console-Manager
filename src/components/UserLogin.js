// src/components/Login.js
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const StyledGoogleLogin = styled(GoogleLogin)`
  && {
    background-color: #4285f4;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #3367d6;
    }
  }
`;

function UserLogin({ onSuccess, onFailure }) {
  const handleLoginSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);
    onSuccess(credentialResponse);
  };

  const handleLoginFailure = () => {
    console.error("Login Failed");
    onFailure();
  };

  return (
    <LoginContainer>
      <Title>Sign in to Play Console Manager</Title>
      <StyledGoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
        useOneTap
        cookiePolicy={"single_host_origin"}
        scope="https://www.googleapis.com/auth/androidpublisher"
        text="Sign in with Google"
        shape="rectangular"
        theme="filled_blue"
      />
    </LoginContainer>
  );
}

export default UserLogin;
