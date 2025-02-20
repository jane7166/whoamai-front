"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

interface BlogPost {
  id: string;
  title: string;
  published: string;
  content?: string;
  image?: { url?: string };
  imageUrl?: string; // ✅ imageUrl 속성 추가 (대표 이미지 저장)
}

export default function LoadingPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        console.log("📡 Fetching posts...");
        const res = await fetch("/api/blogger/posts"); // ✅ API 호출
        const data = await res.json();
        console.log("📡 Response:", data);

        if (res.ok) {
          const formattedPosts = (data.items || []).map((post: BlogPost) => ({
            ...post,
            imageUrl: extractImageUrl(post) || "/default-thumbnail.png", // ✅ 대표 이미지 가져오기
          }));
          setPosts(formattedPosts);
        } else {
          setError(data.error || "게시글을 불러오지 못했습니다.");
        }
      } catch (err) {
        console.error("🚨 Error fetching posts:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

  // ✅ 게시물에서 대표 이미지 추출하는 함수
  function extractImageUrl(post: BlogPost): string | null {
    if (post.image?.url) return post.image.url; // ✅ Blogger API의 대표 이미지 사용

    const content = post.content || "";
    const imgTagMatch = content.match(/<img[^>]+src=["']([^"']+)["']/); // ✅ 본문에서 첫 번째 이미지 추출
    return imgTagMatch ? imgTagMatch[1] : null;
  }

  return (
    <PageContainer> {/* ✅ 전체 페이지를 가운데 정렬 */}
      <Container>
        <Title>📌 Blogger 게시글</Title>
        {loading ? (
          <LoadingText>🚀 게시물을 불러오는 중...</LoadingText>
        ) : error ? (
          <ErrorText>⚠️ {error}</ErrorText>
        ) : (
          <>
            <PostContainer>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard key={post.id}>
                    <PostImageWrapper>
                      <PostImage src={post.imageUrl} alt="Post Thumbnail" />
                    </PostImageWrapper>
                    <PostTitle>{post.title}</PostTitle>
                    <PostDate>{new Date(post.published).toLocaleDateString()}</PostDate>
                  </PostCard>
                ))
              ) : (
                <NoPostsText>😕 게시글이 없습니다.</NoPostsText>
              )}
            </PostContainer>
            <ReportButton onClick={() => router.push("/report")}>
              리포트 페이지로 이동하기
            </ReportButton>
          </>
        )}
      </Container>
    </PageContainer>
  );
}

// ✅ Styled Components (4:3 비율 유지 & 중앙 정렬)
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('/whoamai-bgimg.png') no-repeat center center fixed;
  background-size: cover;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 1200px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
  width: 100%;
`;

const LoadingText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
`;

const ErrorText = styled.p`
  font-size: 16px;
  color: red;
`;

const NoPostsText = styled.p`
  font-size: 16px;
  color: #777;
`;

/* ✅ 한 줄에 3개씩 정렬 + 가운데 정렬 */
const PostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1000px;
  justify-content: center;
`;

/* ✅ 게시물 카드 스타일 (4:3 비율 유지) */
const PostCard = styled.div`
  background: #ffffff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.08);
  text-align: center;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #ddd; /* ✅ 연한 회색 테두리 추가 */
`;


/* ✅ 4:3 비율의 이미지 박스 */
const PostImageWrapper = styled.div`
  width: 100%;
  padding-top: 75%; /* ✅ 4:3 비율 유지 */
  position: relative;
`;

const PostImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* ✅ 이미지 비율 유지 */
  border-radius: 8px;
`;

const PostTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 10px;
`;

const PostDate = styled.p`
  font-size: 12px;
  color: #999;
  margin-top: 3px;
`;

const ReportButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px 18px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
  transition: 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
