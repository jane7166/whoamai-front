"use client";
import styled from "styled-components";
import React, { useEffect, useState } from "react";

const WhoAmAIReport: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);

  // API에서 데이터를 가져오는 함수
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/user"); // 여기에 API URL을 입력하세요
        const data = await response.json();
        setUsername(data.username || "@unknown_user");
        setFullName(data.fullName || "이름");
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUsername("@unknown_user");
        setFullName("이름");
      }
    }
    fetchData();
  }, []);

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
  padding: 15px 25px; /* 여백 추가 */
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
  margin-top: 30px; /* 여백 추가 */
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 25px; /* 여백 추가 */
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
`;
