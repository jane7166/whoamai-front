import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/blogger",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }: any) { // 👈 any로 타입 제거
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: any) { // 👈 any로 타입 제거
      (session as any).accessToken = token.accessToken; // 👈 강제 캐스팅
      (session as any).user.id = token.sub || "";
      return session;
    },
  },
};

const handler = NextAuth(authOptions as any); // 👈 전체적으로 any로 처리

export { handler as GET, handler as POST };
