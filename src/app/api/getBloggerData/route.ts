import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions as nextAuthOptions } from "../auth/[...nextauth]/route";

// nextAuthOptions 객체의 타입을 유추하여 사용합니다.
type MyNextAuthOptions = typeof nextAuthOptions;
const authOptions: MyNextAuthOptions = nextAuthOptions;

export async function GET() {
  console.log("📢 API 요청 받음: /api/getBloggerData");

  // 로그인된 사용자 세션 정보 가져오기
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    console.log("❌ 인증 실패: 세션이 없거나 accessToken이 없음");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accessToken = session.accessToken;
  const apiUrl = `https://www.googleapis.com/blogger/v3/users/self/blogs`;

  try {
    // 1단계: 사용자의 블로그 ID 가져오기
    const blogRes = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!blogRes.ok) {
      console.error("❌ 블로그 ID 가져오기 실패:", blogRes.statusText);
      return NextResponse.json({ error: "Failed to fetch blog ID" }, { status: blogRes.status });
    }

    const blogData = await blogRes.json();

    if (!blogData.items || blogData.items.length === 0) {
      return NextResponse.json({ error: "No blogs found" }, { status: 404 });
    }

    const blogId = blogData.items[0].id;
    const postsUrl = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`;

    // 2단계: 해당 블로그의 게시글 가져오기
    const postsRes = await fetch(postsUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!postsRes.ok) {
      console.error("❌ 블로그 게시글 가져오기 실패:", postsRes.statusText);
      return NextResponse.json({ error: "Failed to fetch posts" }, { status: postsRes.status });
    }

    const postsData = await postsRes.json();

    console.log("✅ 블로그 게시글 가져오기 성공:", postsData);

    return NextResponse.json(postsData, { status: 200 });
  } catch (error) {
    console.error("❌ API 요청 중 오류 발생:", error);
    return NextResponse.json({ error: "Failed to fetch posts", details: error }, { status: 500 });
  }
}
