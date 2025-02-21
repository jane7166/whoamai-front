"use client";

import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const WhoAmAIReport: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [aiResponses, setAiResponses] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function fetchAIResponse() {
      try {
        setLoading(true);

        // 1) Blogger API에서 데이터 가져오기
        const bloggerResponse = await fetch("/api/getBloggerData");
        const bloggerData = await bloggerResponse.json();
        console.log("Blogger Data:", bloggerData);

        // 2) items 필드가 존재하는지 확인
        if (!bloggerData || !bloggerData.items) {
          setAiResponses(["Blogger 데이터를 가져오는 데 실패했습니다. (items 누락)"]);
          setLoading(false);
          return;
        }

        // 3) Flask 서버로 bloggerData 전체를 전송
        const flaskResponse = await fetch("http://localhost:5000/process_json", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bloggerData),
        });
        const flaskData = await flaskResponse.json();
        console.log("Flask Data:", flaskData);

        if (flaskData.response) {
          // flaskData.response가 문자열 또는 배열인지 구분
          setAiResponses(
            Array.isArray(flaskData.response)
              ? flaskData.response
              : [flaskData.response]
          );
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
        <BackButton onClick={() => router.push("/")}>
          홈으로 돌아가기
        </BackButton>
      </Header>
      <ReportPageWrapper>
        <ImageWrapper>
          <StyledRobotImage
            src="/whoamai-robot.svg"
            alt="location"
            width={600}
            height={600}
          />
        </ImageWrapper>
        <SummaryWrapper>
          <Summary>
            <Section1>
              <ProfileContainer>
                <ProfileImage
                  src={session?.user?.image || "/base-image.svg"}
                  alt="Profile"
                />
                <ProfileDetails>
                  <Username>
                    {session?.user?.name || "@unknown_user"}
                  </Username>
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
  /* 브라우저 너비가 768px 이하이면 로봇 이미지 영역 축소 */
  @media (max-width: 768px) {
    width: 30%;
  }
`;

// StyledRobotImage는 컨테이너 너비에 맞게 100%로 확장되도록 처리
const StyledRobotImage = styled(Image)`
  width: 100% !important;
  height: auto !important;
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
  /* 브라우저 너비가 768px 이하이면 Summary 영역 확대 */
  @media (max-width: 768px) {
    width: 70%;
  }
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
