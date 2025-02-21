"use client";

import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // ✅ 로그인된 사용자 정보 가져오기
import { useRouter } from "next/navigation"; // ✅ Next.js 클라이언트 라우팅 추가
import Image from "next/image"; // ✅ 이미지 컴포넌트 추가

const WhoAmAIReport: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [aiResponses, setAiResponses] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // AI 응답 가져오기 (응답이 배열 형태로 반환된다고 가정)
  useEffect(() => {
    async function fetchAIResponse() {
      try {
        const response = await fetch("http://localhost:5000/generate");
        const data = await response.json();
        if (data.response) {
          // data.response가 배열이면 그대로, 아니면 배열로 감싸서 처리
          setAiResponses(Array.isArray(data.response) ? data.response : [data.response]);
        } else {
          setAiResponses(["응답을 가져오는 데 실패했습니다."]);
        }
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setAiResponses(["오류가 발생했습니다."]);
      }
      setLoading(false);
    }
    fetchAIResponse();
  }, []);

  if (!isClient) return null; 

  return (
    <MainContainer>
      <Header>
        <Image
          src="/report-logo.png"
          width={150}
          height={30}
          alt="location"
          onClick={() => router.push("/")}
        />
        <BackButton onClick={() => router.push("/")}>홈으로 돌아가기</BackButton>
      </Header>
      <ReportPageWrapper>
        <ImageWrapper>
          <Image
            src="/whoamai-robot.svg"
            width={600}
            height={600}
            alt="location"
          />
        </ImageWrapper>
        <SummaryWrapper>
          <Summary>
            <Section1>
              <ProfileContainer>
                <ProfileImage src={session?.user?.image || "/base-image.svg"} alt="Profile" />
                <ProfileDetails>
                  <Username>{session?.user?.name || "@unknown_user"}</Username>
                </ProfileDetails>
              </ProfileContainer>
              <CenteredContent>
                <DescriptionTitle>
                  제가 예측할 수 있는 {session?.user?.name} 님의 정보는 아래와 같아요.
                </DescriptionTitle>
              </CenteredContent>
            </Section1>
          </Summary>
          <Section2>
            {loading ? (
              <LoadingText>🚀 AI 응답 생성 중...</LoadingText>
            ) : (
              aiResponses.map((response, index) => (
                <Content key={index}>
                  <AIResponseText>{response}</AIResponseText>
                </Content>
              ))
            )}
          </Section2>
        </SummaryWrapper>
      </ReportPageWrapper>
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
  background: url('/whoamai-bgimg.png') no-repeat center center fixed;
  background-size: cover;
  font-family: Arial, sans-serif;
  padding: 0 5%;
  overflow: hidden; /* 전체 페이지 스크롤 방지 */
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
`;

const BackButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ReportPageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80vh;
  gap: 20px;
`;

const ImageWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SummaryWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  margin-right: 20px;
  margin-top: 50px;
  `;

const Summary = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 25px;
`;

const Section1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

// Section2가 직접 스크롤되도록 설정 (내부에 다수의 Content 컴포넌트가 생성됨)
const Section2 = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 5px; /* 스크롤바 공간 고려 */
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 5px;
`;

const Content = styled.div`
  width: 100%;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
`;

const CenteredContent = styled.div`
  width: 100%;
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
