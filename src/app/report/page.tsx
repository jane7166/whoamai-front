"use client";
import styled from "styled-components";
import React, { useEffect, useState } from "react";

const WhoAmAIReport: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<string>(""); // AI 응답 저장
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가

  // 클라이언트에서만 렌더링
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 사용자 정보 API 호출
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        setUsername(data.username || "@unknown_user");
        setFullName(data.fullName || "이름");
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUsername("@unknown_user");
        setFullName("이름");
      }
    }
    fetchUserData();
  }, []);

  // AI 응답 가져오기
  useEffect(() => {
    async function fetchAIResponse() {
      try {
        const response = await fetch("http://localhost:5000/generate"); // Flask 백엔드 호출
        const data = await response.json();
        if (data.response) {
          setAiResponse(data.response);
        } else {
          setAiResponse("응답을 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setAiResponse("오류가 발생했습니다.");
      }
      setLoading(false);
    }
    fetchAIResponse();
  }, []);

  if (!isClient) return null; // 서버에서는 렌더링 X, 클라이언트에서만 렌더링

  return (
    <MainContainer>
      <Header>
        <HeaderText>Who @m AI</HeaderText>
      </Header>
      <Summary>
        <Section1>
          <ProfileContainer>
            <ProfileImage src="/base-image.svg" alt="Profile" />
            <ProfileDetails>
              <Username>{username}</Username>
              <FullName>{fullName}</FullName>
            </ProfileDetails>
          </ProfileContainer>
        </Section1>
      </Summary>
      <Content>
        <Section2>
          <CenteredContent>
            <DescriptionTitle>{username} 님은 이런 사람일까요?</DescriptionTitle>
            {loading ? (
              <LoadingText>🚀 AI 응답 생성 중...</LoadingText>
            ) : (
              <AIResponseText>{aiResponse}</AIResponseText>
            )}
          </CenteredContent>
        </Section2>
      </Content>
    </MainContainer>
  );
};

export default WhoAmAIReport;

// Styled Components
const MainContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
  padding: 0 5%;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 15px 25px;
`;

const HeaderText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const Summary = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin-top: 30px;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 25px;
  flex-wrap: wrap;
  position: relative;
`;

const Section1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 5px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  flex-wrap: wrap;
  position: relative;
`;

const Section2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenteredContent = styled.div`
  text-align: center;
`;

const ProfileDetails = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const Username = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
`;

const FullName = styled.div`
  font-size: 1rem;
  color: #777;
  text-align: center;
`;

const DescriptionTitle = styled.div`
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
`;

const AIResponseText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
`;

const LoadingText = styled.p`
  font-size: 1rem;
  color: #888;
  font-style: italic;
`;
