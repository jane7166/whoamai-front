import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth"; // NextAuth 설정 불러오기

export async function GET() {
  const session = await getServerSession(authOptions);
  const extendedSession = session as (typeof session & { accessToken?: string }) | null;

  if (!extendedSession || !extendedSession.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accessToken = extendedSession.accessToken;
  const apiUrl = `https://www.googleapis.com/blogger/v3/users/self/blogs`;

  try {
    const blogRes = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const blogData = await blogRes.json();

    if (!blogData.items || blogData.items.length === 0) {
      return NextResponse.json({ error: "No blogs found" }, { status: 404 });
    }

    const blogId = blogData.items[0].id;
    const postsUrl = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`;

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
