"use client";

import { useEffect, useState } from "react";
import useFacebookSDK from "./hooks/useFacebookSDK";
import styled from "styled-components";
import LoginButton from "../components/LoginButton";

interface FBLoginStatusResponse {
  status: "connected" | "not_authorized" | "unknown";
  authResponse?: {
    accessToken: string;
    expiresIn: number;
    signedRequest: string;
    userID: string;
  };
}

export default function Home() {
  const isSDKLoaded = useFacebookSDK();
  const [loginStatus, setLoginStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!isSDKLoaded) return; // SDK가 아직 안 로드되었으면 실행 X
  
    if (window.FB) {
      console.log("🔄 Facebook 로그인 상태 확인 중...");
      window.FB.getLoginStatus((response: FBLoginStatusResponse) => {
        console.log("✅ Facebook 로그인 상태:", response);
        setLoginStatus(response.status);
      });
    } else {
      console.error("❌ Facebook SDK 로드 오류! `window.FB`가 없습니다.");
    }
  }, [isSDKLoaded]);
  

  return (
    <Container>
      <LogoWrapper>
        <Logo>Who @m AI</Logo>
      </LogoWrapper>
      <DescriptionWrapper>
        <Description>
          Instagram과 연동된 Facebook 계정을 로그인 해주세요.
          <br />
          노출된 개인정보가 있는지 직접 찾아드릴게요! 🕵🏻
        </Description>
      </DescriptionWrapper>

      <LoginButton />

      {/* ✅ 로그인 상태를 화면에 표시하여 ESLint 오류 방지 */}
      {loginStatus && (
        <StatusMessage>현재 로그인 상태: {loginStatus}</StatusMessage>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  width: 100%;
  height: 100vh;
  padding: 0;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.h1`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #000;
  font-family: "Abhaya Libre ExtraBold";
  font-size: 200px;
  font-style: normal;
  font-weight: 800;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const Description = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #000;
  font-family: "AR One Sans";
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
`;

const StatusMessage = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: #555;
`;
