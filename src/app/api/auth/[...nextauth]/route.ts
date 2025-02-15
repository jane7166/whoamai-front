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
    async session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.accessToken as string | undefined;
      session.user.id = token.sub as string;
      return session;
    },
    async jwt({ token, account }: { token: any; account?: any }) {
      if (account) {
        token.accessToken = account.access_token as string;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

// ✅ App Router에서는 `export { handler as GET, handler as POST }` 방식 사용
export { handler as GET, handler as POST };
