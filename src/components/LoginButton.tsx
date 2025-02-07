// import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { styled } from "styled-components";

const LoginButton = () => {
  const router = useRouter();
//   useEffect(() => {
//       router.push("/report");
//   });

  return (
    <LoginBaseButton onClick={() => router.push("/report")}>Login</LoginBaseButton>
  );
};

export default LoginButton;

const LoginBaseButton = styled.button`
    width: 200px;
    height: 55px;

    margin-top: 100px;

    margin-bottom: 50px;

    color: #FFF;
    text-align: center;
    font-family: "AR One Sans";
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    border-radius: 30px;
    background: linear-gradient(90deg, #0180FF 0%, #014D99 100%);
    color: white;

    cursor: pointer;

    &:hover {
        background-color: #014D99;
    }
    &:active {
        background-color: #014D99;
    }
`;