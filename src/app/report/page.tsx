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
  const [aiResponse, setAiResponse] = useState<string>(""); // AI 응답 상태 추가
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가

  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✅ Blogger API → Flask로 전송 → Gemini API 응답 받기
  useEffect(() => {
    async function fetchAIResponse() {
      try {
        setLoading(true);

        // ✅ Blogger API에서 데이터를 가져옴
        const bloggerResponse = await fetch("/api/getBloggerData");
        const bloggerData = await bloggerResponse.json();

        if (!bloggerData || bloggerData.error) {
          setAiResponse("Blogger 데이터를 가져오는 데 실패했습니다.");
          setLoading(false);
          return;
        }

        // ✅ Flask 백엔드로 JSON 전송
        const flaskResponse = await fetch("http://localhost:5000/process_json", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bloggerData),
        });

        const flaskData = await flaskResponse.json();

        if (flaskData.response) {
          setAiResponse(flaskData.response);
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
      <Summary>
        <Section1>
          <ProfileContainer>
            <ProfileImage src={session?.user?.image || "/base-image.svg"} alt="Profile" />
            <ProfileDetails>
              <Username>{session?.user?.name || "@unknown_user"}</Username>
            </ProfileDetails>
          </ProfileContainer>
        </Section1>
      </Summary>
      <Content>
        <Section2>
          <CenteredContent>
            <DescriptionTitle>{session?.user?.name} 님은 이런 사람일까요?</DescriptionTitle>
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
  background: url('/whoamai-bgimg.png') no-repeat center center fixed;
  background-size: cover;
  font-family: Arial, sans-serif;
  padding: 0 5%;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
`;

/* ✅ 홈으로 이동 버튼 스타일 */
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

/* ✅ 로그인된 사용자의 프로필 사진을 반영 */
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

/* ✅ 로그인된 사용자의 닉네임을 표시 */
const Username = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
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
