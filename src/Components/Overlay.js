import React from "react";
import styled from "styled-components";
import { useOverlay } from "../OverlayContext";

const BlackScreen = styled.div`
  z-index: 3000;
  position: fixed;
  background-color: #000;
<<<<<<< HEAD
  opacity: ${props => props.opacity};
=======
  opacity: 0.8;
>>>>>>> c05653c9ef3efba140c1c1e8bf8bf8fcb76cbd2c
  top: 0;
  width: 100%;
  height: 100%;
`;

const Overlay = () => {
<<<<<<< HEAD
  const { isShow, opacity } = useOverlay();
  console.log(isShow, "isShow상태", opacity);
  if (isShow) {
    return <BlackScreen opacity={opacity}>BlackScreen</BlackScreen>;
=======
  const { isShow, setIsShow } = useOverlay();
  console.log(isShow, "isShow상태");
  if (isShow) {
    return <BlackScreen>BlackScreen</BlackScreen>;
>>>>>>> c05653c9ef3efba140c1c1e8bf8bf8fcb76cbd2c
  } else {
    return null;
  }
};

export default Overlay;
