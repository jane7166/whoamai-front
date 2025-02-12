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
    if (loginStatus === "connected") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [loginStatus]);

  const checkLoginState = () => {
    if (window.FB) {
      window.FB.getLoginStatus((response: any) => {
        console.log("Login status checked:", response);
        if (response.status === "connected") {
          setIsLoggedIn(true);
          setLoginStatus(response.status);
          router.push("/report"); // ✅ 로그인 성공 시 자동 이동
        } else {
          setIsLoggedIn(false);
          setLoginStatus(response.status);
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

// 스타일 설정
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
