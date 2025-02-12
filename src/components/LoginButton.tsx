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
    if (!window.FB) {
      console.error("🚨 Facebook SDK가 아직 로드되지 않았습니다.");
      return;
    }
  
    window.FB.getLoginStatus((response: FBLoginStatusResponse) => {
      console.log("🔍 Facebook 로그인 상태 확인:", response);
  
      if (!response || !response.status) {
        console.error("❌ Facebook 로그인 상태 응답이 올바르지 않습니다.");
        return;
      }
  
      setLoginStatus(response.status);
      setIsLoggedIn(response.status === "connected");
  
      if (response.status === "connected") {
        console.log("✅ 로그인 성공! /report로 이동");
        router.push("/report");
      } else {
        console.log("❌ 로그인하지 않음");
      }
    });
  };
  
  const handleLogin = () => {
    if (!window.FB) {
      console.error("🚨 Facebook SDK가 아직 로드되지 않았습니다. 잠시 후 다시 시도하세요.");
      return;
    }
  
    console.log("🔑 Facebook 로그인 시도...");
    window.FB.login(checkLoginState, { scope: "public_profile,email" });
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
