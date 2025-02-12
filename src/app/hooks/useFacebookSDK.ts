import { useEffect, useState } from "react";

const useFacebookSDK = () => {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.FB) {
      console.log("✅ Facebook SDK 이미 로드됨");
      setIsSDKLoaded(true);
      return;
    }

    console.log("🚀 Facebook SDK 로드 시작...");

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.src = `https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v22.0&appId=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}&autoLogAppEvents=1`;

    script.onload = () => {
      console.log("🎉 Facebook SDK script 로드 완료");
      if (window.FB) {
        console.log("🔄 Facebook SDK 초기화 진행...");
        window.FB.init({
          appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!,
          cookie: true,
          xfbml: true,
          version: "v22.0",
        });
        setIsSDKLoaded(true);
      } else {
        console.error("🚨 Facebook SDK 초기화 실패");
      }
    };

    script.onerror = () => {
      console.error("❌ Facebook SDK 로드 실패! 인터넷 연결 또는 Facebook 설정을 확인하세요.");
    };

    document.body.appendChild(script);
  }, []);

  return isSDKLoaded;
};

export default useFacebookSDK;
