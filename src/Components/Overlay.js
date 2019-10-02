import React from "react";
import styled from "styled-components";
import { useOverlay } from "../OverlayContext";

const BlackScreen = styled.div`
  z-index: 3000;
  position: fixed;
  background-color: #000;
  opacity: 0.8;
  top: 0;
  width: 100%;
  height: 100%;
`;

const Overlay = () => {
  const { isShow, setIsShow } = useOverlay();
  console.log(isShow, "isShow상태");
  if (isShow) {
    return <BlackScreen>BlackScreen</BlackScreen>;
  } else {
    return null;
  }
};

export default Overlay;
