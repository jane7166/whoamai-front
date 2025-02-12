import { useEffect, useState } from "react";

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

const useFacebookSDK = () => {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.FB) {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "1703061370284607", // 실제 Facebook App ID 입력
          cookie: true,
          xfbml: true,
          version: "v19.0",
        });

        window.FB.AppEvents.logPageView();
        setIsSDKLoaded(true); // SDK가 로드되었음을 상태로 저장
      };

      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    } else {
      setIsSDKLoaded(true);
    }
  }, []);

  return isSDKLoaded; // SDK 로드 여부 반환
};

export default useFacebookSDK;
