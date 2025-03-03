import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
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
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.sub || "";
      return session;
    },
    async jwt({ token, account }) {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
