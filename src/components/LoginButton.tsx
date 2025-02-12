"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const LoginButton = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.FB) {
      window.FB.getLoginStatus((response) => {
        console.log("Facebook Login Status:", response);
        if (response.status === "connected") {
          setIsLoggedIn(true);
        }
      });
    }
  }, []);

  const checkLoginState = () => {
    if (window.FB) {
      window.FB.getLoginStatus((response) => {
        console.log("Login status checked:", response);
        if (response.status === "connected") {
          setIsLoggedIn(true);
          router.push("/report"); // ✅ 로그인 성공 시 자동 이동
        } else {
          setIsLoggedIn(false);
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
      {isLoggedIn ? "Logged In" : "Facebook"}
    </LoginBaseButton>
  );
};

export default LoginButton;

const LoginBaseButton = styled.button`
  width: 200px;
  height: 55px;
  margin-top: 100px;
  margin-bottom: 50px;
  color: #FFF;
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
