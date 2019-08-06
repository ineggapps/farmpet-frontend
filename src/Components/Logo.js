import React from "react";
import styled from "styled-components";
import { PetIcon } from "./Icons";

const Container = styled.div`
  z-index: 1000;
  position: absolute;
  left: 10px;
  top: 10px;
`;

const Logo = () => (
  <Container>
    <PetIcon size={32} fill="#FFF" />
  </Container>
);

export default Logo;
