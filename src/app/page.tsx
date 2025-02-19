"use client";

import styled from "styled-components";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLoadingRedirect = () => {
    router.push("/loading"); // ✅ '/loading' 페이지로 이동 후 리포트 페이지로 이동
  };

  return (
    <Container>
      <LogoWrapper>
        <Logo>Who @m AI</Logo>
      </LogoWrapper>
      <DescriptionWrapper>
        <Description>
          Google 계정으로 로그인 해주세요.<br />
          Blogger 분석을 통해<br />
          노출된 개인정보를 찾아드릴게요! <span>🕵🏻</span>
        </Description>
      </DescriptionWrapper>
      <ButtonWrapper>
        {session ? (
          <>
            <UserInfo>
              <ProfileImage src={session.user?.image || "/default-profile.png"} alt="User Image" />
              <UserName>{session.user?.name}</UserName>
              <LogoutButton onClick={() => signOut()}>로그아웃</LogoutButton>
            </UserInfo>
            <ReportButton onClick={handleLoadingRedirect}>Blogger 게시글 불러오기</ReportButton>
          </>
        ) : (
          <LoginButton />
        )}
      </ButtonWrapper>
    </Container>
  );
}

// ✅ Styled Components (기존 코드 + 내가 추가한 코드 통합)
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
  width: 80%;
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
  font-size: 100px;
  font-style: normal;
  font-weight: 800;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  text-align: center;
  max-width: 600px;
`;

const Description = styled.p`
  color: #000;
  font-family: "AR One Sans";
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.6;
  text-align: center;

  span {
    display: inline-block;
    line-height: normal;
    vertical-align: middle;
    font-size: 32px;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

/* ✅ 로그인 정보를 더 크고 강조 */
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: #f1f1f1;
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
  font-size: 22px;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const UserName = styled.p`
  font-size: 22px;
  font-weight: 600;
  color: #333;
`;

const LogoutButton = styled.button`
  background-color: #d9534f;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background-color: #c9302c;
  }
`;

/* ✅ Blogger 분석하기 버튼 스타일 */
const ReportButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 14px 22px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 50px;

  &:hover {
    background-color: #0056b3;
  }
`;
