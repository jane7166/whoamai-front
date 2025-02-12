import { useEffect, useState } from "react";

const useFacebookSDK = () => {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || window.FB) {
      setIsSDKLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.src = `https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v22.0&appId=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}&autoLogAppEvents=1`;

    script.onload = () => {
      if (window.FB) {
        window.FB.init({
          appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!,
          cookie: true,
          xfbml: true,
          version: "v22.0",
        });

        setIsSDKLoaded(true);
      }
    };

    document.body.appendChild(script);
  }, []);

  return isSDKLoaded;
};

export default useFacebookSDK;
