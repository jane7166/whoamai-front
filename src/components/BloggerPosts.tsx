"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface BlogPost {
  id: string;
  title: string;
  published: string;
  content?: string;
}

export default function BloggerPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        console.log("📡 Fetching posts...");
        const res = await fetch("/api/blogger/posts"); // ✅ Next.js API 호출
        const data = await res.json();
        console.log("📡 Response:", data);

        if (res.ok) {
          setPosts(data.items || []);
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

  if (loading) return <LoadingText>🚀 게시글을 불러오는 중...</LoadingText>;
  if (error) return <ErrorText>⚠️ {error}</ErrorText>;

  return (
    <Container>
      <Title>📌 내 블로그 게시글</Title>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post.id}>
            <PostTitle>{post.title}</PostTitle>
            <PostContent dangerouslySetInnerHTML={{ __html: post.content || "내용 없음" }} />
            <PostDate>{new Date(post.published).toLocaleDateString()}</PostDate>
          </PostCard>
        ))
      ) : (
        <NoPostsText>😕 게시글이 없습니다.</NoPostsText>
      )}
    </Container>
  );
}

// Styled Components
const LoadingText = styled.p`
  font-size: 18px;
  color: #007bff;
`;

const ErrorText = styled.p`
  font-size: 18px;
  color: red;
`;

const NoPostsText = styled.p`
  font-size: 18px;
  color: #777;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  margin-top: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const PostCard = styled.div`
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid #ddd;
`;

const PostTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const PostContent = styled.div`
  font-size: 16px;
  color: #666;
  margin-top: 10px;
`;

const PostDate = styled.p`
  font-size: 14px;
  color: #999;
  margin-top: 10px;
`;
