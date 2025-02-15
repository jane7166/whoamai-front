"use client";

import { signIn } from "next-auth/react";
import styled from "styled-components";

export default function LoginButton() {
  return (
    <GoogleButton onClick={() => signIn("google")}>
      <GoogleIcon src="/google-icon.svg" alt="Google Logo" />
      Google 계정으로 로그인
    </GoogleButton>
  );
}

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 20px;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  background-color: #fff;
  border: 2px solid #4285F4;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f1f1f1;
  }
`;

const GoogleIcon = styled.img`
  width: 24px;
  height: 24px;
`;
