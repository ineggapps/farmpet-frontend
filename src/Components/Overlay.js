import React from "react";
import styled from "styled-components";
import { useOverlay } from "../OverlayContext";

const BlackScreen = styled.div`
  z-index: 3000;
  position: fixed;
  background-color: #000;
  opacity: ${props => props.opacity};
  top: 0;
  width: 100%;
  height: 100%;
`;

const Overlay = () => {
  const { isShow, opacity } = useOverlay();
  console.log(isShow, "isShow상태", opacity);
  if (isShow) {
    return <BlackScreen opacity={opacity}>BlackScreen</BlackScreen>;
  } else {
    return null;
  }
};

export default Overlay;
