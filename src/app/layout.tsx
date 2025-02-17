import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/SessionProvider"; // ✅ 세션 유지 추가

export const metadata: Metadata = {
  title: "Who am AI",
  description: "Blogger 분석을 통해 노출된 개인정보를 찾아드릴게요!",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>{children}</AuthProvider> {/* ✅ 세션 유지 추가 */}
      </body>
    </html>
  );
}
