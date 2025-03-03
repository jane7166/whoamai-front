import "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Account } from "next-auth";

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
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      session.accessToken = token.accessToken;
      session.user.id = token.sub as string;
      return session;
    },
    async jwt({ token, account }: { token: JWT; account?: Account }): Promise<JWT> {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
