import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "../../../../auth";

export async function GET() {
  // 로그인된 사용자의 세션 정보 가져오기
  const session: Session | null = await getServerSession(authOptions);

  // 세션 객체를 확장 타입으로 단언하여 accessToken 프로퍼티에 접근할 수 있도록 합니다.
  const extendedSession = session as (Session & { accessToken?: string }) | null;

  // 사용자가 로그인하지 않았거나 accessToken이 없으면 401 Unauthorized 반환
  if (!extendedSession || !extendedSession.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accessToken = extendedSession.accessToken;
  const apiUrl = `https://www.googleapis.com/blogger/v3/users/self/blogs`;

  try {
    // 1단계: 사용자의 블로그 ID 가져오기
    const blogRes = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const blogData = await blogRes.json();

    if (!blogData.items || blogData.items.length === 0) {
      return NextResponse.json({ error: "No blogs found" }, { status: 404 });
    }

    const blogId = blogData.items[0].id; // 첫 번째 블로그 ID 사용
    const postsUrl = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`;

    // 2단계: 해당 블로그의 게시글 가져오기
    const postsRes = await fetch(postsUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const postsData = await postsRes.json();

    return NextResponse.json(postsData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts", details: error },
      { status: 500 }
    );
  }
}
