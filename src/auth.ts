import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/blogger",
        },
      },
    }),
  ],
  callbacks: {
    // 세션 콜백
    async session({ session, token }) {
      // global.d.ts에서 Session, JWT에 accessToken을 확장한 경우
      // 아래와 같이 추가 프로퍼티에 접근 가능합니다.
      session.accessToken = token.accessToken;
      session.user.id = token.sub ?? "";
      return session;
    },
    // JWT 콜백
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};
