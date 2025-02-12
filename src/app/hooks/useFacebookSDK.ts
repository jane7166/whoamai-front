import { useEffect, useState } from "react";

const useFacebookSDK = (): boolean => {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.FB) {
      window.fbAsyncInit = () => {
        if (window.FB) {
          window.FB.init({
            appId: "1703061370284607",
            cookie: true,
            xfbml: true,
            version: "v22.0",
          });

          window.FB.AppEvents.logPageView();
          setIsSDKLoaded(true);
        }
      };

      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.FB) {
          setIsSDKLoaded(true);
        }
      };
      document.body.appendChild(script);
    } else {
      setIsSDKLoaded(true);
    }
  }, []);

  return isSDKLoaded;
};

export default useFacebookSDK;
