"use client";

import { useEffect, useState } from "react";
import useFacebookSDK from "./hooks/useFacebookSDK";
import styled from "styled-components";
import LoginButton from "../components/LoginButton";

export default function Home() {
  useFacebookSDK();
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [loginStatus, setLoginStatus] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.FB) {
      setIsSDKLoaded(true);
      window.FB.getLoginStatus((response: any) => {
        console.log("Facebook Login Status:", response);
        setLoginStatus(response.status);
      });
    }
  }, []);

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
      
      {/* 기존 로그인 버튼 유지 */}
      <LoginButton />

      {/* Facebook SDK가 로드되었는지 상태 표시 추가 */}
      {!isSDKLoaded ? <p>Facebook SDK 로딩 중...</p> : null}
      
      {/* Facebook 로그인 상태 표시 추가 */}
      {loginStatus && <p>현재 로그인 상태: {loginStatus}</p>}
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
