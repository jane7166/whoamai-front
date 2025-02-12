export {};

declare global {
  interface FBLoginStatusResponse {
    status: "connected" | "not_authorized" | "unknown";
    authResponse?: {
      accessToken: string;
      expiresIn: number;
      signedRequest: string;
      userID: string;
    };
  }

  interface Window {
    FB?: {
      init: (params: {
        appId: string;
        cookie: boolean;
        xfbml: boolean;
        version: string;
      }) => void;
      AppEvents: {
        logPageView: () => void;
      };
      getLoginStatus: (callback: (response: FBLoginStatusResponse) => void) => void;
      login: (callback: (response: FBLoginStatusResponse) => void, options?: { scope: string }) => void; // ✅ 추가됨!
    };
    fbAsyncInit?: () => void;
  }
}
