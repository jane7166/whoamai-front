"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

interface LoginButtonProps {
  loginStatus: string | null;
  setLoginStatus: (status: string) => void;
}

const LoginButton = ({ loginStatus, setLoginStatus }: LoginButtonProps) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(loginStatus === "connected");
  }, [loginStatus]);

  const checkLoginState = () => {
    if (window.FB) {
      window.FB.getLoginStatus((response: FBLoginStatusResponse) => {
        console.log("Login status checked:", response);
        setIsLoggedIn(response.status === "connected");
        setLoginStatus(response.status);
        if (response.status === "connected") {
          router.push("/report");
        }
      });
    }
  };

  const handleLogin = () => {
    if (window.FB) {
      window.FB.login(checkLoginState, { scope: "public_profile,email" });
    }
  };

  return (
    <LoginBaseButton onClick={handleLogin}>
      {isLoggedIn ? "Logged In" : "Facebook Login"}
    </LoginBaseButton>
  );
};

export default LoginButton;

const LoginBaseButton = styled.button`
  width: 200px;
  height: 55px;
  margin-top: 100px;
  margin-bottom: 50px;
  color: #fff;
  text-align: center;
  font-family: "AR One Sans";
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: 30px;
  background: linear-gradient(90deg, #0180FF 0%, #014D99 100%);
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0166cc;
  }
  &:active {
    background-color: #014D99;
  }
`;
