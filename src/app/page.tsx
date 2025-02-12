"use client";

import { useEffect, useState } from "react";
import useFacebookSDK from "./hooks/useFacebookSDK";
import styled from "styled-components";
import LoginButton from "../components/LoginButton";

export default function Home() {
  const isSDKLoaded = useFacebookSDK();
  const [loginStatus, setLoginStatus] = useState<string | null>(null);

  useEffect(() => {
    if (isSDKLoaded && window.FB) {
      window.FB.getLoginStatus((response: any) => {
        console.log("Facebook Login Status:", response);
        setLoginStatus(response.status);
      });
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

        <LoginButton loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
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
